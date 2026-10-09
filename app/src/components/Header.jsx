import React from 'react';

export default function Header() {
  return (
    <header style={{ borderBottom: '1px solid #E9ECEF', marginBottom: '2rem' }}>
      <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '1.25rem 1.5rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#2B3A4A' }}>CatchUp AI</h1>
        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: '#6C757D' }}>
          100% on-device chat analysis. Nothing leaves your browser.
        </p>
      </div>
    </header>
  );
}