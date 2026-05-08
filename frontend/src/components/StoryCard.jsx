import { ExternalLink, ArrowUp, Bookmark } from "lucide-react";

function StoryCard({ story, onBookmark, isBookmarked }) {
  const { title, url, points, author, postedAt } = story;

  const timeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 1000 / 60);
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return `${Math.floor(diff / 1440)}d ago`;
  };

  const domain = (link) => {
    try {
      return new URL(link).hostname.replace("www.", "");
    } catch {
      return null;
    }
  };

  return (
    <div className="bg-white border border-[#d6d3d1] rounded-2xl px-5 py-4 flex flex-col gap-2 hover:shadow-sm transition">


      <div className="flex items-start justify-between gap-3">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1c1917] font-medium text-sm leading-snug hover:underline flex-1"
        >
          {title}
        </a>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#a8a29e] hover:text-[#57534e] mt-0.5 shrink-0"
        >
          <ExternalLink size={14} />
        </a>
      </div>

      
      {domain(url) && (
        <span className="text-xs text-[#a8a29e]">{domain(url)}</span>
      )}

      
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-3 text-xs text-[#57534e]">
          <span className="flex items-center gap-1">
            <ArrowUp size={12} />
            {points} pts
          </span>
          <span>by {author}</span>
          <span>{timeAgo(postedAt)}</span>
        </div>

        
        {onBookmark && (
          <button
            onClick={() => onBookmark(story._id)}
            className={`cursor-pointer transition ${
              isBookmarked ? "text-[#292524]" : "text-[#d6d3d1] hover:text-[#57534e]"
            }`}
            title={isBookmarked ? "Remove bookmark" : "Bookmark"}
          >
            <Bookmark size={15} fill={isBookmarked ? "#292524" : "none"} />
          </button>
        )}
      </div>
    </div>
  );
}

export default StoryCard;
