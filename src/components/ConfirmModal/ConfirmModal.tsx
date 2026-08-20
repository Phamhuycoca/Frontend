import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { Subscription } from 'rxjs';

import {
  confirmService,
  type ConfirmState
} from './../../utils/helpers/confirmService';

const ConfirmModal = () => {
  const [state, setState] = useState<ConfirmState>({
    open: false,
    options: {},
  });

  useEffect(() => {
    const subscription: Subscription =
      confirmService.state$.subscribe(
        newState => {
          setState(newState);
        }
      );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Modal
      open={state.open}
      title={state.options.title ?? 'Thông báo'}
      okText={state.options.okText ?? 'Đồng ý'}
      cancelText={state.options.cancelText ?? 'Hủy'}
      onOk={() => confirmService.confirm()}
      onCancel={() => confirmService.cancel()}
      maskClosable={false}
    >
      {state.options.content}
    </Modal>
  );
};

export default ConfirmModal;