import React, { useId } from 'react'

const Input = React.forwardRef(function Input(
    { label, type = 'text', className = '', error = '', ...props },
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
            <input
                id={id}
                type={type}
                ref={ref}
                className={`
                    w-full px-4 py-2.5 rounded-lg text-sm text-slate-900
                    bg-white border transition-all duration-200
                    placeholder:text-slate-400
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                    ${error ? 'border-red-400 focus:ring-red-400' : 'border-slate-200 hover:border-slate-300'}
                    ${className}
                `}
                {...props}
            />
            {error && (
                <p className="mt-1 text-xs text-red-500">{error}</p>
            )}
        </div>
    )
})

export default Input
