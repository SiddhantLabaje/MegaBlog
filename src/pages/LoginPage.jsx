import { Login, SEO } from '../components'
import { Container } from '../components'

function LoginPage() {
    return (
        <>
            <SEO
                title="Sign In"
                description="Sign in to your MegaBlog account to read, write, and share articles with the community."
                path="/login"
            />
            <div className='py-8'>
                <Container>
                    <Login />
                </Container>
            </div>
        </>
    )
}

export default LoginPage
