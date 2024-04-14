import { Flex, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

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
                            <img
                                src={images[0]}
                                alt={"product image"}
                                style={{ width: "50px" }}
                            />
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
            render: (text, record) => (
                <Flex gap="small">
                    <Button type="primary">View Details</Button>
                    <Button type="primary" danger icon={<DeleteOutlined />}>
                        Delete
                    </Button>
                </Flex>
            ),
        },
    ];
}

export { getProductListTableColumns };
