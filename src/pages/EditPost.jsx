import { useEffect, useState } from 'react'
import { Container } from '../components'
import PostForm from '../components/PostForm'
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post, setPost]       = useState(null)
    const [loading, setLoading] = useState(true)
    const { slug }  = useParams()
    const navigate  = useNavigate()

    useEffect(() => {
        if (!slug) { navigate('/'); return }
        appwriteService.getPost(slug)
            .then((data) => {
                if (data) setPost(data)
                else navigate('/')
            })
            .finally(() => setLoading(false))
    }, [slug, navigate])

    if (loading) {
        return (
            <div className="py-10">
                <Container>
                    <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 animate-pulse space-y-4">
                        <div className="h-6 bg-slate-200 rounded w-1/4" />
                        <div className="h-10 bg-slate-200 rounded" />
                        <div className="h-10 bg-slate-200 rounded" />
                        <div className="h-64 bg-slate-200 rounded" />
                    </div>
                </Container>
            </div>
        )
    }

    return post ? (
        <div className="py-10">
            <Container>
                <div className="max-w-5xl mx-auto">
                    <PostForm post={post} />
                </div>
            </Container>
        </div>
    ) : null
}

export default EditPost
