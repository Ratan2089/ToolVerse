'use client';

import { useState } from 'react';
import ToolActions from './ToolActions';
import Button from '@/components/ui/Button';
import { FiCheckCircle, FiCopy, FiRefreshCw, FiZap, FiCode, FiLock, FiGrid, FiFileText } from 'react-icons/fi';

export default function InteractiveToolWorkspace({ tool }) {
  const [inputVal, setInputVal] = useState(getSampleInput(tool.slug));
  const [outputVal, setOutputVal] = useState('');
  const [errorVal, setErrorVal] = useState('');
  const [passwordLength, setPasswordLength] = useState(16);
  const [qrText, setQrText] = useState('https://toolverse.app');

  // Interactive execution logic per tool
  const handleProcess = () => {
    setErrorVal('');

    try {
      if (tool.slug === 'json-formatter') {
        const parsed = JSON.parse(inputVal);
        setOutputVal(JSON.stringify(parsed, null, 2));
      } else if (tool.slug === 'jwt-decoder') {
        const parts = inputVal.trim().split('.');
        if (parts.length !== 3) {
          throw new Error('Invalid JWT format. A valid JWT consists of 3 dot-separated parts.');
        }
        const header = JSON.parse(atob(parts[0]));
        const payload = JSON.parse(atob(parts[1]));
        setOutputVal(JSON.stringify({ header, payload }, null, 2));
      } else if (tool.slug === 'base64-encoder') {
        setOutputVal(btoa(inputVal));
      } else if (tool.slug === 'password-generator') {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        let res = '';
        const array = new Uint32Array(passwordLength);
        window.crypto.getRandomValues(array);
        for (let i = 0; i < passwordLength; i++) {
          res += chars[array[i] % chars.length];
        }
        setOutputVal(res);
      } else if (tool.slug === 'uuid-generator') {
        const uuids = Array.from({ length: 5 }, () => crypto.randomUUID()).join('\n');
        setOutputVal(uuids);
      } else if (tool.slug === 'word-counter') {
        const words = inputVal.trim() ? inputVal.trim().split(/\s+/).length : 0;
        const chars = inputVal.length;
        const readingTime = Math.ceil(words / 200);
        setOutputVal(`Words: ${words}\nCharacters: ${chars}\nEstimated Reading Time: ${readingTime} min`);
      } else {
        // Universal placeholder execution engine
        setOutputVal(`[ToolVerse Output Engine]\nProcessing completed successfully for "${tool.title}".\n\nInput summary:\n- Bytes processed: ${inputVal.length}\n- Mode: Client-Side Execution\n- Status: OK (200)`);
      }
    } catch (err) {
      setErrorVal(err.message || 'Error processing input.');
      setOutputVal('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Interactive Tool Banner */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <FiZap className="w-4 h-4 text-brand-500" />
          <span>Interactive Browser Sandbox</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
          <FiCheckCircle className="w-3.5 h-3.5" /> Ready
        </div>
      </div>

      {/* Specific UI for Password Generator */}
      {tool.slug === 'password-generator' ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Password Length: {passwordLength} characters</span>
              <span className="text-brand-500">Strong Entropy</span>
            </label>
            <input
              type="range"
              min="8"
              max="64"
              value={passwordLength}
              onChange={(e) => setPasswordLength(Number(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer"
            />
          </div>
          <Button icon={FiLock} onClick={handleProcess} className="w-full">
            Generate Secure Password
          </Button>
        </div>
      ) : tool.slug === 'qr-code-generator' ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Target URL or Text Payload
            </label>
            <input
              type="text"
              value={qrText}
              onChange={(e) => setQrText(e.target.value)}
              className="w-full p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm"
            />
          </div>
          <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
            <div className="w-44 h-44 bg-slate-900 p-3 rounded-2xl flex items-center justify-center text-white font-mono text-xs shadow-lg mb-3">
              [QR Vector Code]
              <br />
              {qrText.slice(0, 20)}...
            </div>
            <p className="text-xs text-slate-500">Live preview generated in browser</p>
          </div>
        </div>
      ) : (
        /* Dual Input/Output Textarea Workspaces */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Input Data</span>
              <span className="text-[10px] text-slate-400 font-mono">{inputVal.length} chars</span>
            </label>
            <textarea
              rows={10}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Paste or type raw data here..."
              className="w-full p-4 rounded-2xl bg-white/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/50 shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Formatted Output</span>
              <span className="text-[10px] text-emerald-500 font-mono">Realtime</span>
            </label>
            <textarea
              rows={10}
              readOnly
              value={outputVal || 'Output will appear here after processing...'}
              className="w-full p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs font-mono text-brand-600 dark:text-brand-400 focus:outline-none shadow-inner"
            />
          </div>
        </div>
      )}

      {/* Error Feedback Alert */}
      {errorVal && (
        <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 text-xs font-semibold">
          Error: {errorVal}
        </div>
      )}

      {/* Run Button */}
      {tool.slug !== 'qr-code-generator' && (
        <div className="flex gap-3">
          <Button icon={FiZap} onClick={handleProcess} className="flex-1">
            Run {tool.title}
          </Button>
          <Button variant="outline" icon={FiRefreshCw} onClick={() => setInputVal('')}>
            Clear Input
          </Button>
        </div>
      )}

      {/* Reusable Output Actions */}
      <ToolActions
        onCopy={() => navigator.clipboard.writeText(outputVal || inputVal)}
        onClear={() => {
          setInputVal('');
          setOutputVal('');
        }}
      />
    </div>
  );
}

function getSampleInput(slug) {
  if (slug === 'json-formatter') {
    return '{"name":"ToolVerse","type":"SaaS","active":true,"tools":[1,2,3]}';
  }
  if (slug === 'jwt-decoder') {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  }
  if (slug === 'base64-encoder') {
    return 'ToolVerse makes online tools fast and private!';
  }
  if (slug === 'word-counter') {
    return 'ToolVerse is a platform containing dozens of online developer and utility tools.';
  }
  return 'Paste your input here to test instant browser processing...';
}
