import React from 'react';

export default function InsightCard({ title, icon, items, accentColor, emptyText }) {
  return (
    <article
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E9ECEF',
        borderRadius: '10px',
        padding: '1.2rem',
        borderLeft: `5px solid ${accentColor}`,
        boxShadow: '0 2px 5px rgba(0,0,0,0.03)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
        <h3 style={{ margin: 0, fontSize: '0.95rem', color: '#2B3A4A', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>{icon}</span> {title}
        </h3>
        <span style={{ fontSize: '0.75rem', fontWeight: '700', backgroundColor: '#F1F3F5', color: '#495057', padding: '0.2rem 0.6rem', borderRadius: '12px', border: '1px solid #DEE2E6' }}>
          {items.length}
        </span>
      </div>

      {items.length === 0 ? (
        <p style={{ color: '#868E96', fontSize: '0.85rem', margin: 0, fontStyle: 'italic' }}>{emptyText}</p>
      ) : (
        <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#343A40', fontSize: '0.88rem', lineHeight: '1.6' }}>
          {items.map((item, index) => (
            <li key={index} style={{ marginBottom: '0.4rem' }}>{item}</li>
          ))}
        </ul>
      )}
    </article>
  );
}