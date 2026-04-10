import { useState } from 'react';

const initialForm = {
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    experience: '',
    description: '',
    tags: '',
};

export default function AddJobModal({ isOpen, onClose, onAddJob }) {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!form.title.trim()) newErrors.title = 'Job title is required';
        if (!form.company.trim()) newErrors.company = 'Company is required';
        if (!form.location.trim()) newErrors.location = 'Location is required';
        if (!form.salary.trim()) newErrors.salary = 'Salary is required';
        if (!form.experience.trim()) newErrors.experience = 'Experience is required';
        if (!form.description.trim()) newErrors.description = 'Description is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const logos = ['🔵', '🟠', '🟡', '🟢', '🟤', '🔴', '🟣', '⚪', '🔷', '🛡️'];
        const newJob = {
            id: Date.now(),
            ...form,
            tags: form.tags
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean),
            postedDate: 'Just now',
            logo: logos[Math.floor(Math.random() * logos.length)],
        };

        onAddJob(newJob);
        setForm(initialForm);
        setErrors({});
        onClose();
    };

    const inputClass = (field) =>
        `w-full bg-gray-50 border ${errors[field] ? 'border-red-400 bg-red-50/30' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all`;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
                {/* Header */}
                <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Post a New Job</h2>
                        <p className="text-sm text-gray-500 mt-0.5">Fill in the details below</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Close modal"
                    >
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="e.g. Senior React Developer"
                            className={inputClass('title')}
                            id="modal-title-input"
                        />
                        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                    </div>

                    {/* Company & Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Company *</label>
                            <input
                                type="text"
                                name="company"
                                value={form.company}
                                onChange={handleChange}
                                placeholder="e.g. Google"
                                className={inputClass('company')}
                                id="modal-company-input"
                            />
                            {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Location *</label>
                            <input
                                type="text"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                placeholder="e.g. Bangalore, India"
                                className={inputClass('location')}
                                id="modal-location-input"
                            />
                            {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
                        </div>
                    </div>

                    {/* Type & Salary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Type</label>
                            <select
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                className={inputClass('type') + ' appearance-none cursor-pointer'}
                                id="modal-type-select"
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Remote">Remote</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Salary *</label>
                            <input
                                type="text"
                                name="salary"
                                value={form.salary}
                                onChange={handleChange}
                                placeholder="e.g. ₹15L - ₹25L"
                                className={inputClass('salary')}
                                id="modal-salary-input"
                            />
                            {errors.salary && <p className="text-xs text-red-500 mt-1">{errors.salary}</p>}
                        </div>
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Experience *</label>
                        <input
                            type="text"
                            name="experience"
                            value={form.experience}
                            onChange={handleChange}
                            placeholder="e.g. 3-5 years"
                            className={inputClass('experience')}
                            id="modal-experience-input"
                        />
                        {errors.experience && <p className="text-xs text-red-500 mt-1">{errors.experience}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
                        <textarea
                            name="description"
                            rows={3}
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Brief description of the role..."
                            className={inputClass('description') + ' resize-none'}
                            id="modal-description-input"
                        />
                        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags</label>
                        <input
                            type="text"
                            name="tags"
                            value={form.tags}
                            onChange={handleChange}
                            placeholder="Comma separated e.g. React, Node.js, AWS"
                            className={inputClass('tags')}
                            id="modal-tags-input"
                        />
                        <p className="text-xs text-gray-400 mt-1">Separate tags with commas</p>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-primary/25 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer mt-2"
                        id="modal-submit-btn"
                    >
                        Publish Job
                    </button>
                </form>
            </div>
        </div>
    );
}
