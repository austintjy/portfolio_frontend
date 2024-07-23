import React from 'react'
import { classNames } from '../common/Utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  image: React.ReactNode;
  text: string;
}
export default function ImageButton({ image, text, ...props }: ButtonProps) {
  return <button
  {...props} 
  className={classNames(
    "w-full rounded border border-gray-300 shadow shadow-gray-100 mt-2 text-dark-800 hover:bg-dark-100",
    props.className
  )}
  >
    <div className='flex mx-auto w-fit'>
      {image}
      <span className="font-semibold ml-2 my-auto">
        {text}
      </span>
    </div>
  </button >
}