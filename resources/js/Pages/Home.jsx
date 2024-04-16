import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import { router } from "@inertiajs/react";
import { Flex, Table, Typography, Button } from "antd";
import { DashboardOutlined } from "@ant-design/icons";
import { getProductListTableColumns } from "../utils";

const { Title } = Typography;

function Home({ products }) {
    return (
        <div>
            <Flex justify="space-between" align="center">
                <Title>Products List</Title>

                <Link href={"/dashboard"}>
                    <Button icon={<DashboardOutlined />} type="primary">
                        Dashboard
                    </Button>
                </Link>
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
                onChange={(pagination) => {
                    Inertia.reload({
                        data: {
                            page: pagination.current,
                            per_page: pagination.pageSize,
                        },
                    });
                }}
            />
        </div>
    );
}

export default Home;
