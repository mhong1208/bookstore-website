import React from 'react';
import { Modal, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ visible, onClose }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate('/login'); // chuyển đến trang login
  };

  return (
    <Modal
      title="Yêu cầu đăng nhập"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="login" type="primary" onClick={handleLogin}>
          Đăng Nhập
        </Button>,
      ]}
    >
      <p>Bạn cần đăng nhập để thực hiện thao tác này.</p>
    </Modal>
  );
};

export default AuthModal;
