import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import {
    Flex,
    Button,
    Image,
    Popconfirm,
    message,
    Input,
    InputNumber,
    Select,
} from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { imageFallback } from "../constants";

function getProductListTableColumns({ categories }) {
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);

    const handleFilterChange = (column, value) => {
        if (!value) {
            Inertia.reload({ data: { [column]: undefined } });
            return;
        }
        Inertia.reload({ data: { [column]: value } });
    };

    const handleFilterByPrice = (reset) => {
        if (!minPrice) {
            Inertia.reload({ data: { minPrice: undefined } });
            return;
        }
        if (!maxPrice) {
            Inertia.reload({ data: { maxPrice: undefined } });
            return;
        }
        if (reset === true) {
            Inertia.reload({
                data: { minPrice: undefined, maxPrice: undefined },
            });
            return;
        }
        Inertia.reload({ data: { minPrice, maxPrice } });
    };

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
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Search name"
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(
                                e.target.value ? [e.target.value] : []
                            )
                        }
                        onPressEnter={() =>
                            handleFilterChange("name", selectedKeys[0])
                        }
                        style={{
                            width: 188,
                            marginBottom: 8,
                            display: "block",
                        }}
                    />
                    <Button
                        type="primary"
                        onClick={() =>
                            handleFilterChange("name", selectedKeys[0])
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            handleFilterChange("name", "");
                            clearFilters();
                        }}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </div>
            ),
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
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Search description"
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(
                                e.target.value ? [e.target.value] : []
                            )
                        }
                        onPressEnter={() =>
                            handleFilterChange("description", selectedKeys[0])
                        }
                        style={{
                            width: 188,
                            marginBottom: 8,
                            display: "block",
                        }}
                    />
                    <Button
                        type="primary"
                        onClick={() =>
                            handleFilterChange("description", selectedKeys[0])
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            handleFilterChange("description", "");
                            clearFilters();
                        }}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </div>
            ),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => `$${price}`,
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <div style={{ padding: 8 }}>
                    <InputNumber
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(value) => setMinPrice(value)}
                    />
                    <InputNumber
                        placeholder="Max Price"
                        style={{ marginInline: 8 }}
                        value={maxPrice}
                        onChange={(value) => setMaxPrice(value)}
                    />
                    <Button type="primary" onClick={handleFilterByPrice}>
                        Filter
                    </Button>
                    <Button
                        onClick={() => {
                            setMinPrice(null);
                            setMaxPrice(null);
                            handleFilterByPrice(true);
                            clearFilters();
                        }}
                        style={{ marginLeft: 8 }}
                    >
                        Reset
                    </Button>
                </div>
            ),
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
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <div style={{ padding: 8 }}>
                    <Select
                        allowClear
                        style={{
                            width: 188,
                            marginBottom: 8,
                            display: "block",
                        }}
                        placeholder="Select category"
                        value={selectedKeys}
                        onChange={(value) => setSelectedKeys(value)}
                    >
                        {categories.map((category) => (
                            <Option key={category.id} value={category.name}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleFilterChange("category", selectedKeys)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters();
                            handleFilterChange("category", "");
                        }}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </div>
            ),
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
