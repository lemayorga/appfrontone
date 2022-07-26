import { PlusCircleOutlined } from "@ant-design/icons";
import { RolContext, RolStore } from "@app/contexts/bussines/seguridad/RolContext";
import { ConstantsActionType } from "@app/types/Constants";
import Rol from "@app/types/modelsapis/seguridad/rol";
import { Button, PageHeader } from "antd";
import React, { useContext, useEffect, useState } from "react";
import * as rolServies from '@app/services/apiServices/seguridad/roles.service';
import CustomTable from "@app/components/utils/GridTable";
import DropdownEllipsis from "@app/components/utils/DropdownEllipsis";
import { ModalUseCustom, useModalWithData } from "@app/components/utils/ModalUseCustom";
import FormProp from "@app/types/customers/FormProp";
import RolForm from "./RolForm";
import EumTransactionType from "@app/types/enums/EumTransactionType";


const RolPage: React.FC = () =>{
    return(
        <RolStore> 
          <RolPageContent />
        </RolStore>
    )
}
export default RolPage;

export const RolPageContent: React.FC = () =>{
  const { isOpened, setModalState } = useModalWithData();
  const [propsForm, setPropsForm ] = useState<FormProp>({});
  const { state, dispatch } = useContext(RolContext);

  useEffect(() => {
    const fechListRoles = async () => {
      const datos = await rolServies.get();
      dispatch({ type: ConstantsActionType.GET_DATA_ALL, payload: datos});
    }
  
    fechListRoles();
  }, []);


  const handelRowNew = ()=>{
    setPropsForm({
      ...propsForm,
      titleForm: 'Agregar rol',
      disabled: false,
    });
    dispatch({ type: ConstantsActionType.SET_MODEL, payload: ({} as Rol)});
    dispatch({ type: ConstantsActionType.SET_TRANSACTION, payload: EumTransactionType.Add });
    setModalState(true);
  }

  const handelRowEdit = (data: Rol)=>{
    setPropsForm({
      ...propsForm,
      titleForm: 'Modificar rol',
      disabled: false,
    });
    dispatch({ type: ConstantsActionType.SET_MODEL, payload: data });
    dispatch({ type: ConstantsActionType.SET_TRANSACTION, payload: EumTransactionType.Update });
    setModalState(true);
  }

  const handelRowDelete = (data: Rol)=>{
    const onDelete = async (data:Rol) => {
     await rolServies.removeByKey(data.cod_rol);
      dispatch({ type: ConstantsActionType.DELETE, payload: data.cod_rol });
    }
    onDelete(data);
  }
  const handelRowDetails = (data: Rol)=>{
    setPropsForm({
      ...propsForm,
      titleForm: 'Detalle del rol',
      disabled: true
    });
    dispatch({ type: ConstantsActionType.SET_MODEL, payload: data });
    dispatch({ type: ConstantsActionType.SET_TRANSACTION, payload: EumTransactionType.GetBykey });
    setModalState(true);
  }

  const onSaveForm =  (data: Rol) =>{
    const fechRegister = async (data: Rol) => {
      let rolResult:Rol = {} as Rol;
      let { transaction }  = state;

      if(transaction == EumTransactionType.Add){
        rolResult = await rolServies.create(data);
        dispatch({ type: ConstantsActionType.ADD, payload: rolResult });
      }
      else if(transaction == EumTransactionType.Update){
        rolResult = await rolServies.update(data);
        dispatch({ type: ConstantsActionType.UPDATE, payload: rolResult });
      }      
    }

    fechRegister(data);
    setModalState(false);
  }

  const columnas = [ 
    {
      dataIndex: 'cod_rol',
    },
    {
      title: 'Rol',
      dataIndex: 'nombre',
      width: '100%',
    },
    {
      title: 'Acción',
      dataIndex: 'action',
      width: '20%',
      render: (text:string,record: any) => ( 
          <DropdownEllipsis key={record.cod_rol} record={record} 
            defaultMenu={true}  
            onRowEdit={handelRowEdit}  
            onRowDelete={handelRowDelete}
            onRowDetails={handelRowDetails}  
          /> 
        )
    },    
  ];

  return(
      <>
        <PageHeader           
          className="site-page-header" 
          title="Roles del sistema"  
          onBack={() => window.history.back()}
          extra={[
              <Button key="1" type="primary" onClick={handelRowNew}>
                <PlusCircleOutlined />
                Nuevo rol
              </Button>
          ]}/>
  
          <ModalUseCustom
            title={propsForm.titleForm}
            isActive={isOpened}
            width={600}
            footer={null} 
            onOk={() => { setModalState(false) }} 
            onCancel={() => setModalState(false)}  
            destroyOnClose={true}
          >
            <RolForm
              onCancel={()=>{ setModalState(false) }}  
              onOk={onSaveForm}
              disabled={propsForm.disabled}
            />
          </ModalUseCustom>

          <CustomTable columns={columnas} dataSource={state.data} />
      </>
  )
}
