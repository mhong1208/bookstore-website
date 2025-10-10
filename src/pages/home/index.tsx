import React from 'react';
import { Typography, Button } from 'antd';
import { useToggle } from '../../hooks/useToggle';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  const [isVisible, toggleVisibility] = useToggle(true);

  return (
    <div>
      <Title>Welcome to the Homepage!</Title>
      <Button onClick={toggleVisibility} style={{ marginBottom: 16 }}>
        {isVisible ? 'Hide Message' : 'Show Message'}
      </Button>
      {isVisible && (
        <Paragraph>
          This is the main content of our application. Feel free to explore.
        </Paragraph>
      )}
    </div>
  );
};

export default HomePage;