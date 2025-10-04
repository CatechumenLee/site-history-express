import { useState, useCallback, useMemo, useEffect, useRef } from 'react';

import { Domain } from '@/common/url';
import { debounce } from '@/common/stream';
import { i18n } from '@/common/i18n';

export interface Props {
  domain: Domain;
  matchMode?: any;
  onTextChange: (text: string) => void;
  onToggleMatchMode?: () => void;
}

export default function FilterBar({ domain, matchMode, onTextChange, onToggleMatchMode }: Props) {
  const placeholder = useMemo(() => {
    return i18n.filterGlobalPlaceholder;
  }, []);

  const [text, setText] = useState('');
  const debouncedUpdate = useCallback(debounce(onTextChange, 300), []);
  const [shouldHideCaret, setShouldHideCaret] = useState(true);

  function handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newText = event.target.value;
    setText(newText);
    setShouldHideCaret(false);
    debouncedUpdate(newText);
  }

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className='flex items-center h-[40px] border-t border-[--color-border] shadow-lg shadow-[--color-text]'>
      <input
        ref={inputRef}
        className='flex-auto bg-transparent outline-none border-none h-full px-3'
        style={{ caretColor: shouldHideCaret ? 'transparent' : undefined }}
        type='text'
        placeholder={placeholder}
        spellCheck={false}
        autoComplete='off'
        value={text}
        onChange={handleTextChange}
        onClick={() => setShouldHideCaret(false)}
      />
    </div>
  );
}

