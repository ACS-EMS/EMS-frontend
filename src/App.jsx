import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";

import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage";
import JobsPage from "./pages/public/JobsPage";
import JobDetailsPage from "./pages/public/JobDetailsPage";
import ApplyJobPage from "./pages/public/ApplyJobPage";
import ContactPage from "./pages/public/ContactPage";
import NotFoundPage from "./pages/public/NotFoundPage";
import LoginPage from "./pages/public/auth/LoginPage";
import Chatbot from "./pages/public/Chatbot";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<PublicLayout />}>

          <Route
            path="/"
            element={<HomePage />}
          />

          <Route
            path="/about"
            element={<AboutPage />}
          />

          <Route
            path="/jobs"
            element={<JobsPage />}
          />

          <Route
            path="/jobs/:jobId"
            element={<JobDetailsPage />}
          />

          <Route
            path="/apply/:jobId"
            element={<ApplyJobPage />}
          />

          <Route
            path="/contact"
            element={<ContactPage />}
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/chatbot"
            element={<Chatbot />}
          />

        </Route>

        <Route
          path="*"
          element={<NotFoundPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;