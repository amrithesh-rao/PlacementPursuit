import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Reset from "./components/Reset";
import TestHome from "./components/TestHome";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";

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
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/reset" element={<Reset />} />
              {/* <Route path="/practice" element={<PracticeHome />} /> */}
              <Route path="/test" element={<TestHome />} />
              {/* <Route path="/feedback" element={<FeedbackHome />} /> */}
            </Routes>
          </UserAuthContextProvider>
    </Container>
  );
}

export default App;