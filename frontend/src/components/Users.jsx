import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useDebounce } from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const debounceVal = useDebounce(filter, 200);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/bulk?filter=${filter}`
      );
      setUsers(response.data.user);
    };
    getUsers();
  }, [debounceVal]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </>
  );
};

const User = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button
          onClick={() => {
            navigate(
              `/send?id=${user._id}&name=${user.firstName} ${user.lastName}`
            );
          }}
          label={"Send money"}
        />
      </div>
    </div>
  );
};

export default Users;
