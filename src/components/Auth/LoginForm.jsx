
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("student");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Create schema based on selected role
  const createFormSchema = (role) => {
    let emailSchema;
    
    if (role === "student") {
      emailSchema = z.string()
        .email("Please enter a valid email address.")
        .refine((email) => email.endsWith("@gmail.com"), {
          message: "Student email must end with @gmail.com",
        });
    } else if (role === "faculty") {
      emailSchema = z.string()
        .email("Please enter a valid email address.")
        .refine((email) => email.endsWith("@faculty.com"), {
          message: "Faculty email must end with @faculty.com",
        });
    } else if (role === "admin") {
      emailSchema = z.string()
        .email("Please enter a valid email address.")
        .refine((email) => email.endsWith("@admin.com"), {
          message: "Admin email must end with @admin.com",
        });
    }
    
    return z.object({
      email: emailSchema,
      password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
      }),
      role: z.enum(["student", "faculty", "admin"]),
    });
  };

  // Create the form with dynamic schema
  const form = useForm({
    resolver: zodResolver(createFormSchema(selectedRole)),
    defaultValues: {
      email: "",
      password: "",
      role: "student",
    },
  });

  // Update the schema when role changes
  useEffect(() => {
    form.setValue("role", selectedRole);
    form.trigger("email"); // Re-validate email when role changes
  }, [selectedRole, form]);

  // Handle role change
  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  const onSubmit = (data) => {
    console.log("Login data:", data);
    
    // For demo purposes, we'll just simulate a successful login
    // In a real app, this would validate credentials with the backend
    toast({
      title: "Login successful!",
      description: `Welcome back! You are logged in as a ${data.role}.`,
    });
    
    // Navigate to the dashboard based on role
    navigate("/dashboard");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 flex flex-col items-center text-center">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-2">
          <GraduationCap className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>
          Sign in to your Campus Bridge account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login as</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleRoleChange(value);
                    }} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="faculty">Faculty</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    {selectedRole === "student" ? "Use name@gmail.com format" :
                     selectedRole === "faculty" ? "Use name@faculty.com format" :
                     "Use name@admin.com format"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder={
                        selectedRole === "student" ? "name@gmail.com" :
                        selectedRole === "faculty" ? "name@faculty.com" :
                        "name@admin.com"
                      } 
                      {...field}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
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
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-muted-foreground"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-primary hover:text-primary/80"
              >
                Forgot password?
              </a>
            </div>
            
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="mt-2 text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <a
            href="#"
            className="font-medium text-primary hover:text-primary/80"
          >
            Contact administrator
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
