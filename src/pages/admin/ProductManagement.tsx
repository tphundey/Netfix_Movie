import React, { useEffect, useState } from 'react';
import { Space, Table, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { Input } from 'antd';

interface DataType {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
}

const { Search } = Input;
const sortProducts = (products) => {
    return products.reverse();
}

const ProductManagementPage = (props: any) => {
    const removeProduct = (id: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (confirmDelete) {
            props.onRemove(id);
            window.location.reload();
        }
    };
    const handleSortNewest = () => {
        setFilteredData([...filteredData].reverse());
    };
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

    const MyButton = ({ productId }: { productId: number }) => {
        return (
            <Link to={`/admin/products/${productId}/update`}>
                <Button type="primary" style={{ backgroundColor: '#2F83E7' }}>Update</Button>
            </Link>
        );
    }

    const [data, setData] = useState<DataType[]>([]);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState<DataType[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        }
    }, []);

    useEffect(() => {
        setData(sortProducts(props.products.map(item => {
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                description: item.description,
                createdAt: item.createdAt,
            }
        })));
    }, [props.products]);
    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img width={"90px"} src={image} alt="" />,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <div>
                    <Space size="middle">
                        <Button type="primary" style={{ backgroundColor: 'red' }} onClick={() => removeProduct(record.id)}>Remove</Button>
                        <MyButton productId={record.id} />
                    </Space>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div>
                <Search placeholder="Search movie"
                    value={searchText}
                    onChange={handleSearch}
                    onSearch={handleSearchSubmit}
                    style={{ padding: '10px', paddingBottom: '40px', width: '400px' }} />
            </div>
            <div>
                <Table columns={columns} dataSource={filteredData.length > 0 ? filteredData : data} pagination={{ pageSize: 4 }} />
            </div>

        </div>
    )
}

export default ProductManagementPage;