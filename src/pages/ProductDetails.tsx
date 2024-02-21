import { ReactNode, useState } from "react";
import { Button, Card, Descriptions, Space, Spin } from "antd";
import { toast } from "sonner";
import { useCreateSaleMutation } from "../redux/features/sales/sales.api";
import { useAppSelector } from "../redux/hook";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { TProduct } from "../types/types";
import { useParams } from "react-router-dom";
import { useGetSingleProductsQuery } from "../redux/features/products/prodcuts.api";
import dayjs from "dayjs";
import DuplicateModal from "../components/modal/DuplicateModal";
import PrimaryModal from "../components/modal/PrimaryModal";
import PurchaseModal from "../components/modal/PurchaseModal";

const ProductDetails = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [duplicateModalOpen, setduplicateModalOpen] = useState(false);
  const params = useParams();
  const { data, isLoading, isError } = useGetSingleProductsQuery(params?.id);
  const product = data?.data;



  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      {isLoading && (
        <div
          style={{
            height: "60vh",
            width: "screen",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin />
        </div>
      )}
      {isError && <div>Error loading product details</div>}
      {product && (
        <Card
          title={product.name}
          style={{ width: "100%", borderRadius: "8px" }}
          cover={
            <img
              alt={product.name}
              src={product.productImage}
              style={{
                borderRadius: "8px 8px 0 0",
                width: "400px",
                margin: "0 auto",
                height: "auto",
              }}
            />
          }
        >
          <Descriptions title="Product Details">
            {Object.entries(product || {}).map(
              
              ([key, value]: [string, unknown]) =>
                key !== "_id" &&
                key !== "__v" &&
                key != "productImage" && (
                  <Descriptions.Item
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                  >
                    {key === "seller"
                      ? // @ts-ignore
                        value?.email
                      : key === "releaseDate"
                      ? // @ts-ignore
                        dayjs(value?.ReleaseDate)?.format("YY-MM-DD")
                      : value}
                  </Descriptions.Item>
                )
            )}
          </Descriptions>
        </Card>
      )}

      <div
        style={{ marginTop: "20px", textAlign: "center", marginBottom: "20px" }}
      >
        <Space>
       {product && <PurchaseModal product={product} />}
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
        </Space>
      </div>
    </div>
  );
};

export default ProductDetails;
