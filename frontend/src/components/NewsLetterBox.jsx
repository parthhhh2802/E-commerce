import React from "react";
import { toast } from "react-toastify";

const NewsLetterBox = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Thank you for subscribing!");
    }
    return (
        <div className="text-center">
            <p className="text-2xl font-medium text-rose-500">
                subscribe now & get 10% off
            </p>
            <p className="text-gray-400">
                Sign up for our newsletter to receive exclusive offers and updates.
            </p>
            <form onSubmit={handleSubmit} className="w-full sm:w-1/2 flex items-center mx-auto my-6 border pl-3">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 outline-none border-b-2 border-gray-300 focus:border-rose-500"
                    required
                />
                <button
                    onClick={(e) => handleSubmit(e)}
                    type="submit"
                    className="bg-rose-500 text-white px-6 py-2 mb-4 mx-4 mt-4 hover:bg-rose-900 transition-colors"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default NewsLetterBox;
