
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CodeEditor from "@/components/CodeEditor/CodeEditor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ChevronRight, Code, FileEdit, Filter, Info, Search, Star, TrendingUp, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock problem data
const problemData = {
  title: "Two Sum",
  description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
  constraints: "• 2 <= nums.length <= 10^4\n• -10^9 <= nums[i] <= 10^9\n• -10^9 <= target <= 10^9\n• Only one valid answer exists.",
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]"
    },
    {
      input: "nums = [3,3], target = 6",
      output: "[0,1]"
    }
  ],
  difficulty: "easy",
  timeLimit: "500ms",
};

// Mock problems list
const problems = [
  { 
    id: "1", 
    title: "Two Sum", 
    difficulty: "easy", 
    category: "arrays", 
    solved: true 
  },
  { 
    id: "2", 
    title: "Valid Parentheses", 
    difficulty: "easy", 
    category: "stacks", 
    solved: false 
  },
  { 
    id: "3", 
    title: "Reverse Linked List", 
    difficulty: "easy", 
    category: "linked lists", 
    solved: true 
  },
  { 
    id: "4", 
    title: "Binary Tree Inorder Traversal", 
    difficulty: "medium", 
    category: "trees", 
    solved: false 
  },
  { 
    id: "5", 
    title: "Merge Two Sorted Lists", 
    difficulty: "easy", 
    category: "linked lists", 
    solved: false 
  },
  { 
    id: "6", 
    title: "Maximum Subarray", 
    difficulty: "medium", 
    category: "arrays", 
    solved: false 
  },
  { 
    id: "7", 
    title: "Climbing Stairs", 
    difficulty: "easy", 
    category: "dynamic programming", 
    solved: true 
  },
  { 
    id: "8", 
    title: "Merge Intervals", 
    difficulty: "medium", 
    category: "arrays", 
    solved: false 
  },
  { 
    id: "9", 
    title: "3Sum", 
    difficulty: "medium", 
    category: "arrays", 
    solved: false 
  },
  { 
    id: "10", 
    title: "Trapping Rain Water", 
    difficulty: "hard", 
    category: "two pointers", 
    solved: false 
  }
];

const CodeLab = () => {
  const [activeTab, setActiveTab] = useState("code-practice");
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  
  // Filter problems based on search term and filters
  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter.length === 0 || difficultyFilter.includes(problem.difficulty);
    const matchesStatus = statusFilter.length === 0 || 
      (statusFilter.includes("solved") && problem.solved) || 
      (statusFilter.includes("unsolved") && !problem.solved);
    
    return matchesSearch && matchesDifficulty && matchesStatus;
  });
  
  // Toggle filter values
  const toggleDifficultyFilter = (value: string) => {
    if (difficultyFilter.includes(value)) {
      setDifficultyFilter(difficultyFilter.filter(v => v !== value));
    } else {
      setDifficultyFilter([...difficultyFilter, value]);
    }
  };
  
  const toggleStatusFilter = (value: string) => {
    if (statusFilter.includes(value)) {
      setStatusFilter(statusFilter.filter(v => v !== value));
    } else {
      setStatusFilter([...statusFilter, value]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userRole="student" />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Code className="mr-3 h-8 w-8 text-primary" />
              Code Lab
            </h1>
            <p className="text-muted-foreground mt-1">Practice coding problems and enhance your skills</p>
          </div>
        </div>
        
        <Tabs defaultValue="code-practice" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="code-practice">Problem Practice</TabsTrigger>
            <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <TabsContent value="code-practice" className="m-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Problems list sidebar */}
            <Card className="lg:col-span-1 h-[calc(100vh-240px)] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Coding Problems</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search problems..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardHeader>
              
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                <Button 
                  variant={difficultyFilter.includes("easy") ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleDifficultyFilter("easy")}
                  className="text-xs h-7 px-2"
                >
                  Easy
                </Button>
                <Button 
                  variant={difficultyFilter.includes("medium") ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleDifficultyFilter("medium")}
                  className="text-xs h-7 px-2"
                >
                  Medium
                </Button>
                <Button 
                  variant={difficultyFilter.includes("hard") ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleDifficultyFilter("hard")}
                  className="text-xs h-7 px-2"
                >
                  Hard
                </Button>
                <Button 
                  variant={statusFilter.includes("solved") ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleStatusFilter("solved")}
                  className="text-xs h-7 px-2"
                >
                  Solved
                </Button>
                <Button 
                  variant={statusFilter.includes("unsolved") ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleStatusFilter("unsolved")}
                  className="text-xs h-7 px-2"
                >
                  Unsolved
                </Button>
              </div>
              
              <CardContent className="flex-1 overflow-auto px-2 py-2">
                <div className="space-y-1">
                  {filteredProblems.length > 0 ? (
                    filteredProblems.map((problem) => (
                      <div 
                        key={problem.id}
                        className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted ${
                          problem.id === "1" ? "bg-muted" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {problem.solved ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                          )}
                          <span className="text-sm">{problem.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline"
                            className={`text-xs ${
                              problem.difficulty === "easy" 
                                ? "bg-green-100 text-green-800 border-green-200" 
                                : problem.difficulty === "medium"
                                ? "bg-amber-100 text-amber-800 border-amber-200"
                                : "bg-red-100 text-red-800 border-red-200"
                            }`}
                          >
                            {problem.difficulty}
                          </Badge>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Info className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No problems found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Code editor */}
            <div className="lg:col-span-2 h-[calc(100vh-240px)]">
              <CodeEditor problem={problemData} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="ai-assistant" className="m-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AI assistant options sidebar */}
            <Card className="lg:col-span-1 h-[calc(100vh-240px)] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">AI Assistant</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Get help with coding problems, debugging, and learning.
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Coding Help</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start text-left">
                      <FileEdit className="h-4 w-4 mr-2" />
                      Explain the current problem
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <Info className="h-4 w-4 mr-2" />
                      Help me solve this step-by-step
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <Code className="h-4 w-4 mr-2" />
                      Debug my code
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Learning Resources</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start text-left">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Optimize my solution
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <Star className="h-4 w-4 mr-2" />
                      Show me best practices
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <User className="h-4 w-4 mr-2" />
                      Personalized recommendations
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <p className="text-xs text-muted-foreground">
                  Note: The AI assistant is here to guide your learning process, not to provide direct answers for assignments.
                </p>
              </CardContent>
            </Card>
            
            {/* AI chat interface */}
            <Card className="lg:col-span-2 h-[calc(100vh-240px)] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">AI Chat</CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-auto bg-muted rounded-md p-4 mb-4">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                        AI
                      </div>
                      <div className="bg-card rounded-lg p-3 max-w-[80%]">
                        <p>Hello! I'm your Code Lab AI assistant. How can I help you today?</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 justify-end">
                      <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                        <p>Can you explain how to approach the Two Sum problem?</p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-semibold">
                        You
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                        AI
                      </div>
                      <div className="bg-card rounded-lg p-3 max-w-[80%]">
                        <p>
                          The Two Sum problem asks you to find two numbers in an array that add up to a target value.
                        </p>
                        <p className="mt-2">
                          There are multiple approaches, but the most efficient one uses a hash map:
                        </p>
                        <ol className="list-decimal list-inside mt-2 space-y-1">
                          <li>Create an empty hash map</li>
                          <li>Iterate through the array</li>
                          <li>For each element, calculate the complement (target - current element)</li>
                          <li>Check if the complement exists in the hash map</li>
                          <li>If it does, return the current index and the complement's index</li>
                          <li>Otherwise, add the current element and its index to the hash map</li>
                        </ol>
                        <p className="mt-2">
                          This approach has O(n) time complexity since we only need to go through the array once.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <Input
                    placeholder="Ask a question about your code or the problem..."
                    className="pr-16"
                  />
                  <Button 
                    size="sm" 
                    className="absolute right-1 top-1"
                  >
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </main>
      
      <Footer />
    </div>
  );
};

export default CodeLab;
