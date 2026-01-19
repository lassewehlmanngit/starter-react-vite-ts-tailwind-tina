import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export interface MarkdownProps {
  children: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ children }) => {
  return <ReactMarkdown rehypePlugins={[rehypeRaw]}>{children}</ReactMarkdown>;
};

