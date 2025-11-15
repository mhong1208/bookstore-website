import { Form, Input, Button, notification } from 'antd';
import './style.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (data: any) => {
    try {
      const res = await login(data); 
      notification.success({
        message: 'Thành công',
        description: res.message || 'Đăng nhập thành công!',
      });
      navigate('/');    
    } catch (err: any) {
      notification.error({
        message: 'Lỗi',
        description: err?.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.',
      });
    }
  };
  return (
    <div className="login-container">
      <h2>Đăng Nhập</h2>
      <Form
        name="login_form"
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        {/* Password Field */}
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu!' },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng Nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
