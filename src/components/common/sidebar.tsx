import React, {useEffect, useState} from "react";

import {Layout, Menu, theme} from "antd";
import {usePathname, useRouter} from "next/navigation";

const {Header, Sider, Content} = Layout;

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
  const [selected, setSelected] = useState("");
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();
  useEffect(() => {
    setSelected(pathName);
  }, [pathName]);

  return (
    <Layout className="h-screen">
      <Sider
        theme="light"
        trigger={null}
        // collapsed={collapsed}
        className="pt-16 border-r border-gray-200/50 "
      >
        <Menu
          mode="vertical"
          items={navigation}
          selectedKeys={[selected]}
          onSelect={({key}) => {
            setSelected(key);
            router.push(key);
          }}
        />
      </Sider>
      <Layout>
        <Header className="!bg-white border-b border-gray-200/50">
          {/* <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          /> */}
        </Header>
        <Content className="p-4 bg-white">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
