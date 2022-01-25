
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Space, Table } from 'antd';
import { FilterValue, SorterResult, TablePaginationConfig } from 'antd/lib/table/interface';
import React, { useState, useEffect} from 'react';
import Rol from 'types/modelsapis/seguridad/rol';
import CustomTable from '../../components/utils/GridTable';
import * as rolServies from '../../services/apiServices/seguridad/roles.service';


const RolesPage: React.FC = () =>{
    const [state, setState] = useState<any[]>([]);
    
    return(
        <div>
            <ListarRoles />
        </div>
    )
}


const ListarRoles: React.FC = () =>{

 
  const [roles, setRoles] = useState<Rol[]>([]);
  useEffect(() => {

    const fetchData = async () => {
      const listaRoles = await rolServies.get();
     setRoles(listaRoles);
      return listaRoles;
    };

    fetchData();
  }, []);
  
  // const columnas = [ 
  //   // {
  //   //   title: 'Codigo',
  //   //   dataIndex: 'cod_rol',
  //   //   width: '5%',
  //   //   hidden: true
  //   // },
  //   {
  //     title: 'Rol',
  //     dataIndex: 'nombre',
  //     width: '100%',
  //   },
  // ];


  ///************** */
  const handelRowEdit = (key_row: any): void => {
    console.log(key_row);
    console.log(typeof(key_row));
   }
   const cancel = (e:any): void => {
    console.log(e);
    console.log(typeof(e));
   }
  const handleDelete = (key_row: any): void => {

  }   

  const columnas = [
    {
      title: 'Codigo',
      dataIndex: 'personaId',
      width: '5%',
      hidden: true
    },
    {
      title: 'nombres',
      dataIndex: 'nombres',
      width: '20%',
    },
    {
      title: 'apellidos',
      dataIndex: 'apellidos',
      width: '20%',
    },
    {
      title: 'Acción',
      dataIndex: 'action',
      width: '20%',
      render: (text:string) => (
        <>
          <Button  type="link"
                   icon={<EditOutlined />}
                   onClick={() => handelRowEdit(text) }
                  >Editar</Button> 
        <Popconfirm
          title="¿Esta seguro de eliminar el registro?"
          icon={ <DeleteOutlined /> }
          onConfirm={(e) => handleDelete(text)}
          onCancel={cancel}
          okText="Si"
          cancelText="No"
        >
          <Button  type="link" danger icon={ <DeleteOutlined /> } >Eliminar</Button> 
        </Popconfirm>
  
        </>
      )
    },
  ];

  
 const data = [
    {
     personaId: '0',
     nombres: 'Mike',
     apellidos: 'Mora'
   }, 
   {
     personaId: '2',
     nombres: 'Alejandro',
     apellidos: 'Guzman'
   }, 
   {
     personaId: '3',
     nombres: 'Susana',
     apellidos: 'Gaitan'
   }, 
   {
     personaId: '4',
     nombres: 'Manuel ',
     apellidos: 'Gozales'
   }, 
   {
     personaId: '5',
     nombres: 'Antonio',
     apellidos: 'Zamuria'
   }, 
   {
     personaId: '6',
     nombres: 'Arnoldo',
     apellidos: 'Soza'
   }, 
   {
     personaId: '7',
     nombres: 'Luis',
     apellidos: 'Montoya'
   }, 
   {
     personaId: '8',
     nombres: 'Ivan',
     apellidos: 'Fuentes'
   }, 
   {
     personaId: '9',
     nombres: 'Homand',
     apellidos: 'Mendienta'
   }, 
   {
     personaId: '10',
     nombres: 'Arturo',
     apellidos: 'Almendares'
   }, 
   {
     personaId: '11',
     nombres: 'Susana',
     apellidos: 'Gaitan'
   }, 
 ];




    return(
        <div>
            <CustomTable columns={columnas} dataSource={data} />
            {/* <CustomTable columns={columnas} dataSource={roles} /> */}
        </div>
    )
}

export default RolesPage;