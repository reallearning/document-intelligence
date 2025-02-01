import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Image from 'next/image';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkHtml from 'remark-html';
import 'katex/dist/katex.min.css';
import katex from 'katex';

const CustomMarkdown = ({ children, applyStyles = true }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const components = {
    h1: ({ children, ...props }) => (
      <h1
        id={`heading-${props.node.position.start.line}`}
        style={{
          display: 'block',
          fontSize: '2em',
          fontFamily: 'Nunito',
          marginLeft: '0',
          marginRight: '0',
          fontWeight: 'bold',
        }}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        id={`heading-${props.node.position.start.line}`}
        style={{
          display: 'block',
          fontSize: '1.5em',
          fontFamily: 'Nunito',
          marginLeft: '0',
          marginRight: '0',
          fontWeight: 'bold',
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        id={`heading-${props.node.position.start.line}`}
        style={{
          display: 'block',
          fontSize: '1.17em',
          fontFamily: 'Nunito',
          marginLeft: '0',
          marginRight: '0',
          fontWeight: 'bold',
        }}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4
        id={`heading-${props.node.position.start.line}`}
        style={{
          display: 'block',
          fontFamily: 'Nunito',
          marginLeft: '0',
          marginRight: '0',
          fontWeight: 'bold',
        }}
      >
        {children}
      </h4>
    ),
    h5: ({ children, ...props }) => (
      <h5
        id={`heading-${props.node.position.start.line}`}
        style={{
          display: 'block',
          fontSize: '0.83em',
          fontFamily: 'Nunito',
          marginLeft: '0',
          marginRight: '0',
          fontWeight: 'bold',
        }}
      >
        {children}
      </h5>
    ),
    h6: ({ children, ...props }) => (
      <h6
        id={`heading-${props.node.position.start.line}`}
        style={{
          display: 'block',
          fontSize: '0.67em',
          fontFamily: 'Nunito',
          marginLeft: '0',
          marginRight: '0',
          fontWeight: 'bold',
        }}
      >
        {children}
      </h6>
    ),

    a: ({ href, children }) => {
      const isYouTubeLink =
        href.includes('youtube.com') || href.includes('youtu.be');

      const cleanChildren = Array.isArray(children)
        ? children.map((child) =>
            typeof child === 'string' ? child.replace(/,/g, '') : child,
          )
        : typeof children === 'string'
          ? children.replace(/,/g, '')
          : children;

      return (
        <a
          href={href}
          style={{
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'Nunito',
          }}
        >
          {isYouTubeLink && (
            <Image
              src="/youtube.svg"
              alt="youtubeIcon"
              width={40}
              height={40}
            />
          )}
          {cleanChildren}
        </a>
      );
    },
    code: ({ node, inline, className, children, ...props }) => {
      if (!applyStyles) {
        return <code>{children}</code>;
      }

      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : 'plaintext';
      return !inline && match ? (
        <div style={{ marginBottom: '1em' }}>
          <CopyToClipboard
            text={String(children).replace(/\n$/, '')}
            onCopy={() => setCopiedIndex(node.position.start.line)}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#f5f5f5',
                padding: '0.3em',
                borderTopLeftRadius: '4px',
                borderTopRightRadius: '4px',
              }}
            >
              <span
                style={{
                  color: '#333',
                  padding: '0.3em',
                  fontSize: '0.8em',
                }}
              >
                {language}
              </span>
              <span
                style={{
                  color:
                    copiedIndex === node.position.start.line
                      ? '#0D5244'
                      : '#000',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.8em',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-clipboard"
                  viewBox="0 0 16 16"
                  style={{ marginRight: '0.2em' }}
                >
                  <path d="M10 1.5v1h-4v-1a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5z" />
                  <path d="M9.5 0a1.5 1.5 0 0 1 1.415 1H14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3.085A1.5 1.5 0 0 1 6.5 0h3zM14 4H2v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V4z" />
                </svg>
                {copiedIndex === node.position.start.line ? 'Copied!' : 'Copy'}
              </span>
            </div>
          </CopyToClipboard>
          <SyntaxHighlighter
            style={atomDark}
            language={language}
            PreTag="div"
            {...props}
            customStyle={{
              fontSize: '14px',
              marginTop: '0',
              borderBottomLeftRadius: '4px',
              borderBottomRightRadius: '4px',
            }}
            showLineNumbers={true}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code
          {...props}
          style={{
            backgroundColor: '#f3f3f3',
            padding: '0.2rem',
            borderRadius: '4px',
            fontSize: '0.8em',
            fontFamily: 'Nunito',
          }}
        >
          {children}
        </code>
      );
    },
    ul: ({ children }) => (
      <ul
        style={
          applyStyles
            ? {
                display: 'block',
                fontFamily: 'Nunito',
                listStyleType: 'disc',
                margin: '0em 0px 8px',
                paddingLeft: '20px',
              }
            : {}
        }
      >
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol
        style={
          applyStyles
            ? {
                display: 'block',
                listStyleType: 'decimal',
                marginTop: '1em',
                marginBottom: '1em',
                marginLeft: '0',
                marginRight: '0',
                paddingLeft: '20px',
                fontFamily: 'Nunito',
              }
            : {}
        }
      >
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li
        style={
          applyStyles
            ? {
                display: 'list-item',
                marginTop: '0.5em',
                marginBottom: '0.5em',
                marginLeft: '0',
                marginRight: '0',
                paddingLeft: '0',
                fontFamily: 'Nunito',
              }
            : {}
        }
      >
        {children}
      </li>
    ),
    p: ({ children }) => (
      <p
        style={
          applyStyles
            ? {
                display: 'block',
                marginTop: '1em',
                margin: '0em 0px 8px',
                fontFamily: 'Nunito',
                lineHeight: '1.5',
              }
            : {}
        }
      >
        {children}
      </p>
    ),
    strong: ({ children }) => (
      <strong style={{ fontWeight: 'bold' }}>{children}</strong>
    ),
    em: ({ children }) => <em style={{ fontStyle: 'italic' }}>{children}</em>,
    blockquote: ({ children }) => (
      <blockquote style={{ borderLeft: '5px solid #ccc', paddingLeft: '10px' }}>
        {children}
      </blockquote>
    ),
    hr: () => <hr style={{ borderTop: '2px solid #aaa' }} />,
    table: ({ children }) => (
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          {children}
        </table>
      </div>
    ),
    tr: ({ children }) => <tr>{children}</tr>,
    td: ({ children }) => (
      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{children}</td>
    ),
    th: ({ children }) => (
      <th
        style={{ border: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }}
      >
        {children}
      </th>
    ),
    inlineMath: ({ value }) => (
      <span
        style={{
          display: 'inline-block',
          background: '#f3f3f3',
          padding: '2px 4px',
          borderRadius: '4px',
        }}
        dangerouslySetInnerHTML={{
          __html: katex.renderToString(String(value)),
        }}
      />
    ),
    math: ({ value }) => (
      <div
        style={{
          display: 'block',
          background: '#f9f9f9',
          borderRadius: '4px',
          padding: '10px',
          marginBottom: '1em',
          overflowX: 'auto',
        }}
        dangerouslySetInnerHTML={{
          __html: katex.renderToString(String(value), { displayMode: true }),
        }}
      />
    ),
  };

  function addLineBreaks(inputString) {
    if (!inputString) return '';

    const stringWithBreaks = inputString
      .replace(/\\n/g, '\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/\n/g, '\n');

    return stringWithBreaks;
  }

  function isMarkdown(inputString) {
    const markdownPattern = /[#_*~`$]/;
    const orderedListPattern = /^\d+\.\s/;
    return (
      markdownPattern.test(inputString) && !orderedListPattern.test(inputString)
    );
  }

  const childString = Array.isArray(children)
    ? children.join('')
    : typeof children === 'string'
      ? children
      : '';

  const processedChildren = addLineBreaks(childString);

  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={[remarkGfm, remarkMath, remarkHtml]}
      rehypePlugins={[rehypeSlug, rehypeKatex]}
    >
      {processedChildren}
    </ReactMarkdown>
  );
};

export default CustomMarkdown;
