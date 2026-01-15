import Header from '@/components/layout/Header'
import AppRoutes from './routes/AppRoutes'
import AuthInitializer from '@/components/auth/AuthInitializer'

function App() {
  return (
    <>
      <AuthInitializer />
      <Header />
      <AppRoutes />
    </>
  )
}

export default App
