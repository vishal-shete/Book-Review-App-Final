import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import AddBookPage from './pages/AddBookPage/AddBookPage';
import BookDetailPage from './pages/BookDetailPage/BookDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-book" element={<AddBookPage />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
