import { MicrophoneIcon } from '../icons/microphone-icon';
import { PlusIcon } from '../icons/plus-icon';

/**
 * ChatInput is a styled, non-functional chat input box fixed at the bottom.
 */
export default function ChatInput() {
  return (
    <div className="w-full px-4 py-6 bg-white border-t border-neutral-200 flex items-center justify-center">
      <div className="flex items-center w-full max-w-2xl bg-neutral-50 border border-neutral-200 rounded-full shadow-sm px-4 py-2">
        <button className="p-2 rounded-full hover:bg-neutral-100 transition" aria-label="Add">
          <PlusIcon className="w-5 h-5 text-primary-500" />
        </button>
        <input
          type="text"
          className="flex-1 bg-transparent px-4 py-2 outline-none text-neutral-700 placeholder-neutral-400"
          placeholder="Ask Gemini"
          disabled
        />
        <button className="p-2 rounded-full hover:bg-neutral-100 transition" aria-label="Voice input">
          <MicrophoneIcon className="w-5 h-5 text-primary-500" />
        </button>
      </div>
    </div>
  );
}
