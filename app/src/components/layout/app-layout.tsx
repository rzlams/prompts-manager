import ChatInput from '../chat/chat-input';
import Header from '../layout/header';
import MainContent from '../main/main-content';
import Sidebar from '../sidebar/sidebar';

/**
 * AppLayout is the main wrapper for the Prompt Manager UI.
 * It includes the sidebar, header, main content, and chat input.
 */
export default function AppLayout() {
  return (
    <div className="flex flex-col h-screen bg-neutral-50 font-sans">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-center overflow-y-auto">
          <MainContent />
        </main>
      </div>
      <ChatInput />
    </div>
  );
}
