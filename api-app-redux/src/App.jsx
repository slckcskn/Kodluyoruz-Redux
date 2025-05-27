import { Routes, Route, Link } from "react-router";

//pages
import Home from './pages/Home'
import Detail from './pages/Detail'
import Locations from './pages/Locations'
import Episodes from './pages/Episodes'

function App() {
  return (
    <div>
      <nav className="navbar">
        <ul style={{ listStyleType: "none", display: "flex", gap: "1rem" }}>
          
            <Link to="/">
              <button style={{ padding: "0.5rem 1rem" }}>Home</button>
            </Link>
              
          
            <Link to="/episodes">
              <button style={{ padding: "0.5rem 1rem" }}>Episodes</button>
            </Link>
          
          
            <Link to="/locations">
              <button style={{ padding: "0.5rem 1rem" }}>Locations</button>
            </Link>
          
        </ul>
      </nav>
      <div style={{ padding: "1rem" }}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="character/:id" element={<Detail />} />
          <Route path="episodes" element={<Episodes />} />
          <Route path="locations" element={<Locations />} />
        </Routes>
      </div>
    </div>
  );
}



function About() {
  return <h2>About Us</h2>;
}

function Concerts() {
  return <h2>Upcoming Concerts</h2>;
}

function Account() {
  return <h2>Your Account</h2>;
}

export default App;
