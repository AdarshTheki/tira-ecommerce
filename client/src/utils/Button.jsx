/* eslint-disable react/prop-types */
import React from 'react';

const Button = ({ leftIcon, rightIcon, className = '', children, ...rest }) => {
    return (
        <button
            {...rest}
            type='button'
            className={`${className} flex items-center gap-2 focus:outline-none focus:ring-2 font-medium rounded-lg text-sm px-5 py-2.5`}>
            {!!leftIcon && leftIcon}
            {children}
            {!!rightIcon && rightIcon}
        </button>
    );
};

export default Button;
