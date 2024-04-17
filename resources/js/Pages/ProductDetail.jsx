import { Link } from "@inertiajs/inertia-react";
import { Flex, Typography, Button, Layout, Carousel, Image } from "antd";
import { DashboardOutlined, HomeOutlined } from "@ant-design/icons";
import { imageFallback } from "../constants";

const { Header, Content } = Layout;

const { Title, Paragraph } = Typography;

function ProductDetail({ product }) {
    let { images } = product;
    images = JSON.parse(images);

    return (
        <Layout>
            <Header
                style={{ backgroundColor: "transparent", marginBottom: 25 }}
            >
                <Flex justify="space-between" align="center">
                    <Title>{product.name}</Title>

                    <Flex gap={10}>
                        <Link href={"/"}>
                            <Button icon={<HomeOutlined />} type="primary">
                                Home
                            </Button>
                        </Link>
                        <Link href={"/dashboard"}>
                            <Button icon={<DashboardOutlined />} type="primary">
                                Dashboard
                            </Button>
                        </Link>
                    </Flex>
                </Flex>
            </Header>
            <Content style={{ paddingInline: 50 }}>
                {images && images.length > 0 && (
                    <Image.PreviewGroup fallback={imageFallback} items={images}>
                        <Image
                            width={"40%"}
                            height={400}
                            style={{ minWidth: 200, objectFit: "cover" }}
                            src={images[0]}
                            alt="Product Image"
                            fallback={imageFallback}
                        />
                    </Image.PreviewGroup>
                )}
                <Title level={2}>Description</Title>
                <Paragraph>{product.description}</Paragraph>
                <Title level={3}>Price: ${product.price}</Title>
                <Title level={3}>Categories</Title>
                {product.categories && (
                    <Paragraph>
                        {product.categories
                            .map((category) => category.name)
                            .join(", ")}
                    </Paragraph>
                )}
            </Content>
        </Layout>
    );
}

export default ProductDetail;
