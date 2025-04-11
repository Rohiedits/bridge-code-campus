
import { Link } from "react-router-dom";
import { AlertCircle, BookOpen, Calendar, Clock, Code, FileText, GraduationCap, LayoutGrid, PlusCircle, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CourseCard from "@/components/Course/CourseCard";

// Mock data for faculty dashboard
const courses = [
  {
    id: "1",
    title: "Data Structures & Algorithms",
    description: "Learn fundamental data structures and algorithms needed for software development and coding interviews.",
    instructor: "Dr. Jane Smith",
    category: "Data Structures",
    totalStudents: 120,
  },
  {
    id: "2",
    title: "Web Development Fundamentals",
    description: "Introduction to HTML, CSS, JavaScript and modern frameworks for building web applications.",
    instructor: "Dr. Jane Smith",
    category: "Programming",
    totalStudents: 85,
  },
  {
    id: "3",
    title: "Database Systems",
    description: "Learn about relational database design, SQL, and basic database administration concepts.",
    instructor: "Dr. Jane Smith",
    category: "Programming",
    totalStudents: 95,
  },
];

// Assignments stats
const assignmentStats = {
  total: 24,
  graded: 18,
  pending: 6,
  submissions: 156,
};

// Student performance data
const studentPerformance = [
  { metric: "Assignment Completion", value: 82 },
  { metric: "Quiz Performance", value: 76 },
  { metric: "Coding Assessment", value: 68 },
  { metric: "Project Submissions", value: 92 },
];

// Upcoming schedule
const schedule = [
  {
    title: "Data Structures Lecture",
    date: "May 15, 2025",
    time: "10:00 AM - 11:30 AM",
    location: "Room 302, CS Building",
    type: "lecture",
  },
  {
    title: "Office Hours",
    date: "May 15, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Faculty Office 105",
    type: "office-hours",
  },
  {
    title: "Web Dev Lab Session",
    date: "May 16, 2025",
    time: "9:00 AM - 10:30 AM",
    location: "Computer Lab B",
    type: "lab",
  },
  {
    title: "Database Systems Midterm",
    date: "May 20, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Room 302, CS Building",
    type: "exam",
  },
];

const FacultyDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome and overview section */}
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="md:w-2/3">
          <CardHeader className="pb-2">
            <CardTitle>Welcome, Dr. Smith!</CardTitle>
            <CardDescription>
              Here's an overview of your courses and student performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="stat-card">
                <div className="text-muted-foreground text-sm flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>Active Courses</span>
                </div>
                <div className="text-3xl font-bold mt-2">6</div>
                <div className="text-xs text-muted-foreground mt-1">
                  3 undergraduate, 2 graduate, 1 elective
                </div>
              </div>
              
              <div className="stat-card">
                <div className="text-muted-foreground text-sm flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>Total Students</span>
                </div>
                <div className="text-3xl font-bold mt-2">324</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Across all your courses
                </div>
              </div>
              
              <div className="stat-card">
                <div className="text-muted-foreground text-sm flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  <span>Assignments</span>
                </div>
                <div className="text-3xl font-bold mt-2">{assignmentStats.total}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {assignmentStats.graded} graded, {assignmentStats.pending} pending
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Student Performance Overview</h3>
              <div className="space-y-4">
                {studentPerformance.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-sm font-medium">{item.metric}</h4>
                      <span className="text-sm text-muted-foreground">{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Schedule card */}
        <Card className="md:w-1/3">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Your Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedule.map((event, index) => (
                <div 
                  key={index} 
                  className={`border-l-2 pl-3 py-1 ${
                    event.type === 'lecture' ? 'border-primary' :
                    event.type === 'lab' ? 'border-campus-teal' :
                    event.type === 'exam' ? 'border-campus-amber' :
                    'border-campus-purple'
                  }`}
                >
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
      
      {/* Action buttons section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary-foreground/20 p-3 mr-4">
                <PlusCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Create New Course</h3>
                <p className="text-sm text-primary-foreground/80">
                  Set up a new course with modules and assignments
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-campus-purple text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary-foreground/20 p-3 mr-4">
                <Code className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Create Coding Assignment</h3>
                <p className="text-sm text-primary-foreground/80">
                  Design a new programming task with test cases
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-campus-teal text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary-foreground/20 p-3 mr-4">
                <LayoutGrid className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">View Analytics</h3>
                <p className="text-sm text-primary-foreground/80">
                  Deep insights into student performance
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent submissions alert */}
      <div className="bg-campus-blue-light/10 border border-campus-blue/20 rounded-lg p-4 flex items-start">
        <AlertCircle className="h-5 w-5 text-campus-blue mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium">New assignment submissions</h4>
          <p className="text-sm text-muted-foreground mb-3">
            You have {assignmentStats.submissions} new submissions across all courses that need grading.
          </p>
          <Button size="sm" variant="outline" className="mr-2">
            View Submissions
          </Button>
        </div>
      </div>
      
      {/* Courses section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">My Courses</h2>
          <Link to="/courses">
            <Button variant="outline" size="sm">
              Manage Courses
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
      
      {/* Student insights section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Student Engagement
            </CardTitle>
            <CardDescription>
              Weekly activity trends across all courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
              <p className="text-muted-foreground">
                Student engagement chart would appear here
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="h-5 w-5 mr-2" />
              Coding Assignment Performance
            </CardTitle>
            <CardDescription>
              Success rates by problem category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
              <p className="text-muted-foreground">
                Coding performance chart would appear here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyDashboard;
