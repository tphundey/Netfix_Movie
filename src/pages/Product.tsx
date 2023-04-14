import React, { useEffect, useState } from 'react';
import { Avatar, Button, Col, Dropdown, Row } from 'antd';
import { Link } from 'react-router-dom';
import { IProduct } from '../types/product'
import { Image } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Input, Space } from 'antd';
import { FacebookOutlined, GithubOutlined } from '@ant-design/icons';
const { Search } = Input;
const { Header, Content, Footer } = Layout;
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a rel="noopener noreferrer" href="http://localhost:5173/listfavorites">
        List Favorites
      </a>
    ),
  },
];

interface IProps {
  products: IProduct[],
}
const onSearch = (value: string) => console.log(value);
const ProductPage = (props: IProps) => {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [data, setData] = useState<IProduct[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<IProduct[]>([]);

  useEffect(() => {
    setData(props.products);
    setFilteredData(props.products);
  }, [props]);

  const handleSearch = (event: any) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log(`Search for: ${searchText}`);
    const filteredProducts = data.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filteredProducts);
  };
  const [visible, setVisible] = useState(false);
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
            <Search placeholder="Search movie"
              value={searchText}
              onChange={handleSearch}
              onSearch={handleSearchSubmit}
              style={{ padding: '10px', paddingBottom: '40px' }} />
            <div style={{ marginLeft: '10px', paddingBottom: '30px' }}>
              {/* Thêm đoạn code kiểm tra tokenuser vào đây */}
              {localStorage.getItem("tokenuser") ? (

                <div style={{ display: 'flex' }}>
                  <div>

                    <Dropdown menu={{ items }}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          <Avatar style={{ marginRight: '20px' }} src={'https://yt3.ggpht.com/df6PnszOWNEIdPo6LP7fl0c1KcfcC7zqZRNgIO6TEZuunD69pv7PIDiQZ1i82ICZVLBXslqjOZU=s88-c-k-c0x00ffffff-no-nd-rj'} />
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

      <div>
        <div
          style={{
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#333333',
            padding: '20px 100px',
          }}
        >

          <br></br>
          <Row gutter={[1, 1]}>
            {filteredData.map((item) => (
              <Col
                xs={{ span: 25 }}
                lg={{ span: 6 }}
                key={item.id}
                style={{
                  background: colorBgContainer,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#333333',
                }}
              >
                <Link to={`/products/${item.id}`}>
                  <div style={{ margin: '10px', color: '#fff' }}>
                    <Image.PreviewGroup
                      preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
                    >
                      <Image style={{ borderRadius: '10px' }} src={item.image} />
                    </Image.PreviewGroup>
                    <h3>{item.name}</h3>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>
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

export default ProductPage;