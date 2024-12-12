import React, { forwardRef, useId } from 'react';

const Inputs = forwardRef(function Inputs(
    { label, type = 'text', isError = false, message = '', className = '', ...props },
    ref
) {
    const id = useId();
    return (
        <div className='relative text-sm mb-3 w-full text-gray-800'>
            <label htmlFor={id} className='block capitalize font-semibold'>
                {label}
            </label>
            <input
                id={id}
                {...props}
                type={type}
                ref={ref}
                required={true}
                className={`w-full rounded-lg border-2 border-gray-200 bg-white py-2 px-4 font-medium outline-none focus:border-[#6A64F1] focus:shadow-md ${className}`}
                autoComplete='off'
            />
            {isError ? <span className='text-rose-600 lowercase text-xs'>{message}</span> : null}
        </div>
    );
});

export default Inputs;
