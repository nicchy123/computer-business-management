import { Card, Button, Popconfirm } from "antd";
import { TProduct } from "../types/types";
import { useCreateSaleMutation } from "../redux/features/sales/sales.api";
import { useAppSelector } from "../redux/hook";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import { useState } from "react";
import { Link } from "react-router-dom";
import PrimaryModal from "./modal/PrimaryModal";
import { useDeleteProductMutation } from "../redux/features/products/prodcuts.api";
import UpdateProductModal from "./modal/UpdateProductModal";
import DuplicateModal from "./modal/DuplicateModal";

const ProductCard = ({
  product,
  handleCheckboxChange,
  selectedProducts,
}: {
  product: TProduct;
  selectedProducts: string[];
  handleCheckboxChange: (productId: string) => void;
}) => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [updateModalOpen, setupdateModalOpen] = useState(false);
  const [duplicateModalOpen, setduplicateModalOpen] = useState(false);
  const { name, price, quantity, seller, productImage } = product;
  const [loadingId, setLoadingid] = useState("");
  const dateString = new Date().toString();
  const [createSale, { isLoading: buynowLoading }] = useCreateSaleMutation();
  const [deleteProduct, { isSuccess, isLoading }] = useDeleteProductMutation();
  const user = useAppSelector(useCurrentUser);

  const handleOrder = async (product: TProduct) => {
   try{
    setLoadingid(product._id);
    const data = {
      product: product._id,
      quantity: 1,
      seller: seller?._id,
      buyer: user?._id,
      dateOrdered: dateString,
    };
    const res = await createSale(data).unwrap();

    if (res?.success) {
      setLoadingid("");
      toast.success("Items added successfully");
    }
   }catch(err){
    setLoadingid("");
    toast.error("Something went wrong");
   }
  };

  const confirm = async (id: string) => {
    setLoadingid(id);
    await deleteProduct(id);
    setLoadingid("");
    if (isSuccess) {
      return toast.success("Items deleted successfully");
    }
  };

  const cancel = (
    e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined
  ) => {
    e!.preventDefault();
  };

  return (
    <Card
      style={{ width: "100%", borderRadius: "8px" }}
      cover={
        <img
          alt={name}
          src={productImage}
          style={{
            borderRadius: "8px 8px 0 0",
            width: "100%",
            height: "250px",
            objectFit: "contain",
            margin: "0 auto",
            padding: "20px",
          }}
        />
      }
    >
      <div>
        {name}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "20px", fontWeight: "900", lineHeight: "1px" }}>
            ${price}
          </p>
          <p style={{ fontSize: "16px", fontWeight: "600" }}>
            In Stock: {quantity}
          </p>
        </div>
        <div
          style={{
            marginTop:"10px",
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            justifyContent: "start",
          }}
        >
          <Button
          size="small"
            onClick={() => handleOrder(product)}
            type="primary"
            key="addToCart"
            disabled={buynowLoading}
          >
            {buynowLoading ? "Processing..." : "Buy Now"}
          </Button>
          <Link to={`/details/${product._id}`}>
            <Button size="small" key="viewDetails">View</Button>
          </Link>
          {product?._id && (
            <DuplicateModal
              modalOpen={duplicateModalOpen}
              setmodalOpen={setduplicateModalOpen}
              product={product}
            />
          )}
          {product?._id && (
            <PrimaryModal
              modalOpen={modalOpen}
              setmodalOpen={setmodalOpen}
              product={product}
            />
          )}
          {product?._id && (
            <UpdateProductModal
              modalOpen={updateModalOpen}
              setmodalOpen={setupdateModalOpen}
              product={product}
            />
          )}

          <Popconfirm
            title="Delete the product"
            description={`Are you sure to delete ${product?.name}?`}
            onConfirm={() => confirm(product?._id)}
            onCancel={() => cancel()}
            okText="Yes"
            cancelText="No"
          >
            <Button size="small" key="delete">{isLoading ? "Deleting" : "Delete"}</Button>
          </Popconfirm>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <input
          type="checkbox"
          checked={selectedProducts.includes(product?._id as string)}
          onChange={() => handleCheckboxChange(product._id)}
        />
      </div>
    </Card>
  );
};

export default ProductCard;
