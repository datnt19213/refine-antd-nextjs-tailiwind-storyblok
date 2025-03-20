"use client";

import StoryblokService from '@/lib/storyblok';
import { EnhancedStoryblokStory } from '@/types/storyblok';

import Hero from '../block/component/hero';
import NotificationList from '../block/component/notification-list';
import StatisticCard from '../block/component/statistic-card';
import StatisticRealtime from '../block/component/statistic-realtime';
import Table from '../block/component/table';
import Navigation from '../block/control/navigation';
import LinkItem from '../block/elements/link-item';
import Grid from '../block/layout/grid';
import Linear from '../block/layout/linear';

interface PageTemplateProps {
  story: EnhancedStoryblokStory | any;
}

export default function PageTemplate({ story }: PageTemplateProps) {
  if (!story) {
    return <></>;
  }
  // Safely extract blocks
  const blocks = StoryblokService.extractBlocks(story.content);

  return blocks.map((block: any) => (
    <DynamicBlock key={block._uid} block={block} />
  ));
}

export function DynamicBlock({ block }: { block: any }) {
  switch (block.component) {
    case "hero":
      return <Hero block={block} />;
    case "notification_list":
      return <NotificationList block={block} />;
    case "statistic_card":
      return <StatisticCard block={block} />;
    case "grid":
      return <Grid block={block} />;
    case "link_item":
      return <LinkItem block={block} />;
    case "statistic_realtime":
      return <StatisticRealtime block={block} />;
    case "table":
      return <Table block={block} />;
    case "navigation":
      return <Navigation block={block} />;
    case "linear":
      return <Linear block={block} />;
    default:
      return null;
  }
}
