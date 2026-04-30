import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from './store/authSlice'
import { Header, Footer, AuthLayout } from './components'
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, LoginPage, SignupPage, AllPosts, AddPost, EditPost, Post } from './pages'
import Post1 from "./pages/Post1";
function Layout() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          // Pass only plain data — Appwrite SDK objects carry prototype
          // methods that Redux's serializable check will reject.
          const { $id, name, email, $createdAt, $updatedAt, prefs } = userData
          dispatch(login({ userData: { $id, name, email, $createdAt, $updatedAt, prefs } }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-col bg-slate-50'>
      <Header />
      <main className='flex-1 flex flex-col'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className='min-h-screen flex items-center justify-center bg-slate-50'>
      <div className='flex flex-col items-center gap-3'>
        <svg className='w-8 h-8 text-indigo-600 animate-spin' fill='none' viewBox='0 0 24 24'>
          <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
          <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8H4z' />
        </svg>
        <span className='text-sm text-slate-500'>Loading…</span>
      </div>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <AuthLayout authentication={false}>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <SignupPage />
          </AuthLayout>
        ),
      },
      {
        path: '/all-posts',
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: '/add-post',
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: '/post/:slug',
        element: (
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        ),
      },
      {
  path: "/post/react-appwrite-blog",
  element: <Post1 />,
}
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
