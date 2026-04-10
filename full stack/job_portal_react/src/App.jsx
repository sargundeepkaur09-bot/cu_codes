import { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import JobList from './components/JobList';
import AddJobModal from './components/AddJobModal';
import Footer from './components/Footer';
import { jobsData } from './data/jobsData';
import './index.css';

function App() {
  const [jobs, setJobs] = useState(jobsData);
  const [searchFilters, setSearchFilters] = useState({ query: '', location: '', type: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const q = searchFilters.query.toLowerCase();
      const matchesQuery =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.tags.some((tag) => tag.toLowerCase().includes(q));

      const matchesLocation =
        !searchFilters.location ||
        job.location.toLowerCase().includes(searchFilters.location.toLowerCase());

      const matchesType = !searchFilters.type || job.type === searchFilters.type;

      return matchesQuery && matchesLocation && matchesType;
    });
  }, [jobs, searchFilters]);

  const handleSearch = (filters) => {
    setSearchFilters(filters);
  };

  const handleAddJob = (newJob) => {
    setJobs((prev) => [newJob, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar onPostJob={() => setIsModalOpen(true)} />
      <main className="flex-1">
        <HeroSection onSearch={handleSearch} />
        <JobList jobs={filteredJobs} />
      </main>
      <Footer />
      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddJob={handleAddJob}
      />
    </div>
  );
}

export default App;
