import React from 'react';

import { motion } from 'framer-motion';

interface ThankYouProps {
    title?: string;
    message?: string;
    subtitle?: string;
    className?: string;
}

const ThankYou: React.FC<ThankYouProps> = ({
    title = "Thank You!",
    message = "We appreciate your support",
    subtitle = "We'll get back to you soon",
    className = "",
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`flex flex-col items-center justify-center min-h-[400px] p-8 text-center ${className}`}
        >
            {/* Check Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-8"
            >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                        className="w-10 h-10 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
            </motion.div>

            {/* Thank You Message */}
            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold text-gray-800 mb-4"
            >
                {title}
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 mb-2"
            >
                {message}
            </motion.p>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-md text-gray-500"
            >
                {subtitle}
            </motion.p>
        </motion.div>
    );
};

export default ThankYou;
