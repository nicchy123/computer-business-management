import { Col, Row, Select, Upload, message } from "antd";
import PrimaryForm from "../components/Forms/PrimaryForm";
import PrimaryInput from "../components/Inputs/PrimaryInput";
import { FieldValues } from "react-hook-form";
import { useAddProductMutation } from "../redux/features/products/prodcuts.api";
import Button from "../components/ui/Button";
import { DatePicker } from "antd";
import type { DatePickerProps, GetProps, UploadProps } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { EventHandler, useState } from "react";
import { useAppSelector } from "../redux/hook";
import { useCurrentUser } from "../redux/features/auth/authSlice";
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;
import uploadImage from "../utils/upLoadPhoto";
import { toast } from "sonner";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
type ValidationErrors = Record<string, string>;
const Create = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [condition, setCondition] = useState("New");
  const [category, setCategory] = useState("Personal Computer");
  const [brand, setBrand] = useState("Apple");
  const [ram, setRam] = useState("4 Gb");
  const [compatibility, setCompatibility] = useState("Windows");
  const [hardDrive, setHardDrive] = useState("200 Tb");
  const user = useAppSelector(useCurrentUser);
  const presentDate = dayjs();
  const [addProduct, { error }] = useAddProductMutation();
  const [selectedDate, setSelectedDate] = useState<string | [string, string]>(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const navigate = useNavigate();
  const onChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    const date = dayjs(JSON.stringify(dateString)).format("YYYY-MM-DD");
    setSelectedDate(date);
  };

  const onsubmit = async (data: FieldValues) => {
    setLoading(true);
    try {
      data.releaseDate = selectedDate;
      data.price = Number(data.price);
      data.quantity = Number(data.quantity);
      data.seller = user?._id;
      data.condition = condition;
      data.brand = brand;
      data.compatibility = compatibility;
      data.hardDrive = hardDrive;
      data.ram = ram;
      data.category = category;

      const imgData = await uploadImage("img1");
      const computerData = { ...data, productImage: imgData?.url };
      const result = await addProduct(computerData).unwrap();

      setLoading(false);
      if (result?.success as boolean) {
        setLoading(false);
        navigate("/")
        return toast.success("Your Product Created Successfully");
      }
    } catch (err: any) {
      setLoading(false);
      if (err?.data?.errorSources) {
        const errors: ValidationErrors = {};
        // @ts-ignore
        err?.data?.errorSources.forEach((err: ErrorSource) => {
          errors[err.path] = err.message;
        });
        setValidationErrors(errors);
      }
    }
  };

  return (
    <PrimaryForm
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
      }}
      onSubmit={onsubmit}
    >
      <Row
        style={{
          background: "#233E43",
          border: "1px solid black",
          borderRadius: "10px",
          padding: "30px 0",
          color:"white"
        }}
        justify={"center"}
        align={"middle"}
        gutter={100}
      >
        <Col lg={12} md={24}>
          <PrimaryInput
            type="name"
            name="name"
            placeholder="name"
            label="Name"
            // labelColor="black"
          />
          <p style={{ color: "red" }}>{validationErrors["name"]}</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3px",
      
            }}
          >
            <label>Product Image</label>
            <input
              required
              type="file"
              id="img1"
              accept="image/*"
              style={{
                margin: 0,
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                fontSize: "16px",
                width: "100%",
              }}
            />
            <p style={{ color: "#561C24", fontWeight:900 }}>{validationErrors["productImage"]}</p>
          </div>
          <PrimaryInput
            type="number"
            name="price"
            placeholder="price"
            label="Price"
          />
          <p style={{ color: "red" }}>{validationErrors["price"]}</p>
          <PrimaryInput
            type="number"
            name="quantity"
            placeholder="quantity"
            label="Quantity"
          />
          <label htmlFor="brand">Brand</label>
          <br />
          <Select
            defaultValue="Apple"
            style={{ width: "100%", height: "40px" }}
            onChange={(e) => setBrand(e)}
            aria-required
            options={[
              { value: "Apple", label: "Apple" },
              { value: "Dell", label: "Dell" },
              { value: "HP", label: "HP" },
              { value: "Lenovo", label: "Lenovo" },
              { value: "ASUS", label: "ASUS" },
              { value: "Acer", label: "Acer" },
              { value: "Microsoft", label: "Microsoft" },
              { value: "Toshiba", label: "Toshiba" },
              { value: "Sony", label: "Sony" },
              { value: "MSI ", label: "MSI " },
            ]}
          />
          <p style={{ color: "red" }}>{validationErrors["brand"]}</p>
          <div style={{ width: "100%", margin: "14px 0" }}>
            <label htmlFor="Compatibility">Compatibility</label>
            <br />
            <Select
              defaultValue="Windows"
              style={{ width: "100%", height: "40px", marginTop: "5px" }}
              onChange={(e) => setCompatibility(e)}
              aria-required
              options={[
                { value: "Windows", label: "Windows" },
                { value: "Mac", label: "Mac" },
                { value: "Linux", label: "Linux" },
              ]}
            />
            <p style={{ color: "red" }}>{validationErrors["compatibility"]}</p>
          </div>
          <PrimaryInput
            type="monitor"
            name="monitor"
            placeholder="monitor"
            label="Monitor"
          />{" "}
          <p style={{ color: "red" }}>{validationErrors["monitor"]}</p>
        </Col>
        <Col lg={12} md={24}>
          <label htmlFor="category">Category</label>
          <Select
            defaultValue="Personal Computer"
            style={{ width: "100%", height: "40px", marginTop: "5px" }}
            onChange={(e) => setCategory(e)}
            aria-required
            options={[
              { value: "Super Computer", label: "Super Computer" },
              { value: "Mainframe computer.", label: "Mainframe computer." },
              { value: "Mini Computer", label: "Mini Computer" },
              {
                value: "Workstation Computer",
                label: "Workstation Computer",
              },
              { value: "Personal Computer", label: "Personal Computer" },
              { value: "Server Computer.", label: "Server Computer." },
              { value: "Analog Computer.", label: "Analog Computer." },
              { value: "Digital Computer.", label: "Digital Computer." },
            ]}
          />
          <div style={{ width: "100%", margin: "14px 0" }}>
            <label style={{ marginBottom: "10px" }} htmlFor="brand">
              Ram
            </label>
            <br />
            <Select
              defaultValue="4 Gb"
              style={{ width: "100%", height: "45px", margin: "5px 0" }}
              onChange={(e) => setRam(e)}
              aria-required
              options={[
                { value: "1 Gb", label: "1 Gb" },
                { value: "2 Gb", label: "2 Gb" },
                { value: "3 Gb", label: "3 Gb" },
                { value: "4 Gb", label: "4 Gb" },
                { value: "8 Gb", label: "8 Gb" },
                { value: "16 Gb", label: "16 Gb" },
                { value: "16+ Gb", label: "16+ Gb" },
              ]}
            />
          </div>
          <PrimaryInput
            type="graphicsCard"
            name="graphicsCard"
            placeholder="graphicsCard"
            label="GraphicsCard"
          />
          <label htmlFor="condition">Condition</label>
          <br />
          <Select
            defaultValue="Used"
            style={{ width: "100%", height: "45px", marginTop: "5px" }}
            onChange={(e) => setCondition(e)}
            options={[
              { value: "Used", label: "Used" },
              { value: "New", label: "New" },
            ]}
          />

          <div style={{ width: "100%", margin: "14px 0" }}>
            <label style={{ marginBottom: "10px" }} htmlFor="brand">
              Hard Drive Disk Storage
            </label>
            <br />
            <Select
              defaultValue="200 Tb"
              style={{ width: "100%", height: "45px", margin: "5px 0" }}
              onChange={(e) => setHardDrive(e)}
              aria-required
              options={[
                { value: "50 Tb", label: "50 Tb" },
                { value: "100 Tb", label: "100 Tb" },
                { value: "200 Tb", label: "200 Tb" },
                { value: "300 Tb", label: "300 Tb" },
                { value: "400 Tb", label: "400 Tb" },
                { value: "500 Tb", label: "500 Tb" },
                { value: "500+ Tb", label: "500+ Tb" },
              ]}
            />
          </div>
          <PrimaryInput
            type="text"
            name="color"
            placeholder="color"
            label="Color"
          />
          <label htmlFor="date">Release Date</label>
          <DatePicker
            style={{ width: "100%", height: "45px", marginTop: "5px" }}
            defaultValue={dayjs(presentDate)}
            showNow
            onChange={onChange}
          />
        </Col>
      </Row>

      <div style={{ display: "inline", marginTop: "10px" }}>
        <Button disabled={loading ? true : false} type={"submit"}>
          {loading ? "Processing..." : "Create"}
        </Button>
      </div>

    </PrimaryForm>
  );
};

export default Create;
