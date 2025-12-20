import { Routes, Route } from 'react-router';

import './scss/app.scss';
import { Header } from './components';
import { Cart, Home, NotFound } from './pages';

function App() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cart' element={<Cart /> } />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
