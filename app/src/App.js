import React, { useState } from 'react';

const SAMPLES = {
  engineering: `[10:00 AM] Alex: @channel We have a critical auth outage in production.
[10:02 AM] Sarah: Urgent: Database connection pool exhausted. Server spiking.
[10:05 AM] David: Decision: Reverting commit #4f2a1 immediately.
[10:08 AM] Alex: ACTION: Sarah restart connection pool service by 10:30 AM.`,
  product: `[02:00 PM] Maya: Hey team, review the Q4 landing page designs.
[02:15 PM] Liam: Decision: Finalize design mockup B for launch.
[02:20 PM] Maya: ACTION: Liam send updated icons before Thursday.
[02:25 PM] Noah: Urgent: Payment gateway integration test failed.`,
  client: `[09:00 AM] Rachel: Syncing on Enterprise Deal with Acme Corp.
[09:10 AM] Mark: Decision: Agreed to 15% discount for annual commitment.
[09:15 AM] Rachel: ACTION: Send signed contract by end of day.`
};

export default function App() {
  const [chatText, setChatText] = useState(SAMPLES.engineering);
  const [activeDataset, setActiveDataset] = useState('engineering');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleDatasetChange = (key) => {
    setActiveDataset(key);
    setChatText(SAMPLES[key]);
    setAnalysis(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      alert("File size exceeds 1MB limit.");
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setChatText(event.target.result);
      setActiveDataset('custom');
      setAnalysis(null);
    };
    reader.readAsText(file);
  };

  const analyzeLocally = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      // eslint-disable-next-line no-control-regex
      const sanitized = chatText.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
      const lines = sanitized.split('\n').filter(line => line.trim().length > 0);

      const decisions = lines.filter(l => /decision|agreed|concluded|finalized/i.test(l));
      const actionItems = lines.filter(l => /action|todo|need to|task|fix|update|send/i.test(l));
      const urgentMessages = lines.filter(l => /urgent|critical|outage|failed|spiking/i.test(l));
      const mentions = lines.filter(l => /(?:^|\s)@[a-zA-Z0-9_]+/i.test(l));

      setAnalysis({
        totalMessages: lines.length,
        decisions,
        actionItems,
        urgentMessages,
        mentions
      });
      setIsAnalyzing(false);
    }, 150);
  };

  const theme = {
    bg: '#37353E',
    panel: '#44444E',
    accent: '#715A5A',
    text: '#D3DAD9',
    mutedText: '#A0AAB0',
    border: '#585663'
  };

  const renderMetricCard = (title, items) => (
    <article
      style={{
        backgroundColor: theme.panel,
        border: `1px solid ${theme.border}`,
        borderRadius: '6px',
        padding: '1.25rem',
        marginBottom: '1rem'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.75rem',
          borderBottom: `1px solid ${theme.border}`,
          paddingBottom: '0.5rem'
        }}
      >
        <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: theme.text }}>
          {title}
        </h3>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            backgroundColor: theme.bg,
            border: `1px solid ${theme.border}`,
            color: theme.text,
            padding: '0.15rem 0.55rem',
            borderRadius: '4px'
          }}
        >
          {items.length}
        </span>
      </div>
      {items.length === 0 ? (
        <p style={{ margin: 0, fontSize: '0.85rem', color: theme.mutedText, fontStyle: 'italic' }}>
          No entries detected.
        </p>
      ) : (
        <ul style={{ margin: 0, paddingLeft: '1.2rem', color: theme.text, fontSize: '0.875rem', lineHeight: '1.6' }}>
          {items.map((item, idx) => (
            <li key={idx} style={{ marginBottom: '0.35rem' }}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </article>
  );

  return (
    <div
      style={{
        backgroundColor: theme.bg,
        minHeight: '100vh',
        color: theme.text,
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        paddingBottom: '3rem'
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: `1px solid ${theme.border}`,
          backgroundColor: theme.panel,
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem'
        }}
      >
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <h1 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 700, color: theme.text, letterSpacing: '-0.01em' }}>
            CatchUp AI
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: theme.mutedText }}>
            100% on-device chat analysis. Nothing leaves your browser.
          </p>
        </div>
      </header>

      {/* Main Container - Stacked Vertical Layout */}
      <main style={{ maxWidth: '840px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Top Panel: Console / Inputs */}
          <section
            aria-label="Chat console"
            style={{
              backgroundColor: theme.panel,
              border: `1px solid ${theme.border}`,
              borderRadius: '6px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            {/* Dataset Selector Buttons */}
            <div>
              <span style={{ display: 'block', fontSize: '0.8rem', color: theme.mutedText, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Preset Transcripts
              </span>
              <div role="group" aria-label="Sample datasets" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {[
                  { key: 'engineering', label: 'Engineering Incident' },
                  { key: 'product', label: 'Product Launch' },
                  { key: 'client', label: 'Client Sync' }
                ].map(({ key, label }) => {
                  const isActive = activeDataset === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => handleDatasetChange(key)}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '4px',
                        border: `1px solid ${isActive ? theme.text : theme.border}`,
                        backgroundColor: isActive ? theme.accent : theme.bg,
                        color: theme.text,
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        transition: 'background-color 0.15s ease'
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Textarea */}
            <div>
              <label htmlFor="transcript" style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: theme.text, marginBottom: '0.4rem' }}>
                Chat transcript
              </label>
              <textarea
                id="transcript"
                rows={10}
                value={chatText}
                onChange={(e) => {
                  setChatText(e.target.value);
                  setAnalysis(null);
                }}
                spellCheck={false}
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  border: `1px solid ${theme.border}`,
                  borderRadius: '4px',
                  padding: '0.75rem',
                  fontFamily: 'monospace',
                  fontSize: '0.825rem',
                  lineHeight: '1.45',
                  resize: 'vertical',
                  backgroundColor: theme.bg,
                  color: theme.text
                }}
              />
            </div>

            {/* File Upload */}
            <div>
              <label htmlFor="upload" style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: theme.text, marginBottom: '0.4rem' }}>
                Upload transcript (.txt, max 1 MB)
              </label>
              <div
                style={{
                  border: `1px dashed ${theme.border}`,
                  borderRadius: '4px',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: theme.bg
                }}
              >
                <input
                  id="upload"
                  type="file"
                  accept=".txt,text/plain"
                  onChange={handleFileUpload}
                  style={{ fontSize: '0.825rem', color: theme.text, width: '100%', cursor: 'pointer' }}
                />
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={analyzeLocally}
              disabled={isAnalyzing}
              style={{
                padding: '0.75rem 1.25rem',
                borderRadius: '4px',
                border: `1px solid #856a6a`,
                backgroundColor: theme.accent,
                color: '#FFFFFF',
                cursor: isAnalyzing ? 'default' : 'pointer',
                fontSize: '0.9rem',
                fontWeight: 600,
                opacity: isAnalyzing ? 0.7 : 1,
                width: '100%',
                transition: 'opacity 0.15s ease'
              }}
            >
              {isAnalyzing ? 'Analyzing transcript...' : 'Run Analysis Dashboard'}
            </button>
          </section>

          {/* Bottom Panel: Analysis Results */}
          <section
            aria-label="Analysis dashboard"
            style={{
              backgroundColor: theme.panel,
              border: `1px solid ${theme.border}`,
              borderRadius: '6px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {!analysis ? (
              <div
                style={{
                  border: `1px dashed ${theme.border}`,
                  borderRadius: '6px',
                  padding: '2.5rem 1.5rem',
                  textAlign: 'center',
                  backgroundColor: theme.bg
                }}
              >
                <h3 style={{ color: theme.text, margin: '0 0 0.4rem 0', fontSize: '1rem', fontWeight: 600 }}>
                  Dashboard Ready
                </h3>
                <p style={{ color: theme.mutedText, fontSize: '0.85rem', maxWidth: '380px', margin: '0 auto' }}>
                  Select a preset dataset or load a custom .txt file, then trigger the analysis engine.
                </p>
              </div>
            ) : (
              <div>
                {/* Summary Stat */}
                <div
                  style={{
                    backgroundColor: theme.bg,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '6px',
                    padding: '0.85rem 1.25rem',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: theme.mutedText, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Lines Analyzed
                  </span>
                  <span style={{ fontSize: '1.35rem', fontWeight: 700, color: theme.text }}>
                    {analysis.totalMessages}
                  </span>
                </div>

                {/* Categorized Metric Sections */}
                {renderMetricCard('Urgent Messages', analysis.urgentMessages)}
                {renderMetricCard('Decisions Made', analysis.decisions)}
                {renderMetricCard('Action Items', analysis.actionItems)}
                {renderMetricCard('Mentions', analysis.mentions)}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}