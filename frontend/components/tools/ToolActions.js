'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { FiCopy, FiCheck, FiDownload, FiTrash2, FiShare2, FiMaximize2 } from 'react-icons/fi';

export default function ToolActions({
  onCopy,
  onClear,
  onDownload,
  onShare,
  copied = false,
  downloadDisabled = false,
}) {
  const [internalCopied, setInternalCopied] = useState(false);

  const handleCopy = () => {
    if (onCopy) {
      onCopy();
    }
    setInternalCopied(true);
    setTimeout(() => setInternalCopied(false), 2000);
  };

  const isCopied = copied || internalCopied;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 my-4">
      <div className="flex items-center gap-2">
        <Button
          variant={isCopied ? 'primary' : 'outline'}
          size="sm"
          icon={isCopied ? FiCheck : FiCopy}
          onClick={handleCopy}
        >
          {isCopied ? 'Copied to Clipboard!' : 'Copy Result'}
        </Button>

        {onClear && (
          <Button variant="ghost" size="sm" icon={FiTrash2} onClick={onClear}>
            Clear
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {onDownload && (
          <Button
            variant="outline"
            size="sm"
            icon={FiDownload}
            onClick={onDownload}
            disabled={downloadDisabled}
          >
            Download
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          icon={FiShare2}
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: document.title, url: window.location.href });
            } else {
              handleCopy();
            }
          }}
        >
          Share
        </Button>
      </div>
    </div>
  );
}
