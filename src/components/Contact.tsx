'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            setIsInstallable(true);
        });
    }, []);

    const handleInstallClick = () => {
        window.dispatchEvent(new Event('beforeinstallprompt'));
    };
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        setFormData({
            name: '',
            email: '',
            company: '',
            message: '',
        });
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <section id="contact" className="pt-5 pb-20 bg-gray-100">
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-4"
                >
                    <h2 className="text-3xl font-bold text-gray-500 sm:text-4xl">
                        Contact Us
                    </h2>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                
                <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
                    >
                        <div>
                            <div className="flex justify-center mb-2">
                                <svg
                                    className="w-8 h-8 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                            </div>
                            {/* <h3 className="text-lg font-medium text-gray-900">Phone</h3> */}
                            <p className="mt-2 text-amber-700">07775731723</p>
                        </div>

                        <div>
                            <div className="flex justify-center mb-2">
                                <svg
                                    className="w-8 h-8 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </div>
                            {/* <h3 className="text-lg font-medium text-gray-900">Location</h3> */}
                            <p className="mt-2 text-amber-700">662, BOLTON ROAD<br /> 
                                M27 8FH</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="mt-8"
                    >
                        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2372.184968298918!2d-2.335042373653412!3d53.51875337233983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487baf0d45d9c0f7%3A0xcb46a3cf69c6411b!2sBolton%20Rd%2C%20Pendlebury%2C%20Swinton%2C%20Manchester%20M27%208FH!5e0!3m2!1sen!2suk!4v1747501464446!5m2!1sen!2suk"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                allowFullScreen
                                aria-hidden="false"
                                tabIndex={0}
                                title="Company Location Map"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        viewport={{ once: true }}
                        className="mb-4 text-center text-gray-600 text-sm"
                    >
                        <div className="flex flex-col items-center mt-8 gap-4">
                            <p>© {new Date().getFullYear()} Grand Chola UK. All rights reserved.</p>
                        </div>
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                                    window.addEventListener('beforeinstallprompt', (e) => {
                                        e.preventDefault();
                                        window.pwaInstallEvent = e;
                                        const button = document.getElementById('pwa-install-button');
                                        if (button) button.style.display = 'flex';
                                    });
                                `
                            }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;