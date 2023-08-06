import { lazy, Suspense } from 'react'


import './App.css'
import Page404 from './pages/404'
import SearchPage from './Search'

import { Router } from './Router'
import { Route } from './Route'

const LazyAboutPage = lazy(() => import('./pages/About.jsx'))
const LazyHomePage = lazy(() => import('./pages/Home.jsx'))

const routes = [
  {
    path: '/:lang/About',
    Component: LazyAboutPage

  },
  {
    path: '/search/:query',
    Component: SearchPage
  }
]

function App() {
  return (
    <>
      <Suspense fallback={null}>
        <Router routes={routes} defaultComponent={Page404}>
          <Route path="/" Component={LazyHomePage}></Route>
          <Route path="/about" Component={LazyAboutPage}></Route>
        </Router>
      </Suspense>
    </>
  )
}

export default App
