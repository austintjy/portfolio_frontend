import { FieldError, UseFormRegister } from "react-hook-form";


interface DropdownSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: any[];
    label: string;
    errors: FieldError | undefined;
    registerFunc: UseFormRegister<any>;
    value?: string;
    showLabel?: boolean;
}

export default function DropdownSelect({ options, label, errors, registerFunc, value, showLabel, ...props }: DropdownSelectProps) {
    return (
        <div>
            {showLabel &&
                <label htmlFor={label} className="block text-sm font-medium text-gray-700">
                    {label.charAt(0).toUpperCase()}{label.slice(1)}
                </label>
            }
            <select {...props}
                id={label}
                className={`mt-2 block w-full pl-3 pr-10 py-2 border border-gray-300 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-inherit ${props.className}`}
                {...registerFunc(label)}
                value={value}
            >
                {
                    options.map((o) => {
                        return <option key={o.Value} value={o.Value}>{o.Text}</option>
                    })
                }
            </select>

            {errors && errors.message && (
                <p className="mt-2 text-red-500">
                    {errors.message.charAt(0).toUpperCase() + errors.message.replaceAll('_', ' ').slice(1)}
                </p>
            )}
        </div>
    )
}