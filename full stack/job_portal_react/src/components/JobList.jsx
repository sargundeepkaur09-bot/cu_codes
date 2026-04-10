import JobCard from './JobCard';

export default function JobList({ jobs }) {
    return (
        <section id="jobs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                        Latest Job Openings
                    </h2>
                    <p className="text-gray-500 mt-1.5 text-sm sm:text-base">
                        Handpicked opportunities from top employers across India
                    </p>
                </div>
                <div className="bg-indigo-50 text-indigo-700 text-sm font-bold px-5 py-2.5 rounded-full border border-indigo-100">
                    {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found
                </div>
            </div>

            {/* Job Grid */}
            {jobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {jobs.map((job, index) => (
                        <div key={job.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.06}s` }}>
                            <JobCard job={job} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <div className="text-7xl mb-5">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-800">No jobs found</h3>
                    <p className="text-gray-500 mt-2 max-w-md mx-auto">
                        Try adjusting your search filters or keywords to find relevant opportunities
                    </p>
                </div>
            )}
        </section>
    );
}
