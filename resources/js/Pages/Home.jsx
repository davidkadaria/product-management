import { InertiaLink } from "@inertiajs/inertia-react";
import { Flex, Table, Typography, Button } from "antd";
import { DashboardOutlined } from "@ant-design/icons";
import { getProductListTableColumns } from "../utils";

const { Title } = Typography;

function Home({ products }) {
    return (
        <div>
            <Flex justify="space-between" align="center">
                <Title>Products List</Title>

                <InertiaLink href={"/dashboard"}>
                    <Button icon={<DashboardOutlined />} type="primary">
                        Dashboard
                    </Button>
                </InertiaLink>
            </Flex>
            <Table
                dataSource={products.data.map((product) => ({
                    key: product.id,
                    ...product,
                }))}
                columns={getProductListTableColumns()}
                pagination={{
                    pageSize: products.per_page,
                    total: products.total,
                    current: products.current_page,
                }}
                onChange={(pagination) => console.log("pagination", pagination)}
            />
        </div>
    );
}

export default Home;
