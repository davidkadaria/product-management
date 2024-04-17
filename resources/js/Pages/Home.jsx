import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import { Flex, Table, Typography, Button, Layout } from "antd";
import { DashboardOutlined } from "@ant-design/icons";
import { getProductListTableColumns } from "../utils";

const { Header, Content } = Layout;

const { Title } = Typography;

function Home({ products, categories }) {
    return (
        <Layout>
            <Header
                style={{ backgroundColor: "transparent", marginBottom: 25 }}
            >
                <Flex justify="space-between" align="center">
                    <Title>Products List</Title>

                    <Link href={"/dashboard"}>
                        <Button icon={<DashboardOutlined />} type="primary">
                            Dashboard
                        </Button>
                    </Link>
                </Flex>
            </Header>
            <Content>
                <Table
                    dataSource={products.data?.map((product) => ({
                        key: product.id,
                        ...product,
                    }))}
                    columns={getProductListTableColumns({ categories })}
                    pagination={{
                        pageSize: products.per_page,
                        total: products.total,
                        current: products.current_page,
                    }}
                    onChange={(pagination) => {
                        Inertia.reload({
                            data: {
                                page: pagination.current,
                                per_page: pagination.pageSize,
                            },
                        });
                    }}
                />
            </Content>
        </Layout>
    );
}

export default Home;
