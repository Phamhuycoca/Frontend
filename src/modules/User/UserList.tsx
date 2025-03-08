import React from 'react';
import useAuth from '../../hooks/useAuth';

const UserList: React.FC = () => {
  const { isAuthenticated } = useAuth();
  console.log('isAuthenticated', isAuthenticated);

  return <h1>ok</h1>;
};

export default UserList;
