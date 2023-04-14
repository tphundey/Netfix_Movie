import React from 'react';
import { Avatar, Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;
import { Outlet, Link } from 'react-router-dom'
import { FacebookOutlined, GithubOutlined, SmileOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
const { Search } = Input;
import type { MenuProps } from 'antd';
import '../../test.css'
import { Button, Dropdown } from 'antd';
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a  rel="noopener noreferrer" href="http://localhost:5173/listfavorites">
      List Favorites 
      </a>
    ),
  },
];

const onSearch = (value: string) => console.log(value);
const WebsiteLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{
      padding: '0px auto',
      margin: '0px auto',
      // backgroundColor:'black'
    }} className="layout">
 <Header>

<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  <div>
    <img width={'80px'} src="https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Big_City_Greens_Logo.png/250px-Big_City_Greens_Logo.png" alt="" />
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Search placeholder="Search movie" onSearch={onSearch} enterButton style={{ padding: '10px', paddingBottom: '40px' }} />
    <div style={{ marginLeft: '10px', paddingBottom: '30px' }}>
      {/* Thêm đoạn code kiểm tra tokenuser vào đây */}
      {localStorage.getItem("tokenuser") ? (

<div style={{ display: 'flex' }}>
  <div>
   
    <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        <Avatar style={{marginRight:'20px'}} src={'https://yt3.ggpht.com/df6PnszOWNEIdPo6LP7fl0c1KcfcC7zqZRNgIO6TEZuunD69pv7PIDiQZ1i82ICZVLBXslqjOZU=s88-c-k-c0x00ffffff-no-nd-rj'} />
      </Space>
    </a>
  </Dropdown>
  </div>
  <div>
    <a href="#" onClick={() => { localStorage.removeItem("tokenuser"); location.reload() }}>

      <Button type="primary">Logout</Button>

    </a>
  </div>

</div>
) : (
<Link to="/login">

  <Button type="primary">LOGIN</Button>
</Link>
)}
    </div>
  </div>
</div>
</Header>

      <Breadcrumb
        style={{
          padding: '10px 50px',
        }}
        items={[
          {
            title: <a href="http://localhost:5173/">Home</a>,
          },
          {
            title: <a href="http://localhost:5173/products">Movies</a>,
          }

        ]}
      />
      <Content
        style={{
          padding: '20px 100px',
          backgroundColor: '#222222'
        }}
      >
        <div className="site-layout-content" style={{ background: colorBgContainer }}>
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'black',
          color: 'white'
        }}
      >
        <div>Code by taidvph20044 </div>
        <div style={{ fontSize: '24px' }}>
          <a href="https://www.facebook.com/taidvph20044/"><FacebookOutlined style={{ marginRight: '10px', color: 'red' }} /></a>
          <a href="https://github.com/taidvph20044"><GithubOutlined /></a>
        </div>
      </Footer>

    </Layout>
  );
};

export default WebsiteLayout

