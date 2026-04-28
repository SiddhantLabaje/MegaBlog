import React, { useId } from 'react'

const Select = React.forwardRef(function Select(
    { options = [], label, className = '', ...props },
    ref
) {
    const id = useId()

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                    {label}
                </label>
            )}
            <select
                id={id}
                ref={ref}
                className={`
                    w-full px-4 py-2.5 rounded-lg text-sm text-slate-900
                    bg-white border border-slate-200 hover:border-slate-300
                    transition-all duration-200 cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    ${className}
                `}
                {...props}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    )
})

export default Select
