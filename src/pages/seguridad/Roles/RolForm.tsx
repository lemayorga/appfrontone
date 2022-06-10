import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Space } from 'antd';
import FormProp  from 'types/customers/FormProp';
import Rol from 'types/modelsapis/seguridad/rol';
import Constants from '../../../types/Constants';

interface RolFormProps extends FormProp{
  record?:Rol
}

const RolForm = (props: RolFormProps) => {
  const {textCancel, textOk , onCancel, onOk, record, disabled } =  props;
  const [currentRol, setCurrentRol] = useState(record);
  const [form] = Form.useForm();

  useEffect(() => {
    setCurrentRol(record);
    form.setFieldsValue(record);

  }, [form, record])

  const onFinish =  (values: Rol) => {
    setCurrentRol(values);
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