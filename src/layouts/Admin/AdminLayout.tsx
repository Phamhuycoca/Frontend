import React, { useCallback, useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import CategoryService from '../../modules/Categories/CategoryService';

const { Header, Sider, Content } = Layout;
interface ICategory {
  id?: string | number;
  name?: string;
  index?: string | number;
  level?: number;
  children?: ICategory[] | [];
  key: string | number;
  label: string;
}
const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [listCategory, setListCategory] = useState<ICategory[]>([]);

  const convertToMenuItems = (categories: ICategory[]): ICategory[] => {
    return categories.map((item) => ({
      key: item.id?.toString() || '', // ID phải là chuỗi
      label: item.name || 'No Name',
      children: item.children && item.children.length > 0 ? convertToMenuItems(item.children) : undefined,
    }));
  };

  const fetchData = useCallback((page: number, page_size: number) => {
    CategoryService.getAll({ page, page_size })
      .then((res) => {
        setListCategory(convertToMenuItems(res?.data));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    fetchData(1, 0);
  }, [fetchData]);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={listCategory} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 800,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
