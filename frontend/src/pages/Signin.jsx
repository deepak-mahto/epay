import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="bg-slate-100 h-screen flex justify-center items-center">
      <div className="rounded-lg bg-white w-96 text-center p-8 shadow-lg">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox
          onChange={(e) => setUsername(e.target.value)}
          placeholder={"deepak@gmail.com"}
          label={"Email"}
        />
        <InputBox
          onChange={(e) => setPassword(e.target.value)}
          placeholder={"123456"}
          label={"Password"}
          type={"password"}
        />
        <div className="pt-4">
          <Button
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
                {
                  username,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
              window.location.href = "/dashboard";
            }}
            label={"Sign in"}
          />
        </div>
        <BottomWarning
          label={"Don't have an account?"}
          buttonText={"Sign up"}
          to={"/signup"}
        />
      </div>
    </div>
  );
};

export default Signin;
