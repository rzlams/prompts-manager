import { PlusIcon } from '../icons/plus-icon';
import { UserCircleIcon } from '../icons/user-circle-icon';

/**
 * Header component for the Prompt Manager UI.
 * Includes app name, search bar, action buttons, and avatar.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-6 bg-white border-b border-neutral-200 shadow-sm">
      <div className="text-xl font-semibold text-neutral-800 tracking-tight">Prompt Manager</div>
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-full max-w-md px-4 py-2 rounded-full border border-neutral-200 bg-neutral-50 text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition"
          disabled
        />
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full hover:bg-neutral-100 transition" aria-label="New Chat">
          <PlusIcon className="w-6 h-6 text-primary-500" />
        </button>
        <button className="p-2 rounded-full hover:bg-neutral-100 transition" aria-label="User Menu">
          <UserCircleIcon className="w-8 h-8 text-neutral-400" />
        </button>
      </div>
    </header>
  );
}
