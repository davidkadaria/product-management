import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import {
    Flex,
    Button,
    Form,
    Input,
    InputNumber,
    Upload,
    Select,
    message,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";

function getDashboardTabItems({ categories }) {
    const [imageError, setImageError] = useState(false);
    const [productForm] = Form.useForm();
    const [categoryForm] = Form.useForm();

    const onFinish = (values) => {
        if (!values.image || values.image.length === 0) {
            setImageError(true);
            return;
        }

        values.image = values.image.map((file) => file.originFileObj);

        console.log("Success:", values);
        Inertia.post("/create-product", values, {
            forceFormData: true,

            onSuccess: () => {
                message.success("Product created successfully!");
            },
            onError: () => {
                message.error("Failed to create product.");
            },
        });
        productForm.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const onFinishCategory = (values) => {
        Inertia.post("/create-category", values, {
            onSuccess: () => {
                message.success("Category created successfully!");
            },
            onError: () => {
                message.error("Failed to create category.");
            },
        });
        categoryForm.resetFields();
    };

    const onFinishFailedCategory = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const getFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return [
        {
            key: "1",
            label: "Create Product",
            children: (
                <Flex justify="center">
                    <Form
                        form={productForm}
                        name="create-product"
                        layout="vertical"
                        style={{ width: "40%", minWidth: "300px" }}
                        initialValues={{
                            remember: false,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Product Name"
                            name="product_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Product name is required!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Description is required!",
                                },
                            ]}
                        >
                            <Input.TextArea />
                        </Form.Item>

                        <Form.Item
                            label="Category"
                            name="category"
                            rules={[
                                {
                                    required: true,
                                    message: "Category is required!",
                                },
                            ]}
                        >
                            <Select mode="multiple" value={[]} allowClear>
                                {categories.map((category) => (
                                    <Select.Option
                                        key={category.id}
                                        value={category.name}
                                    >
                                        {category.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: "Price is required!",
                                },
                                {
                                    type: "number",
                                    min: 0,
                                    message: "Price must be a positive number!",
                                },
                            ]}
                        >
                            <InputNumber />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="image"
                            valuePropName="fileList"
                            required={true}
                            getValueFromEvent={getFile}
                        >
                            <Upload.Dragger
                                onChange={() => setImageError(false)}
                                listType="picture-card"
                                beforeUpload={() => false}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Click or drag file to this area to upload
                                </p>
                                <p className="ant-upload-hint">
                                    Support for a single or bulk upload.
                                </p>
                                {imageError && (
                                    <p style={{ color: "red", margin: 0 }}>
                                        Image is required!
                                    </p>
                                )}
                            </Upload.Dragger>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Flex>
            ),
        },
        {
            key: "2",
            label: "Create Category",
            children: (
                <Flex justify="center">
                    <Form
                        form={categoryForm}
                        name="create-category"
                        layout="vertical"
                        style={{ width: "40%", minWidth: "300px" }}
                        initialValues={{
                            remember: false,
                        }}
                        onFinish={onFinishCategory}
                        onFinishFailed={onFinishFailedCategory}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Category Name"
                            name="category_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Category name is required!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Flex>
            ),
        },
    ];
}

export { getDashboardTabItems };
