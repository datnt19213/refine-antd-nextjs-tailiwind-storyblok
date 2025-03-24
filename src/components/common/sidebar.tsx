import React, { useState } from 'react';

import {
  Avatar,
  Button,
  GetProps,
  Input,
  Layout,
  Menu,
  Space,
  theme,
} from 'antd';
import {
  usePathname,
  useRouter,
} from 'next/navigation';

import { Icon } from '@iconify/react';

import { ModalSurvey } from '../modals';

const { Header, Sider, Content } = Layout;
type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const Sidebar = ({
  navigation,
  children,
}: {
  navigation: any[];
  children: React.ReactNode;
}) => {
  const pathName = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [openKeys, setOpenKeys] = useState<string[]>(["dashboard"]);

  const handleMenuClick = ({ key }: { key: string }) => {
    console.log("Clicked menu item:", key);
    router.push(key);
  };

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys); // Giữ trạng thái mở menu
  };

  return (
    <Layout className="min-h-screen flex flex-col justify-start h-auto">
      <Sider
        theme="light"
        trigger={null}
        collapsed={collapsed}
        className="pt-16 border-r border-gray-200/50 !sticky top-0 h-screen"
      >
        <Menu
          className="!border-none"
          mode="vertical"
          items={navigation}
          selectedKeys={[pathName]}
          // openKeys={openKeys}
          onOpenChange={handleOpenChange}
          onSelect={handleMenuClick}
        />
      </Sider>
      <Layout className="bg-slate-100">
        <Header className="!px-4 !bg-white border-b border-gray-200/50 flex items-center !sticky top-0 z-50">
          <div className="flex items-center w-full justify-between">
            <div
              className="border-none bg-transparent hover:bg-gray-50 rounded-md transition-all cursor-pointer p-2 aspect-square w-fit h-fit"
              onClick={() => setCollapsed((prev) => !prev)}
            >
              {collapsed ? (
                <Icon
                  fontSize={24}
                  color="#525251"
                  icon="tabler:layout-sidebar-left-expand-filled"
                />
              ) : (
                <Icon
                  fontSize={24}
                  color="#525251"
                  icon="tabler:layout-sidebar-left-collapse-filled"
                />
              )}
            </div>
            <div className="flex items-center justify-end gap-3">
              <ModalSurvey />
              <Space.Compact>
                <Button className="!p-0 h-8 aspect-square min-w-8">
                  <Icon color="#525251" icon="tabler:search" />
                </Button>
                <Input
                  classNames={{
                    input: "h-8 !min-w-[250px]",
                  }}
                  placeholder="large size"
                />
              </Space.Compact>
              <Avatar
                className="select-none cursor-pointer"
                style={{ backgroundColor: "#f6d2b6", color: "#f56a00" }}
              >
                U
              </Avatar>
            </div>
          </div>
        </Header>
        <Content className="p-4 max-w-[1440px] mx-auto">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
