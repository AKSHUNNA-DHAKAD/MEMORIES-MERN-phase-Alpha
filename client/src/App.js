import { Container } from '@mui/material';
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from './components/Auth/Auth';
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {

    return (
        <BrowserRouter> {/*  Wrap everything in Router */}
            <Container maxWidth="lg">
                <Navbar />
                <Routes> {/* Replace Switch with Routes */}
                    <Route path="/" element={<Home />} /> {/*Use element prop */}
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
};

export default App;
