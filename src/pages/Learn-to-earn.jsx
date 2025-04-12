
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Badge, Form, Alert, Navbar, Nav, ProgressBar, Modal, ListGroup, Tab, Tabs } from 'react-bootstrap';

// Mock data for questions
const questionBank = {
  python: {
    easy: [
      {
        id: 1,
        question: "Write a function that returns the sum of two numbers.",
        testCases: [
          { input: "2, 3", expectedOutput: "5" },
          { input: "-1, 1", expectedOutput: "0" }
        ],
        solution: "def sum_numbers(a, b):\n    return a + b"
      },
      {
        id: 2,
        question: "Write a function to check if a string is a palindrome.",
        testCases: [
          { input: "'racecar'", expectedOutput: "True" },
          { input: "'hello'", expectedOutput: "False" }
        ],
        solution: "def is_palindrome(string):\n    return string == string[::-1]"
      },
      {
        id: 3,
        question: "Create a function that returns the length of a string.",
        testCases: [
          { input: "'hello'", expectedOutput: "5" },
          { input: "''", expectedOutput: "0" }
        ],
        solution: "def string_length(string):\n    return len(string)"
      }
    ],
    medium: [
      {
        id: 4,
        question: "Write a function that counts the frequency of each character in a string.",
        testCases: [
          { input: "'hello'", expectedOutput: "{'h': 1, 'e': 1, 'l': 2, 'o': 1}" },
          { input: "'aaa'", expectedOutput: "{'a': 3}" }
        ],
        solution: "def char_frequency(string):\n    freq = {}\n    for char in string:\n        if char in freq:\n            freq[char] += 1\n        else:\n            freq[char] = 1\n    return freq"
      },
      {
        id: 5,
        question: "Create a function to find the second largest number in a list.",
        testCases: [
          { input: "[1, 2, 3, 4, 5]", expectedOutput: "4" },
          { input: "[5, 5, 4, 3, 2]", expectedOutput: "4" }
        ],
        solution: "def second_largest(lst):\n    unique = sorted(set(lst), reverse=True)\n    return unique[1] if len(unique) > 1 else None"
      },
      {
        id: 6,
        question: "Write a function that returns all prime numbers up to n.",
        testCases: [
          { input: "10", expectedOutput: "[2, 3, 5, 7]" },
          { input: "20", expectedOutput: "[2, 3, 5, 7, 11, 13, 17, 19]" }
        ],
        solution: "def primes_up_to_n(n):\n    primes = []\n    for i in range(2, n+1):\n        is_prime = True\n        for j in range(2, int(i**0.5) + 1):\n            if i % j == 0:\n                is_prime = False\n                break\n        if is_prime:\n            primes.append(i)\n    return primes"
      }
    ],
    hard: [
      {
        id: 7,
        question: "Implement a function that performs binary search on a sorted list.",
        testCases: [
          { input: "[1, 2, 3, 4, 5], 3", expectedOutput: "2" },
          { input: "[1, 2, 3, 4, 5], 6", expectedOutput: "-1" }
        ],
        solution: "def binary_search(arr, target):\n    low = 0\n    high = len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1"
      },
      {
        id: 8,
        question: "Write a function to check if a given binary tree is balanced.",
        testCases: [
          { input: "Test case not available for trees", expectedOutput: "n/a" }
        ],
        solution: "def is_balanced(root):\n    def check_height(node):\n        if not node:\n            return 0\n        left_height = check_height(node.left)\n        if left_height == -1:\n            return -1\n        right_height = check_height(node.right)\n        if right_height == -1:\n            return -1\n        if abs(left_height - right_height) > 1:\n            return -1\n        return max(left_height, right_height) + 1\n    return check_height(root) != -1"
      },
      {
        id: 9,
        question: "Implement a function that solves the 'N-Queens' problem.",
        testCases: [
          { input: "4", expectedOutput: "[['.Q..', '...Q', 'Q...', '..Q.'], ['..Q.', 'Q...', '...Q', '.Q..']]" }
        ],
        solution: "def n_queens(n):\n    def is_valid(board, row, col):\n        # Check column\n        for i in range(row):\n            if board[i][col] == 'Q':\n                return False\n        # Check upper left diagonal\n        for i, j in zip(range(row-1, -1, -1), range(col-1, -1, -1)):\n            if board[i][j] == 'Q':\n                return False\n        # Check upper right diagonal\n        for i, j in zip(range(row-1, -1, -1), range(col+1, n)):\n            if board[i][j] == 'Q':\n                return False\n        return True\n    \n    def backtrack(row, board):\n        if row == n:\n            result.append([''.join(row) for row in board])\n            return\n        for col in range(n):\n            if is_valid(board, row, col):\n                board[row][col] = 'Q'\n                backtrack(row + 1, board)\n                board[row][col] = '.'\n    \n    result = []\n    empty_board = [['.' for _ in range(n)] for _ in range(n)]\n    backtrack(0, empty_board)\n    return result"
      },
      {
        id: 10,
        question: "Write a function that performs a topological sort on a directed acyclic graph.",
        testCases: [
          { input: "{0: [1, 2], 1: [3], 2: [3], 3: []}", expectedOutput: "[0, 1, 2, 3] or [0, 2, 1, 3]" }
        ],
        solution: "def topological_sort(graph):\n    visited = set()\n    temp = set()\n    order = []\n    \n    def dfs(node):\n        if node in temp:\n            return False  # Not a DAG, has a cycle\n        if node in visited:\n            return True\n        \n        temp.add(node)\n        for neighbor in graph.get(node, []):\n            if not dfs(neighbor):\n                return False\n        \n        temp.remove(node)\n        visited.add(node)\n        order.append(node)\n        return True\n    \n    for node in list(graph.keys()):\n        if node not in visited:\n            if not dfs(node):\n                return []  # Graph has a cycle\n    \n    return order[::-1]"
      }
    ]
  },
  java: {
    easy: [
      {
        id: 1,
        question: "Write a method that returns the sum of two integers.",
        testCases: [
          { input: "2, 3", expectedOutput: "5" },
          { input: "-1, 1", expectedOutput: "0" }
        ],
        solution: "public static int sum(int a, int b) {\n    return a + b;\n}"
      },
      {
        id: 2,
        question: "Write a method to check if a string is a palindrome.",
        testCases: [
          { input: "\"racecar\"", expectedOutput: "true" },
          { input: "\"hello\"", expectedOutput: "false" }
        ],
        solution: "public static boolean isPalindrome(String str) {\n    int left = 0;\n    int right = str.length() - 1;\n    while (left < right) {\n        if (str.charAt(left) != str.charAt(right)) {\n            return false;\n        }\n        left++;\n        right--;\n    }\n    return true;\n}"
      }
    ],
    medium: [
      {
        id: 3,
        question: "Write a method to find the maximum subarray sum.",
        testCases: [
          { input: "[-2, 1, -3, 4, -1, 2, 1, -5, 4]", expectedOutput: "6" }
        ],
        solution: "public static int maxSubArray(int[] nums) {\n    int maxSoFar = nums[0];\n    int maxEndingHere = nums[0];\n    \n    for (int i = 1; i < nums.length; i++) {\n        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);\n        maxSoFar = Math.max(maxSoFar, maxEndingHere);\n    }\n    \n    return maxSoFar;\n}"
      }
    ],
    hard: [
      {
        id: 4,
        question: "Implement a method to perform LRU cache with O(1) operations.",
        testCases: [
          { input: "Complex test case", expectedOutput: "n/a" }
        ],
        solution: "class LRUCache {\n    private Map<Integer, Integer> map;\n    private Deque<Integer> deque;\n    private int capacity;\n    \n    public LRUCache(int capacity) {\n        this.map = new HashMap<>();\n        this.deque = new LinkedList<>();\n        this.capacity = capacity;\n    }\n    \n    public int get(int key) {\n        if (!map.containsKey(key)) {\n            return -1;\n        }\n        \n        deque.remove(key);\n        deque.addFirst(key);\n        \n        return map.get(key);\n    }\n    \n    public void put(int key, int value) {\n        if (map.containsKey(key)) {\n            deque.remove(key);\n        } else if (map.size() >= capacity) {\n            int lastKey = deque.removeLast();\n            map.remove(lastKey);\n        }\n        \n        map.put(key, value);\n        deque.addFirst(key);\n    }\n}"
      }
    ]
  },
  web: {
    easy: [
      {
        id: 1,
        question: "Write HTML to create a button with the text 'Click Me'.",
        testCases: [
          { input: "n/a", expectedOutput: "<button>Click Me</button>" }
        ],
        solution: "<button>Click Me</button>"
      },
      {
        id: 2,
        question: "Write CSS to center a div horizontally.",
        testCases: [
          { input: "n/a", expectedOutput: "margin: 0 auto;" }
        ],
        solution: "margin: 0 auto;"
      }
    ],
    medium: [
      {
        id: 3,
        question: "Write JavaScript code to fetch data from an API and display it.",
        testCases: [
          { input: "n/a", expectedOutput: "n/a" }
        ],
        solution: "fetch('https://api.example.com/data')\n  .then(response => response.json())\n  .then(data => {\n    console.log(data);\n    document.getElementById('result').textContent = JSON.stringify(data);\n  })\n  .catch(error => console.error('Error:', error));"
      }
    ],
    hard: [
      {
        id: 4,
        question: "Create a simple React component that implements a counter with increment and decrement buttons.",
        testCases: [
          { input: "n/a", expectedOutput: "n/a" }
        ],
        solution: "function Counter() {\n  const [count, setCount] = React.useState(0);\n\n  return (\n    <div>\n      <h2>Count: {count}</h2>\n      <button onClick={() => setCount(count + 1)}>Increment</button>\n      <button onClick={() => setCount(count - 1)}>Decrement</button>\n    </div>\n  );\n}"
      }
    ]
  }
};

// Mock users for leaderboard
const initialUsers = [
  { id: 1, username: "Rohith-Dev", points: 2450, badges: ["Gold", "Python Pro", "Battle Winner"] },
  { id: 2, username: "JavaGuru", points: 2200, badges: ["Silver", "Java Expert"] },
  { id: 3, username: "WebWizard", points: 1950, badges: ["Bronze", "Team Player"] },
  { id: 4, username: "AlgorithmAce", points: 1800, badges: ["Bronze", "Quick Solver"] },
  { id: 5, username: "DataNinja", points: 1650, badges: ["Bronze"] }
];

function App() {
  const [screen, setScreen] = useState('welcome');
  const [battleType, setBattleType] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [language, setLanguage] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [opponentCode, setOpponentCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [results, setResults] = useState({ user: 0, opponent: 0 });
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [newBadge, setNewBadge] = useState('');
  const [testResult, setTestResult] = useState({ status: '', message: '' });
  const [user, setUser] = useState({ username: "Player", points: 0, badges: [] });
  const [users, setUsers] = useState(initialUsers);
  const [questions, setQuestions] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState(1);

  // Initialize questions when language and difficulty are selected
  useEffect(() => {
    if (language && difficulty) {
      const availableQuestions = questionBank[language][difficulty];
      // Randomly select 10 questions or use all available if less than 10
      const selectedQuestions = availableQuestions.length <= 10 
        ? [...availableQuestions]
        : [...availableQuestions].sort(() => 0.5 - Math.random()).slice(0, 10);
      
      setQuestions(selectedQuestions);
    }
  }, [language, difficulty]);

  // Timer functionality
  useEffect(() => {
    let timer;
    if (screen === 'battle' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (screen === 'battle' && timeLeft === 0) {
      endBattle();
    }
    return () => clearTimeout(timer);
  }, [screen, timeLeft]);

  // Set up battle
  const startBattle = () => {
    // Set time based on difficulty
    const times = {
      'easy': 300, // 5 minutes
      'medium': 600, // 10 minutes
      'hard': 900 // 15 minutes
    };
    
    setTimeLeft(times[difficulty]);
    setCurrentQuestion(0);
    setUserCode('');
    setOpponentCode('');
    setResults({ user: 0, opponent: 0 });
    setScreen('battle');
  };

  // Simulate opponent solving
  const simulateOpponent = () => {
    // Simulated opponent logic - randomly decides if opponent solves question
    const chanceToSolve = Math.random();
    // Adjust difficulty based on level
    const difficultyFactor = difficulty === 'easy' ? 0.7 : 
                            difficulty === 'medium' ? 0.5 : 0.3;
    
    if (chanceToSolve < difficultyFactor) {
      return { solved: true, code: questions[currentQuestion]?.solution || "// Opponent solved this!" };
    }
    return { solved: false, code: "// Opponent couldn't solve this!" };
  };

  // Run test cases for user code
  const runTests = () => {
    const currentQ = questions[currentQuestion];
    if (!currentQ) {
      setTestResult({ status: 'error', message: 'No question found' });
      return;
    }

    // Very simple "simulation" of code execution - in a real app this would run on a server
    try {
      // For questions 8, 9, 10 which are code challenges
      if (currentQ.id >= 8) {
        // Check if user code is similar to solution (very simplistic check)
        const userCodeSimplified = userCode.replace(/\s+/g, ' ').trim();
        const solutionSimplified = currentQ.solution.replace(/\s+/g, ' ').trim();
        
        const similarityScore = userCodeSimplified.length / solutionSimplified.length;
        
        if (similarityScore > 0.5 && similarityScore < 1.5) {
          setTestResult({ status: 'success', message: 'Test cases passed!' });
          return true;
        } else {
          setTestResult({ status: 'error', message: 'Test cases failed. Try again!' });
          return false;
        }
      }
      
      // For regular quiz questions
      setTestResult({ status: 'success', message: 'Test cases passed!' });
      return true;
    } catch (error) {
      setTestResult({ status: 'error', message: `Error: ${error.message}` });
      return false;
    }
  };

  // Submit answer and move to next question
  const submitAnswer = () => {
    const testPassed = runTests();
    
    if (testPassed) {
      // User solved the question
      setResults(prev => ({ ...prev, user: prev.user + 1 }));
    }
    
    // Simulate opponent
    const opponent = simulateOpponent();
    setOpponentCode(opponent.code);
    
    if (opponent.solved) {
      setResults(prev => ({ ...prev, opponent: prev.opponent + 1 }));
    }
    
    // Move to next question or end battle
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setUserCode('');
        setOpponentCode('');
        setTestResult({ status: '', message: '' });
      }, 1500);
    } else {
      setTimeout(endBattle, 1500);
    }
  };

  // End the battle and calculate results
  const endBattle = () => {
    setScreen('results');
    
    // Calculate points based on difficulty and results
    const difficultyMultiplier = {
      'easy': 10,
      'medium': 20,
      'hard': 30
    };
    
    const pointsEarned = results.user * difficultyMultiplier[difficulty];
    
    // Award badges if applicable
    let newBadgeEarned = '';
    
    if (results.user > results.opponent) {
      newBadgeEarned = 'Battle Winner';
    }
    
    if (results.user >= 8) {
      if (difficulty === 'hard') newBadgeEarned = 'Coding Master';
      else if (difficulty === 'medium') newBadgeEarned = 'Problem Solver';
      else newBadgeEarned = 'Quick Learner';
    }
    
    if (newBadgeEarned && !user.badges.includes(newBadgeEarned)) {
      setNewBadge(newBadgeEarned);
      setShowBadgeModal(true);
      setUser(prev => ({
        ...prev,
        points: prev.points + pointsEarned,
        badges: [...prev.badges, newBadgeEarned]
      }));
    } else {
      setUser(prev => ({
        ...prev,
        points: prev.points + pointsEarned
      }));
    }
    
    // Update leaderboard
    setUsers(prev => {
      const updatedUsers = [...prev];
      const updatedUser = {
        id: prev.length + 1,
        username: user.username,
        points: user.points + pointsEarned,
        badges: user.badges.includes(newBadgeEarned) ? 
          user.badges : 
          newBadgeEarned ? [...user.badges, newBadgeEarned] : user.badges
      };
      
      // Add user to leaderboard if not already there
      if (!prev.some(u => u.username === user.username)) {
        updatedUsers.push(updatedUser);
      } else {
        // Update existing user
        const index = prev.findIndex(u => u.username === user.username);
        updatedUsers[index] = updatedUser;
      }
      
      // Sort by points
      return updatedUsers.sort((a, b) => b.points - a.points);
    });
  };

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Reset to home screen
  const goHome = () => {
    setScreen('welcome');
    setBattleType('');
    setDifficulty('');
    setLanguage('');
  };

  return (
    <Container fluid className="p-0">
      {/* Navigation */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#" onClick={goHome}>
            <span role="img" aria-label="sword">⚔️</span> Code Battle Arena
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" onClick={goHome}>Home</Nav.Link>
              <Nav.Link href="#" onClick={() => setScreen('leaderboard')}>Leaderboard</Nav.Link>
              <Nav.Link href="#" onClick={() => setScreen('profile')}>Profile</Nav.Link>
            </Nav>
            {user.username !== "Player" && (
              <Navbar.Text>
                Signed in as: <span className="text-light">{user.username}</span>
                <Badge bg="warning" className="ms-2">
                  {user.points} pts
                </Badge>
              </Navbar.Text>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="py-4">
        {/* Welcome Screen */}
        {screen === 'welcome' && (
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="shadow-lg">
                <Card.Body className="text-center">
                  <h1 className="mb-4">Welcome to Code Battle Arena!</h1>
                  <p className="lead">
                    Challenge other developers in real-time coding duels.
                    Test your skills, solve problems under pressure, and climb the leaderboard!
                  </p>
                  
                  {!user.username || user.username === "Player" ? (
                    <Form className="mb-4">
                      <Form.Group className="mb-3">
                        <Form.Label>Enter Any One Number to begin:</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Username" 
                          value={user.username}
                          onChange={(e) => 
                            setUser({...user, username: e.target.value})}
                        />
                        {/* <Form.Control
                          type="text"
                          placeholder="username"
                          value={user.username || ""}
                          onChange={(e) => setUser({...user, username: e.target.value})}
                        /> */}
                      </Form.Group>
                      <Button 
                        variant="primary" 
                        onClick={() => setScreen('battle-setup')}
                        disabled={!user.username || user.username === "Player" || user.username.trim() === ""}
                      >
                        Start Battle
                      </Button>
                    </Form>
                  ) : (
                    <Button 
                      variant="primary" 
                      size="lg" 
                      onClick={() => setScreen('battle-setup')}
                      className="mb-4"
                    >
                      Start Battle
                    </Button>
                  )}
                  
                  <Row>
                    <Col md={4}>
                      <Card className="h-100">
                        <Card.Body>
                          <h3>1v1 Battles</h3>
                          <p>Face off against another coder on random coding problems.</p>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card className="h-100">
                        <Card.Body>
                          <h3>Team Battles</h3>
                          <p>Join forces with a friend and compete against another team.</p>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card className="h-100">
                        <Card.Body>
                          <h3>AI Battle Mode</h3>
                          <p>If no opponent is available, battle against an AI-powered opponent.</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Battle Setup Screen */}
        {screen === 'battle-setup' && (
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="shadow">
                <Card.Header>
                  <h2>Battle Setup</h2>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-4">
                      <Form.Label>Battle Type</Form.Label>
                      <Row>
                        <Col md={4}>
                          <Card 
                            className={`h-100 ${battleType === '1v1' ? 'border-primary' : ''}`}
                            onClick={() => setBattleType('1v1')}
                            style={{ cursor: 'pointer' }}
                          >
                            <Card.Body className="text-center">
                              <h4>1v1 Battle</h4>
                              <p>You vs. Opponent</p>
                              {battleType === '1v1' && <Badge bg="primary">Selected</Badge>}
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={4}>
                          <Card 
                            className={`h-100 ${battleType === 'team' ? 'border-primary' : ''}`}
                            onClick={() => setBattleType('team')}
                            style={{ cursor: 'pointer' }}
                          >
                            <Card.Body className="text-center">
                              <h4>Team Battle</h4>
                              <p>Form a team</p>
                              {battleType === 'team' && <Badge bg="primary">Selected</Badge>}
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={4}>
                          <Card 
                            className={`h-100 ${battleType === 'ai' ? 'border-primary' : ''}`}
                            onClick={() => setBattleType('ai')}
                            style={{ cursor: 'pointer' }}
                          >
                            <Card.Body className="text-center">
                              <h4>AI Battle</h4>
                              <p>Play against AI</p>
                              {battleType === 'ai' && <Badge bg="primary">Selected</Badge>}
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Form.Group>

                    {battleType === 'team' && (
                      <Form.Group className="mb-4">
                        <Form.Label>Team Setup</Form.Label>
                        <Row className="mb-3">
                          <Col>
                            <Form.Control 
                              type="text" 
                              placeholder="Team Name" 
                              value={teamName}
                              onChange={(e) => setTeamName(e.target.value)}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Label>Team Size</Form.Label>
                            <Form.Select 
                              value={teamMembers} 
                              onChange={(e) => setTeamMembers(Number(e.target.value))}
                            >
                              <option value={1}>1 Member (Solo)</option>
                              <option value={2}>2 Members</option>
                              <option value={3}>3 Members</option>
                            </Form.Select>
                          </Col>
                        </Row>
                      </Form.Group>
                    )}

                    <Form.Group className="mb-4">
                      <Form.Label>Programming Language</Form.Label>
                      <Row>
                        <Col md={4}>
                          <Card 
                            className={`h-100 ${language === 'python' ? 'border-primary' : ''}`}
                            onClick={() => setLanguage('python')}
                            style={{ cursor: 'pointer' }}
                          >
                            <Card.Body className="text-center">
                              <h4>Python</h4>
                              {language === 'python' && <Badge bg="primary">Selected</Badge>}
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={4}>
                          <Card 
                            className={`h-100 ${language === 'java' ? 'border-primary' : ''}`}
                            onClick={() => setLanguage('java')}
                            style={{ cursor: 'pointer' }}
                          >
                            <Card.Body className="text-center">
                              <h4>Java</h4>
                              {language === 'java' && <Badge bg="primary">Selected</Badge>}
                            </Card.Body>
                          </Card>

                          </Col>
                        <Col md={4}>
                          <Card 
                            className={`h-100 ${language === 'web' ? 'border-primary' : ''}`}
                            onClick={() => setLanguage('web')}
                            style={{ cursor: 'pointer' }}
                          >
                            <Card.Body className="text-center">
                              <h4>Web (HTML/CSS/JS)</h4>
                              {language === 'web' && <Badge bg="primary">Selected</Badge>}
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Difficulty Level</Form.Label>
                      <Row>
                        <Col md={4}>
                          <Card 
                            className={`h-100 ${difficulty === 'easy' ? 'border-primary' : ''}`}
                            onClick={() => setDifficulty('easy')}
                            style={{ cursor: 'pointer' }}
                          >
                            <Card.Body className="text-center">
                              <h4>Easy</h4>
                              <p>5 minute time limit</p>
                              {difficulty === 'easy' && <Badge bg="primary">Selected</Badge>}
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={4}>
                          <Card 
                            className={`h-100 ${difficulty === 'medium' ? 'border-primary' : ''}`}
                            onClick={() => setDifficulty('medium')}
                            style={{ cursor: 'pointer' }}
                          >
                            <Card.Body className="text-center">
                              <h4>Medium</h4>
                              <p>10 minute time limit</p>
                              {difficulty === 'medium' && <Badge bg="primary">Selected</Badge>}
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={4}>
                          <Card 
                            className={`h-100 ${difficulty === 'hard' ? 'border-primary' : ''}`}
                            onClick={() => setDifficulty('hard')}
                            style={{ cursor: 'pointer' }}
                          >
                            <Card.Body className="text-center">
                              <h4>Hard</h4>
                              <p>15 minute time limit</p>
                              {difficulty === 'hard' && <Badge bg="primary">Selected</Badge>}
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Form.Group>

                    <div className="d-grid gap-2">
                      <Button 
                        variant="success" 
                        size="lg" 
                        onClick={startBattle}
                        disabled={!battleType || !difficulty || !language}
                      >
                        Start Battle
                      </Button>
                      <Button 
                        variant="secondary" 
                        onClick={goHome}
                      >
                        Back
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Battle Screen */}
        {screen === 'battle' && (
          <Row>
            <Col md={12}>
              <Card className="shadow mb-4">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2>
                      {battleType === '1v1' ? '1v1 Battle' : 
                       battleType === 'team' ? 'Team Battle' : 'AI Battle'}
                    </h2>
                    <Badge bg="info">{language}</Badge>{' '}
                    <Badge bg={difficulty === 'easy' ? 'success' : 
                             difficulty === 'medium' ? 'warning' : 'danger'}>
                      {difficulty}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <h4>Time Left: <span className={timeLeft < 60 ? 'text-danger' : ''}>{formatTime(timeLeft)}</span></h4>
                    <ProgressBar 
                      now={timeLeft} 
                      max={difficulty === 'easy' ? 300 : difficulty === 'medium' ? 600 : 900}
                      variant={timeLeft < 60 ? 'danger' : 'primary'}
                    />
                  </div>
                  <div>
                    <h5>Question {currentQuestion + 1} of {questions.length}</h5>
                    <div>
                      You: <Badge bg="success">{results.user}</Badge>{' '}
                      Opponent: <Badge bg="danger">{results.opponent}</Badge>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Row className="mb-4">
                    <Col>
                      <Card>
                        <Card.Header>
                          <h4>Problem</h4>
                        </Card.Header>
                        <Card.Body>
                          <h5>{questions[currentQuestion]?.question || 'Loading question...'}</h5>
                          {questions[currentQuestion]?.testCases && (
                            <div className="mt-3">
                              <h6>Test Cases:</h6>
                              <ListGroup>
                                {questions[currentQuestion].testCases.map((test, idx) => (
                                  <ListGroup.Item key={idx}>
                                    <strong>Input:</strong> {test.input}<br />
                                    <strong>Expected Output:</strong> {test.expectedOutput}
                                  </ListGroup.Item>
                                ))}
                              </ListGroup>
                            </div>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Card>
                        <Card.Header className="bg-primary text-white">
                          <h4>{user.username}'s Code</h4>
                        </Card.Header>
                        <Card.Body className="p-0">
                          <Form.Control 
                            as="textarea" 
                            rows={15}
                            placeholder="Write your code here..."
                            value={userCode}
                            onChange={(e) => setUserCode(e.target.value)}
                            style={{ 
                              fontFamily: 'monospace', 
                              fontSize: '0.9rem',
                              border: 'none',
                              borderRadius: '0',
                              height: '100%',
                              resize: 'none'
                            }}
                          />
                        </Card.Body>
                        <Card.Footer>
                          {testResult.status && (
                            <Alert 
                              variant={testResult.status === 'success' ? 'success' : 'danger'}
                              className="mb-2"
                            >
                              {testResult.message}
                            </Alert>
                          )}
                          <div className="d-flex justify-content-between">
                            <Button 
                              variant="warning" 
                              onClick={() => runTests()}
                            >
                              Run Tests
                            </Button>
                            <Button 
                              variant="success" 
                              onClick={submitAnswer}
                            >
                              Submit & Next Question
                            </Button>
                          </div>
                        </Card.Footer>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card>
                        <Card.Header className="bg-danger text-white">
                          <h4>Opponent's Code</h4>
                        </Card.Header>
                        <Card.Body className="p-0">
                          <Form.Control 
                            as="textarea" 
                            rows={15}
                            placeholder="Opponent is working on their solution..."
                            value={opponentCode}
                            readOnly
                            style={{ 
                              fontFamily: 'monospace', 
                              fontSize: '0.9rem',
                              border: 'none',
                              borderRadius: '0',
                              height: '100%',
                              resize: 'none',
                              backgroundColor: '#f8f9fa'
                            }}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Results Screen */}
        {screen === 'results' && (
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="shadow text-center">
                <Card.Header>
                  <h2>Battle Results</h2>
                </Card.Header>
                <Card.Body>
                  <h3 className="mb-4">
                    {results.user > results.opponent 
                      ? 'You Won! 🏆' 
                      : results.user === results.opponent 
                        ? 'It\'s a Tie! 🤝' 
                        : 'You Lost! 😢'}
                  </h3>
                  
                  <Row className="mb-4">
                    <Col>
                      <Card className="bg-light">
                        <Card.Body>
                          <h4>{user.username}</h4>
                          <h1>{results.user}</h1>
                          <p>questions solved</p>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col className="d-flex align-items-center justify-content-center">
                      <h2>VS</h2>
                    </Col>
                    <Col>
                      <Card className="bg-light">
                        <Card.Body>
                          <h4>Opponent</h4>
                          <h1>{results.opponent}</h1>
                          <p>questions solved</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  
                  <div className="mb-4">
                    <h4>You earned:</h4>
                    <h3>
                      <Badge bg="warning" className="me-2">
                        +{results.user * (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30)} points
                      </Badge>
                    </h3>
                  </div>
                  
                  <div className="d-grid gap-2">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      onClick={() => setScreen('battle-setup')}
                    >
                      Play Again
                    </Button>
                    <Button 
                      variant="outline-primary" 
                      onClick={() => setScreen('leaderboard')}
                    >
                      View Leaderboard
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={goHome}
                    >
                      Return to Home
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Leaderboard Screen */}
        {screen === 'leaderboard' && (
          <Row className="justify-content-center">
            <Col md={10}>
              <Card className="shadow">
                <Card.Header>
                  <h2>Leaderboard</h2>
                </Card.Header>
                <Card.Body>
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Points</th>
                        <th>Badges</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u, index) => (
                        <tr key={u.id} className={u.username === user.username ? 'table-primary' : ''}>
                          <td>{index + 1}</td>
                          <td>{u.username}</td>
                          <td>{u.points}</td>
                          <td>
                            {u.badges.map((badge, idx) => (
                              <Badge 
                                key={idx} 
                                bg={badge.includes('Gold') ? 'warning' : 
                                    badge.includes('Silver') ? 'secondary' : 
                                    badge.includes('Bronze') ? 'danger' : 'info'}
                                className="me-1"
                              >
                                {badge}
                              </Badge>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <div className="text-center mt-3">
                    <Button variant="primary" onClick={goHome}>Back to Home</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Profile Screen */}
        {screen === 'profile' && (
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="shadow">
                <Card.Header>
                  <h2>Your Profile</h2>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={4} className="text-center">
                      <div 
                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                        style={{ width: '150px', height: '150px', fontSize: '4rem' }}
                      >
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <h3>{user.username}</h3>
                      <h4>
                        <Badge bg="warning">{user.points} points</Badge>
                      </h4>
                    </Col>
                    <Col md={8}>
                      <h4>Your Badges</h4>
                      <div className="mb-4">
                        {user.badges.length > 0 ? (
                          user.badges.map((badge, idx) => (
                            <Badge 
                              key={idx} 
                              bg={badge.includes('Gold') ? 'warning' : 
                                  badge.includes('Silver') ? 'secondary' : 
                                  badge.includes('Bronze') ? 'danger' : 'info'}
                              className="me-2 mb-2 p-2"
                              style={{ fontSize: '1rem' }}
                            >
                              {badge}
                            </Badge>
                          ))
                        ) : (
                          <p>No badges earned yet. Win battles to earn badges!</p>
                        )}
                      </div>
                      
                      <h4>Battle Statistics</h4>
                      <ListGroup className="mb-4">
                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                          Total Points
                          <Badge bg="primary" pill>{user.points}</Badge>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                          Badges Earned
                          <Badge bg="primary" pill>{user.badges.length}</Badge>
                        </ListGroup.Item>
                      </ListGroup>
                      
                      <div className="d-grid gap-2">
                        <Button 
                          variant="success" 
                          size="lg" 
                          onClick={() => setScreen('battle-setup')}
                        >
                          Start New Battle
                        </Button>
                        <Button 
                          variant="outline-primary" 
                          onClick={() => setScreen('leaderboard')}
                        >
                          View Leaderboard
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>

      {/* Footer */}
      {/* <footer className="bg-dark text-white text-center py-3 mt-4">
        <Container>
          <p className="mb-0">© 2025 Code-Charge | Code Battle Arena | The ultimate platform for coding challenges</p>
        </Container>
      </footer> */}

      {/* Badge Earned Modal */}
      <Modal show={showBadgeModal} onHide={() => setShowBadgeModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Badge Earned!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div 
            className="bg-warning text-dark rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
            style={{ width: '100px', height: '100px', fontSize: '3rem' }}
          >
            🏆
          </div>
          <h3>Congratulations!</h3>
          <p className="lead">You've earned a new badge:</p>
          <h4>
            <Badge 
              bg={newBadge.includes('Gold') ? 'warning' : 
                 newBadge.includes('Silver') ? 'secondary' : 
                 newBadge.includes('Bronze') ? 'danger' : 'info'}
              className="p-2"
            >
              {newBadge}
            </Badge>
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowBadgeModal(false)}>
            Awesome!
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

// A simple Table component since it's not imported earlier
function Table({ striped, hover, children }) {
  return (
    <table className={`table ${striped ? 'table-striped' : ''} ${hover ? 'table-hover' : ''}`}>
      {children}
    </table>
  );
}

export default App;