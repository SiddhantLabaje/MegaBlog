import { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard, SEO } from '../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Home() {
    const [posts, setPosts]     = useState([])
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        if (!authStatus) { setLoading(false); return }
        appwriteService.getPosts()
            .then((res) => { if (res) setPosts(res.documents) })
            .finally(() => setLoading(false))
    }, [authStatus])

    // ── Unauthenticated hero ──────────────────────────────────────────────────
    if (!authStatus) {
        return (
            <>
                <SEO
                    title="Welcome to MegaBlog"
                    description="MegaBlog ankx is a modern community blogging platform. Read insightful articles, write your own posts, and share ideas with the world."
                    path="/"
                />
                <div className="flex-1 flex items-center justify-center px-4 py-20">
                    <div className="text-center max-w-lg">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-2xl mb-6">
                            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                            Welcome to MegaBlog
                        </h1>
                        <p className="mt-4 text-lg text-slate-500 leading-relaxed">
                            A place to read, write, and share ideas. Sign in to explore posts from the community.
                        </p>
                        <div className="mt-8 flex items-center justify-center gap-3">
                            <Link to="/login" className="px-6 py-3 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors duration-200 shadow-sm">
                                Sign in
                            </Link>
                            <Link to="/signup" className="px-6 py-3 bg-white text-slate-700 text-sm font-medium rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors duration-200">
                                Create account
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    // ── Loading skeleton ──────────────────────────────────────────────────────
    if (loading) {
        return (
            <>
                <SEO title="Loading posts…" path="/" />
                <div className="py-10">
                    <Container>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
                                    <div className="h-48 bg-slate-200" />
                                    <div className="p-5 space-y-3">
                                        <div className="h-4 bg-slate-200 rounded w-3/4" />
                                        <div className="h-3 bg-slate-200 rounded w-1/2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            </>
        )
    }

    // ── Empty state ───────────────────────────────────────────────────────────
    if (posts.length === 0) {
        return (
            <>
                <SEO
                    title="No Posts Yet"
                    description="No posts have been published on MegaBlog yet. Be the first to write and share your ideas."
                    path="/"
                />
                <div className="flex-1 flex items-center justify-center px-4 py-20">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl mb-6">
                            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-slate-800">No posts yet</h2>
                        <p className="mt-2 text-slate-500 text-sm">Be the first to share something with the community.</p>
                        <Link to="/add-post" className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors duration-200">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Write a post
                        </Link>
                    </div>
                </div>
            </>
        )
    }

    // ── Posts grid ────────────────────────────────────────────────────────────
    return (
        <>
            <SEO
                title="Latest Posts"
                description={`Browse ${posts.length} articles on MegaBlog ankx. Read, write, and share ideas with the community.`}
                path="/"
            />
            <div className="py-10">
                <Container>
                    <div className="flex items-center justify-between mb-8">
                        <p className="mb-6 text-indigo-600 font-medium">
  <Link to="/post/react-appwrite-blog">
    Read: How to Build Blog with React & Appwrite
  </Link>
</p>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Latest Posts</h1>
                            <p className="text-sm text-slate-500 mt-1">{posts.length} post{posts.length !== 1 ? 's' : ''} published</p>
                        </div>
                        <Link to="/add-post" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors duration-200 shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            New Post
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Home
