import { useState } from 'react';
import ChatInput from '../chat/chat-input';
import Header from '../layout/header';
import MainContent from '../main/main-content';
import Sidebar from '../sidebar/sidebar';

/**
 * AppLayout is the main wrapper for the Prompt Manager UI.
 * It includes the sidebar, header, main content, and chat input.
 */
export default function AppLayout() {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-screen bg-neutral-50 font-sans">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar selectedPrompt={selectedPrompt} onSelect={setSelectedPrompt} />
        <main className="flex-1 flex flex-col min-h-0 overflow-y-auto items-center">
          <MainContent selectedPromptName={selectedPrompt} />
        </main>
      </div>
      <ChatInput />
    </div>
  );
}
