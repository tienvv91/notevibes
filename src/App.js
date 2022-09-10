import logo from './logo.svg';
import './App.css';
import ProLayout from './components/ProLayout';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import TextToSpeech from './pages/Text2Speech';
import About from './pages/About';
import { Button, Result } from 'antd';

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<ProLayout />} >
          <Route index={true} path='home' element={<TextToSpeech />} />
          <Route path='about' element={<About />} />
          <Route path="*" element={<Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button href='/' type="primary">Back Home</Button>}
          />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
