"use client";

import {Suspense, useEffect, useState} from "react";

import {ConfigProvider} from "antd";

import {dynamicRouteManager} from "@/lib/refine-routes";
import {ErrorComponent, ThemedLayoutV2} from "@refinedev/antd";
import {Refine, ResourceProps} from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";

export function DynamicRefineProvider({children}: {children: React.ReactNode}) {
  const [resources, setResources] = useState<ResourceProps[]>([]);

  useEffect(() => {
    async function loadRoutes() {
      // Sync routes từ Storyblok
      await dynamicRouteManager.syncRoutesFromStoryblok();

      // Cập nhật resources
      setResources(dynamicRouteManager.getRefineResources());
    }

    loadRoutes();
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
        <Suspense fallback={<div>Loading routes...</div>}>{children}</Suspense>
      </Refine>
    </ConfigProvider>
  );
}
