import { useEffect, useState } from "react";
import API from "../api/axios";
import StoryCard from "../components/StoryCard";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

function Bookmarks() {
  const { token } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      const { data } = await API.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookmarks(data.bookmarks || []);
    } catch (err) {
      console.error("Failed to fetch bookmarks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleBookmark = async (storyId) => {
    try {
      const { data } = await API.post(
        `/stories/${storyId}/bookmark`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update list from response — removes unbookmarked story
      setBookmarks(data.bookmarks);
      toast.success(data.message);
    } catch (err) {
      toast.error("Failed to update bookmark");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f4]">
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-[#1c1917]">Bookmarks</h1>
          <p className="text-sm text-[#57534e] mt-0.5">
            Stories you've saved
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-5 h-5 border-2 border-[#292524] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Empty state */}
        {!loading && bookmarks.length === 0 && (
          <div className="text-center py-16 text-[#57534e] text-sm">
            No bookmarked stories yet.
          </div>
        )}

        {/* Bookmarks list */}
        {!loading && bookmarks.length > 0 && (
          <div className="flex flex-col gap-3">
            {bookmarks.map((story) => (
              <StoryCard
                key={story._id}
                story={story}
                onBookmark={handleBookmark}
                isBookmarked={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookmarks;
