import React from 'react';
import { Trophy } from 'lucide-react';
import { useApp } from '../../lib/store.jsx';

export default function Toast() {
  const { toast } = useApp();
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toast && (
        <div className="toast" key={toast.body}>
          <Trophy size={20} aria-hidden="true" />
          <div>
            <strong>{toast.title}</strong>
            <span>{toast.body}</span>
          </div>
          {toast.xp ? <b>+{toast.xp} XP</b> : null}
        </div>
      )}
    </div>
  );
}
