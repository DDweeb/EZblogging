
import React from "react";

interface inputTypes {
    beforeLabel: string,
    afterLabel: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    authorizing: boolean
}

export default function CustomizedButton({ beforeLabel, afterLabel, onClick, authorizing }: inputTypes) {
    if (authorizing) {
        return (
            <div>
                <button
                    onClick={onClick}
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full text-center font-semibold"
                >
                    {beforeLabel}
                </button>
            </div>
        )
    }

    return (
        <div>
            <button
                className="text-slate-500 bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full text-center font-semibold"
            >
                {afterLabel}
            </button>
        </div>
    )
}
