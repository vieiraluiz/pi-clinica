import { Route, Routes } from 'react-router-dom';

export function AppRoutes() {
    return (
        <Routes>
                <Route path="/" element={<Home/>} />
        </Routes>
    );
}

function Home() {
    return <h1>Welcome to the Home page!</h1>;
}

function About() {
    return <h1>About Us</h1>;
}

function Contact() {
    return <h1>Contact Us</h1>;
}

function NotFound() {
    return <h1>404 - Page Not Found</h1>;
}