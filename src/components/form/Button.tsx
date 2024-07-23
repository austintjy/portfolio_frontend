import React from 'react'
import { classNames } from '../common/Utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: React.ReactNode;
}
export default function Button({ href, children, ...props }: ButtonProps) {
  return (
    href ?
      <a
        href={`${href}`}
        className={classNames(
          "px-4 py-2 rounded-md border border-gray-300 shadow-md shadow-gray-100 text-sm font-semibold text-gray-100 bg-blue-500 hover:bg-blue-400 flex",
          props.className
        )}
      >
        <div className='flex items-center mx-auto'>
          {children}
        </div>
      </a>
      :
      <button
        {...props}
        className={classNames(
          "px-4 py-2 rounded-md border border-gray-300 shadow-sm shadow-gray-100 text-sm font-semibold text-gray-100 bg-blue-500 hover:bg-blue-400 flex w-full disabled:bg-gray-100 disabled:text-gray-400",
          props.className
        )}
      >
        <div className='flex items-center mx-auto'>
          {children}
        </div>
      </button >
  )
}