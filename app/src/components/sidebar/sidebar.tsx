import { MenuIcon } from '../icons/menu-icon';
import { PlusIcon } from '../icons/plus-icon';

/**
 * Sidebar component for the Prompt Manager UI.
 * Includes menu, navigation links, and a static prompt list.
 */
export default function Sidebar() {
  return (
    <aside className="w-64 min-w-[16rem] bg-neutral-100 border-r border-neutral-200 flex flex-col h-full hidden md:flex">
      <div className="flex items-center h-16 px-4 border-b border-neutral-200">
        <button className="p-2 rounded hover:bg-neutral-200 md:hidden" aria-label="Open menu">
          <MenuIcon className="w-6 h-6 text-neutral-600" />
        </button>
        <span className="ml-2 text-lg font-semibold text-neutral-700 hidden md:block">Menu</span>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <ul className="space-y-2">
          <li>
            <button className="flex items-center w-full px-3 py-2 rounded hover:bg-neutral-200 text-neutral-800 gap-2">
              <PlusIcon className="w-5 h-5 text-primary-500" />
              <span>New chat</span>
            </button>
          </li>
          <li>
            <button className="flex items-center w-full px-3 py-2 rounded hover:bg-neutral-200 text-neutral-800 gap-2">
              <span className="w-5 h-5 inline-block" />
              <span>Explore Gems</span>
            </button>
          </li>
        </ul>
        <div className="mt-6 text-xs text-neutral-500 uppercase px-3">Recent</div>
        <ul className="mt-2 space-y-1">
          <li>
            <button className="flex items-center w-full px-3 py-2 rounded hover:bg-neutral-200 text-neutral-700">
              Prompt Manager PRD Clarification
            </button>
          </li>
          <li>
            <button className="flex items-center w-full px-3 py-2 rounded hover:bg-neutral-200 text-neutral-700">
              Prompt Improvement for Task
            </button>
          </li>
          <li>
            <button className="flex items-center w-full px-3 py-2 rounded hover:bg-neutral-200 text-neutral-700">
              Bitbucket SSH Key Verification
            </button>
          </li>
          <li>
            <button className="flex items-center w-full px-3 py-2 rounded hover:bg-neutral-200 text-neutral-700">
              Improve AI Prompt for Code
            </button>
          </li>
          <li>
            <button className="flex items-center w-full px-3 py-2 rounded hover:bg-neutral-200 text-neutral-700">
              TypeScript Unit Testing Best Practices
            </button>
          </li>
        </ul>
        <button className="mt-2 ml-3 text-sm text-primary-500 hover:underline">Show more</button>
      </nav>
      <div className="px-4 py-3 border-t border-neutral-200 text-xs text-neutral-500">
        <div>Activity</div>
        <div>Settings &amp; help</div>
        <div className="mt-2">Madrid, Spain</div>
      </div>
    </aside>
  );
}
