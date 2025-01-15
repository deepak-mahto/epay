import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import useFetch from "../hooks/useFetch";

const Dashboard = () => {
  const { userBalance } = useFetch();

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={parseFloat(userBalance).toFixed(2)} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
