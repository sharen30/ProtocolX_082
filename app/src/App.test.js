import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('CatchUp AI Standalone Application', () => {
  test('renders header and initial dataset correctly', () => {
    render(<App />);
    expect(screen.getByText(/CatchUp AI/i)).toBeInTheDocument();
    expect(screen.getByText(/100% on-device chat analysis/i)).toBeInTheDocument();
  });

  test('executes local analysis on default engineering dataset', async () => {
    render(<App />);
    const runBtn = screen.getByRole('button', { name: /run analysis/i });
    fireEvent.click(runBtn);

    // findByText automatically waits for async state changes / timers
    expect(await screen.findByText(/Lines Analyzed/i)).toBeInTheDocument();
    expect(screen.getByText(/Urgent Messages/i)).toBeInTheDocument();
    expect(screen.getByText(/Decisions Made/i)).toBeInTheDocument();
  });

  test('switches dataset content when selecting Product Launch', () => {
    render(<App />);
    const productBtn = screen.getByRole('button', { name: /product launch/i });
    fireEvent.click(productBtn);

    const textarea = screen.getByLabelText(/chat transcript/i);
    expect(textarea.value).toContain('Q4 landing page designs');
  });

  test('rejects file uploads exceeding 1MB', () => {
    window.alert = jest.fn();
    render(<App />);
    
    const largeContent = new Array(1000002).join('a');
    const largeFile = new File([largeContent], 'large.txt', { type: 'text/plain' });
    const input = screen.getByLabelText(/upload transcript/i);

    fireEvent.change(input, { target: { files: [largeFile] } });
    expect(window.alert).toHaveBeenCalledWith("File size exceeds 1MB limit.");
  });
});