import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ExternalLink, Users, Wallet, Zap, ListChecks, Globe, Bot, Target, Shield, Info } from 'lucide-react';
import { useApp } from '../lib/store.jsx';
import { options, criteria, setupSteps, modules } from '../data/notion.js';
import LevelHead from '../components/LevelHead.jsx';
import { media } from '../lib/store.jsx';
import Reveal from '../components/Reveal.jsx';
import LoginFlow from '../components/diagrams/LoginFlow.jsx';
import WorkspaceTree from '../components/diagrams/WorkspaceTree.jsx';

const icons = [Users, Wallet, Zap, ListChecks, Globe, Bot, Target, Shield];

export default function NotionHQ() {
  const { t, L, euro, links } = useApp();
  const [done, setDone] = useState([]);
  const notion = links.notionUrl || links.notion;

  return (
    <div className="level notion">
      <LevelHead
        num="05"
        kicker={L('Notion HQ', 'Notion-HQ')}
        title={[L('No nested workspaces.', 'Keine verschachtelten Workspaces.'), L('One universe, four teamspaces.', 'Ein Universum, vier Teamspaces.')]}
        lead={L('Gerry owns it. Rustam works in it from his own account — next to Convenium OS, without switching accounts.', 'Gerry gehört er. Rustam arbeitet darin mit seinem eigenen Konto – neben Convenium OS, ohne Kontowechsel.')}
      />

      <figure className="wrap hq-hero">
        <img src={media('notion-hq.webp')} alt={L('Concept render of a command deck overlooking the business universe', 'Konzeptbild einer Kommandobrücke mit Blick auf das Business-Universum')} />
        <figcaption>{L('AI-generated with Higgsfield · illustrative concept, not the Notion interface', 'Mit Higgsfield KI-generiert · illustratives Konzept, nicht die Notion-Oberfläche')}</figcaption>
      </figure>

      <Reveal className="wrap notion-grid">
        <LoginFlow />
        <WorkspaceTree />
      </Reveal>

      <section className="wrap">
        <figure className="chart compare">
          <div className="chart-top">
            <figcaption>
              <h3>{L('Why one workspace beats four', 'Warum ein Workspace besser ist als vier')}</h3>
              <p className="caption muted">{L('Notion relations and rollups work only inside one workspace.', 'Notion-Relationen und Rollups funktionieren nur innerhalb eines Workspaces.')}</p>
            </figcaption>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col"><span className="sr-only">{L('Criterion', 'Kriterium')}</span></th>
                  {options.map((o, i) => (
                    <th key={i} scope="col" className={o.pick ? 'pick' : ''}>
                      {t(o.name)}
                      {o.pick && <span className="pick-badge">{L('Recommended', 'Empfohlen')}</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {criteria.map((c, r) => (
                  <tr key={r}>
                    <th scope="row">{t(c)}</th>
                    {options.map((o, i) => (
                      <td key={i} className={o.pick ? 'pick' : ''}>
                        {o.rows[r] ? <Check size={18} className="yes" aria-label={L('Yes', 'Ja')} /> : <X size={18} className="no" aria-label={L('No', 'Nein')} />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      </section>

      <section className="wrap setup">
        <div>
          <p className="eyebrow">{L('Setup quest', 'Einrichtungs-Quest')}</p>
          <h2 className="h2-sm">{L('Five steps. One evening.', 'Fünf Schritte. Ein Abend.')}</h2>
          <ol className="steps">
            {setupSteps.map((s, i) => {
              const on = done.includes(i);
              return (
                <li key={i} className={on ? 'on' : ''}>
                  <label>
                    <input type="checkbox" checked={on} onChange={() => setDone((d) => (on ? d.filter((x) => x !== i) : [...d, i]))} />
                    <span className="step-n" aria-hidden="true">{on ? <Check size={16} /> : i + 1}</span>
                    <span>{t(s)}</span>
                  </label>
                </li>
              );
            })}
          </ol>
        </div>
        <aside className="plan-card">
          <small>{L('Recommended plan', 'Empfohlener Plan')}</small>
          <strong>Notion Business</strong>
          <b>{euro(19.5, 2)}</b>
          <span>{L('per member / month · billed yearly · guests free', 'pro Mitglied / Monat · jährlich · Gäste kostenlos')}</span>
          <ul>
            <li><Check size={14} /> {L('Private teamspace for Marina', 'Privater Teamspace für Marina')}</li>
            <li><Check size={14} /> {L('Notion AI included · custom-agent credits extra', 'Notion-KI inklusive · Agenten-Credits extra')}</li>
            <li><Check size={14} /> {L('Granular permissions', 'Feine Berechtigungen')}</li>
          </ul>
          <span>{L('Researched 11 Oct 2026 · verify at checkout', 'Recherchiert am 11. Okt 2026 · beim Kauf prüfen')}</span>
          <a className="text-link" href="https://www.notion.com/pricing" target="_blank" rel="noreferrer">notion.com/pricing <ExternalLink size={12} /></a>
          <Link className="text-link" to="/speedrun">{L('See the full tool stack →', 'Ganzen Tool-Stack ansehen →')}</Link>
        </aside>
      </section>

      <section className="wrap">
        <p className="eyebrow">{L('Eight modules inside HQ', 'Acht Module im HQ')}</p>
        <ul className="modules">
          {modules.map(([name, body], i) => {
            const Icon = icons[i];
            return (
              <li key={i}>
                <Icon size={22} aria-hidden="true" />
                <strong>{t(name)}</strong>
                <span>{t(body)}</span>
              </li>
            );
          })}
        </ul>
        <div className="callout">
          <Info size={18} aria-hidden="true" />
          <p>
            {L(
              'Clinical information never goes into Notion. AI agents draft; people approve. Claude’s built-in Notion connector currently links one workspace at a time — for working in both, Claude Code can hold a second, separately authorised Notion connection.',
              'Klinische Informationen kommen nie in Notion. KI-Agenten entwerfen; Menschen geben frei. Claudes eingebauter Notion-Connector verbindet derzeit einen Workspace gleichzeitig – für beide kann Claude Code eine zweite, separat autorisierte Notion-Verbindung halten.',
            )}
          </p>
        </div>
        {notion && (
          <a className="text-link" href={notion} target="_blank" rel="noreferrer">
            {L('Open the Notion strategy page', 'Notion-Strategieseite öffnen')} <ExternalLink size={14} />
          </a>
        )}
      </section>
    </div>
  );
}
