import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './stores/store';
import axios from 'axios';
import { setPaginationData } from './reducers/User.slice';
function App() {
  const users = useSelector((state: RootState) => state.users.data);
  console.log(useSelector((state: RootState) => state.users));

  const dispatch = useDispatch();
  const fetchData = useCallback(() => {
    axios
      .get('https://localhost:5000/api/User/List')
      .then((res) => {
        console.log(res.data);
        dispatch(setPaginationData(res.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    fetchData();
  }, []);
  const deleteUser = (id: number) => {
    axios
      .delete(`https://localhost:5000/api/User/${id}`)
      .then((res) => {
        alert(res.data.message);
        fetchData();
      })
      .catch((error) => {
        alert(error.response.data.errors);
      });
  };
  return (
    <div className="container">
      <h2>CRUD</h2>
      <button className="btn btn-success my-2">Create +</button>
      <table className="table">
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Password</td>
            <td>Role</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-warning">Edit</button>
                <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
