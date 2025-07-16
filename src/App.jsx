import { Routes, Route } from "react-router-dom";
import 'react-loading-skeleton/dist/skeleton.css';

// Layouts
import MainLayout from "./layouts/user/main/index";
import SecondaryLayout from "./layouts/user/secondary/index";

// Pages
import Landingpage from "./pages/user/landingpage/index";
import AboutPage from "./pages/user/about/index";

function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Landingpage />} />
            </Route>

            <Route element={<SecondaryLayout />}>
                <Route path="/about" element={<AboutPage />} />
            </Route>
        </Routes>
    );
}

export default App;
