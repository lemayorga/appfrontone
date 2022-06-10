import React, { useState, forwardRef, useImperativeHandle, useRef, memo } from 'react';
import { Modal, Button } from 'antd';
import Draggable from 'react-draggable';
import { ModalStaticFunctions } from 'antd/lib/modal/confirm';

type BoundType = { 
    left: number; 
    top: number; 
    bottom: number; 
    right: number; 
};


export type Payload = {
    onOk?(): void;
    onCancel?(): void;
    [others: string]: any;
  };

export type ModalCustomRefType = {
  show(payload: Payload): void;
};

const ModalCustom = React.forwardRef<ModalCustomRefType>((_props, ref) => {
  const [visible, setVisible] = useState(false);
  const payloadRef = useRef<Payload>({});

  useImperativeHandle(
    ref,
    () => ({
      show: payload => {
        payloadRef.current = payload;
        setVisible(true);
      }
    }),
    []
  );

  const wrapWithClose = (method?: () => void) => () => {
    setVisible(false);
    method && method();
  };

  return (
    <Modal    
      visible={visible}
      onOk={wrapWithClose(payloadRef.current.onOk)}
      onCancel={wrapWithClose(payloadRef.current.onCancel)}
    >
      <div>...</div>
    </Modal>
  );
});




export default ModalCustom;


  /*
  importar:
  import ModalCustom, { ModalCustomRefType, Payload } from '../../components/utils/ModalCustom';
    const moda2lRef : { current: ModalCustomRefType | null } = { current: null };
  const [visibleModal, setVisibleModal] = useState(false);

    const obj: Payload ={
      onOk:  () => { alert('OK'); },
      onCancel:  () => { alert('onCancel'); }
      }

<button onClick={ () => moda2lRef?.current?.show(obj)}>ModalCustom</button>

<ModalCustom ref={moda2lRef}></ModalCustom>
          <Modal
            title="Modal 1000px width"
            
            visible={visibleModal}
            onOk={() => setVisibleModal(false) }
            onCancel={() => setVisibleModal(false)}
            width={1000}
          >
          </Modal>
  */