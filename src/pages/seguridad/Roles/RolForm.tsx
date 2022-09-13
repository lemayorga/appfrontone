import React, { useContext, useEffect } from 'react';
import { Form, Input, Button, Space } from 'antd';
import FormProp  from '@app/types/customers/FormProp';
import Rol from '@app/types/modelsapis/seguridad/rol';
import Constants from '@app/types/Constants';
import { RolContext } from '@app/contexts/bussines/seguridad/RolContext';

interface RolFormProps extends FormProp{
  record?:Rol
}

const RolForm = (props: RolFormProps) => {
  const {textCancel, textOk , onCancel, onOk, disabled } =  props;
  const [form] = Form.useForm();
  const { state } = useContext(RolContext);
  const { model } = state;

  
  useEffect(() => {
      form.setFieldsValue(model);
  }, [form])

  const onFinish =  (values: Rol) => {
    console.log('Success:', values);
    onOk && onOk(values);
  };

  function onFinishFailed(errorInfo: any) {
    console.log('Failed:', errorInfo);
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
     >
      <Form.Item hidden  name="cod_rol">
        <Input type="hidden" />
      </Form.Item>
      <Form.Item  label="Nombre"  name="nombre" rules={[{ required: true, message: `${Constants.TEXT_REQUIRED_FIELD}` }]}  >
         <Input disabled={disabled}  />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Space>
          <Button type="default" htmlType="button" onClick={() => onCancel && onCancel()}>
              { textCancel ||  Constants.TEXT_CANCEL  }
            </Button>

            <Button type="primary" htmlType="submit" disabled={disabled} >
              { textOk || Constants.TEXT_SAVE }
            </Button>
        </Space>
       </Form.Item> 
    </Form>
  );
};
export default RolForm;