import React, { useState } from "react";
import { Flex, Radio, RadioChangeEvent, Row } from "antd";
import { FieldValues } from "react-hook-form";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/features/auth/authApi";
import RegisterForm from "../components/Forms/RegisterForm";
import PrimaryInput from "../components/Inputs/PrimaryInput";
import Title from "antd/es/typography/Title";

type ErrorSource = {
  path: string | number;
  message: string;
};

type ValidationErrors = Record<string, string>;

const Register: React.FC = () => {
  const [role, setRole] = useState("buyer");
  const navigate = useNavigate();
  const [registerUser, { error, isLoading }] = useRegisterMutation();
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const onsubmit = async (data: FieldValues) => {
    console.log(data);
    try {
      const userInfo = {
        name: data.name as string,
        email: data.email as string,
        password: data.password as string,
        role
      };
      console.log(userInfo);
      const result = await registerUser(userInfo).unwrap();
      if (result.success) {
        navigate("/login");
      }
    } catch (error: any) {
      if (error?.data?.errorSources) {
        const errors: ValidationErrors = {};
        error.data.errorSources.forEach((err: ErrorSource) => {
          errors[err.path.toString()] = err.message;
        });
        setValidationErrors(errors);
      }
    }
  };

  const options = [
    { label: "Buyer", value: "buyer" },
    { label: "Seller", value: "seller" },
    { label: "Manager", value: "manager" },
  ];

  const handleUserRole = ({ target: { value } }: RadioChangeEvent) => {
    console.log("radio3 checked", value);
    setRole(value);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#233E43",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Roboto",
      }}
    >
      <Row
        justify={"center"}
        align={"middle"}
        style={{
          background: "white",
          color: "black",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "50px",
          borderRadius: "10px",
          margin: "10px 10px",
        }}
      >
        <Title
          color="black"
          level={2}
          style={{
            fontWeight: "bold",
            margin: 0,
            textAlign: "center",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          Register To ComputerZone
        </Title>
        <RegisterForm style={{ width: "100%", display:"flex", flexDirection:"column", gap:"5px" }} onSubmit={onsubmit}>
          <PrimaryInput
            type="name"
            name="name"
            placeholder="name"
            label="Name"
            labelColor="black"
          />
          <p style={{ color: "red", fontSize: "15px" }}>
            {validationErrors["name"]}
          </p>

          <PrimaryInput
            type="email"
            name="email"
            placeholder="email"
            label="Email"
            labelColor="black"
          />
          <p style={{ color: "red", fontSize: "15px" }}>
            {validationErrors["email"]}
          </p>

          <PrimaryInput
            type="password"
            name="password"
            placeholder="password"
            label="Password"
            labelColor="black"
          />
          <p style={{textAlign:"center"}}>User Role ⬇️</p>
          <Flex style={{margin:"5px"}} justify="center" align="middle">
            <Radio.Group
              defaultValue={"Buyer"}
              options={options}
              onChange={handleUserRole}
              value={role}
              optionType="button"
            />
          </Flex>
          <p style={{ color: "red", textAlign:"center", fontSize: "15px", marginBottom:"10px" }}>
            {validationErrors["role"]}
          </p>
          <p style={{ color: "red" }}>{validationErrors["password"]}</p>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit">
              {isLoading ? "Registering" : "Register"}
            </Button>
          </div>
          <p style={{ textAlign: "center", margin: "10px 0" }}>
            Already have an account{" "}
            <span
              onClick={() => navigate("/login")}
              style={{ color: "green", cursor: "pointer" }}
            >
              Login
            </span>
          </p>
        </RegisterForm>
      </Row>
    </div>
  );
};

export default Register;
