import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import AIResume from "./pages/AIResume";
import MyApplications from "./pages/MyApplications";
import AIMatching from "./pages/AIMatching";
import AdminApplications from "./pages/AdminApplications";
import Recommendations from "./pages/Recommendations";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import SavedJobs from "./pages/SavedJobs";
import Interview from "./pages/Interview";
import InterviewEvaluation from "./pages/InterviewEvaluation";
import ATSChecker from "./pages/ATSChecker";
import CareerRoadmap from "./pages/CareerRoadmap";
import CoverLetter from "./pages/CoverLetter";
import SkillGap from "./pages/SkillGap";
import SalaryPredictor from "./pages/SalaryPredictor";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import VoiceInterview from "./pages/VoiceInterview";
import AIAssistant from "./pages/AIAssistant";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route path="/resume" element={<AIResume />} />

        <Route path="/my-applications" element={<MyApplications />} />

        <Route path="/match" element={<AIMatching />} />

        <Route path="/admin-applications" element={<AdminApplications />} />

        <Route path="/recommendations" element={<Recommendations />} />

        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />

        <Route path="/saved-jobs" element={<SavedJobs />} />

        <Route path="/interview" element={<Interview />} />

        <Route path="/interview-evaluation" element={<InterviewEvaluation />} />

        <Route path="/ats-checker" element={<ATSChecker />} />

        <Route path="/career-roadmap" element={<CareerRoadmap />} />

        <Route path="/cover-letter" element={<CoverLetter />} />

        <Route path="/skill-gap" element={<SkillGap />} />

        <Route path="/salary-predictor" element={<SalaryPredictor />} />

        <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />

        <Route path="/voice-interview" element={<VoiceInterview />} />

        <Route path="/ai-assistant" element={<AIAssistant />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;