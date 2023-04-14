import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { IProduct } from '../../types/product';
import { Button, Select, message } from 'antd';
interface IProps {
    history: any,
    products: IProduct[],
    onUpdate: (product: IProduct) => void
}
const UpdateProductPage = (props: IProps) => {
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm();
    const [isSuccess, setIsSuccess] = useState(false);
    const [product, setProduct] = useState<IProduct>({});
    const [category, setCategory] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    useEffect(() => {
        const currentProduct = props.products.find((product) => product.id === Number(id));
        setProduct(currentProduct);
        reset(currentProduct);
        fetch('http://localhost:3000/category')
            .then(response => response.json())
            .then(data => setCategory(data));
    }, [props, id, reset]);
    useEffect(() => {
        const currentCategory = category.find(item => item.id === product?.categoryId);
        setCategoryName(currentCategory?.name || '');
    }, [product, category]);
    const onHandleSubmit = (data: IProduct) => {
        const categoryId = isNaN(data.categoryId) ? 0 : parseInt(data.categoryId);
        const updatedProduct = { ...data, categoryId };
        props.onUpdate(updatedProduct);
        setIsSuccess(true);
        message.success('Cập nhật sản phẩm thành công!');
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        }
    }, []);
    return (
        <div style={{ marginTop: '20px' }}>
            <form action="" onSubmit={handleSubmit(onHandleSubmit)}>
                <p>Name Movie</p> <input style={{ borderRadius: '5px', padding: '5px', borderColor: '#F0F0F0', border: '0.5px solid', marginLeft: '10px', width: '300px' }} type="text" {...register('name')} /> <br />
                <p>Fare</p> <input style={{ borderRadius: '5px', padding: '5px', borderColor: '#F0F0F0', border: '0.5px solid', marginLeft: '10px', width: '300px' }} type="number" {...register('price')} /><br />
                <p>Description</p><input style={{ borderRadius: '5px', padding: '5px', borderColor: '#F0F0F0', border: '0.5px solid', marginLeft: '10px', width: '300px' }} type="text" {...register('description')} /><br />
                <p>Image</p><input style={{ borderRadius: '5px', padding: '5px', borderColor: '#F0F0F0', border: '0.5px solid', marginLeft: '10px', width: '300px' }} type="text" {...register('image')} /><br />
                <p>Watch</p><input style={{ borderRadius: '5px', padding: '5px', borderColor: '#F0F0F0', border: '0.5px solid', marginLeft: '10px', width: '300px' }} type="text" {...register('watch')} /><br />
                <p>Category</p>
                <select  style={{ borderRadius: '5px', padding: '5px', borderColor: '#F0F0F0', border: '0.5px solid', marginLeft: '10px', width: '300px' }} {...register('categoryId')} name="" id="">
                    <option value="">-- Chọn category --</option>
                    {category.map(category => (
                        <option key={category.id} value={category.id}>{category.name} : {category.id}</option>
                    ))}
                </select>
                <br /><br />
                <input style={{ borderRadius: '5px', padding: '5px', borderColor: '#F0F0F0', border: '0.5px solid', marginLeft: '10px', width: '300px' }} type="number" {...register('categoryId')} />
                <br />
                <Button style={{ marginTop: '20px' }} type="primary" htmlType="submit">
                    Update Product
                </Button>
            </form>
            
        </div>
    )
}
export default UpdateProductPage;