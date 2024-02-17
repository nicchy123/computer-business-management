import { Row, Typography, message } from "antd";
import PrimaryForm from "../components/Forms/PrimaryForm";
import PrimaryInput from "../components/Inputs/CWInput";
import { FieldValues } from "react-hook-form";
import Button from "../components/ui/Button";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { verifyToken } from "../utils/verifyToken";
import { useLoginMutation } from "../redux/features/auth/authApi";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { error }] = useLoginMutation();

  const onsubmit = async (data: FieldValues) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();
    const user = verifyToken(res.data.accessToken);
    dispatch(setUser({ user: user, token: res.data.accessToken }));
    if (!!user) {
      navigate("/");
    }
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
      }}
    >
      <Row
        justify={"center"}
        align={"middle"}
        style={{ background: "white", color:"black", display: "flex", flexDirection: "column", gap: "10px", padding: "50px", borderRadius:"10px" }}
      >
        <Typography
          
          style={{
            margin: 0,
            textAlign: "center",
            paddingTop: "10px",
            paddingBottom: "10px",
            fontSize:"1.5rem",
            fontWeight:"bold",
          }}
        >
          Login To ComputerZone
        </Typography>
        <PrimaryForm style={{width:"100%", display:"flex", flexDirection:"column", gap:"5px"}} onSubmit={onsubmit}>
          <PrimaryInput
            type="email"
            name="email"
            placeholder="email"
            label="Email"
            labelColor="black"
          />
          <PrimaryInput
            type="password"
            name="password"
            placeholder="password"
            label="Password"
            labelColor="black"
          />
         {/* @ts-ignore */}
         <p style={{ color: "red" }}> {error?.data?.message as string}</p>
          <p style={{ margin:"10px 0", textAlign:"center" }}>
            New to computerZone? {""}
            <Link to={"/register"} style={{ color: "green", cursor: "pointer" }}>
              Register
            </Link>
          </p>
 
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit">Login</Button>
          </div>
        </PrimaryForm>
      </Row>
    </div>
  );
};

export default Login;
