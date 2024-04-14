import { Table, Typography } from "antd";
import { getProductListTableColumns } from "../utils";

const { Title } = Typography;

function Home({ products }) {
    return (
        <div>
            <Title>Products List</Title>
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
