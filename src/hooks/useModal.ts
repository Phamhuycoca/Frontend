import { useEffect, useState } from 'react';
import { modalService } from '../utils/helpers/modalService';

export function useModal(code: string) {
  const [state, setState] = useState(modalService.getValue());

  useEffect(() => {
    const subscription = modalService.state$.subscribe(setState);

    return () => subscription.unsubscribe();
  }, []);

  return {
    open: state.open && state.code === code,
    data: state.data,
    close: () => modalService.setClose(),
  };
}
