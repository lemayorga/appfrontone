

// import React, { useState, forwardRef } from 'react';
// import { Modal, Button } from 'antd';
// import Draggable from 'react-draggable';
// // import Draggable from 'react-draggable';

// type BoundType = { 
//     left: number; 
//     top: number; 
//     bottom: number; 
//     right: number; 
// };

// type ModalCustomProp ={
//   title: string,
//   width?: string | number | undefined,
//   children?: JSX.Element | JSX.Element[],
//   setShowModal?: boolean
// }

// const ModalCustom : React.FC<ModalCustomProp> = ({ title , width, children }: ModalCustomProp) =>{

//     const [visible, setvisible] = useState(false);
//     const [disabled, setdisabled] = useState(false);
//     const [bounds, setbounds] = useState<BoundType>({ left: 0, top: 0, bottom: 0, right: 0 });

//    const draggleRef : { current: HTMLDivElement | null } = { current: null };
  
//     const handleOk = () => {
//         setvisible(false);
//     };
  
//     const handleCancel = () => {
//         setvisible(false);
//     };


//     const onStart = (event:any, uiData:any) => {
//       const { clientWidth, clientHeight } = window.document.documentElement;
//      const targetRect = draggleRef.current?.getBoundingClientRect();

//       if (!targetRect) {
//         return;
//       }
//       setbounds( {
//           left: -targetRect.left + uiData.x,
//           right: clientWidth - (targetRect.right - uiData.x),
//           top: -targetRect.top + uiData.y,
//           bottom: clientHeight - (targetRect.bottom - uiData.y),
//         },
//       );
//     };
//           {/* <Button onClick={() => setvisible(true) }>Open Draggable Modal</Button> */}  
//     return (
//           <Modal
//             title={
//               <div  style={{ width: '100%', cursor: 'move' }}
//                 onMouseOver={() => {
//                   if (disabled) {
//                     setdisabled(false)
//                   }
//                 }}
//                 onMouseOut={() => { setdisabled(true) }}
//                 onFocus={() => {}}
//                 onBlur={() => {}}
//               >
//                 {title}
//               </div>
//             }
//             width={width}
//             visible={visible}
//             onOk={handleOk}
//             onCancel={handleCancel}
//             modalRender={modal => (
//               <Draggable
//                 disabled={disabled}
//                 bounds={bounds}
//                 onStart={(event, uiData) => onStart(event, uiData)}
//               >
//                 <div ref={draggleRef}>{modal}</div>
//               </Draggable>
//             )}
//           >
//            {children}
//           </Modal>
//       );
//   }


//   export default ModalCustom;




import React, { useState, forwardRef, useImperativeHandle, useRef, memo } from 'react';
import { Modal, Button } from 'antd';
import Draggable from 'react-draggable';
import { ModalStaticFunctions } from 'antd/lib/modal/confirm';
// import Draggable from 'react-draggable';

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