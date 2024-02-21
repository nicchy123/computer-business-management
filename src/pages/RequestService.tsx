import { FieldValues, SubmitHandler, useFormContext } from "react-hook-form";
import CWForm from "../components/Forms/CWForm";
import { Button, DatePicker, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import CWInput from "../components/Inputs/CWInput";
import { useState } from "react";
import dayjs from "dayjs";
import {
  useCreateServiceRequestMutation,
  useGetServiceRequestQuery,
} from "../redux/features/serviceRequest/serviceRequest.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import { useCurrentUser } from "../redux/features/auth/authSlice";

const RequestService = () => {
  const userData = useAppSelector(useCurrentUser);
  const navigate = useNavigate();
  const data = useGetServiceRequestQuery(userData?._id);
  console.log(data)
  const [createServiceRequest, { error }] = useCreateServiceRequestMutation();
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    data.user = userData!._id;
    data.details = details;
    data.serviceDateAndTime = dayjs(date).format("YYYY-MM-DD HH:mm:ss");
    const res = (await createServiceRequest(data)) as any;
    if (res?.data?.success) {
      toast.success("Service Request created successfully");
      navigate("/");
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        Request a service
      </h1>

      <Row></Row>

      <Row justify={"center"}>
        <CWForm
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
          onSubmit={onSubmit}
        >
          <CWInput
            name="name"
            placeholder="Your Computer Name"
            type="text"
            key={"name"}
            label="Your Computer Name"
            labelColor="black"
          />
          <CWInput
            name="brand"
            placeholder="Your Computer Brand Name"
            type="text"
            key={"brand"}
            label="Your Computer Brand"
            labelColor="black"
          />
          <CWInput
            name="sellerEmail"
            placeholder="Your Computer Seller Email"
            type="email"
            key={"email"}
            label="Your Computer Seller Email"
            labelColor="black"
          />

          <>
            <label htmlFor="Describe">Service Date & Time</label>
            <DatePicker
              onChange={(e: any) => setDate(e)}
              defaultValue={dayjs(Date.now())}
              showTime
            />
          </>
          <label htmlFor="Describe">Describe</label>
          <TextArea
            onChange={(e: any) => setDetails(e.target.value)}
            size="large"
            required
          />
          {error && <p style={{color:"red"}}>{(error as any).data?.message}</p>}
          <Button color="blue" htmlType="submit">
            Submit
          </Button>
        </CWForm>
      </Row>
    </div>
  );
};

export default RequestService;
