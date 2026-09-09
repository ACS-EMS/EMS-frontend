import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HRDashboard from "./pages/hr/HRDashboard";
import HRJobs from "./pages/hr/HRJobs";
import CreateJob from "./pages/hr/CreateJob";
import PublicLayout from "./layouts/PublicLayout";
import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage";
import JobsPage from "./pages/public/JobsPage";
import JobDetailsPage from "./pages/public/JobDetailsPage";
import ApplyJobPage from "./pages/public/ApplyJobPage";
import ContactPage from "./pages/public/ContactPage";
import NotFoundPage from "./pages/public/NotFoundPage";
import LoginPage from "./pages/public/auth/LoginPage";
import SignupPage from "./pages/public/auth/SignupPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminRoles from "./pages/admin/AdminRoles";
import AdminDepartments from "./pages/admin/AdminDepartments";
import Chatbot from "./pages/public/Chatbot";
import HRCandidates from "./pages/hr/HRCandidates";
import HRScreening from "./pages/hr/HRScreening";
import HRAnalytics from "./pages/hr/HRAnalytics";
import HRInterviews from "./pages/hr/HRInterviews";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<PublicLayout />}>

          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
          <Route path="/apply/:jobId" element={<ApplyJobPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/chatbot" element={<Chatbot />} />

        </Route>

        <Route path="/hr/dashboard" element={<HRDashboard />} />
        <Route path="/hr/jobs" element={<HRJobs />} />
        <Route path="/hr/jobs/create" element={<CreateJob />} />

<<<<<<< HEAD
<Route
  path="/hr/jobs/create"
  element={<CreateJob />}
/>
<Route
  path="/super-admin/dashboard"
  element={<AdminDashboard />}
/>
<Route
  path="/super-admin/users"
  element={<AdminUsers />}
/>
<Route
  path="/super-admin/profile"
  element={<AdminProfile />}
/>
<Route
  path="/super-admin/settings"
  element={<AdminSettings />}
/>
<Route
  path="/super-admin/roles"
  element={<AdminRoles />}
/>
<Route
  path="/super-admin/departments"
  element={<AdminDepartments />}
/>

        <Route
          path="*"
          element={<NotFoundPage />}
        />
=======
        {/* new AI feature routes */}
        <Route path="/hr/candidates" element={<HRCandidates />} />
        <Route path="/hr/ai-screening" element={<HRScreening />} />
        <Route path="/hr/analytics" element={<HRAnalytics />} />
        <Route path="/hr/interviews" element={<HRInterviews />} />
        
        <Route path="*" element={<NotFoundPage />} />
>>>>>>> 9f9d76b2fb029787acc974a14e32d029028d2b97

      </Routes>

    </BrowserRouter>
  );
}

export default App;