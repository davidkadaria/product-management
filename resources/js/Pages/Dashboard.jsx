// import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import { Flex, Typography, Button, Layout, Tabs } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { getDashboardTabItems } from "../utils";

const { Header, Content } = Layout;

const { Title } = Typography;

function Dashboard() {
    const items = getDashboardTabItems();

    return (
        <Layout>
            <Header
                style={{ backgroundColor: "transparent", marginBottom: 25 }}
            >
                <Flex justify="space-between" align="center">
                    <Title>Dashboard</Title>

                    <Link href={"/"}>
                        <Button icon={<HomeOutlined />} type="primary">
                            Home
                        </Button>
                    </Link>
                </Flex>
            </Header>
            <Content>
                <Tabs defaultActiveKey={items[0].key} items={items} centered />
            </Content>
        </Layout>
    );
}

export default Dashboard;
