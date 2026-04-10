export default function JobCard({ job }) {
    const typeColors = {
        'Full-time': 'bg-emerald-50 text-emerald-700 border-emerald-200',
        'Part-time': 'bg-amber-50 text-amber-700 border-amber-200',
        'Remote': 'bg-violet-50 text-violet-700 border-violet-200',
    };

    return (
        <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/8 hover:border-indigo-200/60 transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
            {/* Card Body */}
            <div className="p-6 flex-1">
                {/* Top row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center justify-center text-2xl shadow-sm shrink-0">
                            {job.logo}
                        </div>
                        <div className="min-w-0">
                            <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-snug truncate">
                                {job.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-0.5 font-medium">{job.company}</p>
                        </div>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full border shrink-0 ${typeColors[job.type] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                        {job.type}
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
                    {job.description}
                </p>

                {/* Info chips */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {job.salary}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {job.experience}
                    </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {job.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 rounded-b-2xl">
                <span className="text-xs text-gray-400 font-medium">📅 {job.postedDate}</span>
                <button className="bg-indigo-600 text-white text-sm font-bold px-5 py-2 rounded-xl hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-500/20 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                    Apply Now →
                </button>
            </div>
        </div>
    );
}
