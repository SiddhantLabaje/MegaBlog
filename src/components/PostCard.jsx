import { useState } from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
    const [imgError, setImgError] = useState(false)
    const imageUrl = featuredImage ? appwriteService.getFilePreview(featuredImage) : ''

    return (
        <Link to={`/post/${$id}`} className="group block h-full">
            <div className="h-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                {/* Image */}
                <div className="w-full h-48 bg-slate-100 overflow-hidden">
                    {imageUrl && !imgError ? (
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                                console.error('[PostCard] Image failed:', e.currentTarget.src)
                                setImgError(true)
                            }}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-xs">{imgError ? 'Failed to load' : 'No image'}</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5">
                    <h2 className="text-base font-semibold text-slate-800 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
                        {title}
                    </h2>
                    <p className="mt-3 text-xs font-medium text-indigo-600 flex items-center gap-1">
                        Read article
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default PostCard
