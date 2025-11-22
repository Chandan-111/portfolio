import React, { useState, useEffect } from 'react';

interface AnimatedOutputProps {
    children: React.ReactNode;
}

const AnimatedOutput: React.FC<AnimatedOutputProps> = ({ children }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    // Extract text content from children
    const extractText = (node: React.ReactNode): string => {
        if (typeof node === 'string' || typeof node === 'number') {
            return String(node);
        }
        if (React.isValidElement(node)) {
            const props = node.props as any;
            if (props && props.children) {
                return extractText(props.children);
            }
        }
        if (Array.isArray(node)) {
            return node.map(extractText).join('');
        }
        return '';
    };

    const fullText = extractText(children);

    useEffect(() => {
        if (currentIndex < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + fullText[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 20); // Typing speed in ms

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, fullText]);

    // Render with preserved structure
    const renderWithTyping = (node: React.ReactNode, textSoFar: { index: number }): React.ReactNode => {
        if (typeof node === 'string' || typeof node === 'number') {
            const text = String(node);
            const start = textSoFar.index;
            const end = start + text.length;
            textSoFar.index = end;

            return displayedText.substring(start, Math.min(end, displayedText.length));
        }

        if (React.isValidElement(node)) {
            const nodeProps = node.props as any;
            const props = { ...nodeProps };
            if (props.children) {
                props.children = renderWithTyping(props.children, textSoFar);
            }
            return React.cloneElement(node, props);
        }

        if (Array.isArray(node)) {
            return node.map((child, i) => (
                <React.Fragment key={i}>
                    {renderWithTyping(child, textSoFar)}
                </React.Fragment>
            ));
        }

        return node;
    };

    return <>{renderWithTyping(children, { index: 0 })}</>;
};

export default AnimatedOutput;
