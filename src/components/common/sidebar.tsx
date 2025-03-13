import React, {useState} from "react";

import {Button, Layout, Menu, theme} from "antd";
import axios from "axios";
import {GetServerSideProps} from "next";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";

const {Header, Sider, Content} = Layout;

const convertMenu = (list: any[]): any[] | undefined => {
  return (
    list &&
    list.map((item: any) => {
      return {
        key: item.id,
        icon: <UserOutlined />,
        label: item.name,
        children: convertMenu(item.items),
      };
    })
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await axios.get(
    "https://api-us.storyblok.com/v2/cdn/datasource_entries?datasource=navigation-menu&token=4pSJLzsKIlxLza4dLwa9iQtt"
  );
  let data = null;
  if (res) {
    data = convertMenu(res.data.datasource_entries);
  }

  return {
    props: {
      navigation: data,
    },
  };
};

const Sidebar = ({props}: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={props.navigation}
        />
      </Sider>
      <Layout>
        <Header style={{padding: 0, background: colorBgContainer}}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
