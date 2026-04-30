import { Container, SEO } from '../components'
import PostForm from '../components/PostForm'

function AddPost() {
    return (
        <>
            <SEO
                title="Write a New Post"
                description="Create and publish a new article on MegaBlog. Share your knowledge, stories, and ideas with the community."
                path="/add-post"
            />
            <div className="py-10">
                <Container>
                    <div className="max-w-5xl mx-auto">
                        <PostForm />
                    </div>
                </Container>
            </div>
        </>
    )
}

export default AddPost
