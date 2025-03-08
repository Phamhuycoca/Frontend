import React from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../services/hooks/useAuth';

type FieldType = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, logout } = useAuth();
  const onFinish = async (values: FieldType) => {
    console.log('Success:', values);
    try {
      await login(values.username, values.password);
      console.log('Đăng nhập thành công!');
      navigate('/users');
    } catch (error) {
      console.error('Đăng nhập thất bại:', error);
    }
  };

  return (
    <>
      <h1>{isAuthenticated ? 'Đã đăng nhập' : 'Chưa đăng nhập'}</h1>
      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <Button type="primary" htmlType="submit" onClick={logout}>
        Logout
      </Button>
    </>
  );
};

export default LoginPage;
