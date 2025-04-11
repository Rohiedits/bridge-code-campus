
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Code, 
  GraduationCap, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  Moon, 
  Settings, 
  Sun, 
  User, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

const roleLinks = {
  student: [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Code Lab", href: "/codelab", icon: Code },
  ],
  faculty: [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Students", href: "/students", icon: GraduationCap },
  ],
  admin: [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Faculty", href: "/faculty", icon: User },
    { name: "Analytics", href: "/analytics", icon: GraduationCap },
  ],
};

const Navbar = ({ userRole = "student" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userName, setUserName] = useState("User");
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get user name from localStorage if available
    const email = localStorage.getItem("userEmail");
    if (email) {
      // Extract name from email (everything before @)
      const name = email.split('@')[0];
      setUserName(name.charAt(0).toUpperCase() + name.slice(1));
    }
  }, []);
  
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };
  
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    
    // Show success message
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    
    // Redirect to login page
    navigate("/login");
  };
  
  const links = userRole ? roleLinks[userRole] : roleLinks.student;
  
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
  
  return (
    <nav className="bg-card border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">Campus Bridge</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {links.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`nav-link flex items-center ${
                  location.pathname === link.href ? "nav-link-active" : ""
                }`}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src="" alt={userName} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground capitalize">
                  {userRole}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-full"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t animate-fade-in">
          <div className="pt-2 pb-3 space-y-1 px-4">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`nav-link flex items-center ${
                  location.pathname === link.href ? "nav-link-active" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.name}
              </Link>
            ))}
            <button 
              className="nav-link flex items-center w-full text-left text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
