import React, { useCallback, useEffect, useState } from 'react';
import { Button, Pagination, Row, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import EspModal from './Modal';
import CategoryService, { ICategory } from './CategoryService';
import { useDispatch, useSelector } from 'react-redux';
import { setPaginationData } from '../../reducers/Category.slice';

// Các cột trong bảng
const columns: TableColumnsType<ICategory> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Index',
    dataIndex: 'index',
    key: 'index',
    width: '12%',
  },
  {
    title: 'Level',
    dataIndex: 'level',
    key: 'level',
  },
];

const EspList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const categories = useSelector((state: any) => state.categories || { data: [], total: 0, page: 1, page_size: 20 });
  const dispatch = useDispatch();

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
    fetchData(categories.page, categories.page_size);
  };

  const fetchData = useCallback(
    (page: number, page_size: number) => {
      CategoryService.getAll({ page, page_size })
        .then((res) => {
          dispatch(
            setPaginationData({
              data: res.data,
              total: res.total,
              page: res.page,
              page_size: res.page_size,
            }),
          );
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    },
    [dispatch],
  );

  useEffect(() => {
    if (!categories.data.length) {
      fetchData(1, 20);
    }
  }, [fetchData]);

  return (
    <>
      <Row justify="end" className="mb-2">
        <Button onClick={showModal}>Thêm mới</Button>
      </Row>

      <Table<ICategory>
        rowKey="index"
        columns={columns}
        dataSource={categories.data}
        footer={() => (
          <Pagination
            style={{ textAlign: 'right' }} // Căn phải phân trang
            total={categories.total}
            current={categories.page}
            simple
            pageSize={categories.page_size > 0 ? categories.page_size : categories.total}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            onChange={(current, pageSize) => {
              fetchData(current, pageSize);
            }}
            showSizeChanger
            pageSizeOptions={['10', '20', '30', '50']}
          />
        )}
      />

      <EspModal open={open} setOpen={setOpen} onCancel={hideModal} />
    </>
  );
};

export default EspList;
