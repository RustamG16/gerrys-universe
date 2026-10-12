import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Smartphone, MessageSquare, HelpCircle, Copy, Check, ExternalLink, FileText } from 'lucide-react';
import { useApp } from '../lib/store.jsx';
import LevelHead from '../components/LevelHead.jsx';
import Reveal from '../components/Reveal.jsx';
import '../styles/ask.css';

const SITE = 'https://rustamg16.github.io/gerrys-universe/';
const BRIEF = SITE + 'deal-brief.txt';

// Shared with public/chat.html (the short QR redirect), so both always send the same message.
import prompts from '../../public/ask-prompts.json';


// The QR encodes a short link to chat.html, which forwards to ChatGPT — a dense QR of the full prompt scans badly from a screen.
const qrTarget = (lang) => SITE + 'chat.html?lang=' + lang;
const chatUrl = (text) => 'https://chatgpt.com/?q=' + encodeURIComponent(text);

export default function Ask() {
  const { L, lang } = useApp();
  const prompt = prompts[lang] || prompts.en;
  const url = chatUrl(prompt);
  const [svg, setSvg] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    QRCode.toString(qrTarget(lang), { type: 'svg', errorCorrectionLevel: 'M', margin: 1, color: { dark: '#1B1717', light: '#FFFFFF' } })
      .then((s) => alive && setSvg(s))
      .catch(() => alive && setSvg(''));
    return () => { alive = false; };
  }, [lang]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const questions = lang === 'de'
    ? [
        'Was kostet mich das im ersten Jahr wirklich, inklusive Lohnnebenkosten?',
        'Ab welchem Umsatz lohnt sich der Deal für mich?',
        'Welche Risiken habe ich als Arbeitgeber beim Visum?',
        'Was sollte ich im Vertrag noch klären oder ändern?',
        'Was passiert, wenn ich keine Netzwerk-Kunden finde?',
      ]
    : [
        'What will this really cost me in year one, including employer contributions?',
        'From what revenue does the deal pay off for me?',
        'What are my risks as the employer with the visa?',
        'What should I still clarify or change in the contract?',
        'What happens if I don’t find any network clients?',
      ];

  return (
    <div className="level ask">
      <LevelHead
        num="07"
        kicker={L('Ask questions · your own AI advisor', 'Fragen stellen · dein eigener KI-Berater')}
        title={[L('Questions?', 'Fragen?'), L('Ask on your phone.', 'Frag am Handy.')]}
        lead={L(
          'Scan the code. ChatGPT opens with the whole deal already loaded — then ask anything, at your own pace, as often as you like.',
          'Code scannen. ChatGPT öffnet sich mit dem ganzen Deal schon geladen — dann frag, was du willst, in Ruhe und so oft du willst.',
        )}
      />

      <section className="wrap ask-main">
        <div className="ask-qr">
          {svg ? (
            <div className="ask-qr-code" role="img" aria-label={L('QR code that opens ChatGPT with the deal', 'QR-Code, der ChatGPT mit dem Deal öffnet')} dangerouslySetInnerHTML={{ __html: svg }} />
          ) : (
            <div className="ask-qr-code empty">{L('QR code could not be drawn — use the button below.', 'QR-Code konnte nicht erstellt werden — nutze den Button unten.')}</div>
          )}
          <p className="caption muted">{L('Opens a short link on this site that forwards to chatgpt.com with a prepared message. Nothing is sent until you press send.', 'Öffnet einen kurzen Link dieser Seite, der zu chatgpt.com mit einer vorbereiteten Nachricht weiterleitet. Nichts wird gesendet, bevor du auf Senden drückst.')}</p>
          <div className="ask-actions">
            <a className="button cherry" href={url} target="_blank" rel="noreferrer">
              {L('Open on this device', 'Auf diesem Gerät öffnen')} <ExternalLink size={16} />
            </a>
            <button className="button outline" onClick={copy}>
              {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? L('Copied', 'Kopiert') : L('Copy the message', 'Nachricht kopieren')}
            </button>
          </div>
        </div>

        <Reveal className="ask-steps" as="ol">
          <li>
            <span className="ask-step-icon" aria-hidden="true"><Smartphone size={22} /></span>
            <div>
              <strong>{L('Scan with your phone camera', 'Mit der Handykamera scannen')}</strong>
              <p>{L('Point the camera at the code and tap the link.', 'Kamera auf den Code richten und den Link antippen.')}</p>
            </div>
          </li>
          <li>
            <span className="ask-step-icon" aria-hidden="true"><MessageSquare size={22} /></span>
            <div>
              <strong>{L('Send the prepared message', 'Vorbereitete Nachricht senden')}</strong>
              <p>{L('ChatGPT reads the deal brief and gives you a 5-point summary.', 'ChatGPT liest das Deal-Briefing und gibt dir eine Zusammenfassung in 5 Punkten.')}</p>
            </div>
          </li>
          <li>
            <span className="ask-step-icon" aria-hidden="true"><HelpCircle size={22} /></span>
            <div>
              <strong>{L('Ask anything about the deal', 'Alles zum Deal fragen')}</strong>
              <p>{L('Costs, risks, visa, contract — the chat stays in your account to continue later.', 'Kosten, Risiken, Visum, Vertrag — der Chat bleibt in deinem Konto zum Weitermachen.')}</p>
            </div>
          </li>
        </Reveal>
      </section>

      <section className="wrap" aria-labelledby="ask-q-title">
        <p className="eyebrow">{L('Good first questions', 'Gute erste Fragen')}</p>
        <h2 id="ask-q-title" className="h2-sm">{L('Tap one to start with it.', 'Tippe eine an, um damit zu starten.')}</h2>
        <ul className="ask-questions">
          {questions.map((q, i) => (
            <li key={i}>
              <a href={chatUrl(prompt + '\n\n' + L('My first question: ', 'Meine erste Frage: ') + q)} target="_blank" rel="noreferrer">
                <span>{q}</span>
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap" aria-labelledby="ask-src-title">
        <p className="eyebrow">{L('What ChatGPT reads', 'Was ChatGPT liest')}</p>
        <h2 id="ask-src-title" className="h2-sm">{L('The same facts as on these pages.', 'Dieselben Fakten wie auf diesen Seiten.')}</h2>
        <a className="ask-brief" href={BRIEF} target="_blank" rel="noreferrer">
          <FileText size={22} aria-hidden="true" />
          <span>
            <strong>{L('Deal brief (plain text)', 'Deal-Briefing (Klartext)')}</strong>
            <small>{L('Offer, deal terms, ownership, visa steps and open points — readable by any AI assistant.', 'Angebot, Konditionen, Eigentum, Visumschritte und offene Punkte — für jeden KI-Assistenten lesbar.')}</small>
          </span>
          <ExternalLink size={18} aria-hidden="true" />
        </a>
        <details className="ask-prompt">
          <summary>{L('Show the prepared message', 'Vorbereitete Nachricht anzeigen')}</summary>
          <pre>{prompt}</pre>
        </details>
        <p className="caption muted disclaimer">
          {L(
            'ChatGPT is a third-party service and can make mistakes. For binding answers on the contract or the visa, ask a labour-law advisor, the AMS — or Rustam directly.',
            'ChatGPT ist ein Drittanbieter und kann Fehler machen. Für verbindliche Antworten zu Vertrag oder Visum frag eine arbeitsrechtliche Beratung, das AMS — oder direkt Rustam.',
          )}
        </p>
      </section>
    </div>
  );
}
