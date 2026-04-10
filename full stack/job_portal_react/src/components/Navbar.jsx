import { useState } from 'react';

export default function Navbar({ onPostJob }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-lg">J</span>
                        </div>
                        <span className="text-xl font-extrabold tracking-tight">
                            <span className="text-primary">Job</span>
                            <span className="text-gray-800">Hive</span>
                        </span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#jobs" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Find Jobs</a>
                        <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Companies</a>
                        <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Services</a>
                        <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">Resources</a>
                    </div>

                    {/* CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <button className="text-sm font-medium text-gray-600 hover:text-primary transition-colors px-4 py-2">
                            Login
                        </button>
                        <button
                            onClick={onPostJob}
                            className="bg-gradient-to-r from-primary to-primary-dark text-black border text-sm font-semibold px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-primary/25 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                        >
                            Post a Job
                        </button>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden animate-slide-down bg-white border-t border-gray-100 px-4 pb-4">
                    <div className="flex flex-col gap-2 pt-2">
                        <a href="#jobs" className="text-sm font-medium text-gray-600 hover:text-primary py-2 transition-colors">Find Jobs</a>
                        <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary py-2 transition-colors">Companies</a>
                        <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary py-2 transition-colors">Services</a>
                        <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary py-2 transition-colors">Resources</a>
                        <hr className="border-gray-100" />
                        <button
                            onClick={() => { onPostJob(); setMobileOpen(false); }}
                            className="text-red-600 text-sm font-semibold px-5 py-2.5 rounded-xl w-full cursor-pointer"
                        >
                            Post a Job
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
