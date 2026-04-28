function Button({
    children,
    type = 'button',
    variant = 'primary',   // 'primary' | 'danger' | 'success' | 'ghost'
    className = '',
    disabled = false,
    ...props
}) {
    const base = 'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm',
        danger:  'bg-red-500   text-white hover:bg-red-600   focus:ring-red-400   shadow-sm',
        success: 'bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-400 shadow-sm',
        ghost:   'bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-300 border border-slate-200',
    }

    return (
        <button
            type={type}
            disabled={disabled}
            className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button
