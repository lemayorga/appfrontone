import React,{ useState } from "react";
import { Layout } from 'antd';
import { 
    MenuUnfoldOutlined,
    MenuFoldOutlined
 } from '@ant-design/icons';
import HeaderDiv  from './HeaderDiv';
import MenuLayout  from './MenuLayout';

export default function Layouts(props){

    const { Header,Sider, Content , Footer} = Layout;
    const [collapsed, setCollapsed] =  useState(true);

    const toggle = () =>  setCollapsed(!collapsed);

    return(
        <Layout className={`${ props.classname }`} >
            <Sider style={{ background: '#fff' }} className="sidebar-left"  trigger={null} collapsible collapsed={collapsed}> 
              <div className="logo" />
                <MenuLayout collapsed={collapsed} onToggle={() => { setCollapsed(!collapsed) }} />
               
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: toggle,
                })} 
            </Sider>
            <Layout>
                <Header className="headerTop">
                    <HeaderDiv onToggle={toggle} collapsed={collapsed} />
                </Header>
                <Content  style={{ padding: 24, minHeight: '100vh', }}   className={collapsed ? "collapsed mainContnet " : "mainContnet"}>
                    {props.children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design © {new Date().getFullYear()} Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
}

