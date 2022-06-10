import { DeleteOutlined, EditOutlined, EllipsisOutlined, PicCenterOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Popconfirm } from "antd";
import  Constants from '@app/types/Constants';
import React from "react";

export type DropdownEllipsisProps = {
    record: any,
    menu?:  JSX.Element;
    children?: JSX.Element | JSX.Element[];
    defaultMenu?: boolean;
    onRowEdit?:(T: any) => void;
    onRowDelete?: (T: any) => void;
    onRowDetails?:(T: any) => void;
 }; 
  

  const menuDefault = (props: DropdownEllipsisProps): JSX.Element  => {
    const { record,onRowEdit, onRowDelete, onRowDetails } = props;
  

    const handelRowEdit = (row: any): void => {
        console.log(row);
        onRowEdit && onRowEdit(row);
    }
    const cancelDelete = (e:any): void => {
        console.log(e);
    }
    const handleDelete = (row: any): void => {
        onRowDelete && onRowDelete(row);
    }   
    
     const handleDetails = (row: any): void => {
        onRowDetails && onRowDetails(row);
      } 
    
  
    return (
        <Menu>
            <Menu.Item key={Constants.TEXT_EDIT}>
                <Button  type="link" icon={<EditOutlined />} onClick={() => handelRowEdit(record) }>
                {Constants.TEXT_EDIT}
                </Button>           
            </Menu.Item>
            <Menu.Item key={Constants.TEXT_DELETE}>
            <Popconfirm
                    title={Constants.QUESTION_REMOVER_ITEM_GRID}
                    icon={ <DeleteOutlined /> }
                    onConfirm={(e) => handleDelete(record)}
                    onCancel={cancelDelete}
                    okText={Constants.TEXT_YES}
                    cancelText={Constants.TEXT_NO}
                >
                <Button  type="link" danger icon={ <DeleteOutlined /> } >{Constants.TEXT_DELETE}</Button> 
                </Popconfirm>
            </Menu.Item>
            <Menu.Item key={Constants.TEXT_SEE_DETAILS_ITEM_GRID}>
                <Button  type="link" icon={<PicCenterOutlined />} onClick={() => handleDetails(record) } >
                  {Constants.TEXT_SEE_DETAILS_ITEM_GRID}
                </Button>           
            </Menu.Item>
        </Menu>
    )
  }
  
const menu  = (props: DropdownEllipsisProps) : JSX.Element  =>  {
    const { menu, children, defaultMenu } = props;

    if(menu){
        return <>{children}</>
    }else if(menu){
        return <>{menu}</>
    }else if((defaultMenu || false)){
        return <>{menuDefault(props)}</>
    }else{
        return <></>
    }
}


const DropdownEllipsis = (props: DropdownEllipsisProps) : JSX.Element  => (    
    <Dropdown {...props}  overlay={ menu(props)  }>
        <Button style={{ border: 'none', padding: 0, }} >
            <EllipsisOutlined style={{ fontSize: 30, verticalAlign: 'top', }} />
        </Button>
    </Dropdown>
);


export default DropdownEllipsis;