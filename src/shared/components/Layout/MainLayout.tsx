import { useState } from 'react';
import { Layout, theme } from 'antd';
import { MenuDynamic } from '../Menu';
import type { MenuItemConfig } from '../Menu/MenuDynamic';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const menuConfig: MenuItemConfig[] = [
    { key: 'home', label: 'Trang chủ', icon: 'HomeOutlined', path: '/' },
    {
        key: 'reports',
        label: 'Báo cáo',
        icon: 'FileTextOutlined',
        children: [
            { key: 'leadership-schedule', label: 'Lịch BGD', path: '/reports/leadership' },
            { key: 'financial', label: 'Báo cáo tài chính', path: '/reports/financial' },
        ],
    },
    { key: 'settings', label: 'Cài đặt', icon: 'SettingOutlined', path: '/settings' },
];

export const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const currentYear = new Date().getFullYear();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                width={240}
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                theme="light"
            >
                <MenuDynamic items={menuConfig} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px', overflow: 'auto' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} />
          <div
            style={{
              padding: 24,
              minHeight: 'calc(100vh - 190px)', // trừ Header + Footer + margin, tránh double-scroll
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Bill is a cat.
          </div> */}
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{currentYear} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};