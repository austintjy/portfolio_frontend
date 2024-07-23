import React from 'react'
import { classNames } from '../Utils'


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: React.ReactNode;
}

export function Button({ className, children, ...props }: ButtonProps) {
    return (
        <button
            type="button"
            className={
                classNames(
                    "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
                    className
                )}
            {...props}
        >
            {children}
        </button>
    )
}

export function PageButton({ className, children, ...props }: ButtonProps) {
    return (
        <button
            type="button"
            className={
                classNames(
                    "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
                    className
                )}
            {...props}
        >
            {children}
        </button>
    )
}