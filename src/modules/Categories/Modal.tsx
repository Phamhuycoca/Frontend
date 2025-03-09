import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import CategoryService from './CategoryService';
import { useForm } from 'antd/es/form/Form';

type ModalFormProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel: () => void;
};
type FieldType = {
  name: string;
  index: string | number;
  parentId: string | number;
  level: 0;
};
type lstCategory = {
  id: string;
  name: string;
};

const EspModal: React.FC<ModalFormProps> = ({ open, setOpen, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [listCategory, setListCategory] = useState<lstCategory[]>([]);

  const fetchData = useCallback((page: number, page_size: number) => {
    CategoryService.getAll({ page, page_size })
      .then((res) => {
        setListCategory(res.data as lstCategory);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    fetchData(1, 0);
  }, [fetchData]);
  // const handleOk = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     setOpen(false); // Close the modal after 3 seconds
  //   }, 3000);
  // };
  const onFinish = async (values: FieldType) => {
    CategoryService.create({ ...values, level: 0 }).then((res) => {
      console.log(res.message);
      setLoading(false);
      setOpen(false);
      onCancel();
      form.resetFields();
    });
  };
  return (
    <>
      <Modal
        open={open} // Controlled by the parent component
        title="Thêm mới thông tin"
        onCancel={onCancel} // This will call the onCancel passed from parent to hide modal
        footer={[
          <Button key="back" onClick={onCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={form.submit}>
            Submit
          </Button>,
        ]}
      >
        <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
          <Form.Item<FieldType>
            label="name"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="parentId" name="parentId">
            <Select
              showSearch
              options={listCategory.map((item) => ({
                value: item.id, // Dùng index nếu id không có
                label: item.name, // Nếu name rỗng, dùng index
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EspModal;
