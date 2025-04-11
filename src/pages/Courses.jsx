
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/Course/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Filter, Search, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock course data
const allCourses = [
  {
    id: "1",
    title: "Data Structures & Algorithms",
    description: "Learn fundamental data structures and algorithms needed for software development and coding interviews.",
    instructor: "Dr. Jane Smith",
    category: "Data Structures",
    progress: 65,
    dueAssignments: 2,
    totalStudents: 120,
    materials: [
      { id: "m1", name: "Introduction to Big O Notation", type: "pdf" },
      { id: "m2", name: "Arrays and Linked Lists", type: "pdf" },
    ]
  },
  {
    id: "2",
    title: "Web Development Fundamentals",
    description: "Introduction to HTML, CSS, JavaScript and modern frameworks for building web applications.",
    instructor: "Prof. Alex Johnson",
    category: "Programming",
    progress: 38,
    dueAssignments: 1,
    totalStudents: 85,
    materials: [
      { id: "m3", name: "HTML Basics", type: "pdf" },
      { id: "m4", name: "CSS Styling Guide", type: "pdf" },
    ]
  },
  {
    id: "3",
    title: "Database Systems",
    description: "Learn about relational database design, SQL, and basic database administration concepts.",
    instructor: "Dr. Michael Wong",
    category: "Programming",
    progress: 82,
    dueAssignments: 0,
    totalStudents: 95,
    materials: [
      { id: "m5", name: "Introduction to SQL", type: "pdf" },
      { id: "m6", name: "Database Normalization", type: "pdf" },
    ]
  },
  {
    id: "4",
    title: "Advanced Python Programming",
    description: "Take your Python skills to the next level with advanced concepts and practical applications.",
    instructor: "Dr. Lisa Chen",
    category: "Programming",
    progress: 20,
    dueAssignments: 3,
    totalStudents: 74,
    materials: [
      { id: "m7", name: "Python OOP Concepts", type: "pdf" },
      { id: "m8", name: "Functional Programming in Python", type: "pdf" },
    ]
  },
  {
    id: "5",
    title: "Machine Learning Fundamentals",
    description: "Introduction to machine learning algorithms, statistical modeling, and practical implementation.",
    instructor: "Prof. David Kim",
    category: "Data Science",
    progress: 0,
    dueAssignments: 0,
    totalStudents: 110,
    materials: []
  },
  {
    id: "6",
    title: "Software Engineering Practices",
    description: "Learn professional software development methodologies, tools, and best practices.",
    instructor: "Dr. Robert Taylor",
    category: "Software Engineering",
    progress: 52,
    dueAssignments: 1,
    totalStudents: 68,
    materials: [
      { id: "m9", name: "Agile Development", type: "pdf" },
      { id: "m10", name: "Git Version Control", type: "pdf" },
    ]
  },
  {
    id: "7",
    title: "Discrete Mathematics",
    description: "Mathematical structures and concepts fundamental to computer science and programming.",
    instructor: "Dr. Sarah Johnson",
    category: "Mathematics",
    progress: 75,
    dueAssignments: 0,
    totalStudents: 92,
    materials: [
      { id: "m11", name: "Set Theory", type: "pdf" },
      { id: "m12", name: "Graph Theory", type: "pdf" },
    ]
  },
  {
    id: "8",
    title: "Computer Networks",
    description: "Principles and practices of computer networking, protocols, and network programming.",
    instructor: "Prof. Thomas Lee",
    category: "Computer Systems",
    progress: 30,
    dueAssignments: 2,
    totalStudents: 78,
    materials: [
      { id: "m13", name: "Network Protocols", type: "pdf" },
      { id: "m14", name: "TCP/IP", type: "pdf" },
    ]
  },
  {
    id: "9",
    title: "Artificial Intelligence",
    description: "Fundamentals of AI including search algorithms, knowledge representation, and reasoning.",
    instructor: "Dr. Michelle Park",
    category: "Artificial Intelligence",
    progress: 0,
    dueAssignments: 0,
    totalStudents: 105,
    materials: []
  },
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("enrolled");
  const [userRole, setUserRole] = useState("student");
  const [courses, setCourses] = useState(allCourses);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [materialName, setMaterialName] = useState("");
  const [materialDescription, setMaterialDescription] = useState("");
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [assignmentDueDate, setAssignmentDueDate] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const navigate = useNavigate();
  
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
  }, [navigate]);
  
  // Extract unique categories for filter
  const categories = ["all", ...new Set(courses.map(course => course.category.toLowerCase()))];
  
  // Filter and sort courses based on current filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || course.category.toLowerCase() === categoryFilter;
    
    // For enrolled tab, show courses with progress > 0
    if (activeTab === "enrolled" && course.progress === 0) {
      return false;
    }
    
    // For available tab, show courses with progress === 0
    if (activeTab === "available" && course.progress > 0) {
      return false;
    }
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort courses: courses with due assignments first, then by progress
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if ((a.dueAssignments || 0) > 0 && (b.dueAssignments || 0) === 0) return -1;
    if ((a.dueAssignments || 0) === 0 && (b.dueAssignments || 0) > 0) return 1;
    return (b.progress || 0) - (a.progress || 0);
  });

  const handleAddMaterial = () => {
    if (!materialName.trim()) {
      toast({
        title: "Material name is required",
        variant: "destructive",
      });
      return;
    }
    
    // Create a new material
    const newMaterial = {
      id: `m${Date.now()}`,
      name: materialName,
      description: materialDescription,
      type: "pdf",
      dateAdded: new Date().toISOString(),
    };
    
    // Update courses array with the new material
    const updatedCourses = courses.map(course => {
      if (course.id === selectedCourse.id) {
        return {
          ...course,
          materials: [...(course.materials || []), newMaterial],
        };
      }
      return course;
    });
    
    setCourses(updatedCourses);
    
    // Reset form fields
    setMaterialName("");
    setMaterialDescription("");
    
    toast({
      title: "Material added successfully",
      description: `"${materialName}" has been added to ${selectedCourse.title}`,
    });
    
    setIsDialogOpen(false);
  };

  const handleAddAssignment = () => {
    if (!assignmentName.trim() || !assignmentDueDate) {
      toast({
        title: "Assignment name and due date are required",
        variant: "destructive",
      });
      return;
    }
    
    // Create a new assignment
    const newAssignment = {
      id: `a${Date.now()}`,
      name: assignmentName,
      description: assignmentDescription,
      dueDate: assignmentDueDate,
      dateAdded: new Date().toISOString(),
    };
    
    // Update courses array with the new assignment
    const updatedCourses = courses.map(course => {
      if (course.id === selectedCourse.id) {
        return {
          ...course,
          assignments: [...(course.assignments || []), newAssignment],
          dueAssignments: (course.dueAssignments || 0) + 1,
        };
      }
      return course;
    });
    
    setCourses(updatedCourses);
    
    // Reset form fields
    setAssignmentName("");
    setAssignmentDescription("");
    setAssignmentDueDate("");
    
    toast({
      title: "Assignment added successfully",
      description: `"${assignmentName}" has been added to ${selectedCourse.title}`,
    });
    
    setIsDialogOpen(false);
  };
  
  const handleViewCourse = (course) => {
    // In a real application, this would navigate to a course detail page
    toast({
      title: "Course selected",
      description: `You are now viewing "${course.title}"`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userRole={userRole} />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <BookOpen className="mr-3 h-8 w-8 text-primary" />
              Courses
            </h1>
            <p className="text-muted-foreground mt-1">
              {userRole === "faculty" 
                ? "Manage your courses and academic materials" 
                : "Browse and manage your academic courses"}
            </p>
          </div>
          
          <div className="w-full md:w-auto flex gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? "bg-muted" : ""}
            >
              <Filter className="h-4 w-4" />
            </Button>
            
            {userRole === "faculty" && (
              <Button className="whitespace-nowrap">
                Create Course
              </Button>
            )}
          </div>
        </div>
        
        <Tabs defaultValue="enrolled" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            {userRole === "student" ? (
              <>
                <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
                <TabsTrigger value="available">Available Courses</TabsTrigger>
              </>
            ) : (
              <>
                <TabsTrigger value="enrolled">My Courses</TabsTrigger>
                <TabsTrigger value="available">All Courses</TabsTrigger>
              </>
            )}
          </TabsList>
        </Tabs>
        
        {showFilters && (
          <div className="bg-muted p-4 rounded-lg mb-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" 
                          ? "All Categories" 
                          : category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select defaultValue="relevance">
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                    <SelectItem value="recent">Recently Added</SelectItem>
                    <SelectItem value="az">A-Z</SelectItem>
                    <SelectItem value="za">Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="self-end" variant="secondary" onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
              }}>
                Reset Filters
              </Button>
            </div>
          </div>
        )}
        
        <TabsContent value="enrolled" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCourses.length > 0 ? (
              sortedCourses.map((course) => (
                <div key={course.id} className="relative">
                  <CourseCard 
                    {...course} 
                    onClick={() => handleViewCourse(course)} 
                  />
                  
                  {userRole === "faculty" && (
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Dialog open={isDialogOpen && selectedCourse?.id === course.id} onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (!open) setSelectedCourse(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-white/80 hover:bg-white shadow-sm"
                            onClick={() => setSelectedCourse(course)}
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Content to {course.title}</DialogTitle>
                            <DialogDescription>
                              Upload course materials or create assignments for your students.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <Tabs defaultValue="material">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="material">Course Material</TabsTrigger>
                              <TabsTrigger value="assignment">Assignment</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="material" className="space-y-4 pt-4">
                              <div className="space-y-2">
                                <Label htmlFor="material-name">Material Name</Label>
                                <Input
                                  id="material-name"
                                  placeholder="e.g., Week 1 Lecture Notes"
                                  value={materialName}
                                  onChange={(e) => setMaterialName(e.target.value)}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="material-desc">Description (Optional)</Label>
                                <Textarea
                                  id="material-desc"
                                  placeholder="Brief description of this material"
                                  value={materialDescription}
                                  onChange={(e) => setMaterialDescription(e.target.value)}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="material-file">Upload File</Label>
                                <Input
                                  id="material-file"
                                  type="file"
                                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                                />
                                <p className="text-xs text-muted-foreground">
                                  Supported formats: PDF, Word, PowerPoint (Max 50MB)
                                </p>
                              </div>
                              
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleAddMaterial}>
                                  Upload Material
                                </Button>
                              </DialogFooter>
                            </TabsContent>
                            
                            <TabsContent value="assignment" className="space-y-4 pt-4">
                              <div className="space-y-2">
                                <Label htmlFor="assignment-name">Assignment Name</Label>
                                <Input
                                  id="assignment-name"
                                  placeholder="e.g., Homework 1"
                                  value={assignmentName}
                                  onChange={(e) => setAssignmentName(e.target.value)}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="assignment-desc">Description</Label>
                                <Textarea
                                  id="assignment-desc"
                                  placeholder="Instructions for this assignment"
                                  value={assignmentDescription}
                                  onChange={(e) => setAssignmentDescription(e.target.value)}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="assignment-due">Due Date</Label>
                                <Input
                                  id="assignment-due"
                                  type="datetime-local"
                                  value={assignmentDueDate}
                                  onChange={(e) => setAssignmentDueDate(e.target.value)}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="assignment-file">Upload Instructions (Optional)</Label>
                                <Input
                                  id="assignment-file"
                                  type="file"
                                  accept=".pdf,.doc,.docx"
                                />
                              </div>
                              
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleAddAssignment}>
                                  Create Assignment
                                </Button>
                              </DialogFooter>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center p-12 bg-muted rounded-lg">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No courses found</h3>
                <p className="text-muted-foreground mt-1">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="available" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCourses.length > 0 ? (
              sortedCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))
            ) : (
              <div className="col-span-full text-center p-12 bg-muted rounded-lg">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No available courses found</h3>
                <p className="text-muted-foreground mt-1">
                  Check back later for new course offerings or adjust your filters.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </main>
      
      <Footer />
    </div>
  );
};

export default Courses;
