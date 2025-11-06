import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AuthModal from '../components/Modals/auth-modal';

const PrivateRouteModal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (!token) {
      setShowModal(true); // hiện modal nếu chưa login
    }
  }, [token]);

  return (
    <>
      {!token ? (
        <AuthModal visible={showModal} onClose={() => setShowModal(false)} />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PrivateRouteModal;
