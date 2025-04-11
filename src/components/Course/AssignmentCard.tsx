
import { Calendar, CheckCircle, Clock, FileEdit } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export interface AssignmentCardProps {
  id: string;
  title: string;
  courseTitle: string;
  dueDate: string;
  status: "completed" | "in-progress" | "not-started" | "overdue";
  type: "coding" | "quiz" | "theory";
  points: number;
}

const AssignmentCard = ({
  id,
  title,
  courseTitle,
  dueDate,
  status,
  type,
  points,
}: AssignmentCardProps) => {
  // Status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "in-progress":
        return <Badge className="badge-blue">In Progress</Badge>;
      case "not-started":
        return <Badge variant="outline">Not Started</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Type badge styling
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "coding":
        return <Badge className="badge-purple">Coding</Badge>;
      case "quiz":
        return <Badge className="badge-blue">Quiz</Badge>;
      case "theory":
        return <Badge className="badge-amber">Theory</Badge>;
      default:
        return <Badge>Assignment</Badge>;
    }
  };

  // Convert date string to readable format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Check if the assignment is due soon (within 3 days)
  const isDueSoon = () => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 3;
  };

  return (
    <Card className="overflow-hidden h-full card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          {getTypeBadge(type)}
          {getStatusBadge(status)}
        </div>
        <h3 className="text-lg font-semibold leading-tight mt-2">{title}</h3>
        <div className="flex items-center text-sm text-muted-foreground">
          <FileEdit className="mr-1 h-4 w-4" />
          <span>{courseTitle}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-sm">
            <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
            <span className={isDueSoon() && status !== "completed" ? "text-destructive font-medium" : "text-muted-foreground"}>
              {formatDate(dueDate)}
              {isDueSoon() && status !== "completed" && " (Soon)"}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <CheckCircle className="mr-1 h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{points} points</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Link to={`/assignment/${id}`} className="w-full">
          <Button variant="outline" className="w-full">
            {status === "completed" ? "View Submission" : "Open Assignment"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default AssignmentCard;
