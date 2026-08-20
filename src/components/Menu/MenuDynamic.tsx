import { useMemo, useState } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Icons from '@ant-design/icons';

export interface MenuItemConfig {
  key: string;
  label: string;
  icon?: keyof typeof Icons; // tên icon antd, VD: "HomeOutlined"
  path?: string; // route khi click (nếu là leaf item)
  children?: MenuItemConfig[];
  disabled?: boolean;
}

interface MenuDynamicProps {
  items: MenuItemConfig[];
  mode?: MenuProps['mode'];
  theme?: MenuProps['theme'];
}

const renderIcon = (iconName?: keyof typeof Icons) => {
  if (!iconName) return undefined;
  const IconComponent = Icons[iconName] as React.ComponentType;
  return IconComponent ? <IconComponent /> : undefined;
};

const buildMenuItems = (items: MenuItemConfig[]): MenuProps['items'] => {
  return items.map((item) => {
    if (item.children && item.children.length > 0) {
      return {
        key: item.key,
        label: item.label,
        icon: renderIcon(item.icon),
        disabled: item.disabled,
        children: buildMenuItems(item.children),
      };
    }
    return {
      key: item.key,
      label: item.label,
      icon: renderIcon(item.icon),
      disabled: item.disabled,
    };
  });
};

// Tìm đường dẫn key cha (openKeys) và path tương ứng với 1 key được chọn
const findPathAndParents = (
  items: MenuItemConfig[],
  targetKey: string,
  parents: string[] = []
): { path?: string; parents: string[] } | null => {
  for (const item of items) {
    if (item.key === targetKey) {
      return { path: item.path, parents };
    }
    if (item.children) {
      const result = findPathAndParents(item.children, targetKey, [...parents, item.key]);
      if (result) return result;
    }
  }
  return null;
};

const findKeyByPath = (items: MenuItemConfig[], pathname: string): string | undefined => {
  for (const item of items) {
    if (item.path === pathname) return item.key;
    if (item.children) {
      const found = findKeyByPath(item.children, pathname);
      if (found) return found;
    }
  }
  return undefined;
};

export const MenuDynamic = ({ items, mode = 'inline', theme = 'dark' }: MenuDynamicProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = useMemo(() => buildMenuItems(items), [items]);

  const selectedKey = useMemo(
    () => findKeyByPath(items, location.pathname),
    [items, location.pathname]
  );

  const [openKeys, setOpenKeys] = useState<string[]>(() => {
    if (!selectedKey) return [];
    return findPathAndParents(items, selectedKey)?.parents ?? [];
  });

  const onClick: MenuProps['onClick'] = ({ key }) => {
    const result = findPathAndParents(items, key);
    if (result?.path) {
      navigate(result.path);
    }
  };

  return (
    <div style={{ width: 240, minWidth: 240, padding: 0 }}>
      <Menu
        mode={mode}
        theme={theme}
        items={menuItems}
        selectedKeys={selectedKey ? [selectedKey] : []}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
        onClick={onClick}
        inlineIndent={12}
        style={{
          width: '100%',
          border: 'none',
          paddingInlineStart: 0,
        }}
        inlineCollapsed={false}
      />
    </div>
  );
};
