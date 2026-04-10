import SearchBar from './SearchBar';

export default function HeroSection({ onSearch }) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#0e7490] text-white">
            {/* Decorative background shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-400/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-32 md:pt-24 md:pb-40">
                <div className="text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8 animate-fade-in-up">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
                        </span>
                        <span className="text-sm font-medium text-white/90">10,000+ jobs posted this week</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        Find Your{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-emerald-300">
                            Dream Job
                        </span>
                        <br className="hidden sm:block" />
                        {' '}Today
                    </h1>

                    <p className="mt-6 text-base sm:text-lg md:text-xl text-indigo-200/90 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Discover thousands of opportunities from top companies across India.
                        Your next career move starts here.
                    </p>

                    {/* Search bar */}
                    <div className="mt-10 max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <SearchBar onSearch={onSearch} />
                    </div>

                    {/* Popular searches */}
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-2 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
                        <span className="text-xs text-indigo-300">Popular:</span>
                        {['React Developer', 'Data Scientist', 'Product Manager', 'DevOps', 'UI/UX Designer'].map((term) => (
                            <span key={term} className="text-xs bg-white/10 text-white/80 px-3 py-1 rounded-full hover:bg-white/20 cursor-pointer transition-colors">
                                {term}
                            </span>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        {[
                            { value: '10K+', label: 'Active Jobs', icon: '💼' },
                            { value: '8K+', label: 'Companies', icon: '🏢' },
                            { value: '5M+', label: 'Job Seekers', icon: '👥' },
                            { value: '2M+', label: 'Placements', icon: '🎯' },
                        ].map((stat) => (
                            <div key={stat.label} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-5 hover:bg-white/15 transition-colors">
                                <div className="text-lg mb-1">{stat.icon}</div>
                                <div className="text-2xl md:text-3xl font-extrabold tracking-tight">{stat.value}</div>
                                <div className="text-xs sm:text-sm text-indigo-200 mt-1 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
                    <path d="M0 80L1440 80L1440 40C1440 40 1320 0 1080 0C840 0 600 50 360 50C120 50 0 25 0 25L0 80Z" fill="#f8fafc" />
                </svg>
            </div>
        </section>
    );
}
