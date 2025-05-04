import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { config } from '../../config';

interface MainContentProps {
  selectedPromptName: string | null;
}

// Escape all triple backticks in the content
function escapeTripleBackticks(text: string): string {
  // Replace all occurrences of ``` with \`\`\`
  return text.replace(/```/g, '\u0060\u0060\u0060');
}

/**
 * MainContent displays the selected prompt's content in the main area.
 * If no prompt is selected, shows a placeholder message.
 */
export default function MainContent({ selectedPromptName }: MainContentProps) {
  const [content, setContent] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedPromptName) {
      setContent('');
      setDescription('');
      setTags([]);
      setIsLoading(false);
      setHasError(null);
      return;
    }
    setIsLoading(true);
    setHasError(null);
    fetch(`${config.api.baseUrl}/api/prompts/${selectedPromptName}`)
      .then(async res => {
        if (!res.ok) throw new Error('Failed to fetch prompt content');
        const data = await res.json();
        setContent(data.data.content || '');
        setDescription(data.data.metadata?.description || '');
        setTags(data.data.metadata?.tags || []);
      })
      .catch(err => {
        setHasError(err.message || 'Unknown error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedPromptName]);

  // Escape all triple backticks in the content
  const escapedContent = escapeTripleBackticks(content);

  if (!selectedPromptName) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full text-neutral-400 select-none">
        <span className="text-2xl mb-2">Select a prompt from the sidebar</span>
        <span className="text-base">Prompt content will appear here.</span>
      </div>
    );
  }
  if (isLoading) {
    return <div className="flex items-center justify-center w-full h-full text-neutral-500">Loading prompt...</div>;
  }
  if (hasError) {
    return <div className="flex items-center justify-center w-full h-full text-red-500">Error: {hasError}</div>;
  }

  return (
    <div className="flex flex-col w-full mx-auto p-6">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <h2 className="text-2xl font-bold text-neutral-800 mr-2">{selectedPromptName}</h2>
        {tags.map(tag => (
          <span
            key={tag}
            className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-2 py-1 rounded mr-1 border border-primary-200"
          >
            #{tag}
          </span>
        ))}
      </div>
      {description && <p className="mb-4 text-neutral-600">{description}</p>}
      <div className="prose prose-neutral max-w-none bg-white rounded shadow p-4">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children, ...props }) {
              const match = /```(\w+)/g.exec(content);
              console.log(match?.[1]);
              return match ? (
                <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {escapedContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}
