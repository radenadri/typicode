import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './pages/404';

const HomePage = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/About'));
const DetailPage = lazy(() => import('./pages/Detail'));

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Header />
        <section>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AboutPage />
                </Suspense>
              }
            />
            <Route
              path="/post/:id"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <DetailPage />
                </Suspense>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </section>
        <Footer />
      </main>
    </BrowserRouter>
  );
}

export default App;
