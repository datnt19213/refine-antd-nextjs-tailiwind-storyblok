import {StoryblokStory} from "storyblok-js-client";

export interface StoryblokBlock {
  _uid: string;
  component: string;
  [key: string]: any;
}

export interface StoryblokNestedBlock {
  _uid: string;
  component: string;
  // Cho phép nested blocks
  body?: StoryblokNestedBlock[];
  [key: string]: any;
}

export interface StoryblokPageContent {
  _uid: string;
  component: string;
  body: StoryblokNestedBlock[];
}

export interface StoryblokContent {
  _uid?: string;
  component?: string;
  title?: string;
  body?: StoryblokBlock[];
  [key: string]: any;
}

export interface EnhancedStoryblokStory extends StoryblokStory {
  id: number;
  uuid: string;
  content: StoryblokContent;
  slug: string;
  full_slug: string;
  [key: string]: any;
}
