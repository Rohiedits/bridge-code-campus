
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BookOpen, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({
  id,
  title,
  description,
  instructor,
  category,
  progress = 0,
  dueAssignments = 0,
  totalStudents = 0,
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/courses/${id}`);
  };
  
  // Truncate description if it's too long
  const truncatedDescription = description.length > 100
    ? `${description.substring(0, 97)}...`
    : description;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col" onClick={handleClick}>
      <div
        className="h-3"
        style={{
          background:
            category === "Data Structures"
              ? "linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)"
              : category === "Programming"
              ? "linear-gradient(90deg, #8b5cf6 0%, #7c3aed 100%)"
              : category === "Data Science"
              ? "linear-gradient(90deg, #ec4899 0%, #db2777 100%)"
              : category === "Software Engineering"
              ? "linear-gradient(90deg, #14b8a6 0%, #0d9488 100%)"
              : category === "Mathematics"
              ? "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)"
              : category === "Computer Systems"
              ? "linear-gradient(90deg, #ef4444 0%, #dc2626 100%)"
              : category === "Artificial Intelligence"
              ? "linear-gradient(90deg, #06b6d4 0%, #0891b2 100%)"
              : "linear-gradient(90deg, #6b7280 0%, #4b5563 100%)",
        }}
      />
      
      <CardContent className="p-5 flex-1">
        <div className="flex justify-between mb-2">
          <Badge variant="outline" className="capitalize mb-2">
            {category}
          </Badge>
          
          {dueAssignments > 0 && (
            <Badge variant="default" className="bg-amber-500">
              {dueAssignments} due
            </Badge>
          )}
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {truncatedDescription}
        </p>
        
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <BookOpen className="h-4 w-4 mr-1 text-muted-foreground" />
          <span>{instructor}</span>
        </div>
        
        {progress > 0 && (
          <div className="space-y-1 mb-3">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="px-5 py-3 bg-muted/40 flex justify-between text-xs text-muted-foreground">
        <div className="flex items-center">
          <Users className="h-3 w-3 mr-1" />
          <span>{totalStudents} students</span>
        </div>
        
        {dueAssignments > 0 ? (
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>Next due: Soon</span>
          </div>
        ) : (
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>No upcoming deadlines</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
