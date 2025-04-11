
import { Link } from "react-router-dom";
import { Activity, AlertCircle, Calendar, FileSpreadsheet, GraduationCap, LayoutDashboard, Shield, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Mock data for admin dashboard
const totalStats = {
  students: 2578,
  faculty: 85,
  courses: 124,
  assignments: 420,
};

// Faculty department stats
const facultyStats = [
  { department: "Computer Science", count: 32 },
  { department: "Information Technology", count: 24 },
  { department: "Software Engineering", count: 18 },
  { department: "Data Science", count: 11 },
];

// Course enrollment stats
const courseStats = [
  { name: "Data Structures & Algorithms", students: 340, sections: 12 },
  { name: "Web Development", students: 295, sections: 10 },
  { name: "Machine Learning", students: 185, sections: 6 },
  { name: "Database Systems", students: 170, sections: 6 },
  { name: "Programming Fundamentals", students: 420, sections: 15 },
];

// Recent notifications
const notifications = [
  {
    title: "New Faculty Account Requests",
    message: "There are 5 pending faculty account requests that need your approval.",
    type: "warning",
    actionText: "Review Requests",
  },
  {
    title: "Course Creation Surge",
    message: "12 new courses were created in the last 24 hours. Please review the curriculum alignment.",
    type: "info",
    actionText: "View Courses",
  },
  {
    title: "System Maintenance",
    message: "Scheduled maintenance on May 22nd from 2:00 AM - 5:00 AM. The system will be unavailable during this time.",
    type: "alert",
    actionText: "View Details",
  },
];

// Upcoming events
const events = [
  {
    title: "Faculty Meeting",
    date: "May 18, 2025",
    time: "9:00 AM - 11:00 AM",
    location: "Conference Room A",
  },
  {
    title: "End of Semester Planning",
    date: "May 25, 2025",
    time: "1:00 PM - 3:00 PM",
    location: "Admin Building, Room 302",
  },
  {
    title: "Placement Committee Meeting",
    date: "May 28, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Placement Office",
  },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome and overview section */}
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="lg:w-3/4">
          <CardHeader className="pb-2">
            <CardTitle>Welcome, Administrator!</CardTitle>
            <CardDescription>
              Here's an overview of campus-wide statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="stat-card">
                <div className="text-muted-foreground text-sm flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>Total Students</span>
                </div>
                <div className="text-3xl font-bold mt-2">{totalStats.students}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  +123 from last semester
                </div>
              </div>
              
              <div className="stat-card">
                <div className="text-muted-foreground text-sm flex items-center">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  <span>Faculty Members</span>
                </div>
                <div className="text-3xl font-bold mt-2">{totalStats.faculty}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  +7 new hires this year
                </div>
              </div>
              
              <div className="stat-card">
                <div className="text-muted-foreground text-sm flex items-center">
                  <LayoutDashboard className="h-4 w-4 mr-1" />
                  <span>Active Courses</span>
                </div>
                <div className="text-3xl font-bold mt-2">{totalStats.courses}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Across 12 departments
                </div>
              </div>
              
              <div className="stat-card">
                <div className="text-muted-foreground text-sm flex items-center">
                  <Activity className="h-4 w-4 mr-1" />
                  <span>Platform Usage</span>
                </div>
                <div className="text-3xl font-bold mt-2">89%</div>
                <div className="text-xs text-muted-foreground mt-1">
                  +12% from last month
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Faculty by Department</h3>
                <div className="space-y-4">
                  {facultyStats.map((dept, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-medium">{dept.department}</h4>
                        <span className="text-sm text-muted-foreground">{dept.count}</span>
                      </div>
                      <Progress 
                        value={(dept.count / facultyStats.reduce((acc, curr) => acc + curr.count, 0)) * 100} 
                        className="h-2" 
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Top Enrolled Courses</h3>
                <div className="space-y-3">
                  {courseStats.map((course, index) => (
                    <div key={index} className="p-3 bg-card border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm">{course.name}</h4>
                          <div className="text-xs text-muted-foreground mt-1">
                            {course.students} students ({course.sections} sections)
                          </div>
                        </div>
                        <Badge>{course.students}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Schedule card */}
        <Card className="lg:w-1/4">
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
                    <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
                    </svg>
                    <span>{event.time}</span>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" size="sm" className="w-full">
                View Full Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Action buttons section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/admin/users" className="block">
          <Card className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors h-full">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="rounded-full bg-primary-foreground/20 p-3 mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">User Management</h3>
                  <p className="text-sm text-primary-foreground/80">
                    Manage students, faculty and staff
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/courses" className="block">
          <Card className="bg-campus-purple text-primary-foreground hover:bg-campus-purple/90 transition-colors h-full">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="rounded-full bg-primary-foreground/20 p-3 mr-4">
                  <LayoutDashboard className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Course Management</h3>
                  <p className="text-sm text-primary-foreground/80">
                    Oversee all courses and curriculum
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/reports" className="block">
          <Card className="bg-campus-teal text-primary-foreground hover:bg-campus-teal/90 transition-colors h-full">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="rounded-full bg-primary-foreground/20 p-3 mr-4">
                  <FileSpreadsheet className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Reports & Analytics</h3>
                  <p className="text-sm text-primary-foreground/80">
                    Generate comprehensive reports
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/settings" className="block">
          <Card className="bg-campus-amber text-primary-foreground hover:bg-campus-amber/90 transition-colors h-full">
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="rounded-full bg-primary-foreground/20 p-3 mr-4">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">System Settings</h3>
                  <p className="text-sm text-primary-foreground/80">
                    Configure platform settings
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      {/* Notifications and alerts */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Recent Notifications</h2>
        
        {notifications.map((notification, index) => (
          <div 
            key={index} 
            className={`
              rounded-lg p-4 flex items-start
              ${notification.type === 'warning' ? 'bg-campus-amber-light/10 border border-campus-amber/20' : 
                notification.type === 'info' ? 'bg-campus-blue-light/10 border border-campus-blue/20' : 
                'bg-destructive/10 border border-destructive/20'}
            `}
          >
            <AlertCircle className={`
              h-5 w-5 mr-3 flex-shrink-0 mt-0.5
              ${notification.type === 'warning' ? 'text-campus-amber' : 
                notification.type === 'info' ? 'text-campus-blue' : 
                'text-destructive'}
            `} />
            <div>
              <h4 className="font-medium">{notification.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">
                {notification.message}
              </p>
              <Button size="sm" variant="outline" className="mr-2">
                {notification.actionText}
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Placement statistics section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Placement & Skills Analytics</h2>
          <Link to="/admin/placement">
            <Button variant="outline" size="sm">
              View Detailed Reports
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Placement Statistics</CardTitle>
              <CardDescription>
                Current year placement trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                <p className="text-muted-foreground">
                  Placement statistics chart would appear here
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Skill Distribution</CardTitle>
              <CardDescription>
                Top skills across student body
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                <p className="text-muted-foreground">
                  Skills distribution chart would appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
