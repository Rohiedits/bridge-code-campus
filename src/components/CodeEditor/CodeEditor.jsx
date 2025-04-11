
import { useState, useEffect } from "react";
import { Play, Save, Code, FileEdit, Film, Lock, List, Copy, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const CodeEditor = ({
  initialCode = "// Write your code here\n\n",
  problem,
  readOnly = false,
  code: externalCode,
  language: externalLanguage,
  onChange,
  height,
}) => {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("code");
  const { toast } = useToast();

  // Use external value if provided
  useEffect(() => {
    if (externalCode !== undefined) {
      setCode(externalCode);
    }
  }, [externalCode]);

  useEffect(() => {
    if (externalLanguage !== undefined) {
      setLanguage(externalLanguage);
    }
  }, [externalLanguage]);

  // Handle internal code changes
  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (onChange) {
      onChange(newCode);
    }
  };

  // Mock language options
  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
  ];

  // Syntax highlighting simulation (in a real app, you'd use a library like Prism or CodeMirror)
  useEffect(() => {
    // This is just a placeholder. In a real implementation, you'd use a proper
    // code editor library that handles syntax highlighting.
  }, [code, language]);

  // Mock function to run code (in a real app, you'd call an API)
  const runCode = () => {
    setIsRunning(true);
    setOutput(""); // Clear previous output
    
    // Simulate code execution with a delay
    setTimeout(() => {
      // Fake execution result
      if (code.trim() === "") {
        setOutput("// No code to execute");
      } else if (code.includes("console.log") || code.includes("print")) {
        setOutput("Hello, Campus Bridge!\nYour code executed successfully.");
      } else {
        setOutput("// Your code ran but produced no output.\n// Try adding console.log() or print statements.");
      }
      setIsRunning(false);
      
      toast({
        title: "Code executed",
        description: "Your code ran successfully with no errors.",
      });
    }, 1500);
  };

  // Mock function to save code
  const saveCode = () => {
    toast({
      title: "Code saved",
      description: "Your code has been saved successfully.",
    });
  };

  // Change code template based on selected language
  useEffect(() => {
    if (code === initialCode) {
      switch (language) {
        case "javascript":
          setCode("// JavaScript Example\nconsole.log('Hello, Campus Bridge!');\n");
          break;
        case "python":
          setCode("# Python Example\nprint('Hello, Campus Bridge!')\n");
          break;
        case "java":
          setCode("// Java Example\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, Campus Bridge!\");\n  }\n}\n");
          break;
        case "cpp":
          setCode("// C++ Example\n#include <iostream>\n\nint main() {\n  std::cout << \"Hello, Campus Bridge!\" << std::endl;\n  return 0;\n}\n");
          break;
        case "csharp":
          setCode("// C# Example\nusing System;\n\nclass Program {\n  static void Main() {\n    Console.WriteLine(\"Hello, Campus Bridge!\");\n  }\n}\n");
          break;
        default:
          setCode("// Write your code here\n\n");
      }
    }
  }, [language, initialCode]);

  return (
    <div className="rounded-lg border bg-card h-full flex flex-col" style={{ height: height }}>
      <div className="p-4 border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            {problem ? (
              <div>
                <h3 className="text-lg font-semibold truncate">{problem.title}</h3>
                <div className="flex items-center space-x-3 mt-1">
                  <Badge 
                    variant="outline"
                    className={
                      problem.difficulty === "easy" 
                        ? "bg-green-100 text-green-800 border-green-200" 
                        : problem.difficulty === "medium"
                        ? "bg-amber-100 text-amber-800 border-amber-200"
                        : "bg-red-100 text-red-800 border-red-200"
                    }
                  >
                    {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                  </Badge>
                  
                  {problem.timeLimit && (
                    <span className="text-xs flex items-center text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {problem.timeLimit}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <h3 className="text-lg font-semibold">Code Editor</h3>
            )}
          </div>
          
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Select 
              value={language} 
              onValueChange={setLanguage}
              disabled={readOnly}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={saveCode}
              disabled={readOnly}
            >
              <Save className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="default" 
              size="sm" 
              className="gap-1"
              onClick={runCode}
              disabled={isRunning || readOnly}
            >
              {isRunning ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Running
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> Run
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x">
        {/* Problem description panel (if problem provided) */}
        {problem && (
          <div className="w-full md:w-2/5 overflow-auto p-4">
            <Tabs defaultValue="description">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="constraints">Constraints</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="prose prose-sm mt-4 max-w-none">
                <div className="text-sm whitespace-pre-line">
                  {problem.description}
                </div>
              </TabsContent>
              
              <TabsContent value="examples" className="mt-4">
                {problem.examples?.map((example, index) => (
                  <Card key={index} className="mb-4 p-3 text-sm">
                    <div className="font-semibold mb-1">Example {index + 1}:</div>
                    <div className="grid grid-cols-1 gap-2">
                      <div>
                        <div className="text-xs font-medium mb-1">Input:</div>
                        <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                          {example.input}
                        </pre>
                      </div>
                      <div>
                        <div className="text-xs font-medium mb-1">Output:</div>
                        <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">
                          {example.output}
                        </pre>
                      </div>
                      {example.explanation && (
                        <div>
                          <div className="text-xs font-medium mb-1">Explanation:</div>
                          <div className="text-xs text-muted-foreground">
                            {example.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="constraints" className="mt-4">
                <div className="text-sm whitespace-pre-line">
                  {problem.constraints}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
        
        <div className={`flex-1 flex flex-col ${problem ? 'md:w-3/5' : 'w-full'}`}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="border-b px-4">
              <TabsList className="mt-2">
                <TabsTrigger value="code" className="flex gap-1">
                  <Code className="h-4 w-4" /> Code
                </TabsTrigger>
                <TabsTrigger value="output" className="flex gap-1">
                  <FileEdit className="h-4 w-4" /> Output
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="code" className="flex-1 p-0 m-0">
              <div className="relative h-full">
                {readOnly && (
                  <div className="absolute top-2 right-2 z-10">
                    <div className="flex items-center bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                      <Lock className="h-3 w-3 mr-1" /> Read Only
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-1"
                        onClick={() => {
                          navigator.clipboard.writeText(code);
                          toast({
                            title: "Code copied",
                            description: "Code has been copied to clipboard.",
                          });
                        }}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
                <Textarea
                  value={code}
                  onChange={handleCodeChange}
                  className="font-mono text-sm h-full resize-none rounded-none p-4 focus-visible:ring-0 border-0"
                  placeholder="Write your code here..."
                  readOnly={readOnly}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="output" className="flex-1 p-0 m-0">
              <div className="bg-muted h-full p-4 font-mono text-sm whitespace-pre-wrap overflow-auto">
                {output || "// Run your code to see output"}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Importing locally to avoid circular dependency
const Badge = ({ 
  children, 
  className = "", 
  variant = "default" 
}) => {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  };
  
  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default CodeEditor;
