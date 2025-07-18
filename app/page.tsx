'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat({
    maxSteps: 3,
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput('');
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div>
              <div className="font-bold">{m.role}</div>
              <div>
                {m.parts.map((part, index) => {
                  if (part.type === 'text') {
                    return <p key={index}>{part.text}</p>;
                  } else if (part.type === 'tool-addResource') {
                    return (
                      <span key={index} className="italic font-light">
                        {'calling tool: ' + part.type}
                        <p>{part.output}</p>
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}
