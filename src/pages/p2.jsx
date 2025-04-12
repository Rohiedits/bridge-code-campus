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
      question: 'If P implies Q, and Q is false, what can be said about P?',
      options: [
          'P must be false',
          'P might be true or false',
          'P must be true',
          'Cannot determine'
      ],
      correctAnswer: 'P might be true or false',
      explanation: 'In propositional logic, if Q is false, P could be either true or false.'
  },
  {
      id: 2,
      category: 'Logical Reasoning',
      question: 'Complete the series: 2, 6, 12, 20, __?',
      options: ['28', '30', '24', '26'],
      correctAnswer: '30',
      explanation: 'The pattern is: +4, +6, +8, so the next number would be 20 + 10 = 30'
  },
  {
      id: 3,
      category: 'Logical Reasoning',
      question: 'All scientists are curious. Mark is curious. What can be concluded?',
      options: [
          'Mark is definitely a scientist',
          'Mark might be a scientist',
          'Mark cannot be a scientist',
          'Not enough information to determine'
      ],
      correctAnswer: 'Mark might be a scientist',
      explanation: 'While all scientists are curious, not all curious people are scientists. So Mark might be a scientist, but it is not certain.'
  },
  {
      id: 4,
      category: 'Logical Reasoningg',
      question: 'Complete the analogy: Chef : Kitchen :: Pilot : ?',
      options: ['Airplane', 'Airport', 'Sky', 'Runway'],
      correctAnswer: 'Airplane',
      explanation: 'A chef works in a kitchen, similarly a pilot operates an airplane'
  },
  {
      id: 5,
      category: 'Logical Reasoning',
      question: 'Which shape would complete this sequence? [Triangle, Square, Pentagon, ?]',
      options: ['Hexagon', 'Circle', 'Rectangle', 'Octagon'],
      correctAnswer: 'Hexagon',
      explanation: 'The sequence follows increasing number of sides: 3-sided triangle, 4-sided square, 5-sided pentagon, so next would be 6-sided hexagon'
  },
  {
      id: 6,
      category: 'Logical Reasoning',
      question: 'If it rains, the picnic will be cancelled. It is raining. What follows?',
      options: [
          'The picnic might continue',
          'The picnic will be cancelled',
          'We need more information',
          'The rain will stop soon'
      ],
      correctAnswer: 'The picnic will be cancelled',
      explanation: 'Given the premise that rain causes picnic cancellation, and it is raining, the picnic must be cancelled.'
  },
  {
      id: 7,
      category: 'Logical Reasoning',
      question: 'Which conclusion is most logical from these statements? Some investments are risky. All stocks are investments.',
      options: [
          'All stocks are risky',
          'Some stocks are not risky',
          'No stocks are risky',
          'Some stocks are risky'
      ],
      correctAnswer: 'Some stocks are risky',
      explanation: 'Since some investments are risky and all stocks are investments, some stocks must be risky.'
  },
  {
      id: 8,
      category: 'Logical Reasoning',
      question: 'What number comes next? 1, 4, 9, 16, __?',
      options: ['25', '20', '36', '29'],
      correctAnswer: '25',
      explanation: 'The sequence represents perfect squares: 1², 2², 3², 4², so the next would be 5² = 25'
  },
  {
      id: 9,
      category: 'Logical Reasoning',
      question: 'All dogs bark. Rover is a dog. What can be definitively said?',
      options: [
          'Rover might not bark',
          'Rover barks',
          'Rover is silent',
          'Cannot determine'
      ],
      correctAnswer: 'Rover barks',
      explanation: 'If all dogs bark and Rover is a dog, then Rover must bark.'
  },
  {
      id: 10,
      category: 'Logical Reasoning',
      question: 'If a student studies, they will pass. Alex did not pass. What can be concluded?',
      options: [
          'Alex did not study',
          'Alex definitely studied',
          'Cannot determine if Alex studied',
          'Alex will retake the exam'
      ],
      correctAnswer: 'Cannot determine if Alex studied',
      explanation: 'The statement only says studying leads to passing, not that not passing means not studying. Additional information is needed.'
  },
    // Python Questions
    {
      id: 230,
      category: 'Python',
      question: 'Which method is used to create a view object of the dictionary\'s keys?',
      options: ['keys', 'get_keys()', 'key_view()', 'view_keys()'],
      correctAnswer: 'keys'
    },
    {
      id: 226,
      category: 'Python',
      question: 'What does the `all()` function return for an empty iterable?',
      options: ['True', 'False', 'None', 'Error'],
      correctAnswer: 'True'
    },
    {
      id: 227,
      category: 'Python',
      question: 'Which of these is the correct way to create a deep copy of a list?',
      options: [
        'new_list = list(old_list)', 
        'new_list = old_list.copy()', 
        'import copy; new_list = copy.deepcopy(old_list)', 
        'new_list = old_list[:]'
      ],
      correctAnswer: 'import copy; new_list = copy.deepcopy(old_list)'
    },
    {
      id: 228,
      category: 'Python',
      question: 'What will be the output of: print(3 ** 2 ** 2)?',
      options: ['9', '81', '18', '512'],
      correctAnswer: '81'
    },
    {
      id: 229,
      category: 'Python',
      question: 'Which method is used to add all elements from one list to another?',
      options: ['merge()', 'add()', 'extend()', 'append()'],
      correctAnswer: 'extend()'
    },
    {
      id: 120,
      category: 'Python',
      question: 'Which of these is the correct way to create a deep copy of a list?',
      options: [
        'new_list = list(old_list)', 
        'new_list = old_list.copy()', 
        'import copy; new_list = copy.deepcopy(old_list)', 
        'new_list = old_list[:]'
      ],
      correctAnswer: 'import copy; new_list = copy.deepcopy(old_list)'
    },
    {
      id: 121,
      category: 'Python',
      question: 'What will be the output of: print(3 ** 2 ** 2)?',
      options: ['9', '81', '18', '512'],
      correctAnswer: '81'
    },
    {
      id: 122,
      category: 'Python',
      question: 'Which method is used to add all elements from one list to another?',
      options: ['merge()', 'add()', 'extend()', 'append()'],
      correctAnswer: 'extend()'
    },
    {
      id: 123,
      category: 'Python',
      question: 'What does the `any()` function return for an empty iterable?',
      options: ['True', 'False', 'None', 'Error'],
      correctAnswer: 'False'
    },
    {
      id: 124,
      category: 'Python',
      question: 'Which built-in function is used to get the maximum value in an iterable?',
      options: ['largest()', 'max()', 'maximum()', 'top()'],
      correctAnswer: 'max()'
    },
    {
      id: 125,
      category: 'Python',
      question: 'What is the output of: print(bool(0.0))?',
      options: ['True', 'False', 'None', 'Error'],
      correctAnswer: 'False'
    },
    {
      id: 126,
      category: 'Python',
      question: 'Which method is used to convert a string to lowercase?',
      options: ['lower()', 'to_lower()', 'lowercase()', 'convert_lower()'],
      correctAnswer: 'lower()'
    },
    {
      id: 127,
      category: 'Python',
      question: 'What does the `ord()` function do?',
      options: [
        'Returns the Unicode code point of a character', 
        'Converts a number to its octal representation', 
        'Rounds a number to the nearest integer', 
        'Converts a string to an ordered list'
      ],
      correctAnswer: 'Returns the Unicode code point of a character'
    },
    {
      id: 128,
      category: 'Python',
      question: 'Which of these is an immutable sequence type in Python?',
      options: ['List', 'Dictionary', 'Set', 'Tuple'],
      correctAnswer: 'Tuple'
    },
    
    // English Grammar Questions
    {
      id: 31,
      category: 'English Grammar',
      question: 'Which sentence demonstrates correct parallel structure?',
      options: [
        'She likes swimming, to run, and hiking.', 
        'She likes to swim, run, and hiking.', 
        'She likes swimming, running, and to hike.', 
        'She likes to swim, to run, and to hike.'
      ],
      correctAnswer: 'She likes to swim, to run, and to hike.'
    },
    {
      id: 32,
      category: 'English Grammar',
      question: 'Identify the sentence with the correct use of comparative adjectives:',
      options: [
        'This is the most unique book I\'ve read.', 
        'This book is more unique than that one.', 
        'This book is uniquer than that one.', 
        'This book is the most uniquest book.'
      ],
      correctAnswer: 'This is the most unique book I\'ve read.'
    },
    {
      id: 33,
      category: 'English Grammar',
      question: 'Which sentence uses the colon correctly?',
      options: [
        'I need three things: determination, hard work and patience.', 
        'I need three things, determination: hard work and patience.', 
        'I need three things: Determination, hard work, and patience.', 
        'I need three things: determination hard work and patience.'
      ],
      correctAnswer: 'I need three things: Determination, hard work, and patience.'
    },
    {
      id: 34,
      category: 'English Grammar',
      question: 'Which sentence contains a misplaced modifier?',
      options: [
        'Covered in mud, John found the lost dog.', 
        'John found the dog covered in mud.', 
        'Covered in mud, the dog was found by John.', 
        'The dog, covered in mud, was found by John.'
      ],
      correctAnswer: 'Covered in mud, the dog was found by John.'
    },
    {
      id: 35,
      category: 'English Grammar',
      question: 'Which is the correct plural form of "analysis"?',
      options: ['analyses', 'analysises', 'analysis', 'analysii'],
      correctAnswer: 'analyses'
    },
    {
      id: 36,
      category: 'English Grammar',
      question: 'Which sentence shows correct verb tense consistency?',
      options: [
        'When he arrived, she was cooking and talks on the phone.', 
        'When he arrived, she cooked and talked on the phone.', 
        'When he arrives, she was cooking and talked on the phone.', 
        'When he had arrived, she is cooking and talked on the phone.'
      ],
      correctAnswer: 'When he arrived, she was cooking and talked on the phone.'
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