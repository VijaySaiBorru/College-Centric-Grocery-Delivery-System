import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import UploadImage from './UploadImage';
import { useAddProductMutation } from '../../../../redux/features/products/productsApi';
import { useNavigate } from 'react-router-dom';

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

const AddProduct = () => {
    const { seller } = useSelector((state) => state.sellerauth.seller);

    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: '',
        oldPrice: '',
        description: '',
        quantity: NaN,
        image: ''
    });


    const [AddProduct, { isLoading, error }] = useAddProductMutation()


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });


    };

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.name || !product.category || !product.price || !product.description || !product.oldPrice) {
            alert('Please fill all the required fields');
            return;
        }

        try {
            await AddProduct({ ...product, sellerId: seller?._id }).unwrap();
            alert('Product added successfully');
            setProduct({
                name: '',
                category: '',
                price: '',
                oldPrice: '',
                description: ''
            })
            setImage('');
            navigate("/dashboard/add-new-product")
        } catch (error) {
            console.log("Failed to submit product", error);
        }
    }

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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

                    >Add Product</button>
                </div>

            </form>


        </div>
    );
};

export default AddProduct;