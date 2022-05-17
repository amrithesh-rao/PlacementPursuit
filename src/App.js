import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Reset from "./components/Reset";
import Test from "./components/Test";
import Quiz from "./components/Quiz";
import TestInner from "./components/TestInner";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Practice from "./components/Practice";
import SubPractice from "./components/SubPractice";
import PageNotFound from "./404";
import PracticeItems from "./components/PracticeItems";
import Feedback from "./components/Search";
import QuizReport from "./components/QuizReport";

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
          <Route
           path="/practice/:id" 
           element={
            <ProtectedRoute>
              <SubPractice />
              </ProtectedRoute>
                } 
          />
          <Route
           path="/practice/:id/:sid" 
           element={
            <ProtectedRoute>
              <PracticeItems />
              </ProtectedRoute>
                } 
          />
          <Route 
            path="/test" 
            element={
              <ProtectedRoute>
                <Test />
              </ProtectedRoute>
            } 
          />
          <Route
           path="/test/:id" 
           element={
            <ProtectedRoute>
              <TestInner />
              </ProtectedRoute>
                } 
          />
          <Route
           path="/test/:tid/:lid" 
           element={
            <ProtectedRoute>
              <Quiz />
              </ProtectedRoute>
                } 
          />
          <Route
           path="/test/:tid/report" 
           element={
            <ProtectedRoute>
              <QuizReport />
              </ProtectedRoute>
                } 
          />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="*" element={<PageNotFound />} />
          {/* <Route path="/test" element={<TestHome />} /> */}

        </Routes>
      </UserAuthContextProvider>
    </Container>
  );
}

export default App;
