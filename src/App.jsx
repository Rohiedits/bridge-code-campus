
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CodeLab from "./pages/CodeLab";
import NotFound from "./pages/NotFound";
import ResumeBuilder from "./pages/resume";
import Learn from './pages/Learn-to-earn';
import CodeEditor from "./pages/Code-compiler";
import Test from './pages/sampletests'
import Dailycode from './pages/Daily-code'
import Ai from './pages/ai'
import p2 from './pages/p2'
import p3 from './pages/p3'
import p4 from './pages/p4'

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/codelab" element={<CodeLab />} />
          <Route path="/ResumeBuilder" element={<ResumeBuilder />} />
          <Route path="/Learn" element={<Learn />} />
          <Route path="/CodeEditor" element={<CodeEditor />} />
          <Route path="/Test" element={<Test />} />
          <Route path="/Dailycode" element={<Dailycode />} />
          <Route path="/Ai" element={<Ai />} />
          <Route path="/p2" element={<p2 />} />
          <Route path="/p3" element={<p3 />} />
          <Route path="/p4" element={<p4/>} />
         
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
