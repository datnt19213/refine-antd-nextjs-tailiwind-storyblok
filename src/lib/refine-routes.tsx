import {lazy} from "react";

import StoryblokService from "@/lib/storyblok";
import {ResourceProps} from "@refinedev/core";

export interface DynamicRoute {
  name: string;
  path: string;
  icon: string;
  order: number;
  slug: string;
  p_name: string;
  component: React.ComponentType<any>;
}

class DynamicRouteManager {
  private routes: DynamicRoute[] = [];

  /**
   * Synchronizes routes dynamically from Storyblok CMS.
   * Fetches all stories from Storyblok and generates routes based on their content.
   *
   * @returns {DynamicRoute[]} An array of dynamically generated routes or an empty array if an error occurs.
   */
  async syncRoutesFromStoryblok() {
    try {
      // Lấy tất cả stories từ Storyblok
      const stories = await StoryblokService.getAllStories();

      // Tự động generate routes
      this.routes = stories.map((story: any) => ({
        name: story.content.component,
        path: `/${story.full_slug}`,
        component: this.getDynamicComponent(story.content.component),
        icon: story.content.icon.filename,
        order: story.content.ordering,
        slug: story.content.slug,
        p_name: story.name,
      }));

      return this.routes;
    } catch (error) {
      console.error("Route sync error:", error);
      return [];
    }
  }

  /**
   * Retrieves the appropriate dynamic component for a given Storyblok component name.
   *
   * @param {string} componentName - The name of the Storyblok component to load.
   * @returns {React.ComponentType<any>} The dynamically imported component or a fallback component if not found.
   */
  getDynamicComponent(componentName: string) {
    // Dynamically import component based on Storyblok component
    const componentMap: Record<string, React.ComponentType<any>> = {
      page: dynamic(() => import("@/storyblok/content-type/page-template")),
    };

    return componentMap[componentName] || FallbackComponent;
  }

  /**
   * Converts dynamically generated routes into Refine resource configurations.
   *
   * @returns {ResourceProps[]} An array of Refine resource configurations derived from the current routes.
   * Each resource includes standard CRUD paths (list, create, edit, show) based on the route's path.
   */
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
