import { Button, Modal, Row } from "antd";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hook";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateSaleMutation } from "../../redux/features/sales/sales.api";
import { TProduct } from "../../types/types";

const PrimaryModal = ({ modalOpen, setmodalOpen, product }: any) => {
  const [quantityError, setQuantityError] = useState("");
  const user = useAppSelector(useCurrentUser);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingid] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dateString = new Date().toString();
  const [createSale] = useCreateSaleMutation();
  const handleOrder = async (product: TProduct) => {
    if (Number(quantity) > Number(product.quantity)) {
      return setQuantityError(
        `Quantity must be smaller than ${product.quantity}`
      );
    }
    setQuantityError("");
    setLoading(true);
    setLoadingid(product._id);
    const data = {
      product: product._id,
      quantity: quantity,
      seller: product?.seller._id,
      buyer: user?._id,
      dateOrdered: dateString,
    };
    const res = await createSale(data).unwrap();
    if (res?.success) {
      setLoadingid("");
      setmodalOpen(false)
      toast.success("Items Sold successfully");
    }
    setLoading(false);
  };

  return (
    <>
      <Button size="small" onClick={() => setmodalOpen(true)}>Sell</Button>
      <Modal
        title=""
        centered
        open={modalOpen}
        footer={null}
        onOk={() => setmodalOpen(false)}
        onCancel={() => setmodalOpen(false)}
      >
        <div style={{ width: "100%", margin: "0 auto" }}>
          <Row justify={"center"} align={"middle"}>
            <form
              style={{
                display: "flex",
                flexWrap: "wrap",

                gap: "5px",
                justifyContent: "start",
                alignItems: "center",
                margin: "20px 0",
              }}
            >
              <label htmlFor="name">name</label>
              <input
                defaultValue={product.name}
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
                type="name"
                name="name"
                placeholder="name"
              />

              <label htmlFor="price">price</label>
              <input
                defaultValue={product.price}
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
                type="number"
                name="price"
                placeholder="price"
              />

              <label htmlFor="quantity">quantity</label>
              <input
                onChange={(e: any) => setQuantity(Number(e.target.value))}
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
                type="number"
                name="quantity"
                required
                defaultValue={1}
                placeholder="quantity"
              />

              <div style={{ display: "inline" }}>
                <Button
                  onClick={() => handleOrder(product)}
                  disabled={loadingId === product?._id}
          
                >
                  {loading ? "Processing..." : "Create Sale"}
                </Button>
              </div>
              <br />
              {quantityError && <p style={{ color: "red" }}>{quantityError}</p>}
            </form>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default PrimaryModal;
