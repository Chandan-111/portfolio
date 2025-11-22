import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-black text-green-500 font-mono p-4 md:p-8 flex flex-col">
            <header className="mb-8">
                <h1 className="text-2xl font-bold">Chandan Gowda</h1>
                <p className="text-sm opacity-80">Software Engineer</p>
            </header>

            <main className="flex-1 flex flex-col md:flex-row gap-4 border-t border-green-900/50 pt-4">
                {children}
            </main>

            <footer className="mt-8 text-xs text-green-900 flex justify-between">
                <span>chandan@portfolio:~$</span>
                <span>{new Date().toLocaleDateString()}</span>
            </footer>
        </div>
    );
};

export default Layout;
