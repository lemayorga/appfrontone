import { Modal, ModalProps } from "antd";
import React, { useState } from "react";


interface ModalCustomProp  extends ModalProps {
    isActive: boolean,
    children?: JSX.Element | JSX.Element[],
    onCancel?: () => void,
    onOk?: () => void,
}


export const useModal = (initialMode: boolean = false) => {
  const [isOpened, setIsOpened] = useState<boolean>(initialMode);
  const toggle = () => setIsOpened(!isOpened);
  return { isOpened, setIsOpened, toggle };
}

export const ModalUseCustom = (props: ModalCustomProp) => {
  const { isActive, children, onCancel , onOk } = props;
  return (
    <Modal {...props}  maskClosable={false} visible={isActive} 
          onCancel={() => onCancel && onCancel()} 
          onOk={() => onOk && onOk()}
    >
    {children}
    </Modal>
  )
}


  export const useModalWithData = (
    initialMode = false,
    initialSelected = null
  ) => {
    const { isOpened, setIsOpened } = useModal(initialMode)
    const [selected, setSelected] = useState(initialSelected)
    const setModalState = (state:boolean) => {
        setIsOpened(state)
      if (state === false) {
        setSelected(null)
      }
    }
    return { isOpened, setIsOpened, selected, setSelected, setModalState }
  }

