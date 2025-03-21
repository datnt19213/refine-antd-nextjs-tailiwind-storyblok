import { Suspense } from 'react';

import { notFound } from 'next/navigation';

// src/app/(storyblok)/[...slug]/page.tsx
import StoryblokService from '@/lib/storyblok';
import PageTemplate from '@/storyblok/content-type/page-template';

export async function generateStaticParams() {
  const stories = await StoryblokService.getAllStories();
  const slugs = stories.map((story) => story.full_slug.split("/"));
  return slugs;
}

export default async function DynamicStoryblokPage(
  props: {
    params: Promise<{ slug: string | string[] }>;
  }
) {
  const params = await props.params;
  // Chuyển slug thành chuỗi nếu nó là một mảng
  const slugPath =
    params &&
    (Array.isArray(params.slug) ? params.slug.join("/") : params.slug || "");

  console.log("Slug Path:", slugPath); // Debug kiểm tra đầu vào

  const story = slugPath && (await StoryblokService.getStoryBySlug(slugPath));

  if (!story) {
    return <Suspense fallback={<div>Loading...</div>}>{notFound()}</Suspense>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageTemplate story={story} />
    </Suspense>
  );
}
