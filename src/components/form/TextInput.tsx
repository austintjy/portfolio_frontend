import { FieldError, UseFormRegister } from "react-hook-form";
import { classNames } from "../common/Utils";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    errors: FieldError | undefined;
    registerFunc: UseFormRegister<any>;
    placeholder?: string;
    value?: string;
    showLabel?: boolean;
}

export default function TextInput({ label, errors, registerFunc, placeholder, value, showLabel = true, ...props }: TextInputProps) {
    return <label htmlFor={label} className="mb-5">
        {showLabel &&
            <span>{label.charAt(0).toUpperCase()}{label.slice(1)}</span>
        }
        <input {...props}
            type={(label === 'email' || label === 'password') ? label : 'text'}
            id={label}

            className={classNames(`w-full rounded border border-gray-300 bg-inherit p-2 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer`, props.className)}
            placeholder={placeholder}
            {...registerFunc(label)}
            value={value}
        />
        {errors && errors.message && (
            <p className="mt-2 text-red-500">
                {errors.message.charAt(0).toUpperCase() + errors.message.replaceAll('_', ' ').slice(1)}
            </p>
        )}
    </label>
}