//Route
import { Route, Routes } from "react-router-dom"
import Landingpage from "./layouts/user/main/index"


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Landingpage />} />
            </Routes>
        </>
    )
}

export default App