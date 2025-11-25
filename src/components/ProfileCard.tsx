import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import profileImg from '../assets/profile.jpg';

const ProfileCard: React.FC = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["30deg", "-30deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-30deg", "30deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className="w-full md:w-1/3 h-[500px] flex items-center justify-center border border-green-900/30 rounded-lg relative overflow-hidden bg-black/50 perspective-1000">
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="w-72 h-[420px] bg-zinc-900 rounded-xl border border-zinc-800 relative group cursor-pointer shadow-2xl shadow-black"
            >
                <div
                    style={{ transform: "translateZ(50px)" }}
                    className="absolute inset-4 bg-black rounded-lg border border-zinc-800 overflow-hidden flex flex-col items-center pt-8"
                >
                    <div className="w-full flex justify-between px-4 mb-4">
                        <span className="text-xs text-zinc-500 font-mono ">chandan</span>
                    </div>

                    <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-zinc-800 mb-6 grayscale hover:grayscale-0 transition-all duration-500">
                        <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
                    </div>

                    <h2 className="text-xl font-bold text-white mb-1">Chandan Gowda</h2>
                    <p className="text-sm text-zinc-500">Software Engineer</p>

                    <div className="mt-auto w-full bg-zinc-900 py-3 flex justify-center border-t border-zinc-800">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <span className="text-black font-bold text-xs">C</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="absolute bottom-2 right-2 text-xs text-green-900/50 font-mono">
                [Interactive 3D Card]
            </div>
        </div>
    );
};

export default ProfileCard;
