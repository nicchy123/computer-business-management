import {
  Controller,
  FieldValues,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";
import { Button, Col, DatePicker, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import CWInput from "../components/Inputs/CWInput";
import dayjs from "dayjs";
import {
  useCreateServiceRequestMutation,
  useGetServiceRequestQuery,
} from "../redux/features/serviceRequest/serviceRequest.api";
import { toast } from "sonner";
import { useAppSelector } from "../redux/hook";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import CWForm from "../components/Forms/CWForm";

const RequestService = () => {
  const userData = useAppSelector(useCurrentUser);
  const formData = useFormContext<FieldValues>();
  const { data } = useGetServiceRequestQuery(userData?._id);
  const [createServiceRequest, { error }] = useCreateServiceRequestMutation();
  const methods = useFormContext();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const requestData = {
      ...data,
      user: userData!._id,
      serviceDateAndTime: dayjs(data.serviceDateAndTime).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
    };
    const res = (await createServiceRequest(requestData)) as any;
    console.log(res)
    if (res?.data?.success) {
      methods.reset();
      toast.success("Service Request created successfully");
    }
  };

  return (
    <div style={{ margin: "10px 0" }}>
      <h1>Requested Services</h1>
      <Row
        gutter={[20, 0]}
        style={{
          background: "#233E43",
          padding: "20px",
          margin: "10px",
          borderRadius: "10px",

        }}
        justify={"start"}
        align={"middle"}
      >
        {data?.data?.map((item: any, index: number) => (
          <Col   key={index} lg={6} md={12} style={{ marginBottom: "20px",    width: "100%", }}>
            <div
              style={{
                background: index % 2 === 0 ? "lightgray" : "gray",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                width: "100%",
                height: "100%",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <p style={{ margin: 0, fontWeight: "bold", fontSize: "18px",  }}>
                  {item?.brand}
                </p>
                <p style={{ margin: 0, color: "black" }}>
                  {item?.serviceDateAndTime}
                </p>
              </div>
              <p>{item?.details?.slice(0, 50) + "..."}</p>
            </div>
          </Col>
        ))}
      </Row>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>
        Request a service
      </h1>
      <Row justify={"center"}>
        <CWForm
          onSubmit={onSubmit}
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom:"10px"
          }}
        >
          <CWInput
            name="name"
            placeholder="Your Computer Name"
            type="text"
            label="Your Computer Name"
            labelColor="black"
          />
          <CWInput
            name="brand"
            placeholder="Your Computer Brand Name"
            type="text"
            label="Your Computer Brand"
            labelColor="black"
          />
          <CWInput
            name="sellerEmail"
            placeholder="Your Computer Seller Email"
            type="email"
            label="Your Computer Seller Email"
            labelColor="black"
          />
          <>
            <label htmlFor="serviceDateAndTime">Service Date & Time</label>

            <DatePicker
              {...formData?.register("serviceDateAndTime")}
              defaultValue={dayjs(new Date())}
              onChange={() => console.log("hi")}
              showTime
            />
          </>

          <label htmlFor="details">Describe</label>
          <Controller
            name="details"
            rules={{ required: true }}
            render={({ field }) => (
              <TextArea
                {...field}
                {...formData?.register("details")}
                size="large"
              />
            )}
          />

          {error && <p style={{color:"red"}}> {(error as any)?.data?.message}</p>}

          <Button color="blue" htmlType="submit">
            Submit
          </Button>
        </CWForm>
      </Row>
    </div>
  );
};

export default RequestService;
