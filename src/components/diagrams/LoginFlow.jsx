import React from 'react';
import { useApp } from '../../lib/store.jsx';

// One Notion login, two workspaces: the switcher replaces account switching.
export default function LoginFlow() {
  const { L, paused } = useApp();
  return (
    <figure className={'chart login-flow' + (paused ? ' still' : '')}>
      <div className="chart-top">
        <figcaption>
          <h3>{L('One login. Two universes.', 'Ein Login. Zwei Universen.')}</h3>
          <p className="caption muted">{L('Notion workspaces are switched in the sidebar — same account, no logout.', 'Notion-Workspaces wechselt man in der Seitenleiste – gleiches Konto, kein Abmelden.')}</p>
        </figcaption>
      </div>
      <svg viewBox="0 0 900 380" role="img" aria-label={L('Diagram: Rustam’s one account reaches the Convenium OS and Gerry’s Universe workspaces; Gerry and Marina join Gerry’s Universe.', 'Diagramm: Rustams ein Konto erreicht die Workspaces Convenium OS und Gerry’s Universe; Gerry und Marina treten Gerry’s Universe bei.')}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
          </marker>
        </defs>
        {/* People */}
        <g className="person rustam" transform="translate(120 190)">
          <circle r="46" />
          <text y="-2" textAnchor="middle" className="p-name">Rustam</text>
          <text y="18" textAnchor="middle" className="p-sub">{L('1 account', '1 Konto')}</text>
        </g>
        <g className="person" transform="translate(780 70)">
          <circle r="34" />
          <text y="5" textAnchor="middle" className="p-name">Gerry</text>
        </g>
        <g className="person" transform="translate(780 310)">
          <circle r="34" />
          <text y="5" textAnchor="middle" className="p-name">Marina</text>
        </g>
        {/* Workspaces */}
        <g transform="translate(330 60)" className="ws convenium">
          <rect width="240" height="88" rx="6" />
          <text x="20" y="38" className="ws-name">Convenium OS</text>
          <text x="20" y="62" className="ws-sub">{L('Rustam’s workspace', 'Rustams Workspace')}</text>
        </g>
        <g transform="translate(330 232)" className="ws gerry">
          <rect width="240" height="88" rx="6" />
          <text x="20" y="38" className="ws-name">Gerry’s Universe</text>
          <text x="20" y="62" className="ws-sub">{L('Owned & billed by Gerry', 'Gehört & bezahlt von Gerry')}</text>
        </g>
        {/* Links */}
        <path d="M166 176 C 240 120, 270 104, 326 104" className="flow" markerEnd="url(#arrow)" />
        <path d="M166 204 C 240 260, 270 276, 326 276" className="flow hot" markerEnd="url(#arrow)" />
        <path d="M746 82 C 680 130, 640 240, 574 262" className="flow" markerEnd="url(#arrow)" />
        <path d="M746 300 C 680 296, 620 292, 574 290" className="flow dashed" markerEnd="url(#arrow)" />
        {/* Labels */}
        <text x="232" y="190" textAnchor="middle" className="switch">{L('⇅ switcher', '⇅ Umschalter')}</text>
        <text x="236" y="318" textAnchor="middle" className="role">{L('Workspace owner', 'Workspace-Eigentümer')}</text>
        <text x="680" y="170" textAnchor="middle" className="role">{L('Owner · billing', 'Eigentümer · Abrechnung')}</text>
        <text x="660" y="338" textAnchor="middle" className="role">{L('Member · Marina teamspace', 'Mitglied · Marina-Teamspace')}</text>
      </svg>
    </figure>
  );
}
