import type { ReactNode } from 'react';
import { Space, Spin, Typography, theme } from 'antd';

const { Title, Text, Link } = Typography;

const CONTENT_PADDING_X = 24;

export interface PageBreadcrumbItem {
  title: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface PageContainerProps {
  /** Tiêu đề trang, không truyền thì không render */
  title?: string;

  /** Danh sách breadcrumb, không truyền (hoặc để undefined) thì KHÔNG render breadcrumb */
  breadcrumbItems?: PageBreadcrumbItem[];

  /** Nút/hành động bên phải tiêu đề, VD: <Button>Tạo mới</Button> */
  extra?: ReactNode;

  /** Loading toàn khối nội dung */
  loading?: boolean;

  /** Style/class thêm cho khối content bên trong */
  contentStyle?: React.CSSProperties;
  className?: string;

  children: ReactNode;
}

export const PageContainer = ({
  title,
  breadcrumbItems,
  extra,
  loading = false,
  contentStyle,
  className,
  children,
}: PageContainerProps) => {
  const {
    token: { colorBgContainer, colorTextTertiary, borderRadiusLG },
  } = theme.useToken();

  const hasHeader = (breadcrumbItems && breadcrumbItems.length > 0) || title || extra;

  return (
    <div className={className}>
      {hasHeader && (
        <div style={{ marginBottom: 16, marginTop: 8 }}>
          {breadcrumbItems && breadcrumbItems.length > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: title ? 8 : 0,
                lineHeight: 1.5,
                fontSize: 14,
              }}
            >
              {breadcrumbItems.map((item, index) => {
                const isLast = index === breadcrumbItems.length - 1;
                return (
                  <span key={index} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {isLast ? (
                      <Text style={{ color: undefined }}>{item.title}</Text>
                    ) : item.href || item.onClick ? (
                      <Link
                        href={item.href}
                        onClick={item.onClick}
                        style={{ color: colorTextTertiary }}
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <Text style={{ color: colorTextTertiary }}>{item.title}</Text>
                    )}
                    {!isLast && <Text style={{ color: colorTextTertiary }}>/</Text>}
                  </span>
                );
              })}
            </div>
          )}

          {(title || extra) && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {title && (
                <Title level={4} style={{ margin: 0 }}>
                  {title}
                </Title>
              )}
              {extra && <Space>{extra}</Space>}
            </div>
          )}
        </div>
      )}

      <Spin spinning={loading}>
        <div
          style={{
            padding: CONTENT_PADDING_X,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            ...contentStyle,
          }}
        >
          {children}
        </div>
      </Spin>
    </div>
  );
};
