import { Container } from '../components'
import PostForm from '../components/PostForm'

function AddPost() {
    return (
        <div className="py-10">
            <Container>
                <div className="max-w-5xl mx-auto">
                    <PostForm />
                </div>
            </Container>
        </div>
    )
}

export default AddPost
