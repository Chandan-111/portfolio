import React, { useState, useCallback } from 'react';
import { commands } from '../data/commands';

interface TerminalHistoryItem {
    command: string;
    output: React.ReactNode;
}

export const useTerminal = () => {
    const [history, setHistory] = useState<TerminalHistoryItem[]>([]);

    const executeCommand = useCallback((cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();

        if (!trimmedCmd) {
            setHistory(prev => [...prev, { command: '', output: null }]);
            return;
        }

        if (trimmedCmd === 'clear') {
            setHistory([]);
            return;
        }

        const commandData = commands[trimmedCmd];

        if (commandData) {
            setHistory(prev => [...prev, { command: cmd, output: commandData.content }]);
        } else {
            setHistory(prev => [...prev, {
                command: cmd,
                output: <span className="text-red-400"> Command not found: { cmd }.Type 'help' for available commands.</span>
            }]);
        }
    }, []);

    return {
        history,
        executeCommand,
    };
};
