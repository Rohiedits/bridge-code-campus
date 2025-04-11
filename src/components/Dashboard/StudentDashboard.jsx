
import { Link } from "react-router-dom";
import { AlertCircle, BookOpen, Calendar, Clock, Code, FileBadge, FileCheck, Trophy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CourseCard from "@/components/Course/CourseCard";
import AssignmentCard from "@/components/Course/AssignmentCard";

// Mock data for student dashboard
const courses = [
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
];

const assignments = [
  {
    id: "1",
    title: "Binary Tree Implementation",
    courseTitle: "Data Structures & Algorithms",
    dueDate: "2025-05-15T23:59:59",
    status: "in-progress",
    type: "coding",
    points: 100,
  },
  {
    id: "2",
    title: "CSS Grid Layout Exercise",
    courseTitle: "Web Development Fundamentals",
    dueDate: "2025-05-18T23:59:59",
    status: "not-started",
    type: "coding",
    points: 50,
  },
  {
    id: "3",
    title: "Hash Maps Quiz",
    courseTitle: "Data Structures & Algorithms",
    dueDate: "2025-05-10T23:59:59",
    status: "overdue",
    type: "quiz",
    points: 25,
  },
  {
    id: "4",
    title: "SQL Joins and Subqueries",
    courseTitle: "Database Systems",
    dueDate: "2025-05-01T23:59:59",
    status: "completed",
    type: "theory",
    points: 75,
  },
];

// Practice problems stats
const practiceStats = {
  solved: 42,
  totalProblems: 150,
  currentStreak: 5,
  longestStreak: 12,
  badges: [
    "Algorithm Master",
    "7-Day Streak",
    "Array Expert",
  ],
};

// Upcoming events
const events = [
  {
    title: "Database Systems Midterm",
    date: "May 20, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Room 302, CS Building",
  },
  {
    title: "Web Dev Project Submission",
    date: "May 25, 2025",
    time: "11:59 PM",
    location: "Online",
  },
  {
    title: "Coding Challenge: Algorithms",
    date: "May 28, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Computer Lab B",
  },
];

const StudentDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome and overview section */}
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-2/3">
          <CardHeader className="pb-2">
            <CardTitle>Welcome back, John!</CardTitle>
            <CardDescription>
              Here's an overview of your learning progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="stat-card">
                <div className="text-muted-foreground text-sm flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>Enrolled Courses</span>
                </div>
                <div className="text-3xl font-bold mt-2">6</div>
                <div className="text-xs text-muted-foreground mt-1">
                  2 in progress, 3 active, 1 completed
                </div>
              </div>
              
              <div className="stat-card">
                <div className="text-muted-foreground text-sm flex items-center">
                  <FileCheck className="h-4 w-4 mr-1" />
                  <span>Assignments</span>
                </div>
                <div className="text-3xl font-bold mt-2">12</div>
                <div className="text-xs text-muted-foreground mt-1">
                  3 overdue, 4 upcoming, 5 completed
                </div>
              </div>
              
              <div className="stat-card">
                <div className="text-muted-foreground text-sm flex items-center">
                  <Code className="h-4 w-4 mr-1" />
                  <span>Coding Problems</span>
                </div>
                <div className="text-3xl font-bold mt-2">42</div>
                <div className="text-xs text-muted-foreground mt-1">
                  42 solved out of 150 total problems
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium">Course Completion</h4>
                  <span className="text-sm text-muted-foreground">62%</span>
                </div>
                <Progress value={62} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium">Coding Skills Progress</h4>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium">Assignment Completion</h4>
                  <span className="text-sm text-muted-foreground">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Upcoming events card */}
        <Card className="md:w-1/3">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className="border-l-2 border-primary pl-3 py-1">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{event.time}</span>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" size="sm" className="w-full">
                View Full Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Assignments section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recent Assignments</h2>
          <Link to="/assignments">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
        
        {/* Alert for overdue assignments */}
        {assignments.some(a => a.status === "overdue") && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-3 mb-4 flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium">You have overdue assignments</h4>
              <p className="text-sm">
                Please complete your overdue assignments as soon as possible to avoid further penalty.
              </p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {assignments.map((assignment) => (
            <AssignmentCard key={assignment.id} {...assignment} />
          ))}
        </div>
      </div>
      
      {/* Courses section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">My Courses</h2>
          <Link to="/courses">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
      
      {/* Coding practice section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="h-5 w-5 mr-2" />
              Coding Practice Stats
            </CardTitle>
            <CardDescription>
              Track your coding practice progress and streaks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <div className="flex-1">
                <div className="text-sm text-muted-foreground mb-1">
                  Problems Solved
                </div>
                <div className="text-3xl font-bold">
                  {practiceStats.solved} 
                  <span className="text-base font-normal text-muted-foreground">
                    /{practiceStats.totalProblems}
                  </span>
                </div>
                <Progress 
                  value={(practiceStats.solved / practiceStats.totalProblems) * 100} 
                  className="h-2 mt-2" 
                />
              </div>
              
              <div className="flex-1">
                <div className="text-sm text-muted-foreground mb-1">
                  Current Streak
                </div>
                <div className="text-3xl font-bold flex items-center">
                  {practiceStats.currentStreak}
                  <span className="text-campus-amber ml-2">
                    🔥
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Longest streak: {practiceStats.longestStreak} days
                </div>
              </div>
              
              <div className="flex-1">
                <div className="text-sm text-muted-foreground mb-1">
                  Earned Badges
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {practiceStats.badges.map((badge, index) => (
                    <div key={index} className="flex items-center">
                      <FileBadge className="h-4 w-4 text-campus-purple mr-1" />
                      <span className="text-sm">{badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <Link to="/codelab">
              <Button className="w-full">
                <Code className="mr-2 h-4 w-4" />
                Practice Coding
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              Leaderboard
            </CardTitle>
            <CardDescription>
              Top performers in your batch
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`flex items-center p-2 rounded-lg ${
                    i === 2 ? "bg-primary/10 border border-primary/20" : ""
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold
                    ${i === 0 ? "bg-yellow-100 text-yellow-800" : 
                      i === 1 ? "bg-gray-100 text-gray-800" : 
                      i === 2 ? "bg-amber-100 text-amber-800" : "bg-muted text-muted-foreground"
                    }
                  `}>
                    {i + 1}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="font-medium text-sm">
                      {i === 2 ? "You" : ["Sarah Kim", "Alex Rivera", "", "David Chen", "Priya Patel"][i]}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {[132, 118, 105, 98, 87][i]} problems
                    </div>
                  </div>
                  <div className="text-sm font-semibold">
                    {[542, 496, 450, 432, 405][i]} pts
                  </div>
                </div>
              ))}
              
              <Button variant="outline" size="sm" className="w-full">
                View Full Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
