import { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ query, location, type });
        const jobsSection = document.getElementById('jobs');
        if (jobsSection) {
            jobsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleClear = () => {
        setQuery('');
        setLocation('');
        setType('');
        onSearch({ query: '', location: '', type: '' });
    };

    const hasFilters = query || location || type;

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-2xl shadow-black/15 p-2.5 flex flex-col md:flex-row items-stretch gap-2"
        >
            {/* Keyword */}
            <div className="flex-1 flex items-center gap-3 px-4 py-3.5 rounded-xl bg-gray-50/80 border border-gray-100 focus-within:border-indigo-300 focus-within:bg-white focus-within:shadow-sm transition-all">
                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="Job title, skills, or company"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400 font-medium"
                    id="search-query-input"
                />
            </div>

            {/* Divider */}
            <div className="hidden md:flex items-center">
                <div className="w-px h-8 bg-gray-200"></div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-gray-50/80 border border-gray-100 focus-within:border-indigo-300 focus-within:bg-white focus-within:shadow-sm transition-all md:w-52">
                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm text-gray-800 appearance-none cursor-pointer font-medium"
                    id="search-location-select"
                >
                    <option value="">All Locations</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Noida">Noida</option>
                    <option value="Chennai">Chennai</option>
                </select>
            </div>

            {/* Divider */}
            <div className="hidden md:flex items-center">
                <div className="w-px h-8 bg-gray-200"></div>
            </div>

            {/* Job Type */}
            <div className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-gray-50/80 border border-gray-100 focus-within:border-indigo-300 focus-within:bg-white focus-within:shadow-sm transition-all md:w-44">
                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-transparent outline-none text-sm text-gray-800 appearance-none cursor-pointer font-medium"
                    id="search-type-select"
                >
                    <option value="">All Types</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Remote">Remote</option>
                </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="flex-1 md:flex-none bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-sm font-bold px-8 py-3.5 rounded-xl hover:from-indigo-700 hover:to-indigo-800 hover:shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                    id="search-submit-btn"
                >
                    🔍 Search
                </button>
                {hasFilters && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="px-3 py-3.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Clear filters"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
        </form>
    );
}
