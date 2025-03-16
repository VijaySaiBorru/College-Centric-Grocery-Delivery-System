import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [formError, setFormError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple form validation
        if (!formData.name || !formData.email || !formData.message) {
            setFormError('All fields are required.');
            return;
        }

        // Normally, you would send this data to an API or handle it in another way
        console.log('Form submitted:', formData);

        // Reset the form and show success message (if you want)
        setFormData({ name: '', email: '', message: '' });
        setFormError('');

        // Optionally navigate to another page after submitting
        navigate('/');
    };

    return (
        <div className="contact-page">
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>

                <form onSubmit={handleSubmit} className="contact-form">
                    {formError && <p className="text-red-500 mb-4">{formError}</p>}
                    
                    <div className="form-group mb-4">
                        <label htmlFor="name" className="block text-lg font-medium">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="email" className="block text-lg font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group mb-4">
                        <label htmlFor="message" className="block text-lg font-medium">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            placeholder="Enter your message"
                            rows="5"
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full py-2 bg-primary text-white rounded-md">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
