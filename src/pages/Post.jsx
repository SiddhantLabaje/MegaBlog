import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { Button, Container } from '../components'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

function Post() {
    const [post, setPost]       = useState(null)
    const [imgError, setImgError] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const { slug }    = useParams()
    const navigate    = useNavigate()
    const userData    = useSelector((state) => state.auth.userData)

    useEffect(() => {
        if (!slug) { navigate('/'); return }
        appwriteService.getPost(slug).then((data) => {
            if (data) setPost(data)
            else navigate('/')
        })
    }, [slug, navigate])

    useEffect(() => { setImgError(false) }, [post?.$id])

    if (!post) {
        return (
            <div className="py-10">
                <Container>
                    <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
                        <div className="h-72 bg-slate-200 rounded-2xl" />
                        <div className="h-8 bg-slate-200 rounded w-2/3" />
                        <div className="space-y-3">
                            <div className="h-4 bg-slate-200 rounded" />
                            <div className="h-4 bg-slate-200 rounded w-5/6" />
                            <div className="h-4 bg-slate-200 rounded w-4/6" />
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    const imageUrl  = post.featuredImage ? appwriteService.getFilePreview(post.featuredImage) : ''
    const isAuthor  = userData ? post.userId === userData.$id : false

    const deletePost = async () => {
        if (!window.confirm('Delete this post? This cannot be undone.')) return
        setDeleting(true)
        const status = await appwriteService.deletePost(post.$id)
        if (status) {
            await appwriteService.deleteFile(post.featuredImage)
            navigate('/')
        }
        setDeleting(false)
    }

    return (
        <div className="py-10">
            <Container>
                <div className="max-w-3xl mx-auto">
                    {/* Back link */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to posts
                    </Link>

                    {/* Featured image */}
                    {imageUrl && !imgError ? (
                        <div className="w-full rounded-2xl overflow-hidden mb-8 shadow-sm border border-slate-200">
                            <img
                                src={imageUrl}
                                alt={post.title}
                                className="w-full max-h-96 object-cover"
                                onError={(e) => {
                                    console.error('[Post] Image failed:', e.currentTarget.src)
                                    setImgError(true)
                                }}
                            />
                        </div>
                    ) : null}

                    {/* Title + author actions */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                        <h1 className="text-3xl font-bold text-slate-900 leading-tight">
                            {post.title}
                        </h1>

                        {isAuthor && (
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button variant="ghost" className="gap-1.5">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="danger"
                                    disabled={deleting}
                                    onClick={deletePost}
                                    className="gap-1.5"
                                >
                                    {deleting ? (
                                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    )}
                                    {deleting ? 'Deleting…' : 'Delete'}
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Divider */}
                    <hr className="border-slate-200 mb-8" />

                    {/* Content */}
                    <div className="browser-css prose max-w-none">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Post
