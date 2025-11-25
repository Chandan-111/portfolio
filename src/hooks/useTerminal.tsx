import React, { useState, useCallback } from 'react';
import { commands } from '../data/commands';
import { getGeminiResponse } from '../services/ai';
import { LoadingSpinner } from '../components/LoadingSpinner';

interface TerminalHistoryItem {
    command: string;
    output: React.ReactNode;
}

export const useTerminal = () => {
    const [history, setHistory] = useState<TerminalHistoryItem[]>([]);

    const executeCommand = useCallback(async (cmd: string) => {
        const trimmedCmd = cmd.trim();

        if (!trimmedCmd) {
            setHistory(prev => [...prev, { command: '', output: null }]);
            return;
        }

        if (trimmedCmd.toLowerCase() === 'clear') {
            setHistory([]);
            return;
        }

        // Add user input to history immediately
        setHistory(prev => [...prev, { command: cmd, output: <LoadingSpinner /> }]);

        // Check if it's a direct command first (optimization)
        const lowerCmd = trimmedCmd.toLowerCase();
        if (commands[lowerCmd]) {
            setHistory(prev => {
                const newHistory = [...prev];
                newHistory[newHistory.length - 1] = {
                    command: cmd,
                    output: commands[lowerCmd].content
                };
                return newHistory;
            });
            return;
        }

        // If not a direct command, ask Gemini
        const availableCommands = Object.keys(commands);
        const aiResponse = await getGeminiResponse(trimmedCmd, availableCommands);

        // Check if the AI response is a command
        const aiCmd = aiResponse.toLowerCase();
        const commandData = commands[aiCmd];

        setHistory(prev => {
            const newHistory = [...prev];
            const lastIndex = newHistory.length - 1;

            if (commandData) {
                // AI returned a valid command
                newHistory[lastIndex] = {
                    command: cmd,
                    output: commandData.content
                };
            } else {
                // AI returned a chat message
                newHistory[lastIndex] = {
                    command: cmd,
                    output: <span className="text-gray-300 whitespace-pre-wrap">{aiResponse}</span>
                };
            }
            return newHistory;
        });
    }, []);

    return {
        history,
        executeCommand,
    };
};
