/**
 * MainContent displays the greeting and suggestion buttons in the main area.
 */
export default function MainContent() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary-500 via-primary-400 to-danger-400 bg-clip-text text-transparent select-none">
        Hello, Luis
      </h1>
      <div className="flex flex-col md:flex-row gap-4">
        <button className="px-6 py-3 rounded-full bg-white border border-neutral-200 shadow-sm text-neutral-700 hover:bg-neutral-50 transition">
          Evaluate arguments
          <br className="hidden md:block" />
          <span className="text-xs text-neutral-400">for universal healthcare</span>
        </button>
        <button className="px-6 py-3 rounded-full bg-white border border-neutral-200 shadow-sm text-neutral-700 hover:bg-neutral-50 transition">
          Write a screenplay
          <br className="hidden md:block" />
          <span className="text-xs text-neutral-400">for a Chemistry 101 video</span>
        </button>
        <button className="px-6 py-3 rounded-full bg-white border border-neutral-200 shadow-sm text-neutral-700 hover:bg-neutral-50 transition">
          Debate free will
          <br className="hidden md:block" />
          <span className="text-xs text-neutral-400">in a deterministic world</span>
        </button>
      </div>
    </div>
  );
}
