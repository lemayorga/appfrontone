import { Button, PageHeader, Result } from 'antd';
import React, { useEffect, useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import RolForm from './RolForm';
import CustomTable from "@app/components/utils/GridTable";
import DropdownEllipsis from '@app/components/utils/DropdownEllipsis';
import { ModalUseCustom, useModalWithData } from '@app/components/utils/ModalUseCustom';
import Rol from "@app/types/modelsapis/seguridad/rol";
import * as rolServies from '@app/services/apiServices/seguridad/roles.service';
import FormProp from '@app/types/customers/FormProp';
import EumTransactionType from '@app/types/enums/EumTransactionType';


const RolesPage: React.FC = () =>{

  const { isOpened, setModalState } = useModalWithData();
  const [propsForm, setPropsForm ] = useState<FormProp>({});
  const [listRoles, setlistRoles] = useState<Rol[]>([]);
  const [currentRol, setCurrentRol] = useState<Rol>();

  useEffect(() => {
    const fechListRoles = async () => {
      const datos = await rolServies.get();
      setlistRoles(datos);
    }

    fechListRoles();
  }, [propsForm]);


  const onSaveForm =  (data: Rol) =>{

    fechRegister(data,propsForm.transaction!);
    setModalState(false);
  }

  const fechRegister = async (data: Rol, transactionForm: EumTransactionType) => {
    let rolResult:Rol;

    switch(transactionForm){
      case EumTransactionType.Add:
        rolResult = await rolServies.create(data);
        setlistRoles([...listRoles, rolResult]);
        
        break;
        case EumTransactionType.Update:
          rolResult = await rolServies.update(data);
          setlistRoles(
            listRoles.map((item) => (item.cod_rol === rolResult.cod_rol ? rolResult : item))
          );
         break;
    }
  }

  const handelRowNew = ()=>{
    setPropsForm({
      ...propsForm,
      titleForm: 'Agregar rol',
      transaction: EumTransactionType.Add
    });
    setCurrentRol(undefined);
    setModalState(true);
  }
  const handelRowEdit = (data: Rol)=>{
    setPropsForm({
      ...propsForm,
      titleForm: 'Modificar rol',
      transaction: EumTransactionType.Update
    });
    setCurrentRol(data);
    setModalState(true);
  }

  const handelRowDelete = (data: Rol)=>{
    const fechRemover = async () => {
     await rolServies.removeByKey(data.cod_rol);
      setlistRoles(
        listRoles.filter((item) => item.cod_rol !== data.cod_rol)
      );
    };
    fechRemover();
  }
  const handelRowDetails = (data: Rol)=>{
    setPropsForm({
      ...propsForm,
      titleForm: 'Detalle del rol',
      transaction: EumTransactionType.GetBykey,
      disabled: true
    });
    setCurrentRol(data);
    setModalState(true);
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
      <div>
        <PageHeader           
          className="site-page-header" 
          title="Roles del sistema"  
          onBack={() => window.history.back()}
          extra={[
            <Button key="1" type="primary" onClick={(e) => {   handelRowNew();  }}>
              <PlusCircleOutlined />
              Nuevo rol
            </Button>
        ]}/>
          <CustomTable columns={columnas} dataSource={listRoles} />

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
                 record={currentRol}
                 onCancel={()=>{ setModalState(false) }}  
                 onOk={onSaveForm}
                 disabled={propsForm.disabled}
              />
            </ModalUseCustom>
      </div>
  )    
}



export default RolesPage;

// https://stackoverflow.com/questions/41221633/how-to-submit-form-component-in-modal-dialogue-using-antd-react-component-librar



// https://dev.to/sanderdebr/creating-a-crud-app-in-react-with-hooks-3jml
// https://github.com/sanderdebr/react-crud-hooks/blob/master/src/App.js
// https://codesandbox.io/s/crud-app-with-react-hooks-and-typescript-7df3b?file=/src/index.tsx