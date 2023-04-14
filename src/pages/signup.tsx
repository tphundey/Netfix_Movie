
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Checkbox, Form, Input, Layout } from 'antd';
import { message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';


interface IProps { onAdd: (user: any) => void; }

const LoginForm = (props: IProps) => {
    const onFinish = (values: any) => {
        props.onAdd(values);
        message.success('User added successfully!');
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div>
            <Layout style={{ marginBottom: '200px', width: '100%' }} >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600, marginTop: '50px' }}
                    initialValues={{ remember: true, role: 'user' }} // Thêm giá trị mặc định cho trường "role"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input Email!' },
                        { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="User name"
                        name="username"
                        rules={[
                            { required: true, message: 'Please input User name!' },
                            { pattern: /^\S+$/, message: 'User name should not contain whitespace!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: 'Please input Password!' },
                            { pattern: /^\S+$/, message: 'Password should not contain whitespace!' }
                        ]}
                    >
                        <Input type='password' />
                    </Form.Item>
                    <Form.Item label="Role" name="role" rules={[{ message: '' }]}>
                        <Input disabled defaultValue={'user'} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </Layout>
        </div>
    );
};

export default LoginForm;