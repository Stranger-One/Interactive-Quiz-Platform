import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../database/db';
import { comparePassword } from '../utils/password';
import { useAuth } from '../contexts/authContext';
import toast from 'react-hot-toast';

const SignIn = () => {
      const { user, setUser } = useAuth();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Handle sign-in logic here

        const storedData = await db.userData.toArray();
        const isExistingUser = storedData.filter((user) => user.email === email);
        console.log({ storedData, isExistingUser });

        if (isExistingUser.length === 0) {
            console.log('User does not exist');
            toast.error('User credentials not found');
            setLoading(false);
            return;
        }

        const isPasswordMatch = comparePassword(password, isExistingUser[0].password);
        console.log({ isPasswordMatch });

        if (!isPasswordMatch) {
            toast.error('User credentials not found');
            console.log('Invalid password');
            setLoading(false);
            return;
        }

        localStorage.setItem('token', `${email}:${isExistingUser[0].fullName}:${isExistingUser[0].password}`);
        setUser({
            fullname: isExistingUser[0].fullName,
            email,
            isAuthenticated: true,
        });

        toast.success('Sign in successful');
        
        // Simulate an async operation
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="flex items-center justify-center ">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Sign In</h2>
                <form onSubmit={handleSubmit} className="space-y-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Sign In'}
                    </button>
                    <div className="">
                        <p className='text-sm font-semibold'>Don't have an account? <Link to="/auth/signup" className='text-blue-600'>Sign Up</Link> here.</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;