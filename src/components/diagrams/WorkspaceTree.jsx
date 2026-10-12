import React, { useState } from 'react';
import { Database, Lock, ArrowUp } from 'lucide-react';
import { useApp, tabKeyDown } from '../../lib/store.jsx';
import { teamspaces } from '../../data/notion.js';
import { brand } from '../../data/levels.js';

// Workspace → teamspaces → databases. Business teamspaces feed HQ through relations and rollups.
export default function WorkspaceTree() {
  const { t, L } = useApp();
  const [sel, setSel] = useState(0);
  const ts = teamspaces[sel];
  return (
    <figure className="chart ws-tree">
      <div className="chart-top">
        <figcaption>
          <h3>{L('Inside “Gerry’s Universe”', 'Innerhalb von „Gerry’s Universe“')}</h3>
          <p className="caption muted">{L('Teamspaces instead of nested workspaces. Select one to look inside.', 'Teamspaces statt verschachtelter Workspaces. Einen auswählen, um hineinzuschauen.')}</p>
        </figcaption>
      </div>
      <div className="tree">
        <div className="tree-root">
          <span className="ws-icon" aria-hidden="true">G</span>
          <div>
            <strong>Gerry’s Universe</strong>
            <small>{L('Workspace · Notion Business', 'Workspace · Notion Business')}</small>
          </div>
        </div>
        <div className="tree-branches" role="tablist" aria-label={L('Teamspaces', 'Teamspaces')}>
          {teamspaces.map((x, i) => (
            <button
              key={x.id}
              role="tab"
              id={'ts-' + i}
              aria-controls="ts-panel"
              aria-selected={sel === i}
              tabIndex={sel === i ? 0 : -1}
              onClick={() => setSel(i)}
              onKeyDown={(e) => tabKeyDown(e, i, teamspaces.length, setSel)}
              style={{ '--c': brand[x.color].light }}
              className="ts"
            >
              <i />
              <strong>{x.name}</strong>
              <small>{x.access.en.startsWith('Private') && <Lock size={11} />} {t(x.access)}</small>
              {x.id !== 'hq' && <span className="rollup"><ArrowUp size={12} /> {L('rolls up to HQ', 'fließt ins HQ')}</span>}
            </button>
          ))}
        </div>
        <div className="tree-leaves" id="ts-panel" role="tabpanel" aria-labelledby={'ts-' + sel} tabIndex="0" style={{ '--c': brand[ts.color].light }} key={ts.id}>
          {ts.dbs.map((d, i) => (
            <div className="leaf" key={i} style={{ '--i': i }}>
              <Database size={16} />
              <div>
                <strong>{t(d.name)}</strong>
                <p>{t(d.body)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}
