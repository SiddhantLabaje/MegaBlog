function Logo() {
    return (
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">
                Mega<span className="text-indigo-600">Blog</span>
            </span>
        </div>
    )
}

export default Logo
