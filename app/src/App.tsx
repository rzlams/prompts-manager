import { useState } from 'react';

interface Prompt {
  name: string;
  description: string;
  tags: string[];
}

export default function App() {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 flex flex-col flex-shrink-0 bg-white border-r border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search prompts..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">{/* Prompt list will go here */}</div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {selectedPrompt ? (
                <div>{/* Selected prompt content will go here */}</div>
              ) : (
                <div className="text-center text-gray-500">Select a prompt to view its content</div>
              )}
            </div>
          </div>
        </main>
        {/* Chat input box placeholder */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <input
            type="text"
            placeholder="Chat input placeholder (non-functional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            disabled
          />
        </div>
      </div>
    </div>
  );
}
