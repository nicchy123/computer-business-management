import { useState } from "react";
import { Button, DatePicker, Input, Modal } from "antd";
import { useCreateSaleMutation } from "../../redux/features/sales/sales.api";
import dayjs from "dayjs";
import { useAppSelector } from "../../redux/hook";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetUserQuery } from "../../redux/features/auth/authApi";
import { TProduct } from "../../types/types";
import { toast } from "sonner";

const PurchaseModal = ({ product }: { product: TProduct }) => {
  const [open, setOpen] = useState(false);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const user = useAppSelector(useCurrentUser);
  const { data } = useGetUserQuery(user?.email);

  const [createSale] = useCreateSaleMutation();
  const showModal = () => {
    setOpen(true);
  };
  const [purchaseData, setPurchaseData] = useState({
    buyer: data?.data?._id,
    seller: product?.seller?._id,
    product: product?._id,
    quantity: 1,
    dateOrdered: dayjs(Date.now()).format("YYYY-MM-DD"),
  });
  const handleOk = async () => {
    setConfirmLoading(true);
    const res = (await createSale(purchaseData)) as any;
    console.log(res?.data);
    setConfirmLoading(false);
    if (res?.data?.success) {
      toast.success(`${product?.name} ordered successfully`);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <Button size="small" type="primary" onClick={showModal}>
        Purchase
      </Button>
      <Modal
        title={`Order ${product?.name}`}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText={"Purchase"}
      >
        <label htmlFor="buyer-name">Buyer Name</label>
        <Input
          readOnly
          defaultValue={data?.data?.name}
          placeholder="Buyer Name"
        />
        <label htmlFor="quantity">Quantity</label>
        <Input
          onChange={(e: any) =>
            setPurchaseData({
              ...purchaseData,
              quantity: Number(e.target.value),
            })
          }
          defaultValue={purchaseData.quantity}
          placeholder="Quantity"
          style={{ margin: "10px 0" }}
        />
        <label htmlFor="buyer-name">Order Date</label>
        <DatePicker
          onChange={(e: any) =>
            setPurchaseData({
              ...purchaseData,
              dateOrdered: String(dayjs(e).format("YYYY-MM-DD")),
            })
          }
          style={{ width: "100%" }}
          defaultValue={dayjs(Date.now())}
        />
      </Modal>
    </>
  );
};

export default PurchaseModal;
