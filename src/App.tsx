import { TableList } from "./components/TableList";
import type { TableChangeParams } from "./components/TableList/TableList";
type UserRow = { id: number; name: string };
export const App = () => {
  const handleTableChange = (params: TableChangeParams) => {
    console.log('params:', params); // { page, pageSize, sortField?, sortOrder? }
    // gọi API 1 chỗ duy nhất
  };

  return (
    <>
      <TableList<UserRow>
        onTableChange={handleTableChange}
        showSearch={true}
        dataSource={[
          { id: 1, name: 'aaa' },
          { id: 2, name: 'aaaa' },
        ]}
        filterFields={[
          {
            name: 'status',
            label: 'Trạng thái',
            type: 'select',
            options: [
              { label: 'Hoạt động', value: 'active' },
              { label: 'Ngừng hoạt động', value: 'inactive' },
            ],
          },
          {
            name: 'code',
            label: 'Mã',
            type: 'input',
          },
          {
            name: 'dateRange',
            label: 'Khoảng thời gian',
            type: 'dateRange',
            span: 8,
          },
        ]}
        onFilter={(values) => {
          console.log('filter values:', values);
          // gọi API fetch lại data theo values
        }}
        customPage={true}
        total={10}
        page={1}
        pageSize={1}
        loading={false}
        columns={[
          { title: 'Tên', dataIndex: 'name', key: 'name', sorter: true },
        ]}
      />
    </>
  )
};