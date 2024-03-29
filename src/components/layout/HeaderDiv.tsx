import React from 'react';
import logo from '@app/static/images/logo.png';
import avatar from '@app/static/images/flat-avatar.png';
import {Link} from 'react-router-dom';
import { Menu, Input, Avatar } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { 
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import LanguageSelector from '@app/contexts/Language/LanguageSelector';

interface HeaderDivProps {
  collapsed: boolean;
  onToggle:  React.MouseEventHandler<HTMLButtonElement>;
}

const HeaderDiv: React.FC<HeaderDivProps> =  ({collapsed, onToggle}) => {

  const SubMenu = Menu.SubMenu;
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
        <Menu.Item key="select_language" className=""  >    
          <LanguageSelector style={{ fontSize: '14px', margin: '0', padding: '0.7em 0', color: '#000' }} />
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
