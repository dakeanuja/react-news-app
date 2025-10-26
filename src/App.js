// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/routes/Layout';
import NewsComponent from './components/NewsComponent';
import AboutUs from './components/AboutUs';
import Favourite from './components/Favourite';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <Router>
        <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        {/* Layout wraps all child pages */}
        <Route path="/" element={<Layout />}>
        
          {/* Default route (Home → Technology) */}
          <Route index element={<NewsComponent key="general" category="general" />} />

          {/* Categories */}
          <Route path="business" element={<NewsComponent key="business" category="business" />} />
          <Route path="entertainment" element={<NewsComponent key="entertainment" category="entertainment" />} />
          <Route path="sports" element={<NewsComponent key="sports" category="sports" />} />
          <Route path="health" element={<NewsComponent key="health" category="health" />} />
          <Route path="science" element={<NewsComponent key="science" category="science" />} />
          <Route path="technology" element={<NewsComponent key="technology" category="technology" />} />
          <Route path="favourites" element={<Favourite />}/>
        

          {/* About Page */}
          <Route path="about" element={<h2 className="text-center my-5"><AboutUs /></h2>} />

          {/* Fallback */}
          <Route path="*" element={<h2 className="text-center my-5 text-danger">404 - Page Not Found</h2>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
