import React,{ useState } from "react";
import { Layout } from 'antd';
import { 
    MenuUnfoldOutlined,
    MenuFoldOutlined
 } from '@ant-design/icons';

import MenuLayout  from './MenuLayout';
import HeaderDiv from "./HeaderDiv";


type LayoutProps = {
    children?: JSX.Element[] | JSX.Element;
    title?: string;
    classeName?: string;
 }

const Layouts:React.FC<LayoutProps> = (props: LayoutProps) => {
    const { children, classeName } = props;
    const { Header,Sider, Content , Footer} = Layout;
    const [collapsed, setCollapsed] =  useState(true);

    const toggle = () =>  setCollapsed(!collapsed);
    return(
        <Layout className={`${ classeName }`} >
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
                    {children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design © {new Date().getFullYear()} Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
}

export default Layouts;