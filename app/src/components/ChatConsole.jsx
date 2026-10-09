import React from 'react';

export default function ChatConsole({
  activeDataset,
  analyzeLocally,
  chatText,
  datasets,
  handleFileUpload,
  isAnalyzing,
  selectDataset,
  setChatText
}) {
  return (
    <section 
      aria-label="Chat console" 
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E9ECEF',
        borderRadius: '10px',
        padding: '1.2rem',
        boxShadow: '0 2px 5px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}
    >
      <div role="group" aria-label="Sample datasets" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {Object.keys(datasets).map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={activeDataset === key}
            onClick={() => selectDataset(key)}
            style={{
              padding: '0.5rem 0.9rem',
              borderRadius: '6px',
              border: activeDataset === key ? 'none' : '1px solid #E9ECEF',
              backgroundColor: activeDataset === key ? '#2B3A4A' : '#FFFFFF',
              color: activeDataset === key ? '#FFFFFF' : '#2B3A4A',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            {datasets[key].name}
          </button>
        ))}
      </div>

      <label htmlFor="transcript" style={{ fontWeight: '600', fontSize: '0.9rem' }}>
        Chat transcript
      </label>
      <textarea
        id="transcript"
        rows="12"
        value={chatText}
        onChange={(e) => setChatText(e.target.value)}
        spellCheck="false"
        style={{
          border: '1px solid #E9ECEF',
          borderRadius: '6px',
          padding: '0.75rem',
          fontFamily: 'monospace',
          fontSize: '0.85rem',
          resize: 'vertical',
          backgroundColor: '#F8F9FA'
        }}
      />

      <label htmlFor="upload" style={{ fontWeight: '600', fontSize: '0.9rem' }}>
        Upload transcript (.txt, max 1 MB)
      </label>
      <input
        id="upload"
        type="file"
        accept=".txt,text/plain"
        onChange={handleFileUpload}
        style={{ fontSize: '0.85rem' }}
      />

      <button
        type="button"
        onClick={analyzeLocally}
        disabled={isAnalyzing}
        style={{
          padding: '0.75rem 1rem',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: '#2B3A4A',
          color: '#FFFFFF',
          cursor: 'pointer',
          fontSize: '0.95rem',
          opacity: isAnalyzing ? 0.7 : 1
        }}
      >
        {isAnalyzing ? 'Analyzing...' : 'Run Analysis Dashboard'}
      </button>
    </section>
  );
}