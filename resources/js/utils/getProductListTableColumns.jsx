import { Inertia } from "@inertiajs/inertia";
import { Flex, Button, Image, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { imageFallback } from "../constants";

function getProductListTableColumns() {
    return [
        {
            title: "Image",
            dataIndex: "images",
            key: "image",

            render: (images) => {
                try {
                    images = JSON.parse(images);

                    if (images.length > 0) {
                        return (
                            <Image.PreviewGroup
                                fallback={imageFallback}
                                items={images}
                            >
                                <Image
                                    width={120}
                                    height={100}
                                    style={{ objectFit: "cover" }}
                                    src={images[0]}
                                    alt="Product Image"
                                    fallback={imageFallback}
                                />
                            </Image.PreviewGroup>
                        );
                    }
                } catch (error) {
                    console.log("error", error);
                }

                return null;
            },
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (description) => {
                if (description.length > 30) {
                    return description.substring(0, 30).trim() + "...";
                }

                return description;
            },
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => `$${price}`,
        },
        {
            title: "Categories",
            dataIndex: "categories",
            key: "categories",
            render: (categories) => {
                try {
                    if (categories.length > 0) {
                        const categoriesAsStr = categories
                            .map((category) => category.name)
                            .join(", ");
                        return categoriesAsStr;
                    }
                } catch (error) {
                    console.log("error", error);
                }

                return null;
            },
        },
        {
            title: "Action",
            key: "action",
            render: (item) => {
                return (
                    <Flex gap="small">
                        <Popconfirm
                            title="Delete the product"
                            description="Are you sure you want to delete this product?"
                            onConfirm={async () => {
                                Inertia.delete(`/products/${item.id}`, {
                                    onSuccess: () => {
                                        message.success(
                                            `Product "${item.name}" deleted.`
                                        );
                                    },
                                    onError: () => {
                                        message.error(
                                            `Failed to delete "${item.name}".`
                                        );
                                    },
                                });
                            }}
                            onCancel={() =>
                                message.error(
                                    `Deletion of "${item.name}" cancelled.`
                                )
                            }
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                type="primary"
                                danger
                                icon={<DeleteOutlined />}
                            >
                                Delete
                            </Button>
                        </Popconfirm>
                        <Button
                            type="primary"
                            onClick={() => {
                                Inertia.visit(`/products/${item.id}`);
                            }}
                        >
                            View Details
                        </Button>
                    </Flex>
                );
            },
        },
    ];
}

export { getProductListTableColumns };
