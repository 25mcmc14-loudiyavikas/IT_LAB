import React, { useEffect, useState } from "react";
import API from "./api";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState([]);

  // FETCH USERS
  const fetchUsers = async () => {
    const res = await API.get("/");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ADD USER (Optimistic UI)
  const addUser = async (user) => {
    const tempUsers = [...users, user];
    setUsers(tempUsers);

    try {
      await API.post("/", user);
      fetchUsers();
    } catch {
      setUsers(users); // rollback
    }
  };

  // DELETE USER (Optimistic UI)
  const deleteUser = async (id) => {
    const tempUsers = users.filter((u) => u.id !== id);
    setUsers(tempUsers);

    try {
      await API.delete(`/${id}`);
    } catch {
      fetchUsers(); // rollback
    }
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <UserForm addUser={addUser} />
      <UserList users={users} deleteUser={deleteUser} />
    </div>
  );
}

export default App;
