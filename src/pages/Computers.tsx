import { useState } from "react";
import ProductCard from "../components/ProductCard";
import {
  useBulkDeleteProductMutation,
  useGetProductsQuery,
} from "../redux/features/products/prodcuts.api";
import { TProduct } from "../types/types";
import { Col, Flex, Grid, Input, Row, Select, Spin } from "antd";
import { toast } from "sonner";
const { Search } = Input;

const Computers = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [monitor, setMonitor] = useState("");
  const [hardDrive, setHardDrive] = useState("");
  const [condition, setCondition] = useState("");
  const [sort, setSort] = useState("");
  const [brand, setBrand] = useState("");
  const [compatibility, setCompability] = useState("");
  const [category, setCategory] = useState("");
  const [bulkDeleteProduct, { isLoading: bulkLoading }] =
    useBulkDeleteProductMutation();
  const query = {
    searchTerm,
    condition,
    category,
    brand,
    sort,
    monitor,
    compatibility,
    hardDrive,
  };

  const handleCheckboxChange = (productId: string) => {
    if (selectedProducts.includes(productId as string)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleBulkDelete = async () => {
    const res = await bulkDeleteProduct(selectedProducts).unwrap();
    if (res?.success) {
      setSelectedProducts([]);
      return toast.success("Products Delete Successfully");
    }
  };

  const handleSortbyPrice = (sortString: string) => {
    if (sortString === "price") {
      setSort("price");
    } else if (sortString === "-price") {
      setSort("-price");
    }
  };

  const { data, isLoading } = useGetProductsQuery(query);
  const products = data?.data;

  const handleClearFilter = () => {
    setSearchTerm("");
    setCondition("");
    setBrand("");
    setCategory("");
    setSort("");
    setCompability("");
    setMonitor("");
    setHardDrive("");
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <Row>
        <Search
          style={{ margin: "10px 0" }}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search  computer with name, category, brand, condition...."
          enterButton="Search"
          size="large"
        />

        <div
          style={{
            display: "flex",
            width: "90%",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "start",
            alignItems: "center",
            margin: "20px 0",
            
          }}
        >
          <Select
            defaultValue={"Filter by Brand"}
            style={{ width: 140 ,fontSize:"2px"}}
            onChange={(e) => setBrand(e)}
            options={[
              { value: "Apple", label: "Apple" },
              { value: "Dell", label: "Dell" },
              { value: "HP", label: "HP" },
              { value: "Lenovo", label: "Lenovo" },
              { value: "ASUS", label: "ASUS" },
              { value: "Microsoft", label: "Microsoft" },
              { value: "Toshiba", label: "Toshiba" },
              { value: "Sony", label: "Sony" },
              { value: "MSI", label: "MSI" },
            ]}
          />

          <Select
            defaultValue="Filter by Category"
            style={{ width: 180 }}
            onChange={(e) => setCategory(e)}
            options={[
              { value: "Personal Computer", label: "Personal Computer" },
              { value: "Super Computer", label: "Super Computer" },
              { value: "Mainframe computer", label: "Mainframe computer" },
              { value: "Mini Computer", label: "Mini Computer" },
              { value: "Workstation Computer", label: "Workstation Computer" },
              { value: "Server Computer", label: "Server Computer" },
              { value: "Analog Computer", label: "Analog Computer" },
              { value: "Digital Computer", label: "Digital Computer" },
            ]}
          />

          <Select
            defaultValue="Filter by Capacity"
            style={{ width: 180 }}
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

          <Select
            defaultValue="Filter by Condition"
            style={{ width: 170 }}
            onChange={(e) => setCondition(e)}
            options={[
              { value: "Used", label: "Used" },
              { value: "New", label: "New" },
            ]}
          />
          <Select
            defaultValue="Filter by Compability"
            style={{ width: 170 }}
            onChange={(e) => setCompability(e)}
            options={[
              { value: "Windows", label: "Windows" },
              { value: "Linux", label: "Linux" },
              { value: "Mac", label: "Mac" },
            ]}
          />
          <Select
            defaultValue="Filter by Monitor"
            style={{ width: 170 }}
            onChange={(e) => setMonitor(e)}
            options={[
              { value: "LCD", label: "LCD" },
              { value: "LED", label: "LED" },
            ]}
          />
          <Select
            defaultValue="Sort by Price"
            style={{ width: 160 }}
            onChange={(e) => handleSortbyPrice(e)}
            options={[
              { value: "price", label: "Price Low to High" },
              { value: "-price", label: "Price High to Low" },
            ]}
          />
          <button
            onClick={handleClearFilter}
            style={{
              borderRadius: "10px",
              background: "white",
              cursor: "pointer",
              backgroundColor: "#561C24",
              color: "white",
              border: "none",
              padding: "10px 20px",
              margin: "0 10px",
            }}
          >
            Clear Filter
          </button>
          {selectedProducts.length > 0 && (
            <button
              onClick={handleBulkDelete}
              style={{
                borderRadius: "10px",
                background: "white",
                cursor: "pointer",
                backgroundColor: "#561C24",
                color: "white",
                border: "none",
                padding: "10px 20px",
                margin: "0 10px",
              }}
            >
              {bulkLoading ? "Deleting" : "Bulk Delete"}
            </button>
          )}
        </div>
      </Row>

      {isLoading && (
        <Row style={{height:"300px"}} justify={"center"} align={"middle"}>
          <Spin />
        </Row>
      )}

      <Row gutter={[20,20]}>
        {products?.map((product: TProduct, index: number) => (
          <Col key={index} xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
            <Flex justify="center" align="center">
              <ProductCard
                handleCheckboxChange={handleCheckboxChange}
                selectedProducts={selectedProducts}
                product={product}
              />
            </Flex>
          </Col>
        ))}
      </Row>

      <div style={{ display: "inline", margin: "50px 0" }}></div>
      {products?.length < 1 && (
        <p style={{ textAlign: "center", width: "100vw", fontSize: "20px" }}>
          No Items found
        </p>
      )}
    </div>
  );
};

export default Computers;
