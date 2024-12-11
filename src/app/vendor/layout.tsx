"use client";
import { vendorSidebarItems } from "@/src/constant/sidebarConstant";
import { useUserProvider } from "@/src/context/user.provider";
import { TChildrenProps } from "@/src/types";
import { Layout, Menu, theme } from "antd";
import { usePathname } from "next/navigation";
import { useState } from "react";

const { Header, Content, Sider } = Layout;

const VendorLayout = ({ children }: TChildrenProps) => {
  const pathName = usePathname();
  const { user } = useUserProvider();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const currentSelectedItem =
    pathName.split("/")[pathName.split("/").length - 1];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical">
          <div className="text-white text-xl py-2 px-5 rounded-lg w-fit mx-auto mt-4 mb-4 bg-[#4d4e4e75]">
            {collapsed ? (
              <strong className="pl-1">
                {user?.name !== "" ? user?.name.charAt(0) : "V"}
              </strong>
            ) : (
              <div
                className={`${collapsed ? "opacity-0" : "opacity-100"} duration-1000`}
              >
                Hello,
                <strong className="pl-1">{user?.name}</strong>
              </div>
            )}
          </div>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[currentSelectedItem]}
          mode="inline"
          items={vendorSidebarItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "-28px 16px" }}>
          <div
            style={{
              padding: 12,
              minHeight: 700,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default VendorLayout;
