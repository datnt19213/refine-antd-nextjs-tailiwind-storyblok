"use client";

import {Suspense, useEffect, useState} from "react";

import {ConfigProvider} from "antd";
import axios from "axios";

import Sidebar from "@/components/common/sidebar";
import {dynamicRouteManager} from "@/lib/refine-routes";
import {ErrorComponent, ThemedLayoutV2} from "@refinedev/antd";
import {Refine, ResourceProps} from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";

export function DynamicRefineProvider({children}: {children: React.ReactNode}) {
  const [resources, setResources] = useState<ResourceProps[]>([]);
  const [menu, setMenu] = useState<any[]>([]);

  useEffect(() => {
    async function loadRoutes() {
      // Sync routes từ Storyblok
      await dynamicRouteManager.syncRoutesFromStoryblok();

      // Cập nhật resources
      setResources(dynamicRouteManager.getRefineResources());
    }

    loadRoutes();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `https://api-us.storyblok.com/v2/cdn/datasource_entries?datasource=navigation-menu&token=4pSJLzsKIlxLza4dLwa9iQtt`
      );
      if (res.status === 200) {
        const data = res.data.datasource_entries.map((item: any) => {
          return {
            key: item.value,
            icon: "",
            label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
            // children: [],
          };
        });
        setMenu(data);
      }
    };
    fetch();
  }, []);

  return (
    <ConfigProvider>
      <Refine
        routerProvider={routerProvider}
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
