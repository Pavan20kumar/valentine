import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ValentineApp from './mycomponet/valentine';
import MessagePage from './mycomponet/valentine/MessagePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<ValentineApp />} />
          <Route path="/message" element={<MessagePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
