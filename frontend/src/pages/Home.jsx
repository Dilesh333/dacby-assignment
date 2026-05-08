import { useEffect, useState } from "react";
import API from "../api/axios";
import StoryCard from "../components/StoryCard";

function Home() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchStories = async (p = 1) => {
    setLoading(true);
    try {
      const { data } = await API.get(`/stories?page=${p}&limit=10`);
      setStories(data.stories);
      setTotalPages(data.totalPages);
      setPage(data.page);
    } catch (err) {
      console.error("Failed to fetch stories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories(1);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f4]">
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-[#1c1917]">Top Stories</h1>
          <p className="text-sm text-[#57534e] mt-0.5">
            Latest from Hacker News, sorted by points
          </p>
        </div>

        
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-5 h-5 border-2 border-[#292524] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        
        {!loading && stories.length === 0 && (
          <div className="text-center py-16 text-[#57534e] text-sm">
            No stories found.
          </div>
        )}

        
        {!loading && stories.length > 0 && (
          <div className="flex flex-col gap-3">
            {stories.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => fetchStories(page - 1)}
              disabled={page === 1}
              className="text-sm px-4 py-2 rounded-lg border border-[#d6d3d1] text-[#57534e] hover:bg-white disabled:opacity-40 transition cursor-pointer"
            >
              Previous
            </button>
            <span className="text-sm text-[#57534e]">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => fetchStories(page + 1)}
              disabled={page === totalPages}
              className="text-sm px-4 py-2 rounded-lg border border-[#d6d3d1] text-[#57534e] hover:bg-white disabled:opacity-40 transition cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
