import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaJava, FaHtml5, FaCss3 } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiNextdotjs, SiPostgresql, SiCplusplus, SiC } from 'react-icons/si';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
};

export const SkillsList: React.FC = () => {
    const skills = [
        {
            category: "Frontend",
            items: [
                { name: "React", icon: <FaReact className="text-blue-400" /> },
                { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
                { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400" /> },
                { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
                { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
                { name: "CSS", icon: <FaCss3 className="text-blue-500" /> },
            ]
        },
        {
            category: "Backend",
            items: [
                { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
                { name: "Python", icon: <FaPython className="text-blue-300" /> },
            ]
        },
        {
            category: "Database",
            items: [
                { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" /> },
            ]
        },
        {
            category: "Tools",
            items: [
                { name: "Git", icon: <FaGitAlt className="text-red-500" /> },
            ]
        },
        {
            category: "Languages",
            items: [
                { name: "C++", icon: <SiCplusplus className="text-blue-600" /> },
                { name: "C", icon: <SiC className="text-blue-500" /> },
                { name: "Java", icon: <FaJava className="text-red-600" /> },
                { name: "Python", icon: <FaPython className="text-blue-300" /> },
            ]
        }
    ];

    return (
        <div className="text-gray-300">
            <p className="mb-4 text-green-400 font-bold">Technical Skills:</p>

            {skills.map((section, idx) => (
                <motion.div
                    key={idx}
                    className="mb-4"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <p className="text-sm text-gray-400 mb-2">{section.category}</p>
                    <div className="flex flex-wrap gap-4">
                        {section.items.map((skill, sIdx) => (
                            <motion.div
                                key={sIdx}
                                variants={item}
                                className="flex items-center gap-2"
                            >
                                {skill.icon} {skill.name}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
