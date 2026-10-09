import React, { useState } from 'react';
import Header from './components/Header';
import ChatConsole from './components/ChatConsole';
import AnalyticsGrid from './components/AnalyticsGrid';

const DATASETS = {
  engineering: {
    name: "🚀 Engineering Incident",
    text: `[10:00 AM] Alex: @channel We have a critical auth outage in production.
[10:02 AM] Sarah: Urgent: Database connection pool exhausted. Server spiking.
[10:05 AM] David: Decision: Reverting commit #4f2a1 immediately.
[10:08 AM] Alex: ACTION: Sarah restart connection pool service by 10:30 AM.`
  },
  product: {
    name: "🎨 Product Launch",
    text: `[02:00 PM] Maya: Hey team, review the Q4 landing page designs.
[02:15 PM] Liam: Decision: Finalize design mockup B for launch.
[02:20 PM] Maya: ACTION: Liam send updated icons before Thursday.
[02:25 PM] Noah: Urgent: Payment gateway integration test failed.`
  },
  sales: {
    name: "💼 Client Sync",
    text: `[09:00 AM] Rachel: Syncing on Enterprise Deal with Acme Corp.
[09:10 AM] Mark: Decision: Agreed to 15% discount for annual commitment.
[09:15 AM] Rachel: ACTION: Send signed contract by end of day.`
  }
};

export default function App() {
  const [activeDataset, setActiveDataset] = useState('engineering');
  const [chatText, setChatText] = useState(DATASETS.engineering.text);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const selectDataset = (key) => {
    setActiveDataset(key);
    setChatText(DATASETS[key].text);
    setAnalysis(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1000000) {
        alert("File size exceeds 1MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setActiveDataset('custom');
        setChatText(event.target.result);
        setAnalysis(null);
      };
      reader.readAsText(file);
    }
  };

  const analyzeLocally = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
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

  return (
    <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', color: '#212529', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Header />
      <main style={{ maxWidth: '1150px', margin: '0 auto', padding: '0 1.5rem 2rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <ChatConsole 
            activeDataset={activeDataset} 
            analyzeLocally={analyzeLocally} 
            chatText={chatText} 
            datasets={DATASETS} 
            handleFileUpload={handleFileUpload} 
            isAnalyzing={isAnalyzing} 
            selectDataset={selectDataset} 
            setChatText={setChatText}
          />
          {analysis ? (
            <AnalyticsGrid analysis={analysis} />
          ) : (
            <div style={{ backgroundColor: '#FFFFFF', border: '2px dashed #CED4DA', borderRadius: '12px', padding: '3rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📊</span>
              <h3 style={{ color: '#2B3A4A', margin: '0 0 0.5rem 0' }}>Dashboard Ready</h3>
              <p style={{ color: '#6C757D', fontSize: '0.9rem', maxWidth: '300px', margin: 0 }}>
                Select a dataset or upload your own .txt transcript, then click Run Analysis Dashboard.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}