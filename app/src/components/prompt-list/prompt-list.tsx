import { useEffect, useState } from 'react';
import { config } from '../../config';

/**
 * PromptList component fetches and displays the list of prompts from the backend.
 * Uses local state and fetch. Shows loading and error states.
 * Props:
 *   onSelect: (promptName: string) => void
 *   selectedPrompt: string | null
 */
export default function PromptList({
  selectedPrompt,
  onSelect,
}: {
  selectedPrompt: string | null;
  onSelect: (name: string) => void;
}) {
  const [prompts, setPrompts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setHasError(null);
    fetch(`${config.api.baseUrl}/api/prompts`)
      .then(async res => {
        if (!res.ok) throw new Error('Failed to fetch prompts');
        const data = await res.json();
        // API returns { message: 'OK', data: { prompts: [...] } }
        setPrompts(Array.isArray(data.data.prompts) ? data.data.prompts : []);
      })
      .catch(err => {
        setHasError(err.message || 'Unknown error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleEdit = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    // Placeholder callback for edit
    alert(`Edit prompt: ${name}`);
  };

  if (isLoading) {
    return <div className="px-4 py-2 text-neutral-500">Loading prompts...</div>;
  }
  if (hasError) {
    return <div className="px-4 py-2 text-red-500">Error: {hasError}</div>;
  }
  if (!prompts.length) {
    return <div className="px-4 py-2 text-neutral-400">No prompts found.</div>;
  }

  return (
    <ul className="space-y-1">
      {prompts.map(name => (
        <li key={name}>
          <button
            className={`flex items-center w-full px-3 py-2 rounded text-neutral-700 text-left justify-between group ${selectedPrompt === name ? 'bg-primary-100 font-semibold' : 'hover:bg-neutral-200'}`}
            onClick={() => onSelect(name)}
            aria-current={selectedPrompt === name ? 'true' : undefined}
          >
            <span>{name}</span>
            <span
              className="ml-2 p-1 rounded hover:bg-neutral-300 text-neutral-500 group-hover:text-primary-500"
              onClick={e => handleEdit(e, name)}
              role="button"
              tabIndex={-1}
              aria-label={`Edit ${name}`}
            >
              {/* Simple pencil SVG icon */}
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182l-12.12 12.12a2 2 0 0 1-.878.513l-4 1a.5.5 0 0 1-.606-.606l1-4a2 2 0 0 1 .513-.878l12.12-12.12z"
                />
              </svg>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
