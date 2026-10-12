import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Copy, Check, ExternalLink, ScanLine } from 'lucide-react';
import { useApp } from '../lib/store.jsx';
import { PROMPT, chatgptUrl } from '../data/estimate.js';

// QR opens ChatGPT with the prompt prefilled — Gerry can verify the estimate himself.
export default function QrPrompt() {
  const { L } = useApp();
  const [svg, setSvg] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    QRCode.toString(chatgptUrl, { type: 'svg', margin: 1, errorCorrectionLevel: 'M', color: { dark: '#1B1717', light: '#F5F3E8' } })
      .then(setSvg)
      .catch(() => setSvg(''));
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROMPT);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = PROMPT;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="qr-card">
      <div className="qr-code" role="img" aria-label={L('QR code that opens ChatGPT with the estimate prompt', 'QR-Code, der ChatGPT mit dem Schätzungs-Prompt öffnet')}>
        {svg ? <span dangerouslySetInnerHTML={{ __html: svg }} /> : <ScanLine size={64} />}
      </div>
      <div className="qr-text">
        <p className="eyebrow">{L('Don’t trust me — ask ChatGPT', 'Glaub mir nicht – frag ChatGPT')}</p>
        <h3>{L('Scan. The prompt is ready. Just press send.', 'Scannen. Der Prompt ist fertig. Nur noch senden.')}</h3>
        <pre className="prompt">{PROMPT}</pre>
        <div className="qr-actions">
          <button className="button cherry" onClick={copy}>
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? L('Copied', 'Kopiert') : L('Copy prompt', 'Prompt kopieren')}
          </button>
          <a className="text-link" href={chatgptUrl} target="_blank" rel="noreferrer">
            {L('Open in ChatGPT', 'In ChatGPT öffnen')} <ExternalLink size={16} />
          </a>
        </div>
        <p className="sr-only" role="status">{copied ? L('Prompt copied to clipboard', 'Prompt in die Zwischenablage kopiert') : ''}</p>
      </div>
    </div>
  );
}
