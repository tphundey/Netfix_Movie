import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

interface DataType {
  id: number;
  name: string;
}
const { Search } = Input;

const CategoryManagementPage = (props: any) => {
  const removeCategory = (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (confirmDelete) {
      props.onRemove(id);
      window.location.reload();
    }
  };

  const MyButton = ({ categoryId }: { categoryId: number }) => {
    return (
      <Link to={`/admin/category/${categoryId}/update`}>
        <Button type="primary" style={{ backgroundColor: '#2F83E7' }}>
          Update
        </Button>
      </Link>
    );
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Button type="primary" style={{ backgroundColor: 'red' }} onClick={() => removeCategory(record.id)}>
            Remove
          </Button>
          <MyButton categoryId={record.id} />
        </Space>
      ),
    },
  ];

  const data: DataType[] = props.category.map((item) => {
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
          window.location.href = '/login';
      }
  }, []);
    return {
      id: item.id,
      name: item.name,
    };
  });

  return <Table columns={columns} dataSource={data} pagination={{ pageSize: 4 }} />;
};

export default CategoryManagementPage;