import Balance from "../components/Balance";
import Users from "../components/Users";
import useFetch from "../hooks/useFetch";

const Dashboard = () => {
  const { userBalance } = useFetch();

  return (
    <div>
      <div className="container mx-auto px-4 pt-20">
        <Balance value={parseFloat(userBalance).toFixed(2)} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
