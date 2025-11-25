import React from 'react';
import { SkillsList } from '../components/SkillsList';

export interface CommandResponse {
    type: 'text' | 'component';
    content: React.ReactNode;
}

export const commands: Record<string, CommandResponse> = {
    help: {
        type: 'text',
        content: (
            <div className="text-gray-300">
                <p className="mb-2">Available commands:</p>
                <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-green-400">about</span>
                    <span>Who am I?</span>
                    <span className="text-green-400">projects</span>
                    <span>View my work</span>
                    <span className="text-green-400">skills</span>
                    <span>Technical stack</span>
                    <span className="text-green-400">experience</span>
                    <span>My career path</span>
                    <span className="text-green-400">contact</span>
                    <span>Get in touch</span>
                    <span className="text-green-400">clear</span>
                    <span>Clear terminal</span>
                </div>
            </div>
        ),
    },
    about: {
        type: 'text',
        content: (
            <div className="text-gray-300">
                <p>Hi, I'm Chandan!</p>
                <p className="mt-2">
                    Enthusiastic Full Stack Developer with hands-on experience in building responsive web applications using HTML, CSS, JavaScript,
                    React, Node.js, and MySQL. Skilled in developing both front-end interfaces and backend APIs, with a focus on clean code, scalability,
                    and user experience. Eager to learn emerging technologies and contribute to innovative software projects                </p>
            </div>
        ),
    },
    skills: {
        type: 'component',
        content: <SkillsList />,
    },
    contact: {
        type: 'text',
        content: (
            <div className="text-gray-300">
                <p>Email: <a href="mailto:chandangowdaks123@gmail.com" className="text-blue-400 hover:underline">chandangowdaks123@gmail.com</a></p>
                <p>GitHub: <a href="https://github.com/Chandan-111" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">github.com/Chandan-111</a></p>
                <p>LinkedIn: <a href="https://in.linkedin.com/in/chandan-gowda-516652229" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">linkedin.com/in/chandan-gowda-516652229</a></p>
            </div>
        ),
    },
    projects: {
        type: 'text',
        content: (
            <div className="text-gray-300">
                <p className="mb-2">Recent Projects:</p>
                <div className="space-y-4">
                    <div>
                        <p className="text-green-400 font-bold">Terminal Portfolio</p>
                        <p className="text-sm">A React-based portfolio website mimicking a Linux terminal with interactive 3D elements.</p>
                        <p className="text-xs text-gray-500">Tech: React, Tailwind, Framer Motion</p>
                    </div>
                    <div>
                        <p className="text-green-400 font-bold">CKD disease predictor</p>
                        <p className="text-sm">A GENERIC REAL TIME APPLICATION FOR CKD AND ITS STAGES PREDICATION</p>
                        <p className="text-xs text-gray-500">Tech: C#</p>
                    </div>
                    <div>
                        <p className="text-green-400 font-bold">Full Stack AI interview mocker</p>
                        <p className="text-sm">Created a web-based platform to help users practice and prepare for interviews.</p>
                        <p className="text-xs text-gray-500">Tech: Node.js, React, PostgreSQL</p>
                    </div>
                    <div>
                        <p className="text-green-400 font-bold">Code helper</p>
                        <p className="text-sm">• Used to give code suggestions and fix linter errors automatically.</p>
                        <p className="text-xs text-gray-500">Tech: HTML,javascript,CSS</p>
                    </div>
                </div>
            </div>
        ),
    },
    experience: {
        type: 'text',
        content: (
            <div className="text-gray-300">
                <p className="mb-2"> Have a hands on experience in building responsive web applications ,both front-end interfaces and backend APIs, with a focus on clean code, scalability,
                    and user experience. Eager to learn emerging technologies and contribute to innovative software projects .</p>
            </div>
        ),
    },
};
