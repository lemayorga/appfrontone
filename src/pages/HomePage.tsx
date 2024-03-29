import React from 'react';
import {Row, Col, Card} from 'antd';
import { LabelTraslate, TextTraslate } from '@app/contexts/Language/LanguageContext';

const HomePage: React.FC = () =>{
  return (
    <>
      <TextTraslate tid="welcome" />
      <Contenido />
    </>
  );

};

export default HomePage;


const Contenido: React.FC = () => {

  return(
    <Row gutter={16}>
    <Col xs={24} md={14}>
      <Card
        bordered={false}
        title={<p>Button Type</p>}
        bodyStyle={{padding: '0 20px 20px'}}
      >
        {/* <Type /> */}
      </Card>
      <Card
        bordered={false}
        title={<p> Button Size</p>}
        bodyStyle={{padding: '0 20px 16px'}}
        className="m-t-15"
      >
        {/* <Size /> */}
      </Card>

      <Card
        bordered={false}
        title={<p>Button Group</p>}
        bodyStyle={{padding: '0 20px 20px'}}
      >
        {/* <Group /> */}
      </Card>
      <Card
        bordered={false}
        title={<p>Button Block</p>}
        bodyStyle={{padding: '0 20px 20px'}}
        className="m-t-15"
      >
        {/* <Block /> */}
      </Card>

    </Col>
    <Col xs={24} md={10}>

      <Card
        bordered={false}
        title={<p> Loading Button </p>}
        bodyStyle={{padding: '0 20px 20px'}}
      >
        {/* <Loading /> */}

      </Card>

      <Card
        bordered={false}
        title={<p>Button with Icons</p>}
        bodyStyle={{padding: '0 20px 20px'}}
        className="m-t-15"
      >
        {/* <Icons /> */}
      </Card>
      <Card
        bordered={false}
        title={<p>Disabled Button</p>}
        bodyStyle={{padding: '0 20px 20px'}}
        className="m-t-15"
      >
        {/* <Disabled /> */}
      </Card>
      <Card
        bordered={false}
        title={<p>Multiple Buttons</p>}
        bodyStyle={{padding: '0 20px 20px'}}
        className="m-t-15"
      >
        {/* <Multiple /> */}
      </Card>
      <Card
        bordered={false}
        title={<p>Ghost Buttons</p>}
        bodyStyle={{padding: '0 20px 20px'}}
        className="m-t-15"
      >
        {/* <Ghost /> */}
      </Card>

    </Col> 

  </Row>
  )
}


// PLugin de json
// https://www.npmjs.com/package/webpack-typings-for-json