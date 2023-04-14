import { useParams, Link } from 'react-router-dom';
import { IProduct } from '../types/product';
import { useEffect, useState } from 'react';

interface IProps {
    products: IProduct[];
}

const WatchMovie = (props: IProps) => {
    const { id } = useParams();
    const [product, setProduct] = useState<IProduct>({});

    useEffect(() => {
        const currentProduct = props.products.find(item => item.id === Number(id));
        setProduct(currentProduct);
    }, [props, id]);
    const [value, setValue] = useState(3);
    return (

        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <iframe
                src={product?.watch}
                frameBorder="0"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                allowfullscreen
            />

        </div>

    );
};

export default WatchMovie;