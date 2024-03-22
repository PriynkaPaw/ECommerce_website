// PaymentForm.js
import React, { useState } from 'react';

const PlaceOrder = () => {
    const [shippingAddress, setShippingAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to server)
        console.log("Form submitted");
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Place Order</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700">Shipping Address</label>
                    <input type="text" id="shippingAddress" className="mt-1 p-2 block w-full rounded-md border-gray-900 focus:border-blue-300 focus:ring focus:ring-blue-200 border border-gray-200" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <input type="text" id="city" className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 border border-gray-200" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                    <input type="text" id="zip" className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 border border-gray-200" value={zip} onChange={(e) => setZip(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                    <input type="text" id="country" className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 border border-gray-200" value={country} onChange={(e) => setCountry(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="tel" id="phone" className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 border border-gray-200" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="mt-6">
                    <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Save Address</button>
                </div>
            </form>
        </div>
    );
};

export default PlaceOrder;
