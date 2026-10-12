import React from 'react';

export default function LevelHead({ num, kicker, title, lead, children }) {
  return (
    <header className="level-head wrap">
      <div className="level-chip">
        <span>LEVEL</span>
        <b>{num}</b>
      </div>
      <p className="eyebrow">{kicker}</p>
      <h1>
        {title[0]}
        {title[1] && (
          <>
            <br />
            <em>{title[1]}</em>
          </>
        )}
      </h1>
      {lead && <p className="level-lead">{lead}</p>}
      {children}
    </header>
  );
}
