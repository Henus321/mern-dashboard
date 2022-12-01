import React from "react";
import { Button, Row, Form, Input, Col } from "antd";
import { SaveOutlined, CloseOutlined } from "@ant-design/icons";
import ProfileHeader from "./ProfileHeader";

const { TextArea } = Input;

const EditProfile = () => {
  return (
    <>
      <ProfileHeader />
      <Form layout="vertical">
        <Row gutter={12}>
          <Col span={6}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input your name" }]}
            >
              <Input className="rounded" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="username" label="Username">
              <Input className="rounded" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={6}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input your email" }]}
            >
              <Input className="rounded" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="company" label="Company">
              <Input className="rounded" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={6}>
            <Form.Item name="phone" label="Phone Number">
              <Input className="rounded" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="website" label="Website">
              <Input className="rounded" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="address" label="Address">
              <Input className="rounded" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name="description" label="Description">
              <TextArea
                className="rounded"
                rows={6}
                placeholder="Maximum of 200 characters"
                maxLength={200}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col>
            <Button size="large" className="rounded">
              Cancel <CloseOutlined />
            </Button>
          </Col>
          <Col>
            <Button size="large" type="primary" className="rounded">
              Save <SaveOutlined />
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default EditProfile;
