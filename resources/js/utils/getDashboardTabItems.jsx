import { useState } from "react";

import { Flex, Button, Form, Input, InputNumber, Upload, Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";

function getDashboardTabItems() {
    const onFinish = (values) => {
        console.log("Success:", values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return [
        {
            key: "1",
            label: "Create Product",
            children: (
                <Flex justify="center">
                    <Form
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
                                <Select.Option value="demo">Demo</Select.Option>
                                <Select.Option value="demo1">
                                    Demo
                                </Select.Option>
                                <Select.Option value="demo2">
                                    Demo
                                </Select.Option>
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
                            getValueFromEvent={normFile}
                        >
                            <Upload.Dragger
                                method="GET"
                                listType="picture-card"
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
            children: "Content of Tab Pane 2",
        },
    ];
}

export { getDashboardTabItems };
