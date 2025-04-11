
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CodeEditor from "@/components/CodeEditor/CodeEditor";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { toast } from "@/hooks/use-toast";

const CodeLab = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("explore");
  const [code, setCode] = useState('console.log("Hello, World!");');
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Check if user is logged in
  useState(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      toast({
        title: "Authentication required",
        description: "Please log in to access this page",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [navigate]);

  const handleRunCode = () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      setOutput("Hello, World!");
      setIsRunning(false);
      toast({
        title: "Code executed successfully",
        description: "Your code was run without errors",
      });
    }, 1500);
  };

  const handleSubmitCode = () => {
    setIsRunning(true);
    // Simulate code submission
    setTimeout(() => {
      setIsRunning(false);
      toast({
        title: "Solution submitted",
        description: "Your solution passed all test cases!",
        variant: "default",
      });
    }, 2000);
  };

  const handleSelectProblem = (problem) => {
    // Convert difficulty to expected format if needed
    const typeSafeProblem = {
      ...problem,
      difficulty: problem.difficulty === "easy" ? "easy" : 
                  problem.difficulty === "medium" ? "medium" : 
                  problem.difficulty === "hard" ? "hard" : "easy"
    };
    
    setCurrentProblem(typeSafeProblem);
    setActiveTab("solve");
    setCode(`// ${problem.title}\n// ${problem.description}\n\nfunction solve(input) {\n  // Your code here\n  \n}\n`);
  };

  const filteredProblems = codingProblems.filter((problem) => {
    const matchesDifficulty = selectedDifficulty === "all" || problem.difficulty === selectedDifficulty;
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Code Lab</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="explore">Explore Problems</TabsTrigger>
            <TabsTrigger value="solve" disabled={!currentProblem}>Solve Problem</TabsTrigger>
            <TabsTrigger value="submissions">My Submissions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="explore" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProblems.map((problem, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleSelectProblem(problem)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{problem.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      problem.difficulty === "easy" ? "bg-green-100 text-green-800" :
                      problem.difficulty === "medium" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {problem.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{problem.description}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Success rate: {problem.successRate}</span>
                    <span>{problem.submissions} submissions</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="solve" className="space-y-6">
            {currentProblem && (
              <>
                <div className="bg-muted p-4 rounded-lg mb-6">
                  <h2 className="text-xl font-semibold mb-2">{currentProblem.title}</h2>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      currentProblem.difficulty === "easy" ? "bg-green-100 text-green-800" :
                      currentProblem.difficulty === "medium" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {currentProblem.difficulty}
                    </span>
                    <span className="text-sm text-gray-600">Time limit: {currentProblem.timeLimit}</span>
                  </div>
                  <p className="mb-4">{currentProblem.description}</p>
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Constraints:</h3>
                    <p className="text-sm text-gray-700">{currentProblem.constraints}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Examples:</h3>
                    <div className="space-y-3">
                      {currentProblem.examples.map((example, idx) => (
                        <div key={idx} className="bg-background p-3 rounded border">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-xs font-semibold">Input:</span>
                              <pre className="text-xs bg-muted p-2 rounded mt-1">{example.input}</pre>
                            </div>
                            <div>
                              <span className="text-xs font-semibold">Output:</span>
                              <pre className="text-xs bg-muted p-2 rounded mt-1">{example.output}</pre>
                            </div>
                          </div>
                          {example.explanation && (
                            <div className="mt-2">
                              <span className="text-xs font-semibold">Explanation:</span>
                              <p className="text-xs mt-1">{example.explanation}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4 flex justify-between items-center">
                      <h3 className="font-semibold">Code Editor</h3>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="java">Java</SelectItem>
                          <SelectItem value="cpp">C++</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <CodeEditor
                        code={code}
                        language={language}
                        onChange={setCode}
                        height="400px"
                      />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button 
                        onClick={handleRunCode} 
                        disabled={isRunning}
                        className="flex-1"
                      >
                        {isRunning ? "Running..." : "Run Code"}
                      </Button>
                      <Button 
                        onClick={handleSubmitCode} 
                        disabled={isRunning}
                        variant="default"
                        className="flex-1"
                      >
                        {isRunning ? "Submitting..." : "Submit Solution"}
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">Output</h3>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button variant="outline" size="sm">Get Hint</Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <h4 className="font-semibold mb-2">Hint</h4>
                          <p className="text-sm">Try approaching this problem using a {currentProblem.hintTopic} approach.</p>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <div className="bg-black text-green-400 font-mono p-4 rounded-lg h-[400px] overflow-auto">
                      {isRunning ? (
                        <div className="flex flex-col items-center justify-center h-full">
                          <p className="mb-2">Running your code...</p>
                          <Progress value={45} className="w-1/2" />
                        </div>
                      ) : output ? (
                        output
                      ) : (
                        <p className="text-gray-500">Code output will appear here...</p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="submissions" className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">My Submissions</h2>
            <div className="border rounded-lg divide-y">
              {mySubmissions.map((submission, index) => (
                <div key={index} className="p-4 hover:bg-muted/50">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">{submission.problemTitle}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      submission.status === "Accepted" ? "bg-green-100 text-green-800" :
                      submission.status === "Wrong Answer" ? "bg-red-100 text-red-800" :
                      "bg-yellow-100 text-yellow-800"
                    }`}>
                      {submission.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 text-sm text-gray-600">
                    <div>Language: {submission.language}</div>
                    <div>Runtime: {submission.runtime}</div>
                    <div className="text-right">{submission.submittedAt}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

// Sample data for coding problems
const codingProblems = [
  {
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    constraints: "2 ≤ nums.length ≤ 10^4, -10^9 ≤ nums[i] ≤ 10^9, -10^9 ≤ target ≤ 10^9",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      }
    ],
    difficulty: "easy",
    timeLimit: "1 second",
    successRate: "72%",
    submissions: 1245,
    hintTopic: "hash table"
  },
  {
    title: "Merge Intervals",
    description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.",
    constraints: "1 ≤ intervals.length ≤ 10^4, intervals[i].length == 2, 0 ≤ starti ≤ endi ≤ 10^4",
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]."
      }
    ],
    difficulty: "medium",
    timeLimit: "2 seconds",
    successRate: "45%",
    submissions: 832,
    hintTopic: "sorting"
  },
  {
    title: "LRU Cache",
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
    constraints: "1 ≤ capacity ≤ 3000, 0 ≤ key ≤ 10^4, 0 ≤ value ≤ 10^5",
    examples: [
      {
        input: "LRUCache lRUCache = new LRUCache(2); lRUCache.put(1, 1); lRUCache.put(2, 2); lRUCache.get(1); lRUCache.put(3, 3); lRUCache.get(2); lRUCache.put(4, 4); lRUCache.get(1); lRUCache.get(3); lRUCache.get(4);",
        output: "[1,-1,3,4]",
        explanation: "Cache with capacity 2, operations return [get(1), get(2), get(3), get(4)]"
      }
    ],
    difficulty: "hard",
    timeLimit: "3 seconds",
    successRate: "27%",
    submissions: 492,
    hintTopic: "hash map and linked list"
  }
];

// Sample data for submissions
const mySubmissions = [
  {
    problemTitle: "Two Sum",
    status: "Accepted",
    language: "JavaScript",
    runtime: "92ms",
    submittedAt: "2 days ago"
  },
  {
    problemTitle: "Valid Parentheses",
    status: "Wrong Answer",
    language: "Python",
    runtime: "N/A",
    submittedAt: "5 days ago"
  },
  {
    problemTitle: "Merge Intervals",
    status: "Time Limit Exceeded",
    language: "Java",
    runtime: "N/A",
    submittedAt: "1 week ago"
  },
  {
    problemTitle: "Two Sum",
    status: "Accepted",
    language: "C++",
    runtime: "78ms",
    submittedAt: "3 weeks ago"
  }
];

export default CodeLab;
