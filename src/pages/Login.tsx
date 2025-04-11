
import LoginForm from "@/components/Auth/LoginForm";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
      
      {/* Right side - image and intro */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="flex flex-col items-center justify-center p-8 w-full max-w-lg mx-auto">
          <div className="mb-8 flex items-center">
            <GraduationCap className="h-16 w-16" />
            <h1 className="text-4xl font-bold ml-4">Campus Bridge</h1>
          </div>
          
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Your Integrated Academic & Coding Platform
          </h2>
          
          <p className="text-lg mb-8 text-center opacity-90">
            Connect your academic learning with practical coding skills through one unified portal.
          </p>
          
          <div className="grid grid-cols-2 gap-6 w-full mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">Academic Resources</h3>
              <p className="text-sm opacity-80">
                Access course materials, assignments, and schedules.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">Coding Practice</h3>
              <p className="text-sm opacity-80">
                Solve problems, build projects, and track progress.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">AI Assistance</h3>
              <p className="text-sm opacity-80">
                Get help with coding, debugging, and understanding concepts.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">Skill Analytics</h3>
              <p className="text-sm opacity-80">
                Track progress with heatmaps, badges, and reports.
              </p>
            </div>
          </div>
          
          <div className="text-center text-sm opacity-80">
            Not a registered user? Contact your institution's administrator for access.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
