import React, { useState } from 'react';

const SAMPLE_CHAT = `[10:00 AM] Alex: Hey team, we need to finalize the launch date for Project Alpha.
[10:02 AM] Sarah: @Alex I reviewed the designs. We have 3 critical bugs remaining in auth.
[10:05 AM] David: Decision: Launch date is pushed to Friday, Oct 15th!
[10:08 AM] Alex: @David got it. ACTION: Sarah fix the auth bugs by tomorrow 5 PM.
[10:10 AM] Sarah: Urgent: Server response time spiking under heavy load. Needs immediate fix.
[10:12 AM] David: @Alex please update the client documentation before Thursday.`;

export default function App() {
  const [chatText, setChatText] = useState(SAMPLE_CHAT);
  const [analysis, setAnalysis] = useState(null);

  const analyzeLocally = () => {
    const lines = chatText.split('\n').filter(line => line.trim().length > 0);
    
    // 100% On-device client-side parsing
    const decisions = lines.filter(l => /decision|agreed|concluded|finalized/i.test(l));
    const actionItems = lines.filter(l => /action|todo|need to|task|fix|update/i.test(l));
    const urgentMessages = lines.filter(l => /urgent|critical|asap|important|immediately/i.test(l));
    const mentions = lines.filter(l => /@[a-zA-Z0-9_]+/i.test(l));

    setAnalysis({
      totalMessages: lines.length,
      decisions,
      actionItems,
      urgentMessages,
      mentions
    });
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto', color: '#1a202c' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>⚡ CatchUp AI — Local Chat Summarizer</h2>
        <span style={{ backgroundColor: '#def7ec', color: '#03543f', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
          🔒 100% On-Device Processing
        </span>
      </div>

      <p style={{ color: '#4a5568' }}>Paste your chat log below to extract action items, decisions, and urgent updates instantly without sending data to any cloud server.</p>

      <textarea
        rows={8}
        value={chatText}
        onChange={(e) => setChatText(e.target.value)}
        style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e0', fontSize: '0.95rem' }}
        placeholder="Paste chat transcript here..."
      />

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button 
          onClick={analyzeLocally}
          style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}
        >
          Summarize & Extract Insights
        </button>
        <button 
          onClick={() => setChatText(SAMPLE_CHAT)}
          style={{ backgroundColor: '#e2e8f0', color: '#2d3748', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}
        >
          Reset Sample Chat
        </button>
      </div>

      {analysis && (
        <div style={{ marginTop: '2rem', display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr 1fr' }}>
          
          <div style={{ background: '#f7fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.2rem' }}>
            <h3 style={{ marginTop: 0, color: '#dd6b20' }}>🚨 Urgent Messages ({analysis.urgentMessages.length})</h3>
            {analysis.urgentMessages.length === 0 ? <p style={{ color: '#718096' }}>No urgent items detected.</p> : (
              <ul>{analysis.urgentMessages.map((msg, i) => <li key={i}>{msg}</li>)}</ul>
            )}
          </div>

          <div style={{ background: '#f7fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.2rem' }}>
            <h3 style={{ marginTop: 0, color: '#2b6cb0' }}>📌 Decisions Made ({analysis.decisions.length})</h3>
            {analysis.decisions.length === 0 ? <p style={{ color: '#718096' }}>No decisions tagged.</p> : (
              <ul>{analysis.decisions.map((msg, i) => <li key={i}>{msg}</li>)}</ul>
            )}
          </div>

          <div style={{ background: '#f7fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.2rem' }}>
            <h3 style={{ marginTop: 0, color: '#2f855a' }}>✅ Action Items & Tasks ({analysis.actionItems.length})</h3>
            {analysis.actionItems.length === 0 ? <p style={{ color: '#718096' }}>No explicit tasks found.</p> : (
              <ul>{analysis.actionItems.map((msg, i) => <li key={i}>{msg}</li>)}</ul>
            )}
          </div>

          <div style={{ background: '#f7fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.2rem' }}>
            <h3 style={{ marginTop: 0, color: '#6b46c1' }}>👤 Mentions & Tags ({analysis.mentions.length})</h3>
            {analysis.mentions.length === 0 ? <p style={{ color: '#718096' }}>No user mentions found.</p> : (
              <ul>{analysis.mentions.map((msg, i) => <li key={i}>{msg}</li>)}</ul>
            )}
          </div>

        </div>
      )}
    </div>
  );
}