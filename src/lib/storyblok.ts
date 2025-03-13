import StoryblokClient from "storyblok-js-client";

import {
  EnhancedStoryblokStory,
  StoryblokBlock,
  StoryblokContent,
} from "@/types/storyblok";

class StoryblokService {
  private client: StoryblokClient;

  constructor() {
    this.client = new StoryblokClient({
      accessToken: process.env.STORYBLOK_TOKEN || "xMQyjDi712bdF7lmJMlYegtt",
      cache: {
        clear: "auto",
        type: "memory",
      },
      region: "us",
    });
  }

  async getStoryBySlug(
    slug: string,
    version: "draft" | "published" = "published"
  ): Promise<EnhancedStoryblokStory | null> {
    try {
      // Normalize slug
      const normalizedSlug = slug.startsWith("/") ? slug : `/${slug}`;

      const {data} = await this.client.get(`cdn/stories${normalizedSlug}`, {
        version: version,
      });

      return data.story as EnhancedStoryblokStory;
    } catch (error) {
      console.error("Storyblok fetch error for slug:", slug, error);
      return null;
    }
  }

  async getAllStories(contentType?: string): Promise<EnhancedStoryblokStory[]> {
    const params: Record<string, any> = {
      version: "published",
      per_page: 100, // Tăng giới hạn stories
    };

    if (contentType) {
      params.filter_query = {
        component: {
          in: contentType,
        },
      };
    }

    try {
      const {data} = await this.client.get("cdn/stories", params);
      return data.stories as EnhancedStoryblokStory[];
    } catch (error) {
      console.error("Storyblok stories fetch error:", error);
      return [];
    }
  }

  // Utility method for generating safe routes
  generateContentRoutes(
    stories: EnhancedStoryblokStory[]
  ): {params: {slug: string}}[] {
    return stories
      .filter((story) => story.slug) // Chỉ lấy stories có slug
      .map((story) => ({
        params: {
          slug: story.slug, // Sử dụng slug trực tiếp
        },
      }));
  }

  extractBlocks(content: StoryblokContent): StoryblokBlock[] {
    return content.body || [];
  }
}

export default new StoryblokService();
