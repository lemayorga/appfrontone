import React,{ useState } from "react";
import logo from '../../static/images/logo.png';
import avatar from '../../static/images/flat-avatar.png';
import {Link} from 'react-router-dom';
import { Menu, Input, Avatar } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { 
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';


const HeaderDiv = (props) => {

  const SubMenu = Menu.SubMenu;
  const {collapsed, onToggle} = props;
  const Component = collapsed ? MenuUnfoldOutlined : MenuFoldOutlined;

  return (
      <Menu mode="horizontal" theme="dark"  className="d-flex align-items-center custom-navigation">
        <Menu.Item key="brand-logo" className="brand-logo">
          <Link to="/dashboard">
            <img src={logo} className="m-r-5" alt="" />
            <span>Ant Dashboard</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="toggle">
          <Component style={{ fontSize: '18px', marginTop: '0.5em' }} onClick={onToggle} className={'trigger'} />
        </Menu.Item>
        <Menu.Item key="search" className="custom-search auto">          
         <Input size="large" placeholder="large size"  prefix={<SearchOutlined style={{  color:'#000' }} />} /> 
        </Menu.Item>
        
        <SubMenu  key="profile" className=""
          title={
            <span>
              <Avatar size={24} src={avatar} />
              <span> Profile</span>
            </span>
          }
        >
          <Menu.Item key="profile-view">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <Link to="/">Logout</Link>
          </Menu.Item>
        </SubMenu>

      </Menu>
    );
}



export default HeaderDiv;
