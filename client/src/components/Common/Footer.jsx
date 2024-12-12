import React from 'react';
import { NavLink } from 'react-router-dom';
import { Linkedin, Github, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className='border-t py-8'>
            <div className='container mx-auto flex flex-col md:flex-row justify-between md:items-center px-4'>
                <div className='mb-4 lg:mb-0'>
                    <div className='flex'>
                        <img src={'/logo.webp'} alt='logo' className='h-8 mr-2' />
                        <h3 className='text-xl font-semibold mb-2'>ShopUp</h3>
                    </div>
                    <p className='text-sm max-w-[400px]'>
                        Welcome to our e-commerce platform where convenience meets quality! Discover
                        a wide range of products that cater to your every need, all at the click of
                        a button. Shop with us and experience seamless shopping like never before.
                    </p>
                </div>
                <div className='mb-4 lg:mb-0'>
                    <h3 className='text-xl font-semibold mb-2'>Useful Links</h3>
                    <ul className='text-sm'>
                        <li>
                            <NavLink to='#' className='hover:text-blue-400'>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='#' className='hover:text-blue-400'>
                                About Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='#' className='hover:text-blue-400'>
                                Services
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='#' className='hover:text-blue-400'>
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className='mb-4 lg:mb-0'>
                    <h3 className='text-xl font-semibold mb-2'>Contact Us</h3>
                    <p className='text-sm'>123 Street Name, City, Country</p>
                    <p className='text-sm'>contact@example.com</p>
                    <p className='text-sm'>123-456-7890</p>
                </div>
                <div>
                    <h3 className='text-xl font-semibold mb-2'>Follow Us</h3>
                    <div className='flex space-x-4'>
                        <NavLink to='#' className='hover:text-gray-800 text-blue-400'>
                            <Github />
                        </NavLink>
                        <NavLink to='#' className='hover:text-gray-800 text-blue-400'>
                            <Twitter />
                        </NavLink>
                        <NavLink to='#' className='hover:text-gray-800 text-blue-400'>
                            <Facebook />
                        </NavLink>
                        <NavLink to='#' className='hover:text-gray-800 text-blue-400'>
                            <Instagram />
                        </NavLink>
                        <NavLink to='#' className='hover:text-gray-800 text-blue-400'>
                            <Linkedin />
                        </NavLink>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
