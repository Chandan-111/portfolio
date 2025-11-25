import React, { useState, useEffect } from 'react';

export const LoadingSpinner: React.FC = () => {
    const [frame, setFrame] = useState(0);
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

    useEffect(() => {
        const timer = setInterval(() => {
            setFrame(prev => (prev + 1) % frames.length);
        }, 80);

        return () => clearInterval(timer);
    }, []);

    return (
        <span className="text-green-400">
            {frames[frame]} <span className="text-gray-400">Processing</span>
        </span>
    );
};
