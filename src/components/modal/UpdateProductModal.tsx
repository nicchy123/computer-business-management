import React, { useState } from "react";
import { Button, DatePicker, Modal, Row, Select, Spin } from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TProduct } from "../../types/types";
import { useUpdateProductMutation } from "../../redux/features/products/prodcuts.api";
import dayjs from "dayjs";
import { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import uploadImage from "../../utils/upLoadPhoto";

interface UpdateProductModalProps {
  modalOpen: boolean;
  setmodalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: TProduct;
}

const UpdateProductModal = ({
  modalOpen,
  setmodalOpen,
  product,
}: UpdateProductModalProps) => {
  const [productImage, setProductImage] = useState<Partial<File | null>>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs(product?.releaseDate)?.format("YYYY-MM-DD")
  );
  const { handleSubmit, register } = useForm<TProduct>();
  const [compatibility, setCompatibility] = useState("Windows");
  const [condition, setCondition] = useState("New");
  const [category, setCategory] = useState("Personal Computer");
  const [brand, setBrand] = useState("Apple");
  const [ram, setRam] = useState("4 Gb");
  const [hardDrive, setHardDrive] = useState("200 Tb");
  const [loading, setLoading] = useState(false);
  const [updateProduct] = useUpdateProductMutation();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProductImage(e.target.files[0]);
    }
  };
  const onChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: string
  ) => {
    const date = dayjs(JSON.stringify(dateString)).format("YYYY-MM-DD");
    setSelectedDate(date);
  };

  const onSubmit: SubmitHandler<TProduct> = async (data) => {
    data._id = product._id;
    data.price = Number(data.price);
    data.quantity = Number(data.quantity);
    data.releaseDate = selectedDate;
    data.condition = condition;
    data.brand = brand;
    data.compatibility = compatibility;
    data.hardDrive = hardDrive;
    data.ram = ram;
    data.category = category;
    try {
      setLoading(true);
      if (productImage) {
        const imgData = await uploadImage("updateImage");
        data.productImage = imgData?.url;
      }
      console.log(data)

      const res = await updateProduct(data).unwrap();

      if (res?.success) {
        toast.success("Product updated successfully");
        setmodalOpen(false);
      }
    } catch (error) {
      console.error("Error updating product", error);
      toast.error("Error updating product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button size="small" onClick={() => setmodalOpen(true)}>Update</Button>
      <Modal
        title="Update Product"
        centered
        open={modalOpen}
        footer={null}
        onOk={() => setmodalOpen(false)}
        onCancel={() => setmodalOpen(false)}
      >
        <div style={{ width: "100%", margin: "0 auto" }}>
          <Row justify={"center"} align={"middle"}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "5px",
                justifyContent: "start",
                alignItems: "center",
                margin: "20px 0",
              }}
            >
              <label htmlFor="name">Name</label>
              <input
                {...register("name")}
                defaultValue={product.name}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "2px solid #777777",
                  outline: "0",
                }}
                type="text"
                name="name"
                placeholder="Name"
              />

              <label>Update Product Image?</label>
              <input
                onChange={(e:any)=>handleImageChange(e)}
                type="file"
                id="updateImage"
                accept="image/*"
                style={{
                  margin: 0,
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  fontSize: "16px",
                  width: "100%",
                  outline: "0",
                }}
              />

              <label htmlFor="price">Price</label>
              <input
                {...register("price")}
                defaultValue={product.price}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid gray",
                  outline: "0",
                }}
                type="number"
                name="price"
                placeholder="Price"
              />

              <label htmlFor="quantity">Quantity</label>
              <input
                {...register("quantity")}
                defaultValue={product.quantity}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid gray",
                  outline: "0",
                }}
                type="number"
                name="quantity"
                placeholder="Quantity"
              />

              <div style={{ width: "100%", margin: "1px 0" }}>
                <label htmlFor="Compatibility">Compatibility</label>
                <br />
                <Select
                  defaultValue="Windows"
                  style={{ width: "100%", height: "40px", marginTop: "2px" }}
                  onChange={(e) => setCompatibility(e)}
                  aria-required
                  options={[
                    { value: "Windows", label: "Windows" },
                    { value: "Mac", label: "Mac" },
                    { value: "Linux", label: "Linux" },
                  ]}
                />
              </div>

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

              <label htmlFor="monitor">Monitor</label>
              <input
                {...register("monitor")}
                defaultValue={product.monitor}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid gray",
                  outline: "0",
                }}
                type="text"
                name="monitor"
                placeholder="Monitor"
              />

              <label htmlFor="category">Category</label>
              <Select
                defaultValue="Personal Computer"
                style={{ width: "100%", height: "40px" }}
                onChange={(e) => setCategory(e)}
                aria-required
                options={[
                  { value: "Super Computer", label: "Super Computer" },
                  {
                    value: "Mainframe computer.",
                    label: "Mainframe computer.",
                  },
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

              <label htmlFor="graphicsCard">Graphics Card</label>
              <input
                {...register("graphicsCard")}
                defaultValue={product.graphicsCard}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid gray",
                  outline: "0",
                }}
                type="text"
                name="graphicsCard"
                placeholder="Graphics Card"
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

              <label htmlFor="color">Color</label>
              <input
                {...register("color")}
                defaultValue={product.color}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid gray",
                  outline: "0",
                }}
                type="text"
                name="color"
                placeholder="Color"
              />

              <label htmlFor="releaseDate">Release Date</label>
              <DatePicker
                style={{ width: "100%" }}
                defaultValue={dayjs(product?.releaseDate)}
                showNow
                onChange={onChange}
              />

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  style={{ width: "30%", marginTop: "10px" }}
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                >
                  Update
                </Button>
              </div>
            </form>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default UpdateProductModal;
