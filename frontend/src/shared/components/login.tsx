"use client";

import { useContext, useState } from 'react';
import { LoginContext } from '@/context/logincontext';
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google';
import { useUser } from '@/context/userContext';
import { useError } from '@/context/errorContext';
import { useRouter } from 'next/navigation';

interface IUser {
    name: string;
    email: string;
    password: string;
}

const LoginPage = () => {
    const router = useRouter();
    const context = useContext(LoginContext);
    if (!context) throw new Error("LoginContext is undefined...");
    const { login } = useUser();

    const { showModal, setShowModal } = context;
    const [user, setUser] = useState<IUser>({ name: "", email: "", password: "" });
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const [isSignup, setIsSignup] = useState(false);
    const { setError, error } = useError()
    const handleSuccess = async (credentialResponse: CredentialResponse) => {
        const googleId = credentialResponse.credential;

        try {
            const response = await fetch('http://localhost:5000/Oauth/google-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ googleId }),
            });
            if (!response.ok) {
                setError("something went wrong try again")
                return;
            }
            const data = await response.json();
            setShowModal(false);
            login(data.user);
            router.push("/dashboard")
        } catch (error) {
            console.error('Error during authentication:', error);
            setError("Google authentication failed. Please try again.");
        }
    };

    const handleError = () => {
        console.error('Google login failed');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const endpoint = isSignup ? 'users' : 'login';
            const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
            if (!response.ok) {
                setError("Email or password is incorrect");
                return;
            }
            const data = await response.json();
            setShowModal(false);
            console.log(data)
            login(data.user);
            router.push("/dashboard")
        } catch (error) {
            console.error('Auth error:', error);
            setError("Something went wrong. Please try again.");
        }
    };

    return showModal ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white w-96 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-center mb-4">{isSignup ? 'Sign Up' : 'Sign In'}</h2>
                {/* form for signup && signin */}
                <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
                    {isSignup && (
                        <>
                            <label htmlFor="name" className="text-base">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your name"
                                className="px-3 py-2 dark:bg-gray-700"
                                value={user.name}
                                onChange={handleChange}
                                required
                            />
                        </>
                    )}

                    <label htmlFor="email" className="text-base">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="px-3 py-2 dark:bg-gray-700"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="password" className="text-base">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className="px-3 py-2 dark:bg-gray-700"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>

                {/* OR Divider */}
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                    <p className="mx-3 text-gray-500 dark:text-gray-400">Or</p>
                    <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                </div>

                <div className="flex flex-col items-center space-y-4">
                    <GoogleOAuthProvider clientId={clientId as string}>
                        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
                    </GoogleOAuthProvider>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                    By {isSignup ? 'signing up' : 'signing in'}, you agree to our terms of service and privacy policy.
                </p>

                <div className="mt-4 text-center">
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={() => setIsSignup(!isSignup)}
                    >
                        {isSignup
                            ? 'Already have an account? Sign In'
                            : "Don't have an account? Sign Up"}
                    </button>
                </div>

                <div className="mt-4 text-center">
                    <button
                        className="text-red-500 border border-red-500 px-10 py-1 rounded-md hover:bg-red-500 hover:text-white transition duration-300"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default LoginPage;
