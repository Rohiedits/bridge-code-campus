
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import {
  BookOpen,
  Download,
  FileText,
  Info,
  MessageSquare,
  PenLine,
  Users,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// This would come from a backend API in a real application
const getCourseById = (id) => {
  return {
    id: "1",
    title: "Data Structures & Algorithms",
    description: "Learn fundamental data structures and algorithms needed for software development and coding interviews.",
    instructor: "Dr. Jane Smith",
    category: "Data Structures",
    progress: 65,
    dueAssignments: 2,
    totalStudents: 120,
    materials: [
      { 
        id: "m1", 
        name: "Introduction to Big O Notation", 
        type: "pdf",
        description: "Fundamentals of algorithm time and space complexity analysis",
        dateAdded: "2025-03-15T10:30:00Z"
      },
      { 
        id: "m2", 
        name: "Arrays and Linked Lists", 
        type: "pdf",
        description: "Comparison of array and linked list data structures",
        dateAdded: "2025-03-18T14:45:00Z"
      },
      { 
        id: "m3", 
        name: "Recursion Fundamentals", 
        type: "pdf",
        description: "Understanding recursive algorithms and their applications",
        dateAdded: "2025-03-22T09:15:00Z"
      },
      { 
        id: "m4", 
        name: "Sorting Algorithms Lecture", 
        type: "video",
        description: "Explanation of common sorting algorithms and their performance",
        dateAdded: "2025-03-25T13:20:00Z"
      },
    ],
    assignments: [
      {
        id: "a1",
        name: "Algorithm Analysis Assignment",
        description: "Analyze the time and space complexity of given algorithms",
        dueDate: "2025-05-20T23:59:59Z",
        points: 50,
        status: "not-started",
      },
      {
        id: "a2",
        name: "Linked List Implementation",
        description: "Implement a singly linked list with basic operations",
        dueDate: "2025-05-15T23:59:59Z",
        points: 75,
        status: "in-progress",
      },
    ],
    announcements: [
      {
        id: "an1",
        title: "Office Hours Update",
        content: "Office hours will be moved to Thursday 2-4pm this week only.",
        date: "2025-04-05T10:15:00Z",
      },
      {
        id: "an2",
        title: "Midterm Exam Information",
        content: "The midterm exam will cover all material up to and including linked lists. It will be held on April 25th.",
        date: "2025-04-08T16:30:00Z",
      },
    ],
  };
};

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("materials");
  const [userRole, setUserRole] = useState("student");
  
  useEffect(() => {
    // Check if user is logged in
    const userEmail = localStorage.getItem("userEmail");
    
    if (!userEmail) {
      toast({
        title: "Authentication required",
        description: "Please log in to access this page",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    // Set role based on email domain
    if (userEmail.includes("@faculty.com")) {
      setUserRole("faculty");
    } else if (userEmail.includes("@admin.com")) {
      setUserRole("admin");
    } else {
      setUserRole("student");
    }
    
    // Fetch course details
    try {
      const courseData = getCourseById(id);
      if (courseData) {
        setCourse(courseData);
      } else {
        toast({
          title: "Course not found",
          description: "The requested course could not be found",
          variant: "destructive",
        });
        navigate("/courses");
      }
    } catch (error) {
      toast({
        title: "Error loading course",
        description: "There was an error loading the course details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleDownload = (material) => {
    // In a real app, this would download the actual file
    toast({
      title: "Downloading material",
      description: `Downloading "${material.name}"`,
    });
  };
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar userRole={userRole} />
        <main className="flex-1 container max-w-7xl mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading course details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar userRole={userRole} />
        <main className="flex-1 container max-w-7xl mx-auto px-4 py-8">
          <div className="text-center p-12 bg-muted rounded-lg">
            <Info className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Course not found</h3>
            <p className="text-muted-foreground mt-2 mb-6">
              The course you're looking for doesn't exist or you don't have access to it.
            </p>
            <Button onClick={() => navigate("/courses")}>
              Back to Courses
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userRole={userRole} />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                  onClick={() => navigate("/courses")}
                >
                  ← Back to Courses
                </Button>
                <Badge variant="outline" className="capitalize">
                  {course.category}
                </Badge>
              </div>
              
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="text-muted-foreground mt-2 max-w-3xl">{course.description}</p>
            </div>
            
            {userRole === "student" && (
              <Card className="w-full md:w-auto md:min-w-[200px]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Overall Completion</span>
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2 mb-4" />
                  
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-muted p-2 rounded-md">
                      <div className="text-2xl font-bold">
                        {course.materials?.length || 0}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Materials
                      </div>
                    </div>
                    <div className="bg-muted p-2 rounded-md">
                      <div className="text-2xl font-bold text-amber-500">
                        {course.dueAssignments || 0}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Due Soon
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4 items-center text-muted-foreground">
            <div className="flex items-center">
              <PenLine className="h-4 w-4 mr-1" />
              <span>Instructor: {course.instructor}</span>
            </div>
            
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{course.totalStudents} Students</span>
            </div>
            
            {userRole === "faculty" && (
              <Button className="ml-auto">
                Edit Course
              </Button>
            )}
          </div>
        </div>
        
        {/* Course content tabs */}
        <Tabs defaultValue="materials" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="materials">
              <BookOpen className="h-4 w-4 mr-2" />
              Materials
            </TabsTrigger>
            <TabsTrigger value="assignments">
              <FileText className="h-4 w-4 mr-2" />
              Assignments
            </TabsTrigger>
            <TabsTrigger value="announcements">
              <MessageSquare className="h-4 w-4 mr-2" />
              Announcements
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="materials" className="space-y-6">
            {userRole === "faculty" && (
              <div className="flex justify-end mb-4">
                <Button>
                  Upload New Material
                </Button>
              </div>
            )}
            
            {course.materials?.length > 0 ? (
              <div className="space-y-4">
                {course.materials.map((material) => (
                  <Card key={material.id}>
                    <CardContent className="p-4 flex items-center">
                      <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center mr-4 flex-shrink-0">
                        {material.type === "video" ? (
                          <Video className="h-5 w-5" />
                        ) : (
                          <FileText className="h-5 w-5" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">
                          {material.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {material.description || "No description provided"}
                        </p>
                        <div className="text-xs text-muted-foreground mt-1">
                          Added on {formatDate(material.dateAdded)}
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="flex-shrink-0"
                        onClick={() => handleDownload(material)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-12 bg-muted rounded-lg">
                <Info className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No materials available</h3>
                <p className="text-muted-foreground mt-1">
                  {userRole === "faculty"
                    ? "Upload course materials for your students."
                    : "Check back later for course materials from your instructor."}
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="assignments" className="space-y-6">
            {userRole === "faculty" && (
              <div className="flex justify-end mb-4">
                <Button>
                  Create New Assignment
                </Button>
              </div>
            )}
            
            {course.assignments?.length > 0 ? (
              <div className="space-y-4">
                {course.assignments.map((assignment) => (
                  <Card key={assignment.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{assignment.name}</h3>
                        <Badge
                          variant={
                            assignment.status === "completed" ? "outline" :
                            new Date(assignment.dueDate) < new Date() ? "destructive" :
                            new Date(assignment.dueDate) < new Date(Date.now() + 3 * 86400000) ? "default" : "outline"
                          }
                        >
                          {assignment.status === "completed" ? "Completed" :
                           new Date(assignment.dueDate) < new Date() ? "Overdue" :
                           "Due " + formatDate(assignment.dueDate)}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {assignment.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-y-2 justify-between items-center">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Points: </span>
                          <span className="font-medium">{assignment.points}</span>
                        </div>
                        
                        <Button 
                          size="sm"
                          variant={userRole === "student" ? "default" : "secondary"}
                        >
                          {userRole === "student" ? "Submit Assignment" : "View Submissions"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-12 bg-muted rounded-lg">
                <Info className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No assignments available</h3>
                <p className="text-muted-foreground mt-1">
                  {userRole === "faculty"
                    ? "Create assignments for your students."
                    : "There are no assignments for this course yet."}
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="announcements" className="space-y-6">
            {userRole === "faculty" && (
              <div className="flex justify-end mb-4">
                <Button>
                  Post Announcement
                </Button>
              </div>
            )}
            
            {course.announcements?.length > 0 ? (
              <div className="space-y-4">
                {course.announcements.map((announcement) => (
                  <Card key={announcement.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(announcement.date)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{announcement.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-12 bg-muted rounded-lg">
                <Info className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No announcements</h3>
                <p className="text-muted-foreground mt-1">
                  {userRole === "faculty"
                    ? "Post announcements to keep your students informed."
                    : "There are no announcements for this course yet."}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;
