import React from 'react';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {ItemMenuComplexProps, menuItems} from '../../types/menu/ItemMenuProp';
import IconSelector from "./IconSelector";

type MenuLayoutProps = {
  collapsed:boolean;
  onToggle:  React.MouseEventHandler<HTMLButtonElement>;
}

const MenuLayout:React.FC<MenuLayoutProps> = (props: MenuLayoutProps) => {

    const { SubMenu }  = Menu;
    const active: string[] = [];
    const [openKeysState , setOpenKeys] = useState<Array<string>>([]);
    const [rootSubmenuKeys , setRootSubmenuKeys]  = useState<Array<string>>([]);

    useEffect(() => {
      if(menuItems){
        const menuItemsLista = menuItems.filter((x) => x.children).map((item) => item.key);
        setRootSubmenuKeys(menuItemsLista);
      }
    }, [])

    const onOpenChange = (openKeys:React.Key[]) => {

      const latestOpenKey  = openKeys.find(key => openKeysState.indexOf(key.toString()) === -1);

      if (rootSubmenuKeys.indexOf([latestOpenKey].toString()) === -1) {
          setOpenKeys([openKeys.toString()]);
      } else {
          setOpenKeys(latestOpenKey !== undefined ? [latestOpenKey.toString()] : []);
      }
  };


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
        <Menu theme="light" mode="vertical" defaultSelectedKeys={active}  openKeys={openKeysState} onOpenChange={(e:React.Key[]) =>{onOpenChange(e)}   } > 
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