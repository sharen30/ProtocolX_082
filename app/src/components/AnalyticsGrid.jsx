import React from 'react';
import InsightCard from './InsightCard';

export default function AnalyticsGrid({ analysis }) {
  if (!analysis) return null;

  return (
    <section aria-label="Summary Results" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem' }}>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E9ECEF', borderRadius: '10px', padding: '0.9rem', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '0.7rem', color: '#6C757D', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }}>Lines Analyzed</span>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#2B3A4A', marginTop: '0.1rem' }}>{analysis.totalMessages}</div>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E9ECEF', borderRadius: '10px', padding: '0.9rem', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '0.7rem', color: '#6C757D', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }}>Action Items</span>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#2A9D8F', marginTop: '0.1rem' }}>{analysis.actionItems.length}</div>
        </div>
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E9ECEF', borderRadius: '10px', padding: '0.9rem', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '0.7rem', color: '#6C757D', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }}>Urgent Items</span>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#E76F51', marginTop: '0.1rem' }}>{analysis.urgentMessages.length}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
        <InsightCard title="Urgent Messages" icon="🚨" items={analysis.urgentMessages} accentColor="#E76F51" emptyText="No urgent items detected." />
        <InsightCard title="Decisions Made" icon="📌" items={analysis.decisions} accentColor="#457B9D" emptyText="No decisions tagged." />
        <InsightCard title="Action Items & Tasks" icon="✅" items={analysis.actionItems} accentColor="#2A9D8F" emptyText="No explicit tasks found." />
        <InsightCard title="User Mentions" icon="👤" items={analysis.mentions} accentColor="#9C89B8" emptyText="No user mentions found." />
      </div>
    </section>
  );
}