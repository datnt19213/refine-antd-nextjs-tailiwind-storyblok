import Link from "next/link";

import StoryblokService from "@/lib/storyblok";

export default async function Home() {
  const stories = await StoryblokService.getAllStories("dashboard");

  return (
    <div className="contents-list">
      <div className="grid grid-cols-3 gap-4">
        {stories.map((story) => (
          <Link
            key={story.id}
            href={`${story.full_slug}`}
            className="bg-black text-white p-4"
          >
            {story.name || "Untitled"}
          </Link>
        ))}
      </div>
    </div>
  );
}
