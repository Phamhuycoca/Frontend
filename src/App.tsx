import { useEffect } from 'react';
import { TableList } from './components/TableList';
import type { TableChangeParams } from './components/TableList/TableList';
import { useDispatch, useSelector } from 'react-redux';
import { useLoading } from './hooks/useLoading';
import { setDataSource, setPage, setPageSize } from './stores/slices/userSlice';

import type { RootState, AppDispatch } from './stores/store';
import { UploadFile, UploadImage } from './components/Upload';

export type UserRow = {
  id: number;
  student_name: string;
  phone: string;
  address: string;
};

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: dataSource, page, pageSize, total } = useSelector((state: RootState) => state.user);
  const { loading, startLoading, stopLoading } = useLoading();
  useEffect(() => {
    const getStudents = async () => {
      try {
        startLoading();
        const response = await fetch('https://64f015de8a8b66ecf77923a7.mockapi.io/api/Student');

        const data: UserRow[] = await response.json();

        dispatch(setDataSource(data));
      } catch (error) {
        console.error(error);
      } finally {
        stopLoading();
      }
    };

    getStudents();
  }, [dispatch, startLoading, stopLoading]);

  const handleTableChange = (params: TableChangeParams) => {
    dispatch(setPage(params.page));
    dispatch(setPageSize(params.pageSize));
  };

  return (
    <>
      <TableList<UserRow>
        showSearch
        filterFields={[
          {
            name: 'student_name',
            label: 'Tên học sinh',
            type: 'input',
          },
          {
            name: 'address',
            label: 'Tên học sinh',
            type: 'date',
            format: 'DD/MM/YYYY',
          },
          {
            name: 'donViId',
            label: 'Đơn vị',
            type: 'tree-select',
            span: 6,
            treeData: [
              {
                title: 'Trung ương',
                value: 'tw',
                children: [
                  {
                    title: 'Đơn vị A',
                    value: 'a',
                  },
                  {
                    title: 'Đơn vị B',
                    value: 'b',
                  },
                ],
              },
              {
                title: 'Tỉnh Hà Nội',
                value: 'hn',
                children: [
                  {
                    title: 'Quận Hoàn Kiếm',
                    value: 'hk',
                  },
                  {
                    title: 'Quận Ba Đình',
                    value: 'bd',
                  },
                ],
              },
            ],
          },
        ]}
        dataSource={dataSource}
        total={total}
        page={page}
        pageSize={pageSize}
        customPage={true}
        loading={loading}
        onTableChange={handleTableChange}
        columns={[
          {
            title: 'Tên học sinh',
            dataIndex: 'student_name',
            key: 'student_name',
            sorter: true,
          },
          {
            title: 'Điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            sorter: true,
          },
          {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            sorter: true,
          },
        ]}
      />
      <UploadImage />
      <UploadFile
        accept=".pdf,.doc,.docx,.xlsx"
        maxSizeMB={20}
        onUploaded={(res) => console.log(res)}
      />
    </>
  );
};
