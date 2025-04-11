
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StudentDashboard from "@/components/Dashboard/StudentDashboard";
import FacultyDashboard from "@/components/Dashboard/FacultyDashboard";
import AdminDashboard from "@/components/Dashboard/AdminDashboard";

const Dashboard = () => {
  // In a real app, this would come from auth context
  const [userRole, setUserRole] = useState("student");
  
  // Component to render based on user role
  const DashboardComponent = () => {
    switch (userRole) {
      case "student":
        return <StudentDashboard />;
      case "faculty":
        return <FacultyDashboard />;
      case "admin":
        return <AdminDashboard />;
      default:
        return <StudentDashboard />;
    }
  };
  
  // Role switcher for demo purposes (would not exist in real app)
  const RoleSwitcher = () => (
    <div className="flex justify-center mb-6 p-4 bg-muted rounded-lg">
      <div className="text-sm text-muted-foreground mr-3 my-auto">Demo Role Switcher:</div>
      <div className="flex space-x-2">
        <button
          onClick={() => setUserRole("student")}
          className={`px-3 py-1 rounded-md text-sm ${
            userRole === "student"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary hover:bg-muted"
          }`}
        >
          Student
        </button>
        <button
          onClick={() => setUserRole("faculty")}
          className={`px-3 py-1 rounded-md text-sm ${
            userRole === "faculty"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary hover:bg-muted"
          }`}
        >
          Faculty
        </button>
        <button
          onClick={() => setUserRole("admin")}
          className={`px-3 py-1 rounded-md text-sm ${
            userRole === "admin"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary hover:bg-muted"
          }`}
        >
          Admin
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userRole={userRole} />
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RoleSwitcher />
        <DashboardComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
