
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IProduct } from '../../types/product';
import { Button, Checkbox, Form, Input } from 'antd';
import { message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';


interface IProps { onAdd: (category: any) => void; }

const AddCategoryPage = (props: IProps) => {
  const onFinish = (values: any) => {
    props.onAdd(values);
    message.success('Product added successfully!');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login';
    }
}, []);
  return (
    <div>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Category Name"
          name="name"
          rules={[{ required: true, message: 'Please input category name!' },
          { pattern: /^\S+$/, message: 'User name should not contain whitespace!' }
        ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16, }} rules={[{ required: true, message: 'Please input category name!' }]}>
          <Button type="primary" htmlType="submit">
            Add New Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCategoryPage;