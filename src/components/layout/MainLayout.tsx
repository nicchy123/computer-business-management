import { Col, Flex, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
const MainLayout = () => {
  const { Content } = Layout;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Content>
          <Flex justify="center" align="center">
          <Col span={22}>
          <Outlet />
          </Col>
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
