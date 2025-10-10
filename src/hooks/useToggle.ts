import { useState, useCallback } from 'react';

// Hook này giúp quản lý trạng thái boolean (true/false) một cách dễ dàng
export const useToggle = (initialState: boolean = false): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(initialState);

  const toggle = useCallback(() => {
    setState((prevState) => !prevState);
  }, []);

  return [state, toggle];
};