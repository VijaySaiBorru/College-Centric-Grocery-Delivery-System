import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchProductByIdQuery, useUpdateProductMutation } from '../../../../redux/features/products/productsApi';
import { useSelector } from 'react-redux';
import TextInput from '../addProduct/TextInput';
import SelectInput from '../addProduct/SelectInput';

const categories = [
    { label: 'Select Category', value: '' },
    { label: 'Clothes and Accessories', value: 'clothing' },
    { label: 'Bakery Items', value: 'bakery' },
    { label: 'Chips and Fried Items', value: 'chips' },
    { label: 'Electronic Gadgets', value: 'electronics' },
    { label: 'Fruits', value: 'fruits' },
    { label: 'Groceries', value: 'groceries' },
    { label: 'Soft Drinks and Juices', value: 'soft_drinks' },
    { label: 'Stationary', value: 'stationary' },
    { label: 'Vegetables', value: 'vegetables' },
    { label: 'Medicines', value: 'medicine' }
];


const UpdateProduct = () => {
    const {id} = useParams();
    const navigate =  useNavigate();
    const {user} = useSelector((state) => state.auth)
    const [product, setProduct] = useState({
       name: '',
        category: '',
        price: '',
        oldPrice: '',
        description: '',
        quantity: NaN,
        image: ''
    })

    const {data: productData, isLoading: isProductLoading, error: fetchError, refetch} = useFetchProductByIdQuery(id);


    const {name, category, color, description, image, price,oldPrice,quantity } = productData?.product || {};

    const [updateProduct, {isLoading:isUpdating, error: updateError}] = useUpdateProductMutation();

    useEffect(()=> {
        if(productData){
            setProduct({
                name: name || '',
                category: category || '',
                color: color || '',
                price: price || '',
                description: description || '',
                image: image || '',
                oldPrice:oldPrice||'',
                quantity:quantity||NaN
            })
        }
    }, [productData])

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });


    };

    const handleSubmit =  async (e) => {
        e.preventDefault();

        const updatedProduct = {
            ...product, 
            author: user?._id
        };

        try {
            await updateProduct({id: id, ...updatedProduct}).unwrap();
            alert('Product updated successfully');
            await refetch();
            navigate("/dashboard/manage-products")
        } catch (error) {
            console.error('Failed to update product:', error);
        }

    }

    if(isProductLoading) return <div>Loading....</div>
    if(fetchError) return <div>Error fetching product!...</div>
  return (
    <div className='container mx-auto mt-8'>
        <h2 className='text-2xl font-bold mb-6'>Update Product </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
        <TextInput
                    label="Product Name"
                    name="name"
                    placeholder="Ex: Diamond Earrings"
                    value={product.name}
                    onChange={handleChange}
                />
                <SelectInput
                    label="Category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    options={categories}
                />
                <TextInput
                    label="New Price"
                    name="price" 
                    type="number"
                    placeholder="50"
                    value={product.price}
                    onChange={handleChange}
                />
                <TextInput
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    placeholder="50"
                    value={product.oldPrice}
                    onChange={handleChange}
                />
                <TextInput
                    label="Product Image Url"
                    name="image"
                    placeholder="https://product_image.url"
                    value={product.image}
                    onChange={handleChange}
                />
                <TextInput
                    label="Quantity"
                    name="quantity" 
                    type="number"
                    placeholder="50"
                    value={product.quantity}
                    onChange={handleChange}
                />

                <div>
                <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
                <textarea name="description" id="description"
                className='add-product-InputCSS'
                value={product.description}
                placeholder='Write a product description'
                onChange={handleChange}
                ></textarea>
                </div>

                <div>
                    <button type='submit'
                    className='add-product-btn'
                   
                    >{isUpdating ? 'Updating...' : 'Update Product'}</button>
                </div>

        </form>
    </div>
  )
}

export default UpdateProduct