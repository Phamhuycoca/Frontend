// layouts/MainLayout.tsx
import { MenuDynamic } from '@/shared/components/Menu';
import type { MenuItemConfig } from '@/shared/components/Menu/MenuDynamic';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Sider, Content } = Layout;

export default function MainLayout() {
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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={280} theme='light'>
        <MenuDynamic items={menuConfig} />
      </Sider>
      <Layout>
        <Content style={{ padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
