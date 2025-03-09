import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const history = useNavigate();
  const handler = () => {
    history(-1);
  };
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={handler}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFound;
