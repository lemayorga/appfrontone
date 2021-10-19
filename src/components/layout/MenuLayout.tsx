import { useState } from "react";
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {ItemMenuComplexProps, menuItems} from '../../types/menu/ItemMenuProp';
import IconSelector from "./IconSelector";



const MenuLayout = () => {

    const { SubMenu }  = Menu;
    const active: string[] = [];
    const [openKeys , setOpenKeys] = useState<Array<string>>([]);
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub4','sub5','sub3', 'sub6'];

    // const onOpenChange = (openKeys:React.Key[]) => {
    //     const latestOpenKey  = openKeys.find(key => openKeys.indexOf(key) === -1);
    //     if (rootSubmenuKeys.indexOf([latestOpenKey].toString()) === -1) {
    //         setOpenKeys([...myMap.keys()] [openKeys.toString()]);
    //     } else {
    //         setOpenKeys([latestOpenKey.toString()] ? [latestOpenKey.] : []);
    //     }
    // };

    
  //   const onOpenChange = (openKeys:React.Key[]) => {

  //     const latestOpenKey  = openKeys.find(key => openKeys.indexOf(key) === -1);


  //     console.log(latestOpenKey)
  //     console.log(openKeys)

  //     if (rootSubmenuKeys.indexOf([latestOpenKey].toString()) === -1) {
  //         setOpenKeys([openKeys.toString()]);
  //     } else {
  //         setOpenKeys(latestOpenKey != undefined ? [latestOpenKey.toString()] : []);
  //     }
  // };


    const printItem = (child: ItemMenuComplexProps) =>  {
      return (
          <SubMenu key={child.key}
              title={ 
                <span>  
                  <IconSelector type={child.icon!} /> 
                  <span>{child.title}</span>
                </span>
                }
          >
            {child.children!.map((item, index) =>{
              return(
                <Menu.Item key={item.key}>
                    <Link to={item.link!}>{item.title}</Link>
                </Menu.Item>
              );
            })}
          </SubMenu>
      );
  }


    return(
        // <Menu theme="light" mode="vertical"  defaultSelectedKeys={active}   openKeys={openKeys}   onOpenChange={(e:React.Key[]) =>{onOpenChange(e)}   } > 
        <Menu theme="light" mode="vertical"> 
          {menuItems.map((item, index) => {
            return (
                item.children == null ?
                  <Menu.Item key={item.key}>
                      <Link to={item.link!}>
                        <div>
                          <IconSelector type={item.icon!} />
                          <span> {item.title} </span>
                        </div>
                      </Link>
                  </Menu.Item>
                :
                printItem(item)
            );
          })}
        </Menu>

    );
}


export default MenuLayout;