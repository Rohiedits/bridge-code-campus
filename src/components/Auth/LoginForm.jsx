
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Check, EyeIcon, EyeOffIcon } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Basic email validation
    if (!email || !email.includes('@')) {
      return false;
    }
    
    // Role-based domain validation
    if (email.endsWith('@faculty.com') || 
        email.endsWith('@admin.com') || 
        email.endsWith('@gmail.com')) {
      return true;
    }
    
    return false;
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    // Validate email
    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
      
      // Add more specific error message based on domain
      if (email.includes('@') && 
          !email.endsWith('@faculty.com') && 
          !email.endsWith('@admin.com') && 
          !email.endsWith('@gmail.com')) {
        newErrors.email = "Email must end with @faculty.com, @admin.com, or @gmail.com based on your role.";
      }
    }
    
    // Validate password
    if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    
    setErrors(newErrors);
    
    // If there are errors, don't proceed
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      // Store user email and derive role from email domain
      localStorage.setItem("userEmail", email);
      
      let role = "student";
      if (email.includes("@faculty.com")) {
        role = "faculty";
      } else if (email.includes("@admin.com")) {
        role = "admin";
      }
      localStorage.setItem("userRole", role);
      
      // Show success message
      toast({
        title: "Login successful",
        description: `Welcome back, ${email.split('@')[0]}!`,
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome to Campus Bridge</CardTitle>
        <CardDescription>
          Sign in to access your academic and coding portal
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="login" value={authMode} onValueChange={setAuthMode}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <div className="text-destructive text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground mt-1">
                    <ul>
                      <li>• Students: use name@gmail.com</li>
                      <li>• Faculty: use name@faculty.com</li>
                      <li>• Admin: use name@admin.com</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pr-10 ${errors.password ? "border-destructive" : ""}`}
                    autoComplete="current-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                  {errors.password && (
                    <div className="text-destructive text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.password}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        
        <TabsContent value="signup">
          <CardContent className="text-center py-10">
            <div className="mb-4 mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Registration is Managed by Admin</h3>
            <p className="text-muted-foreground mb-6">
              New accounts can only be created by your institution's administrator.
            </p>
            <Button variant="outline" onClick={() => setAuthMode("login")}>
              Back to Login
            </Button>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default LoginForm;
