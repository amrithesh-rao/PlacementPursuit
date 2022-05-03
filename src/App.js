import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Reset from "./components/Reset";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Practice from "./components/Practice";


function App() {
  return (
    <Container className="p-0">
      <UserAuthContextProvider>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
           path="/practice" 
           element={
            <ProtectedRoute>
              <Practice />
              </ProtectedRoute>
                } 
          />

          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset" element={<Reset />} />

          {/* <Route path="/test" element={<TestHome />} /> */}
          {/* <Route path="/feedback" element={<FeedbackHome />} /> */}
        </Routes>
      </UserAuthContextProvider>
    </Container>
  );
}

export default App;
