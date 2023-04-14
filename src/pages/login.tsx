import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Layout, message } from 'antd';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!username || !password) {
            setErrorMessage('Please enter username and password.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/user');
            const users = await response.json();

            // Kiểm tra thông tin đăng nhập
            const currentUser = users.find(user => user.username === username && user.password === password);

            if (currentUser.role === 'admin') {
                localStorage.setItem('token', JSON.stringify(currentUser))
                window.location.href = '/admin/products';
                message.success('Login successfully!');
            } else {
                localStorage.setItem('tokenuser', JSON.stringify(currentUser));
                window.location.href = '/';
            }
        } catch (error) {
            message.error('Wrong account or password!');
        }
    };


    return (

        <Layout style={{ marginBottom: '150px', width: '100%' }} >
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, marginTop: 100 }}
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                onSubmitCapture={handleSubmit}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}

                >
                    <Input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox> <a href="/signup">Do not have an account</a>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

        </Layout>


    );
};

export default LoginForm;