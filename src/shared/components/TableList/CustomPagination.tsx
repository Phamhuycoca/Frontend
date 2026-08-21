import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Select, Input, Button } from 'antd';
import { useState } from 'react';

type CustomPaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  pageSizeOptions?: number[];
  onChange: (page: number, pageSize: number) => void;
};

const CustomPagination = ({
  page,
  pageSize,
  total,
  pageSizeOptions = [10, 20, 50, 100],
  onChange,
}: CustomPaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const [pageInput, setPageInput] = useState<string>(String(page));
  // Track prop `page` gần nhất đã đồng bộ — không dùng effect
  const [syncedPage, setSyncedPage] = useState<number>(page);

  // Điều chỉnh state ngay trong render nếu prop `page` đổi từ bên ngoài
  // (React chính thức khuyến nghị pattern này thay cho useEffect)
  if (page !== syncedPage) {
    setSyncedPage(page);
    setPageInput(String(page));
  }

  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const goToPage = (p: number) => {
    const clamped = Math.min(Math.max(p, 1), totalPages);
    onChange(clamped, pageSize);
  };

  const commitPageInput = () => {
    const num = parseInt(pageInput, 10);
    if (!isNaN(num)) {
      goToPage(num);
    } else {
      setPageInput(String(page));
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>Hiển thị</span>
        <Select
          value={pageSize}
          onChange={(value) => onChange(1, value)}
          options={pageSizeOptions.map((size) => ({
            label: `${size} / trang`,
            value: size,
          }))}
          style={{ width: 110 }}
          size="small"
        />
      </div>

      <div style={{}}>
        {from} - {to} trong số {total}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #d9d9d9',
          borderRadius: 6,
          overflow: 'hidden',
        }}
      >
        <Button
          type="text"
          size="small"
          icon={<LeftOutlined />}
          disabled={page <= 1}
          onClick={() => goToPage(page - 1)}
          style={{ borderRadius: 0 }}
        />
        <Input
          value={pageInput}
          onChange={(e) => setPageInput(e.target.value.replace(/\D/g, ''))}
          onBlur={commitPageInput}
          onPressEnter={commitPageInput}
          size="small"
          style={{
            width: 40,
            textAlign: 'center',
            border: 'none',
            borderLeft: '1px solid #d9d9d9',
            borderRight: '1px solid #d9d9d9',
            borderRadius: 0,
          }}
        />
        <span style={{ padding: '0 8px', color: '#8c8c8c' }}>/ {totalPages}</span>
        <Button
          type="text"
          size="small"
          icon={<RightOutlined />}
          disabled={page >= totalPages}
          onClick={() => goToPage(page + 1)}
          style={{ borderRadius: 0 }}
        />
      </div>
    </div>
  );
};

export default CustomPagination;
