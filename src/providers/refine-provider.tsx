"use client";

import {
  Suspense,
  useEffect,
  useState,
} from 'react';

import { ConfigProvider } from 'antd';

import Sidebar from '@/components/common/sidebar';
import {
  DynamicRoute,
  dynamicRouteManager,
} from '@/lib/refine-routes';
import { dataProvider } from '@/services/data-provider';
import {
  ErrorComponent,
  ThemedLayoutV2,
} from '@refinedev/antd';
import {
  Refine,
  ResourceProps,
} from '@refinedev/core';
import routerProvider from '@refinedev/nextjs-router';

export function DynamicRefineProvider({ children }: { children: React.ReactNode }) {
  const [resources, setResources] = useState<ResourceProps[]>([]);
  const [menu, setMenu] = useState<any[]>([]);

  useEffect(() => {
    async function loadRoutes() {
      // Sync routes từ Storyblok
      const routes = await dynamicRouteManager.syncRoutesFromStoryblok();
      console.log("Routes:", routes);
      // Cập nhật resources
      setResources(dynamicRouteManager.getRefineResources());

      const data = routes.map((item: DynamicRoute) => ({
        key: item.path,
        icon: <img src={item.icon} className="size-5 aspect-square" />,
        label: item.p_name,
        order: item.order,
        // children: [],
      }));

      setMenu(data.sort((a, b) => a.order - b.order));
    }
    loadRoutes();
  }, []);

  return (
    <ConfigProvider theme={{
      components: {
        Rate: {
          starSize: 50
        }
      }
    }}>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider}
        resources={resources}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
        Layout={ThemedLayoutV2}
        catchAll={<ErrorComponent />}
      >
        <Suspense fallback={<div>Loading routes...</div>}>
          <Sidebar navigation={menu}>{children}</Sidebar>
        </Suspense>
      </Refine>
    </ConfigProvider>
  );
}
