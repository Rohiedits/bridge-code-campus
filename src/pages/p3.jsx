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
      id: 913,
      category: 'Logical Reasoning',
      question: 'Which shape would appear next when the pattern is folded?',
      options: ['Triangle', 'Pentagon', 'Square', 'Hexagon'],
      correctAnswer: 'Square',
      explanation: 'This requires visualizing a spatial transformation of given shapes.'
  },
  {
      id: 914,
      category: 'Logical Reasoning',
      question: 'Which statement best explains the cause-effect relationship?',
      options: [
          'Smoking causes lung cancer',
          'Lung cancer causes smoking',
          'Smoking and lung cancer are unrelated',
          'Only some smokers get lung cancer'
      ],
      correctAnswer: 'Smoking causes lung cancer',
      explanation: 'Scientific evidence shows smoking is a significant cause of lung cancer.'
  },
  {
      id: 915,
      category: 'Logical Reasoning',
      question: 'What letter comes next? A, C, E, G, __?',
      options: ['I', 'H', 'J', 'K'],
      correctAnswer: 'I',
      explanation: 'The sequence shows every other letter of the alphabet in order.'
  },
  {
      id: 916,
      category: 'Logical Reasoning',
      question: 'Four friends live in different colored houses. Which statement is true?',
      options: [
          'The blue house is between red and green',
          'The red house is next to the blue house',
          'The green house is opposite the blue house',
          'Cannot be determined from given information'
      ],
      correctAnswer: 'Cannot be determined from given information',
      explanation: 'Insufficient details are provided to make a definitive conclusion.'
  },
  {
      id: 917,
      category: 'Logical Reasoning',
      question: 'A bag contains 3 red and 2 blue balls. What is the probability of drawing a red ball?',
      options: ['1/3', '2/5', '3/5', '1/2'],
      correctAnswer: '3/5',
      explanation: 'Total balls: 5, Red balls: 3, Probability = 3/5'
  },
  {
      id: 918,
      category: 'Logical Reasoning',
      question: 'Which word does NOT belong in the group?',
      options: ['Read', 'Write', 'Speak', 'Listen'],
      correctAnswer: 'Read',
      explanation: 'The other three are active communication skills, while reading is more passive.'
  },
  {
      id: 919,
      category: 'Logical Reasoning',
      question: 'No athletes are lazy. Some students are athletes. What follows?',
      options: [
          'Some students are not lazy',
          'All students are athletes',
          'No students are lazy',
          'Some students might be lazy'
      ],
      correctAnswer: 'Some students are not lazy',
      explanation: 'Since no athletes are lazy and some students are athletes, those students are not lazy.'
  },
  {
      id: 920,
      category: 'Logical Reasoning',
      question: 'Which shape continues the pattern?',
      options: ['Triangle inside circle', 'Square inside triangle', 'Circle inside square', 'Pentagon inside rectangle'],
      correctAnswer: 'Square inside circle',
      explanation: 'Requires understanding complex geometric transformations.'
  },
  {
      id: 921,
      category: 'Logical Reasoning',
      question: 'If all learned people are wise, and some wise people are kind, what can be concluded?',
      options: [
          'All learned people are kind',
          'Some learned people might be kind',
          'No learned people are kind',
          'Cannot be determined'
      ],
      correctAnswer: 'Some learned people might be kind',
      explanation: 'The premises suggest a possibility but do not guarantee that all learned people are kind.'
  },  {
    id: 922,
    category: 'Logical Reasoning',
    question: 'What number follows: 3, 6, 12, 24, __?',
    options: ['36', '48', '42', '52'],
    correctAnswer: '48',
    explanation: 'Each number is multiplied by 2: 3 × 2 = 6, 6 × 2 = 12, 12 × 2 = 24, so next is 24 × 2 = 48'
},
{
    id: 923,
    category: 'Logical Reasoning',
    question: 'Mark is taller than John. John is taller than Peter. What can be concluded?',
    options: [
        'Mark is taller than Peter',
        'Peter is the shortest',
        'John is of medium height',
        'Cannot determine exactly'
    ],
    correctAnswer: 'Mark is taller than Peter',
    explanation: 'Through transitive property of height, if Mark > John and John > Peter, then Mark > Peter'
},
    // Python Questions
    {
      id: 711,
      category: 'Python',
      question: 'Which of the following is NOT a valid way to create a dictionary?',
      options: [
        '{"name": "John", "age": 30}', 
        'dict(name="John", age=30)', 
        'dict([("name", "John"), ("age", 30)])', 
        '{"name": "John", age: 30}'
      ],
      correctAnswer: '{"name": "John", age: 30}'
    },
    {
      id: 712,
      category: 'Python',
      question: 'What is the output of: print(isinstance([], (list, tuple)))?',
      options: ['True', 'False', 'Error', 'None'],
      correctAnswer: 'True'
    },
    {
      id: 77713,
      category: 'Python',
      question: 'Which method returns an iterator of tuples where the i-th tuple contains the i-th element from each of the input iterables?',
      options: ['map()', 'filter()', 'zip()', 'enumerate()'],
      correctAnswer: 'zip()'
    },
    {
      id: 714,
      category: 'Python',
      question: 'What will be the output of: print(2 in [1, 2, 3])?',
      options: ['True', 'False', 'Error', 'None'],
      correctAnswer: 'True'
    },
    {
      id: 715,
      category: 'Python',
      question: 'Which method is used to convert an iterable to a dictionary?',
      options: ['dict()', 'list()', 'set()', 'tuple()'],
      correctAnswer: 'dict()'
    },
    {
      id: 716,
      category: 'Python',
      question: 'What does the `__init__` method in a class typically do?',
      options: [
        'Destroy the object', 
        'Initialize the object\'s attributes', 
        'Return the object', 
        'Create a copy of the object'
      ],
      correctAnswer: 'Initialize the object\'s attributes'
    },
    {
      id: 717,
      category: 'Python',
      question: 'What is the output of: print(round(3.5))?',
      options: ['3', '4', '3.5', 'Error'],
      correctAnswer: '4'
    },
    {
      id: 718,
      category: 'Python',
      question: 'Which method is used to remove and return an item from a list by index?',
      options: ['remove()', 'delete()', 'pop()', 'extract()'],
      correctAnswer: 'pop()'
    },
    {
      id: 719,
      category: 'Python',
      question: 'What does the `all()` function return for an empty iterable?',
      options: ['True', 'False', 'None', 'Error'],
      correctAnswer: 'True'
    },
    {
      id: 129,
      category: 'Python',
      question: 'What is the output of: print(list(range(1, 5, 2)))?',
      options: ['[1, 2, 3, 4]', '[1, 3]', '[1, 2, 3]', '[2, 4]'],
      correctAnswer: '[1, 3]'
    },
    {
      id: 130,
      category: 'Python',
      question: 'Which method is used to create a view object of the dictionary\'s keys?',
      options: ['keys', 'get_keys()', 'key_view()', 'view_keys()'],
      correctAnswer: 'keys'
    },
    {
      id: 530,
      category: 'Python',
      question: 'Which method is used to create a view object of the dictionary\'s keys?',
      options: ['keys', 'get_keys()', 'key_view()', 'view_keys()'],
      correctAnswer: 'keys'},
    // English Grammar Questions
    {
      id: 1,
      category: 'English Grammar',
      question: 'Which sentence uses the correct verb tense?',
      options: [
          'If I would have known, I would have come.',
          'If I had known, I would have come.',
          'If I know, I will come.',
          'If I knew, I would come.'
      ],
      correctAnswer: 'If I had known, I would have come.',
      explanation: 'This is the correct form of the past perfect conditional, expressing a hypothetical situation in the past.'
  },
  {
      id: 2,
      category: 'English Grammar',
      question: 'What is the synonym for "eloquent"?',
      options: ['Quiet', 'Articulate', 'Shy', 'Mumbling'],
      correctAnswer: 'Articulate',
      explanation: 'Eloquent means fluent, persuasive in speaking or writing, which is closest to "articulate".'
  },
  {
      id: 3,
      category: 'English Grammar',
      question: 'Which sentence is grammatically correct?',
      options: [
          'Between you and I, this is a secret.',
          'Between you and me, this is a secret.',
          'Between we, this is a secret.',
          'Between I and you, this is a secret.'
      ],
      correctAnswer: 'Between you and me, this is a secret.',
      explanation: 'In prepositional phrases, the objective case "me" is correct, not the subjective "I".'
  },
  {
      id: 4,
      category: 'English Grammar',
      question: 'What does the idiom "break a leg" mean?',
      options: [
          'To literally fracture a bone',
          'To wish someone good luck',
          'To perform poorly',
          'To stop working'
      ],
      correctAnswer: 'To wish someone good luck',
      explanation: 'Commonly used in theater, this idiom is a way of wishing performers good luck.'
  },
  {
      id: 5,
      category: 'English Grammar',
      question: 'Which sentence uses punctuation correctly?',
      options: [
          'My brother, who is a doctor loves traveling.',
          'My brother who is a doctor, loves traveling.',
          'My brother, who is a doctor, loves traveling.',
          'My brother who is a doctor loves, traveling.'
      ],
      correctAnswer: 'My brother, who is a doctor, loves traveling.',
      explanation: 'Non-restrictive clauses are set off by commas on both sides.'
  },
  {
      id: 6,
      category: 'English Grammar',
      question: 'Which sentence uses pronouns correctly?',
      options: [
          'Between she and him, they solved the problem.',
          'Between her and him, they solved the problem.',
          'Between she and he, they solved the problem.',
          'Between him and she, they solved the problem.'
      ],
      correctAnswer: 'Between her and him, they solved the problem.',
      explanation: 'In prepositional phrases, object pronouns (her, him) should be used.'
  },
  {
      id: 7,
      category: 'English Grammar',
      question: 'What is the antonym of "benevolent"?',
      options: ['Kind', 'Malevolent', 'Generous', 'Helpful'],
      correctAnswer: 'Malevolent',
      explanation: 'Malevolent means having or showing a wish to do evil to others, opposite of benevolent.'
  },
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