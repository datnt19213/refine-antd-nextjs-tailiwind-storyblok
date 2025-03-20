"use server"; // 🛠 Bắt buộc để dùng Server Action

import StoryblokService from "@/lib/storyblok";

export async function getStory(slug: string) {
  return await StoryblokService.getStoryBySlug(slug);
}
