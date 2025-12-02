import React, { useState, useRef, useEffect } from 'react';
import { useTerminal } from '../hooks/useTerminal';
import AnimatedOutput from './AnimatedOutput';

const Terminal: React.FC = () => {
  const { history, executeCommand } = useTerminal();
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const validHistory = history.filter(item => item.command.trim() !== '');
      if (validHistory.length === 0) return;

      const newIndex = historyIndex === -1 ? validHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(validHistory[newIndex].command);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const validHistory = history.filter(item => item.command.trim() !== '');
      if (validHistory.length === 0) return;

      if (historyIndex === -1) return; // Already at bottom

      const newIndex = historyIndex + 1;
      if (newIndex >= validHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(newIndex);
        setInput(validHistory[newIndex].command);
      }
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="flex-1 border border-green-900/30 rounded-lg p-4 font-mono text-sm md:text-base bg-black/80 flex flex-col overflow-hidden"
      onClick={handleContainerClick}
    >
      <div className="flex gap-4 text-green-700 mb-4 border-b border-green-900/30 pb-2 overflow-x-auto shrink-0">
        {['commands:', 'help', 'about', 'projects', 'skills', 'experience', 'contact'].map(cmd => (
          <span
            key={cmd}
            className="cursor-pointer hover:text-green-500 transition-colors"
          >
            {cmd}
          </span>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="mb-4">
          <span className="text-blue-400">chandan@portfolio:~$</span> <span className="text-green-400">welcome</span>
          <p className="mt-2 text-gray-300">Hi, I'm Chandan, a Developer & AI Enthusiast.</p>
          <p className="mt-2 text-gray-300">Welcome to my interactive AI portfolio terminal! haha!</p>
          <p className="text-gray-300">Chat with my friendly AI assistant .</p>
        </div>

        {history.map((item, index) => (
          <div key={index} className="mb-2">
            <div className="flex gap-2">
              <span className="text-blue-400 shrink-0">chandan@portfolio:~$</span>
              <span className="text-green-400">{item.command}</span>
            </div>
            {item.output && (
              <div className="mt-1">
                <AnimatedOutput>{item.output}</AnimatedOutput>
              </div>
            )}
          </div>
        ))}

        <div className="flex items-center gap-2">
          <span className="text-blue-400 shrink-0">chandan@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-green-500 flex-1 focus:ring-0 p-0"
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Terminal;
