import { useState } from 'react';
import Icon from './Icon';

const INITIAL_SNIPPETS = [
  {
    id: 1,
    title: 'Resilient Fetch with Exponential Backoff',
    description: 'An elegant async utility that retries failed network calls with an increasing exponential delay to prevent server flooding.',
    code: `async function fetchWithRetry(url, retries = 3, delay = 1000) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Request failed');
    return await response.json();
  } catch (error) {
    if (retries === 0) throw error;
    console.warn(\`Retrying in \${delay}ms...\`);
    await new Promise(res => setTimeout(res, delay));
    return fetchWithRetry(url, retries - 1, delay * 2);
  }
}`,
    language: 'javascript',
    author: 'Sarah Jenkins',
    votes: 42,
    comments: 8,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80'
  },
  {
    id: 2,
    title: 'FastAPI Custom Query Profiler Middleware',
    description: 'Enables custom database timing logs on every incoming request in FastAPI, outputting diagnostics for performance analysis.',
    code: `from fastapi import Request
import time

@app.middleware("http")
async def profile_database_queries(request: Request, call_next):
    start_time = time.perf_counter()
    response = await call_next(request)
    duration = time.perf_counter() - start_time
    
    # Check queries execution metrics
    if duration > 0.5:
        print(f"Slow request detected: {request.url.path} in {duration:.4f}s")
    return response`,
    language: 'python',
    author: 'David Vance',
    votes: 38,
    comments: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80'
  },
  {
    id: 3,
    title: 'Thread-Safe Reactive Memory Cache',
    description: 'A robust state-locking configuration mapping keys to multi-threaded memory targets, optimized for low contention.',
    code: `use std::sync::{Arc, RwLock};
use std::collections::HashMap;

struct MemoryCache {
    store: Arc<RwLock<HashMap<String, Vec<u8>>>>
}

impl MemoryCache {
    fn insert(&self, key: String, data: Vec<u8>) {
        let mut writer = self.store.write().unwrap();
        writer.insert(key, data);
    }
}`,
    language: 'rust',
    author: 'Elena Rostova',
    votes: 56,
    comments: 14,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80'
  }
];

export default function SnippetShowcase({ onSelectSnippet }) {
  const [snippets, setSnippets] = useState(INITIAL_SNIPPETS);

  const handleVote = (id) => {
    setSnippets(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, votes: s.votes + 1 };
      }
      return s;
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <h2 style={{ fontSize: '32px', marginBottom: '8px' }}>
          Snippet <span className="text-gradient-purple-pink">Showcase</span>
        </h2>
        <p style={{ color: 'hsl(var(--text-secondary))' }}>
          Explore curated snippets shared by the developer squad, run custom diagnostics, or export them directly to the Code Clarifier.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '30px' }}>
        {snippets.map((snippet) => (
          <article key={snippet.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '20px' }}>
            <div>
              {/* Header profile row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <img
                  src={snippet.avatar}
                  alt={`Avatar of ${snippet.author}`}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid hsl(var(--accent-violet))' }}
                  loading="lazy"
                />
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '600' }}>{snippet.author}</h4>
                  <span style={{ fontSize: '12px', color: 'hsl(var(--text-muted))' }}>Core Contributor</span>
                </div>
                <span className="step-badge step-badge-info" style={{ marginLeft: 'auto', fontSize: '10px' }}>
                  {snippet.language.toUpperCase()}
                </span>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{snippet.title}</h3>
              <p style={{ fontSize: '14px', color: 'hsl(var(--text-secondary))', marginBottom: '16px', minHeight: '60px' }}>
                {snippet.description}
              </p>

              {/* Code Snippet Preview */}
              <div className="code-container" style={{ maxHeight: '180px', overflowY: 'hidden', padding: '12px', opacity: 0.85 }}>
                <pre style={{ margin: 0, fontSize: '12px', color: 'hsl(var(--text-muted))' }}>
                  <code>{snippet.code}</code>
                </pre>
              </div>
            </div>

            {/* Footer Interactive bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid hsl(var(--border-subtle))', paddingTop: '16px', marginTop: '10px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  onClick={() => handleVote(snippet.id)}
                  className="vote-btn"
                  aria-label={`Upvote ${snippet.title}. Current votes: ${snippet.votes}`}
                >
                  <Icon name="heart" size={14} />
                  <span>{snippet.votes}</span>
                </button>

                <span style={{ color: 'hsl(var(--text-muted))', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icon name="message" size={14} />
                  {snippet.comments} comments
                </span>
              </div>

              <button
                className="btn-secondary"
                style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px' }}
                onClick={() => onSelectSnippet(snippet)}
                aria-label={`Open ${snippet.title} in Code Clarifier`}
              >
                Open in Clarifier
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
