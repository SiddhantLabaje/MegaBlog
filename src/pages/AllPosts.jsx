import { useState, useEffect } from 'react'
import { Container, PostCard, SEO } from '../components'
import appwriteService from '../appwrite/config'

function AllPosts() {
    const [posts, setPosts]     = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        appwriteService.getPosts([])
            .then((res) => { if (res) setPosts(res.documents) })
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <>
                <SEO
                    title="All Posts"
                    description="Browse every article published on MegaBlog ankx — the community blogging platform."
                    path="/all-posts"
                />
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

    return (
        <>
            <SEO
                title="All Posts"
                description={`Read all ${posts.length} articles on MegaBlog ankx. Discover stories, tutorials, and ideas from our community of writers.`}
                path="/all-posts"
            />
            <div className="py-10">
                <Container>
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-900">All Posts</h1>
                        <p className="text-sm text-slate-500 mt-1">{posts.length} post{posts.length !== 1 ? 's' : ''} total</p>
                    </div>

                    {posts.length === 0 ? (
                        <div className="text-center py-20 text-slate-400">
                            <p className="text-lg font-medium">No posts found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {posts.map((post) => (
                                <PostCard key={post.$id} {...post} />
                            ))}
                        </div>
                    )}
                </Container>
            </div>
        </>
    )
}

export default AllPosts
