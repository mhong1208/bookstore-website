import React from 'react';
import { Form, Input, Button } from 'antd';

const ChangePassword = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    // Here you would typically call an API to change the password
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="change_password"
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="currentPassword"
        label="Current Password"
        rules={[{ required: true, message: 'Please input your current password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="New Password"
        rules={[{ required: true, message: 'Please input your new password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm New Password"
        dependencies={['newPassword']}
        rules={[
          { required: true, message: 'Please confirm your new password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Change Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePassword;
