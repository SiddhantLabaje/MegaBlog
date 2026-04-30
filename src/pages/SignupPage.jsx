import { Signup, SEO } from '../components'
import { Container } from '../components'

function SignupPage() {
    return (
        <>
            <SEO
                title="Create Account"
                description="Join MegaBlog ankx for free. Create an account to start writing, publishing, and sharing your ideas with the world."
                path="/signup"
            />
            <div className='py-8'>
                <Container>
                    <Signup />
                </Container>
            </div>
        </>
    )
}

export default SignupPage
