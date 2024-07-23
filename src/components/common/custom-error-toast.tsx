import { toast, ErrorIcon } from "react-hot-toast";

type Props = {
    t: any;
    title: string;
    message: string;
    detail: string;
}

export default function CustomErrorToast({ t, title, message, detail }: Props) {
    return (<div
        className={`${t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-2xl w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 mr-5`}
    >
        <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5 my-auto">
                    <ErrorIcon />
                </div>
                <div className="ml-3 flex-1">
                    <p className="text-md font-bold text-gray-900">
                        {title}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                        {message}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                        {detail}
                    </p>
                </div>
            </div>
        </div>
        <div className="flex border-l border-gray-200">
            <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                Close
            </button>
        </div>
    </div >)
}