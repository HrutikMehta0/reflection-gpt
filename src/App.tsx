import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from './Pages/Landing';
import ChatBot from './Pages/ChatBot';


function App() {
    return(
        <div>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/chatbot" element={<ChatBot/>} />
        </Routes>
        </BrowserRouter>
        </div>
    );
}

export default App
