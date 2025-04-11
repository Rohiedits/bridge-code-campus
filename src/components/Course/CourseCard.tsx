
import { Clock, FileText, GraduationCap, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  progress?: number;
  dueAssignments?: number;
  totalStudents?: number;
  imageSrc?: string;
}

const CourseCard = ({
  id,
  title,
  description,
  instructor,
  category,
  progress = 0,
  dueAssignments = 0,
  totalStudents = 0,
  imageSrc,
}: CourseCardProps) => {
  // Determine badge color based on category
  const getBadgeClass = (category: string) => {
    switch (category.toLowerCase()) {
      case "programming":
        return "badge-blue";
      case "mathematics":
        return "badge-purple";
      case "data structures":
        return "badge-teal";
      case "algorithms":
        return "badge-amber";
      default:
        return "badge-blue";
    }
  };

  return (
    <Link to={`/courses/${id}`}>
      <Card className="overflow-hidden h-full card-hover">
        <div
          className="h-32 bg-cover bg-center"
          style={{
            backgroundImage: imageSrc
              ? `url(${imageSrc})`
              : "linear-gradient(to right, var(--primary), var(--secondary))",
          }}
        />
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge className={getBadgeClass(category)}>{category}</Badge>
            {dueAssignments > 0 && (
              <Badge variant="destructive">{dueAssignments} Due</Badge>
            )}
          </div>
          <h3 className="text-lg font-semibold leading-tight mt-2">{title}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <GraduationCap className="mr-1 h-4 w-4" />
            <span>{instructor}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {description}
          </p>
          
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground border-t pt-4 flex justify-between">
          <div className="flex items-center">
            <FileText className="mr-1 h-3 w-3" /> 
            <span>{dueAssignments} Assignments</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-3 w-3" /> 
            <span>{totalStudents} Students</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" /> 
            <span>16 Weeks</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
