import logo from '../../static/images/logo.png';
import avatar from '../../static/images/flat-avatar.png';
import {Link} from 'react-router-dom';
import { Menu, Input, Avatar } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const HeaderDiv = () => {

  const SubMenu = Menu.SubMenu;
 
  const onChange = e => {
    console.log(e.target.value);
  };

  return (
      <Menu mode="horizontal" theme="dark"  className="d-flex align-items-center custom-navigation">
        <Menu.Item key="brand-logo" className="brand-logo">
          <Link to="/dashboard">
            <img src={logo} className="m-r-5" alt="" />
            <span>Ant Dashboard</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="search" className="custom-search auto">          
             <Input size="large" placeholder="large size"  prefix={<SearchOutlined style={{  color:'#000' }} />} onChange={onChange} /> 
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
