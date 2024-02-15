import { Spin, Table } from "antd";
import { useGetOrdersQuery } from "../redux/features/sales/sales.api";
import { useAppSelector } from "../redux/hook";
import dayjs from "dayjs";

const Orders = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading, isSuccess } = useGetOrdersQuery(user?._id);
    

  const columns = [
    {
      title: "Product Image",
      dataIndex: "product",
      key: "product",
      render: (product: any) => (
        <img
          style={{ width: "50px", height: "50px" }}
          src={product?.productImage}
        />
      ),
    },
    {
      title: "Buyer Name",
      dataIndex: "buyer",
      key: "buyerName",
      render: (buyer: any) => buyer?.name,
    },
    {
      title: "Product Name",
      dataIndex: "product",
      key: "productName",
      render: (product: any) => product?.name,
    },
    {
      title: "Price Per Product",
      dataIndex: "product",
      key: "price",
      render: (product: any) => +product?.price,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Date Ordered",
      dataIndex: "dateOrdered",
      key: "dateOrdered",
      render: (date: any) => dayjs(date).format("YYYY-MM-DD HH:mm:ss"),
    },
  ];


  return (
    <div>
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
      {isSuccess && (
        <Table
          style={{ overflow: "auto" }}
          dataSource={data?.data}
          columns={columns}
        />
      )}
    </div>
   
  );
};

export default Orders;
