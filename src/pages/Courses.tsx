
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard, { CourseCardProps } from "@/components/Course/CourseCard";
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
import { BookOpen, Filter, Search } from "lucide-react";

// Mock course data
const allCourses: CourseCardProps[] = [
  {
    id: "1",
    title: "Data Structures & Algorithms",
    description: "Learn fundamental data structures and algorithms needed for software development and coding interviews.",
    instructor: "Dr. Jane Smith",
    category: "Data Structures",
    progress: 65,
    dueAssignments: 2,
    totalStudents: 120,
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
  },
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("enrolled");
  
  // Extract unique categories for filter
  const categories = ["all", ...new Set(allCourses.map(course => course.category.toLowerCase()))];
  
  // Filter and sort courses based on current filters
  const filteredCourses = allCourses.filter(course => {
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userRole="student" />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <BookOpen className="mr-3 h-8 w-8 text-primary" />
              Courses
            </h1>
            <p className="text-muted-foreground mt-1">Browse and manage your academic courses</p>
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
          </div>
        </div>
        
        <Tabs defaultValue="enrolled" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
            <TabsTrigger value="available">Available Courses</TabsTrigger>
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
                <CourseCard key={course.id} {...course} />
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
