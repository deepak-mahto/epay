import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import Appbar from "../components/Appbar";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-slate-100 h-screen flex justify-center items-center">
      <Appbar />
      <div className="rounded-lg bg-white w-96 text-center p-8 shadow-lg">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your information to create an account"} />
        <InputBox
          onChange={(e) => setFirstName(e.target.value)}
          placeholder={"John"}
          label={"First Name"}
        />
        <InputBox
          onChange={(e) => setLastName(e.target.value)}
          placeholder={"Doe"}
          label={"Last Name"}
        />
        <InputBox
          onChange={(e) => setUsername(e.target.value)}
          placeholder={"johndoe01@gmail.com"}
          label={"Email"}
        />
        <InputBox
          onChange={(e) => setPassword(e.target.value)}
          placeholder={"123456"}
          label={"Password"}
        />
        <div className="pt-4">
          <Button
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  firstName,
                  lastName,
                  username,
                  password,
                }
              );
              localStorage.setItem("token", response.data.token);
              window.location.href = "/dashboard";
            }}
            label={"Sign up"}
          />
        </div>
        <BottomWarning
          label={"Already have an account?"}
          buttonText={"Sign in"}
          to={"/signin"}
        />
      </div>
    </div>
  );
};

export default Signup;
