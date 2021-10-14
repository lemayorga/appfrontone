import React,{ useState } from "react";
import { Layout } from 'antd';
import { 
    MenuUnfoldOutlined,
    MenuFoldOutlined
 } from '@ant-design/icons';
import HeaderDiv  from './HeaderDiv';
import MenuLayout  from './MenuLayout';

export default function Layouts(props){

    const { Header,Sider, Content } = Layout;
    const [collapsed, setCollapsed] =  useState(true);

    const toggle = () => setCollapsed(!collapsed); 

    return(
        <Layout>
            <Sider style={{ background: '#fff' }} className="sidebar-left"  trigger={null} collapsible collapsed={collapsed}> 
              <div className="logo" />
                <MenuLayout />
               
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: toggle,
                })} 

            </Sider>
            <Layout>
                <Header className="headerTop">
                    <HeaderDiv />
                    
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                    })}
                </Header>
            </Layout>
            <Content  style={{ padding: 24, minHeight: '100vh', }}   className={collapsed ? "collapsed mainContnet " : "mainContnet"}>
                   {props.children}
            </Content>
        </Layout>
    );
}

