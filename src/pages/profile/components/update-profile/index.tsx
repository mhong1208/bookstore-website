import  { useEffect } from 'react';
import { Form, Input, Button, DatePicker, Upload, Row, Col, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useAuth } from '../../../../context/AuthContext';
import moment from 'moment';

const UpdateProfile = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        dateOfBirth: user.dateOfBirth ? moment(user.dateOfBirth) : null,
        address: user.address,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user, form]);

  const onFinish = (values: any) => {
    console.log('Success:', values);
    // Call API to update profile here
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Card title="Update Profile" style={{width: '100%' }}>
      <Form
        form={form}
        name="update_profile"
        onFinish={onFinish}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="dateOfBirth" label="Date of Birth">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="phoneNumber" label="Phone Number">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="address" label="Address">
          <Input />
        </Form.Item>

        <Form.Item
          name="avatarUrl"
          label="Avatar"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="avatar"
            action="/upload.do"
            listType="picture-card"
            maxCount={1}
          >
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật thông tin
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UpdateProfile;
