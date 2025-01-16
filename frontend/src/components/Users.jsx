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
        `https://epay-ou6w.onrender.com/api/v1/user/bulk?filter=${filter}`
      );
      setUsers(response.data.user);
    };
    getUsers();
  }, [debounceVal]);

  return (
    <div className="mt-8">
      <div className="font-bold text-2xl text-slate-800 mb-4">Users</div>
      <div className="mb-6">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />
      </div>
      <div className="space-y-4">
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

const User = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center space-x-4">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center">
          <div className="text-xl font-semibold text-slate-700">
            {user.firstName[0]}
          </div>
        </div>
        <div className="text-slate-800 font-medium">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <Button
        onClick={() => {
          navigate(
            `/send?id=${user._id}&name=${user.firstName} ${user.lastName}`
          );
        }}
        label={"Send Money"}
      />
    </div>
  );
};

export default Users;
