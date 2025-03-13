import {lazy} from "react";

import StoryblokService from "@/lib/storyblok";
import {ResourceProps} from "@refinedev/core";

interface DynamicRoute {
  name: string;
  path: string;
  component: React.ComponentType<any>;
}

class DynamicRouteManager {
  private routes: DynamicRoute[] = [];

  async syncRoutesFromStoryblok() {
    try {
      // Lấy tất cả stories từ Storyblok
      const stories = await StoryblokService.getAllStories();

      // Tự động generate routes
      this.routes = stories.map((story: any) => ({
        name: story.content.component,
        path: `/${story.full_slug}`,
        component: this.getDynamicComponent(story.content.component),
      }));

      return this.routes;
    } catch (error) {
      console.error("Route sync error:", error);
      return [];
    }
  }

  getDynamicComponent(componentName: string) {
    // Dynamically import component based on Storyblok component
    const componentMap: Record<string, React.ComponentType<any>> = {
      page: dynamic(() => import("@/storyblok/content-type/page-template")),
    };

    return componentMap[componentName] || FallbackComponent;
  }

  getRefineResources(): ResourceProps[] {
    return this.routes.map((route) => ({
      name: route.name,
      list: route.path,
      create: `${route.path}/create`,
      edit: `${route.path}/edit`,
      show: `${route.path}/show`,
    }));
  }
}

// Fallback component khi không tìm thấy
function FallbackComponent() {
  return <div>Content Not Found</div>;
}

function dynamic(importFn: () => Promise<any>) {
  return lazy(importFn);
}

export const dynamicRouteManager = new DynamicRouteManager();
