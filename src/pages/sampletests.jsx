import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Badge, Form, Alert, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const OnlineTestApp = () => {
  // Test state
  const [currentSection, setCurrentSection] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [testFinished, setTestFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  
  // Modal for test completion confirmation
  const [showFinishModal, setShowFinishModal] = useState(false);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Timer effect
  useEffect(() => {
    let timer;
    if (currentSection === 'test' && !testFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setTestFinished(true);
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(timer);
  }, [currentSection, testFinished, timeLeft]);
  
  // Questions data
  const questions = [
    // Logical Reasoning Questions
    {
      id: 1,
      category: 'Logical Reasoning',
      question: 'If the square of 18 is 324, and the square root of 81 is 9, which of the following is the square root of 225?',
      options: ['12', '13', '14', '15'],
      correctAnswer: '15'
    },
    {
      id: 2,
      category: 'Logical Reasoning',
      question: 'If all roses are flowers and some flowers fade quickly, then:',
      options: [
        'All roses fade quickly', 
        'Some roses fade quickly', 
        'No roses fade quickly', 
        'Cannot be determined from the given information'
      ],
      correctAnswer: 'Cannot be determined from the given information'
    },
    {
      id: 3,
      category: 'Logical Reasoning',
      question: 'What comes next in the sequence: 2, 6, 12, 20, 30, ?',
      options: ['40', '42', '44', '36'],
      correctAnswer: '42'
    },
    {
      id: 4,
      category: 'Logical Reasoning',
      question: 'If FRIEND is coded as GSJFOE, then how is CANDLE coded?',
      options: ['DBOEFM', 'DBOEM', 'DBOEMF', 'DCOEMF'],
      correctAnswer: 'DBOEMF'
    },
    {
      id: 5,
      category: 'Logical Reasoning',
      question: 'A person who lives in Delhi is not a thief. Some thieves are rich. Which of the following conclusions can be drawn from these statements?',
      options: [
        'Some rich people live in Delhi', 
        'No person living in Delhi is rich', 
        'Some rich people are not from Delhi', 
        'None of the above'
      ],
      correctAnswer: 'None of the above'
    },
    {
      id: 6,
      category: 'Logical Reasoning',
      question: 'If water is called black, black is called tree, tree is called blue, blue is called rain, rain is called green, then what is the color of sky?',
      options: ['Blue', 'Green', 'Rain', 'Tree'],
      correctAnswer: 'Rain'
    },
    {
      id: 7,
      category: 'Logical Reasoning',
      question: 'If 10 + 10 = 5, 20 + 20 = 10, and 30 + 30 = 15, then what is 40 + 40?',
      options: ['20', '40', '80', '160'],
      correctAnswer: '20'
    },
    // Python Questions
    {
      id: 8,
      category: 'Python',
      question: 'What is the output of: print(3 * 4 ** 2)?',
      options: ['144', '48', '24', '16'],
      correctAnswer: '48'
    },
    {
      id: 9,
      category: 'Python',
      question: 'Which of the following is not a valid variable name in Python?',
      options: ['my_var', '_count', '2names', 'firstName'],
      correctAnswer: '2names'
    },
    {
      id: 10,
      category: 'Python',
      question: 'What will be the output of the following code?\n\nx = [1, 2, 3]\ny = x\ny.append(4)\nprint(x)',
      options: ['[1, 2, 3]', '[1, 2, 3, 4]', '[4, 1, 2, 3]', 'Error'],
      correctAnswer: '[1, 2, 3, 4]'
    },
    {
      id: 11,
      category: 'Python',
      question: 'Which method is used to add an element at the end of a list in Python?',
      options: ['add()', 'append()', 'extend()', 'insert()'],
      correctAnswer: 'append()'
    },
    {
      id: 12,
      category: 'Python',
      question: 'What is the result of: "Hello" + "World"?',
      options: ['"HelloWorld"', '"Hello World"', 'Error', 'None of the above'],
      correctAnswer: '"HelloWorld"'
    },
    {
      id: 13,
      category: 'Python',
      question: 'Which of the following is the correct way to create a dictionary in Python?',
      options: [
        '{"name": "John", "age": 30}', 
        '{name = "John", age = 30}', 
        '{name: "John", age: 30}', 
        '["name" = "John", "age" = 30]'
      ],
      correctAnswer: '{"name": "John", "age": 30}'
    },
    {
      id: 14,
      category: 'Python',
      question: 'What is the output of: print(list(filter(lambda x: x > 5, [2, 10, 8, 7, 5, 4])))?',
      options: ['[10, 8, 7]', '[2, 4, 5]', '[10, 8, 7, 5]', 'Error'],
      correctAnswer: '[10, 8, 7]'
    },
      {
    id: 30,
    category: 'Python',
    question: 'What will be the output of: print(type({}))?',
    options: ["<class 'dict'>", "<class 'set'>", "<class 'list'>", "<class 'tuple'>"],
    correctAnswer: "<class 'dict'>"
  },
  {
    id: 29,
    category: 'Python',
    question: "What is the output of: print(bool('False'))?",
    options: ['True', 'False', 'None', 'Error'],
    correctAnswer: 'True'
  },
  {
    id: 28,
    category: 'Python',
    question: "Which method is used to remove an item from a list by value?",
    options: ['pop()', 'remove()', 'discard()', 'delete()'],
    correctAnswer: 'remove()'
  },
  {
    id: 27,
    category: 'Python',
    question: "What will be the output of: print(2 ** 3 ** 2)?",
    options: ['512', '64', '256', 'Error'],
    correctAnswer: '512'
  },
  {
    id: 26,
    category: 'Python',
    question: "What is the result of: print(' '.join(['Python', 'is', 'awesome']))?",
    options: ["'Python is awesome'", "'Pythonisawesome'", "'Python, is, awesome'", "Error"],
    correctAnswer: "'Python is awesome'"
  },
  {
    id: 25,
    category: 'Python',
    question: "Which of the following is an immutable data type in Python?",
    options: ['List', 'Dictionary', 'Tuple', 'Set'],
    correctAnswer: 'Tuple'
  },
  {
    id: 24,
    category: 'Python',
    question: "What will be the output of: print(len(set([1, 2, 2, 3, 4, 4, 5])))?",
    options: ['7', '5', '6', 'Error'],
    correctAnswer: '5'
  },
  {
    id: 23,
    category: 'Python',
    question: "Which keyword is used to define a function in Python?",
    options: ['define', 'def', 'func', 'function'],
    correctAnswer: 'def'
  },
  {
    id: 22,
    category: 'Python',
    question: "What does the expression list(range(3)) return?",
    options: ['[1, 2, 3]', '[0, 1, 2]', '[0, 1, 2, 3]', 'Error'],
    correctAnswer: '[0, 1, 2]'
  },
  {
    id: 21,
    category: 'Python',
    question: "What is the correct way to open a file named 'data.txt' in read mode?",
    options: ["open('data.txt')", "open('data.txt', 'r')", "open('data.txt', 'w')", "open('data.txt', 'rb')"],
    correctAnswer: "open('data.txt', 'r')"
  },
    // English Grammar Questions
    {
      id: 15,
      category: 'English Grammar',
      question: 'Choose the correct sentence:',
      options: [
        'Neither of the students have completed their assignment.', 
        'Neither of the students has completed their assignment.', 
        'Neither of the students has completed his assignment.', 
        'Neither of the student has completed their assignment.'
      ],
      correctAnswer: 'Neither of the students has completed their assignment.'
    },
    {
      id: 16,
      category: 'English Grammar',
      question: 'Which sentence contains a dangling modifier?',
      options: [
        'Walking through the forest, the trees were beautiful.', 
        'Walking through the forest, I saw beautiful trees.', 
        'The trees in the forest were beautiful during our walk.', 
        'The forest had beautiful trees that we saw while walking.'
      ],
      correctAnswer: 'Walking through the forest, the trees were beautiful.'
    },
    {
      id: 17,
      category: 'English Grammar',
      question: 'Identify the correct usage of the semicolon:',
      options: [
        'I have three dogs; two cats and a hamster.', 
        'I have three dogs: Rex, Fido, and Spot.', 
        'I have three dogs; they re all retrievers.', 
        'I have three dogs.'
      ],
      correctAnswer: 'I have three dogs; they re all retrievers.'
    },
    {
      id: 18,
      category: 'English Grammar',
      question: 'Which of the following is a complex sentence?',
      options: [
        'She went to the store and bought milk.', 
        'After she went to the store, she bought milk.', 
        'She went to the store; she bought milk.', 
        'She went to the store.'
      ],
      correctAnswer: 'After she went to the store, she bought milk.'
    },
    {
      id: 19,
      category: 'English Grammar',
      question: 'What is the plural form of "criterion"?',
      options: ['criterias', 'criterion', 'criterions', 'criteria'],
      correctAnswer: 'criteria'
    },
    {
      id: 20,
      category: 'English Grammar',
      question: 'Choose the sentence with correct subject-verb agreement:',
      options: [
        'The team are playing well today.', 
        'The team is playing well today.', 
        'The team were playing well today.', 
        'The team have been playing well today.'
      ],
      correctAnswer: 'The team is playing well today.'
    }
  ];
  
  // Start the test
  const startTest = () => {
    setCurrentSection('test');
    setStartTime(Date.now());
  };
  
  // Handle answer selection
  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer
    });
  };
  
  // Navigate to next question
  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  // Navigate to previous question
  const goToPrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  // Skip question
  const skipQuestion = () => {
    if (!skippedQuestions.includes(questions[currentQuestion].id)) {
      setSkippedQuestions([...skippedQuestions, questions[currentQuestion].id]);
    }
    goToNextQuestion();
  };
  
  // Finish the test
  const finishTest = () => {
    setTestFinished(true);
    setShowResults(true);
  };
  
  // Calculate results
  const calculateResults = () => {
    let correctCount = 0;
    let attemptedCount = 0;
    
    questions.forEach(q => {
      if (selectedAnswers[q.id]) {
        attemptedCount++;
        if (selectedAnswers[q.id] === q.correctAnswer) {
          correctCount++;
        }
      }
    });
    
    const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : timeLeft;
    const accuracy = attemptedCount > 0 ? (correctCount / attemptedCount) * 100 : 0;
    
    return {
      totalQuestions: questions.length,
      attempted: attemptedCount,
      correct: correctCount,
      wrong: attemptedCount - correctCount,
      skipped: questions.length - attemptedCount,
      timeTaken: formatTime(Math.min(1800 - timeLeft, 1800)),
      accuracy: accuracy.toFixed(2),
      score: (correctCount / questions.length) * 100
    };
  };
  
  // Go to specific question by number
  const goToQuestion = (index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestion(index);
    }
  };
  
  // Check if a question has been answered
  const isQuestionAnswered = (id) => {
    return selectedAnswers[id] !== undefined;
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    
    return (
      <Card className="question-card">
        <Card.Header className="d-flex justify-content-between">
          <div>
            <h5>Q: {currentQuestion + 1}</h5>
            <Badge bg="info">{question.category}</Badge>
          </div>
          <div className="text-right">
            <h5 className="text-danger">
              <i className="bi bi-clock"></i> {formatTime(timeLeft)}
            </h5>
          </div>
        </Card.Header>
        
        <Card.Body>
          <Card.Title as="div" className="mb-4">{question.question}</Card.Title>
          
          <Form>
            {question.options.map((option, idx) => (
              <Form.Check
                key={idx}
                type="radio"
                id={`q${question.id}-opt${idx}`}
                name={`question-${question.id}`}
                label={option}
                className="mb-3"
                checked={selectedAnswers[question.id] === option}
                onChange={() => handleAnswerSelect(question.id, option)}
              />
            ))}
          </Form>
        </Card.Body>
        
        <Card.Footer className="d-flex justify-content-between">
          <Button 
            variant="outline-secondary" 
            onClick={goToPrevQuestion} 
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <Button 
            variant="outline-warning" 
            onClick={skipQuestion}
          >
            Skip
          </Button>
          
          {currentQuestion < questions.length - 1 ? (
            <Button 
              variant="outline-primary" 
              onClick={goToNextQuestion}
            >
              Next
            </Button>
          ) : (
            <Button 
              variant="outline-success" 
              onClick={() => setShowFinishModal(true)}
            >
              Finish Test
            </Button>
          )}
        </Card.Footer>
      </Card>
    );
  };
  
  // Render the question navigator
  const renderQuestionNavigator = () => {
    return (
      <Card className="mb-3">
        <Card.Header>
          <h5>Section 01 Code-Charge Qualifier Test</h5>
        </Card.Header>
        <Card.Body>
          <div className="question-navigator">
            {questions.map((q, idx) => (
              <Button
                key={idx}
                variant={
                  currentQuestion === idx
                    ? 'primary'
                    : isQuestionAnswered(q.id)
                    ? 'success'
                    : skippedQuestions.includes(q.id)
                    ? 'warning'
                    : 'light'
                }
                className="m-1 question-btn"
                onClick={() => goToQuestion(idx)}
              >
                {idx + 1}
              </Button>
            ))}
          </div>
          
          <div className="mt-3">
            <Badge bg="success" className="mr-2 p-2 m-1">Answered Question</Badge>
            <Badge bg="warning" className="mr-2 p-2 m-1">Skipped Question</Badge>
            <Badge bg="light" text="dark" className="p-2 m-1">Unattempted Question</Badge>
          </div>
        </Card.Body>
      </Card>
    );
  };
  
  // Render the results dashboard
  const renderResults = () => {
    const results = calculateResults();
    
    return (
      <Container>
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="results-card">
              <Card.Header className="bg-primary text-white">
                <h3 className="text-center">Test Results</h3>
              </Card.Header>
              
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Card className="mb-3">
                      <Card.Header>Score Summary</Card.Header>
                      <Card.Body>
                        <h2 className="text-center mb-4">{results.score.toFixed(2)}%</h2>
                        <ProgressBar>
                          <ProgressBar variant="success" now={results.correct * (100/results.totalQuestions)} key={1} />
                          <ProgressBar variant="danger" now={results.wrong * (100/results.totalQuestions)} key={2} />
                          <ProgressBar variant="warning" now={results.skipped * (100/results.totalQuestions)} key={3} />
                        </ProgressBar>
                        <div className="d-flex justify-content-between mt-2">
                          <small>Correct: {results.correct}</small>
                          <small>Wrong: {results.wrong}</small>
                          <small>Skipped: {results.skipped}</small>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col md={6}>
                    <Card className="mb-3">
                      <Card.Header>Performance Metrics</Card.Header>
                      <Card.Body>
                        <div className="d-flex justify-content-between mb-2">
                          <strong>Accuracy:</strong>
                          <span>{results.accuracy}%</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <strong>Time Taken:</strong>
                          <span>{results.timeTaken}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <strong>Questions Attempted:</strong>
                          <span>{results.attempted} of {results.totalQuestions}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <strong>Avg. Time per Question:</strong>
                          <span>
                            {results.attempted > 0 
                              ? formatTime(Math.floor(parseInt(results.timeTaken.split(':')[0]) * 60 + parseInt(results.timeTaken.split(':')[1]) / results.attempted)) 
                              : '00:00'}
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                
                <Card className="mt-3">
                  <Card.Header>Category Performance</Card.Header>
                  <Card.Body>
                    {['Logical Reasoning', 'Python', 'English Grammar'].map(category => {
                      const categoryQuestions = questions.filter(q => q.category === category);
                      const attempted = categoryQuestions.filter(q => selectedAnswers[q.id]).length;
                      const correct = categoryQuestions.filter(q => selectedAnswers[q.id] === q.correctAnswer).length;
                      const accuracy = attempted > 0 ? (correct / attempted) * 100 : 0;
                      
                      return (
                        <div key={category} className="mb-3">
                          <div className="d-flex justify-content-between">
                            <strong>{category}:</strong>
                            <span>{correct} / {categoryQuestions.length} ({accuracy.toFixed(2)}%)</span>
                          </div>
                          <ProgressBar 
                            variant={accuracy > 70 ? "success" : accuracy > 40 ? "warning" : "danger"} 
                            now={accuracy} 
                            className="mt-1"
                          />
                        </div>
                      );
                    })}
                  </Card.Body>
                </Card>
                
                <div className="text-center mt-4">
                  <Button 
                    variant="primary" 
                    onClick={() => {
                      setCurrentSection('intro');
                      setCurrentQuestion(0);
                      setSelectedAnswers({});
                      setTimeLeft(30 * 60);
                      setTestFinished(false);
                      setShowResults(false);
                      setStartTime(null);
                      setSkippedQuestions([]);
                    }}
                  >
                    Start New Test
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
  
  // Render the introduction screen
  const renderIntro = () => {
    return (
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card>
              <Card.Header className="bg-primary text-white">
                <h3>Code-Charge Online Test</h3>
              </Card.Header>
              <Card.Body>
                <Alert variant="info">
                  <h4>Test Instructions</h4>
                  <p>Welcome to the online assessment. Please read the following instructions carefully:</p>
                </Alert>
                
                <h5>Test Structure:</h5>
                <ul>
                  <li>Total Questions: 30</li>
                  <li>Time Limit: 30 minutes</li>
                  <li>Categories: Logical Reasoning, Python, English Grammar</li>
                </ul>
                
                <h5>Important Notes:</h5>
                <ol>
                  <li>Once you start the test, the timer cannot be paused.</li>
                  <li>You can navigate between questions using the navigation panel.</li>
                  <li>You can mark questions to review later.</li>
                  <li>The test will automatically submit when the time expires.</li>
                  <li>Results will be displayed immediately after submission.</li>
                </ol>
                
                <div className="text-center mt-4">
                  <Button variant="success" size="lg" onClick={startTest}>
                    Start Test
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
  
  // Render based on current section
  const renderContent = () => {
    if (showResults) {
      return renderResults();
    }
    
    switch (currentSection) {
      case 'intro':
        return renderIntro();
      case 'test':
        return (
          <Container fluid className="py-3">
            <Row>
              <Col md={8}>
                {renderQuestion()}
              </Col>
              <Col md={4}>
                {renderQuestionNavigator()}
              </Col>
            </Row>
          </Container>
        );
      default:
        return renderIntro();
    }
  };
  
  return (
    <div className="test-app">
      <header className="bg-light py-2 shadow-sm">
        <Container fluid>
          <Row className="align-items-center">
            <Col>
              <h3 className="m-0">Code-Charge.</h3>
            </Col>
            {currentSection === 'test' && !testFinished && (
              <Col className="text-end">
                <h5 className="text-danger mb-0">
                  <i className="bi bi-clock-history"></i> {formatTime(timeLeft)}
                </h5>
              </Col>
            )}
          </Row>
        </Container>
      </header>
      
      {renderContent()}
      
      {/* Finish Test Confirmation Modal */}
      <Modal show={showFinishModal} onHide={() => setShowFinishModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Finish Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to finish the test?</p>
          <p>You've answered {Object.keys(selectedAnswers).length} out of {questions.length} questions.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFinishModal(false)}>
            Continue Test
          </Button>
          <Button variant="primary" onClick={() => {
            setShowFinishModal(false);
            finishTest();
          }}>
            Finish Test
          </Button>
        </Modal.Footer>
      </Modal>
      
      <style jsx>{`
        .question-navigator {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        
        .question-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 4px;
        }
        
        .question-card {
          min-height: 500px;
          display: flex;
          flex-direction: column;
        }
        
        .question-card .card-body {
          flex: 1;
        }
      `}</style>
    </div>
  );
};

export default OnlineTestApp;