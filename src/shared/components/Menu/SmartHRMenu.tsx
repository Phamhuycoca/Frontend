import React, { useState } from 'react';
import { ConfigProvider, Menu, Tag } from 'antd';
import { DashboardOutlined, AppstoreOutlined, UserSwitchOutlined } from '@ant-design/icons';

// Badge nhỏ dùng cho "Hot" / "New"
interface BadgeTagProps {
  text: string;
}

const BadgeTag: React.FC<BadgeTagProps> = ({ text }) => (
  <Tag
    color="#ff4d4f"
    style={{
      marginLeft: 8,
      fontSize: 10,
      fontWeight: 700,
      lineHeight: '16px',
      padding: '0 6px',
      borderRadius: 4,
      border: 'none',
    }}
  >
    {text}
  </Tag>
);

const dashboardChildren = [
  { key: 'admin', label: 'Admin Dashboard' },
  { key: 'employee', label: 'Employee Dashboard' },
  { key: 'deals', label: 'Deals Dashboard' },
  { key: 'leads', label: 'Leads Dashboard' },
  {
    key: 'hr',
    label: (
      <span>
        HR Dashboard <BadgeTag text="New" />
      </span>
    ),
  },
  {
    key: 'payroll',
    label: (
      <span>
        Payroll Dashboard <BadgeTag text="New" />
      </span>
    ),
  },
  {
    key: 'recruitment',
    label: (
      <span>
        Recruitment Dashboard <BadgeTag text="New" />
      </span>
    ),
  },
  {
    key: 'attendance',
    label: (
      <span>
        Attendance Dashboard <BadgeTag text="New" />
      </span>
    ),
  },
  {
    key: 'finance',
    label: (
      <span>
        Finance Dashboard <BadgeTag text="New" />
      </span>
    ),
  },
  {
    key: 'itadmin',
    label: (
      <span>
        IT Admin Dashboard <BadgeTag text="New" />
      </span>
    ),
  },
  {
    key: 'asset',
    label: (
      <span>
        Asset Dashboard <BadgeTag text="New" />
      </span>
    ),
  },
  {
    key: 'helpdesk',
    label: (
      <span>
        Help Desk Dashboard <BadgeTag text="New" />
      </span>
    ),
  },
];

const items = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: (
      <span>
        Dashboard <BadgeTag text="Hot" />
      </span>
    ),
    children: dashboardChildren,
  },
  {
    key: 'applications',
    icon: <AppstoreOutlined />,
    label: 'Applications',
  },
  {
    key: 'superadmin',
    icon: <UserSwitchOutlined />,
    label: 'Super Admin',
  },
];

export default function SmartHRMenu() {
  const [openKeys, setOpenKeys] = useState(['dashboard']);
  const [selectedKey, setSelectedKey] = useState('admin');

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ff7a45', // cam SmartHR
          colorLink: '#ff7a45',
          borderRadius: 8,
          fontSize: 14,
        },
        components: {
          Menu: {
            itemSelectedBg: 'transparent',
            itemSelectedColor: '#ff7a45',
            itemHoverColor: '#ff7a45',
            subMenuItemBg: 'transparent',
            itemBorderRadius: 8,
            iconSize: 17,
          },
        },
      }}
    >
      <div
        style={{
          width: 260,
          background: '#fff',
          borderRight: '1px solid #eef0f2',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '18px 20px',
            borderBottom: '1px solid #eef0f2',
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#ff7a45,#ff4d4f)',
            }}
          />
          <span style={{ fontSize: 18, fontWeight: 700, color: '#1f2937' }}>
            Smart<span style={{ color: '#ff7a45' }}>HR</span>
          </span>
        </div>

        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: '#9aa1ab',
            letterSpacing: 0.5,
            padding: '16px 20px 4px',
          }}
        >
          MAIN MENU
        </div>

        <Menu
          mode="inline"
          items={items}
          openKeys={openKeys}
          selectedKeys={[selectedKey]}
          onOpenChange={setOpenKeys}
          onClick={({ key }) => setSelectedKey(key)}
          style={{ border: 'none', padding: '0 8px' }}
        />
      </div>
    </ConfigProvider>
  );
}

/*
Cài đặt trong project thật:
  npm install antd @ant-design/icons

Nếu dùng antd v5, ConfigProvider theme token như trên là đủ để đổi
màu chủ đạo sang cam (#ff7a45) mà không cần override CSS thủ công.
*/
