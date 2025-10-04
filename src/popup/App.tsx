import { useEffect, useState, useMemo } from 'react';

import { MessageKey, sendMessage } from '@/common/message';
import { HistoryItem, DomainHistoryItems, createDomainHistoryItems } from '@/common/history';
import HistoryItemList from '@/popup/component/HistoryItemList';
import FilterBar from '@/popup/component/FilterBar';

export default function App() {
  const [domainItems, setDomainItems] = useState<DomainHistoryItems>(createDomainHistoryItems());
  const [filterText, setFilterText] = useState('');
  const [highlightedUrlSet, setHighlightedUrlSet] = useState<Set<string>>(new Set());

  const allItems = useMemo<HistoryItem[]>(() => {
    return domainItems.main;
  }, [domainItems]);

  const filteredItems = useMemo<HistoryItem[]>(() => {
    const keywords = filterText.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!keywords.length) {
      return allItems;
    }
    const items = allItems.filter((item) => {
      const title = item.title.toLowerCase();
      const url = item.url.toLowerCase();
      for (const keyword of keywords) {
        if (!title.includes(keyword) && !url.includes(keyword)) {
          return false;
        }
      }
      return true;
    });
    return items;
  }, [allItems, filterText]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const [flashDomainItems, tabUrls] = await Promise.all([getFlashItems(), getHighlightedUrlSet()]);
    setDomainItems(flashDomainItems);
    setHighlightedUrlSet(tabUrls);
    setDomainItems(await getFullItems());
    setTimeout(() => {
      document.body.classList.add('ready');
    });
  }

  
  return (
    <div>
      <HistoryItemList items={filteredItems} total={allItems.length} highlightedUrlSet={highlightedUrlSet} />
      <FilterBar
        domain={domainItems.domain}
        onTextChange={setFilterText}
      />
    </div>
  );
}

async function getFlashItems(): Promise<DomainHistoryItems> {
  return (await sendMessage(MessageKey.GetFlashItems)) as DomainHistoryItems;
}

async function getFullItems(): Promise<DomainHistoryItems> {
  return (await sendMessage(MessageKey.GetFullItems)) as DomainHistoryItems;
}

async function getHighlightedUrlSet(): Promise<Set<string>> {
  const tabs = await chrome.tabs.query({ currentWindow: true });
  return new Set(tabs.map((tab) => tab.url!));
}
