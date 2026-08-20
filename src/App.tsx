import { useEffect } from "react";
import { TableList } from "./components/TableList";
import type { TableChangeParams } from "./components/TableList/TableList";
import { useDispatch, useSelector } from "react-redux";

import {
  setDataSource,
  setPage,
  setPageSize,
} from "./stores/slices/userSlice";

import type { RootState, AppDispatch } from "./stores/store";
import { Editortiny } from "./components/Editortiny";

export type UserRow = {
  id: number;
  student_name: string;
  phone: string;
  address: string;
};

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    data: dataSource,
    page,
    pageSize,
    total,
  } = useSelector((state: RootState) => state.user);
  console.log(dataSource.length,page,pageSize,total);
  
  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await fetch(
          "https://64f015de8a8b66ecf77923a7.mockapi.io/api/Student"
        );

        const data: UserRow[] = await response.json();

        dispatch(setDataSource(data));
      } catch (error) {
        console.error(error);
      }
    };

    getStudents();
  }, [dispatch]);

  const handleTableChange = (params: TableChangeParams) => {
    dispatch(setPage(params.page));
    dispatch(setPageSize(params.pageSize));
  };

  return (
    <>
    <TableList<UserRow>
      dataSource={dataSource}
      total={total}
      page={page}
      pageSize={pageSize}
      customPage={true}
      loading={false}
      onTableChange={handleTableChange}
      columns={[
        {
          title: "Tên học sinh",
          dataIndex: "student_name",
          key: "student_name",
          sorter: true,
        },
        {
          title: "Điện thoại",
          dataIndex: "phone",
          key: "phone",
          sorter: true,
        },
        {
          title: "Địa chỉ",
          dataIndex: "address",
          key: "address",
          sorter: true,
        },
      ]}
    />
    <Editortiny/>
    </>
  );
};