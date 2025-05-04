/**
 * MicrophoneIcon renders a microphone SVG icon.
 * @param className - TailwindCSS classes for sizing and color
 */
export function MicrophoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <rect x="9" y="4" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M5 11v1a7 7 0 0 0 14 0v-1" stroke="currentColor" strokeWidth="2" />
      <path d="M12 21v-3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
