import React, { useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Modal,
  Row,
  Select,
  Spin,
} from "antd";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TProduct } from "../../types/types";
import { useAddProductMutation } from "../../redux/features/products/prodcuts.api";
import dayjs from "dayjs";
import uploadImage from "../../utils/upLoadPhoto";
import { RangePickerProps } from "antd/es/date-picker";
import { useAppSelector } from "../../redux/hook";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

interface UpdateProductModalProps {
  modalOpen: boolean;
  setmodalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: TProduct;
}

const DuplicateModal = ({
  modalOpen,
  setmodalOpen,
  product,
}: UpdateProductModalProps) => {
  const { handleSubmit, register } = useForm();
  const [loading, setLoading] = useState(false);
  const [addProduct] = useAddProductMutation();
  const [productImage, setProductImage] = useState<Partial<File | null>>(null);
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs(product?.releaseDate)?.format("YYYY-MM-DD")
  );

  const user = useAppSelector(useCurrentUser);
  const userId = user?._id as string;
  const onChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: string
  ) => {
    const date = dayjs(JSON.stringify(dateString))?.format("YYYY-MM-DD");
    setSelectedDate(date);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProductImage(e.target.files[0]);
    }
  };

  const onSubmit: SubmitHandler<any> = async (data) => {
    data.price = Number(data.price);
    data.quantity = Number(data.quantity);
    data.productImage = product?.productImage;
    data.releaseDate = selectedDate;
    data.seller = userId;

    try {
      setLoading(true);
      if (productImage) {
        const imgData = await uploadImage("selectedImage");
        data.productImage = imgData?.url;
      }

      const res = await addProduct(data).unwrap();

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
      <Button size="small" onClick={() => setmodalOpen(true)}>Create Variant</Button>
      <Modal
        title="Duplicate Product & Sell"
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
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
                type="text"
                name="name"
                placeholder="Name"
              />
              <label htmlFor="image">Change Image?</label>
              <input
                onChange={handleImageChange}
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
                type="file"
                name="image"
                placeholder="Image"
                id="selectedImage"
              />

             

              <label htmlFor="price">Price</label>
              <input
                {...register("price")}
                defaultValue={product.price}
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
                type="number"
                name="price"
                placeholder="Price"
              />

              <label htmlFor="compatibility">Compatibility</label>
              <input
                {...register("compatibility")}
                defaultValue={product?.compatibility}
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
                type="text"
                name="compatibility"
                placeholder="compatibility"
              />

              <label htmlFor="quantity">Quantity</label>
              <input
                {...register("quantity")}
                defaultValue={product.quantity}
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
                type="number"
                name="quantity"
                placeholder="Quantity"
              />

              <label htmlFor="brand">Brand</label>
              <input
                {...register("brand")}
                defaultValue={product.brand}
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
                type="text"
                name="brand"
                placeholder="Brand"
              />

              <label htmlFor="monitor">Monitor</label>
              <input
                {...register("monitor")}
                defaultValue={product.monitor}
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
                type="text"
                name="monitor"
                placeholder="Monitor"
              />

              <label htmlFor="category">Category</label>
              <input
                {...register("category")}
                defaultValue={product.category}
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
                type="text"
                name="category"
                placeholder="Category"
              />

              <label htmlFor="ram">RAM</label>
              <input
                {...register("ram")}
                defaultValue={product.ram}
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
                type="text"
                name="ram"
                placeholder="RAM"
              />

              <label htmlFor="graphicsCard">Graphics Card</label>
              <input
                {...register("graphicsCard")}
                defaultValue={product.graphicsCard}
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
                type="text"
                name="graphicsCard"
                placeholder="Graphics Card"
              />

              <label htmlFor="condition">Condition</label>
              <input
                {...register("condition")}
                defaultValue={product.condition}
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
                type="text"
                name="condition"
                placeholder="Condition"
              />

              <label htmlFor="hardDrive">Hard Drive</label>
              <input
                {...register("hardDrive")}
                defaultValue={product.hardDrive}
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
                type="text"
                name="hardDrive"
                placeholder="Hard Drive"
              />

              <label htmlFor="color">Color</label>
              <input
                {...register("color")}
                defaultValue={product.color}
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
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
                  Sell
                </Button>
              </div>
            </form>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default DuplicateModal;
