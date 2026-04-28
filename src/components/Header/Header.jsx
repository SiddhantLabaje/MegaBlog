import { Container, Logo, LogoutBtn } from '../index'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)

    const navItems = [
        { name: 'Home',      slug: '/',           active: true },
        { name: 'Login',     slug: '/login',      active: !authStatus },
        { name: 'Sign Up',   slug: '/signup',     active: !authStatus },
        { name: 'All Posts', slug: '/all-posts',  active: authStatus },
        { name: 'Add Post',  slug: '/add-post',   active: authStatus },
    ]

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200 shadow-sm">
            <Container>
                <nav className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <NavLink to="/" className="flex-shrink-0">
                        <Logo />
                    </NavLink>

                    {/* Nav links */}
                    <ul className="flex items-center gap-1">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.slug}
                                        end={item.slug === '/'}
                                        className={({ isActive }) =>
                                            `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                                isActive
                                                    ? 'bg-indigo-50 text-indigo-600'
                                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                            }`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ) : null
                        )}

                        {authStatus && (
                            <li className="ml-2 pl-2 border-l border-slate-200">
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
