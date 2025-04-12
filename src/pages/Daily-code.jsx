
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CodingQuizApp = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [userCode, setUserCode] = useState('');
  const [feedback, setFeedback] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const challenges = {
    daily: {
      python: {
        question: "Write a function that finds the sum of all even numbers in a list",
        template: "def sum_even_numbers(numbers):\n    # Your code here\n    pass",
        testCases: [
          { input: "[1, 2, 3, 4, 5, 6]", expectedOutput: "12" },
          { input: "[2, 4, 6, 8]", expectedOutput: "20" }
        ],
        sampleOutput: "Test Case 1:\nInput: [1, 2, 3, 4, 5, 6]\nOutput: 12\n\nTest Case 2:\nInput: [2, 4, 6, 8]\nOutput: 20"
      },
      java: {
        question: "Write a method that reverses a string",
        template: "public class Solution {\n    public String reverseString(String str) {\n        // Your code here\n        return \"\";\n    }\n}",
        testCases: [
          { input: "\"hello\"", expectedOutput: "\"olleh\"" },
          { input: "\"world\"", expectedOutput: "\"dlrow\"" }
        ],
        sampleOutput: "Test Case 1:\nInput: \"hello\"\nOutput: \"olleh\"\n\nTest Case 2:\nInput: \"world\"\nOutput: \"dlrow\""
      },
      web: {
        question: "Write a function that changes background color based on input",
        template: "function changeBackground(color) {\n    // Your code here\n}",
        testCases: [
          { input: "\"red\"", expectedOutput: "Background changes to red" },
          { input: "\"blue\"", expectedOutput: "Background changes to blue" }
        ],
        sampleOutput: "Test Case 1:\nchangeBackground(\"red\") → Document background becomes red\n\nTest Case 2:\nchangeBackground(\"blue\") → Document background becomes blue"
      }
    },
    reverse: {
      python: {
        output: "2 4 6 8 10",
        description: "Write code that generates a sequence of even numbers from 2 to 10",
        template: "# Your code here to generate the sequence",
        sampleOutput: "Expected Output:\n2 4 6 8 10\n\nYour code should print these numbers in sequence."
      },
      java: {
        output: "Fibonacci: 1 1 2 3 5 8",
        description: "Write code to generate first 6 numbers of Fibonacci sequence",
        template: "public class Solution {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}",
        sampleOutput: "Expected Output:\nFibonacci: 1 1 2 3 5 8\n\nYour program should print the sequence in this exact format."
      },
      web: {
        output: "<div class='centered red-box'></div>",
        description: "Write HTML and CSS to create a centered red square",
        template: "<!-- Your HTML and CSS here -->",
        sampleOutput: "Expected Result:\nA red square (100x100px) perfectly centered on the page\n\nVisual Output Preview:\n┌────────┐\n│        │\n│   []   │\n│        │\n└────────┘"
      }
    }
  };

  const simulateCodeExecution = () => {
    setIsRunning(true);
    setOutput('Compiling and running your code...');
    
    setTimeout(() => {
      const currentChallenge = activeTab === 'daily' 
        ? challenges.daily[selectedLanguage]
        : challenges.reverse[selectedLanguage];
      
      setOutput(currentChallenge.sampleOutput);
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = () => {
    setFeedback('Code submitted! Checking...');
    simulateCodeExecution();
    setTimeout(() => {
      setFeedback('Solution submitted! Check the output panel for results.');
    }, 1500);
  };

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      marginBottom: '30px',
      textAlign: 'center'
    },
    tabContainer: {
      marginBottom: '20px'
    },
    languageSelect: {
      marginBottom: '20px'
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginBottom: '20px'
    },
    editor: {
      width: '100%',
      minHeight: '300px',
      fontFamily: 'monospace',
      padding: '10px',
      marginBottom: '20px',
      backgroundColor: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '4px'
    },
    outputPanel: {
      fontFamily: 'monospace',
      padding: '15px',
      backgroundColor: '#000',
      color: '#00ff00',
      borderRadius: '4px',
      minHeight: '300px',
      whiteSpace: 'pre-wrap'
    },
    testCase: {
      backgroundColor: '#f8f9fa',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '4px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 className="display-4">Daily Coding Quiz</h1>
        <p className="lead">Practice your coding skills with daily challenges!</p>
      </div>

      <div style={styles.tabContainer} className="nav nav-tabs">
        <button 
          className={`nav-link ${activeTab === 'daily' ? 'active' : ''}`}
          onClick={() => setActiveTab('daily')}
        >
          Daily Challenges
        </button>
        <button 
          className={`nav-link ${activeTab === 'reverse' ? 'active' : ''}`}
          onClick={() => setActiveTab('reverse')}
        >
          Reverse Challenges
        </button>
      </div>

      <div style={styles.languageSelect}>
        <select 
          className="form-select"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="web">Web Development</option>
        </select>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          {activeTab === 'daily' ? (
            <>
              <h3>Challenge:</h3>
              <p>{challenges.daily[selectedLanguage].question}</p>
              <h4>Test Cases:</h4>
              {challenges.daily[selectedLanguage].testCases.map((testCase, index) => (
                <div key={index} style={styles.testCase}>
                  <strong>Input:</strong> {testCase.input}<br/>
                  <strong>Expected Output:</strong> {testCase.expectedOutput}
                </div>
              ))}
            </>
          ) : (
            <>
              <h3>Reverse Challenge:</h3>
              <p>{challenges.reverse[selectedLanguage].description}</p>
              <div style={styles.testCase}>
                <strong>Expected Output:</strong><br/>
                {challenges.reverse[selectedLanguage].output}
              </div>
            </>
          )}
        </div>
      </div>

      <div style={styles.mainContent}>
        <div>
          <h4>Code Editor</h4>
          <textarea
            style={styles.editor}
            value={userCode || (activeTab === 'daily' ? 
              challenges.daily[selectedLanguage].template :
              challenges.reverse[selectedLanguage].template)}
            onChange={(e) => setUserCode(e.target.value)}
            className="form-control"
          />
        </div>
        
        <div>
          <h4>Output</h4>
          <div style={styles.outputPanel}>
            {isRunning ? 'Running...' : output || 'Output will appear here...'}
          </div>
        </div>
      </div>

      <button 
        className="btn btn-primary btn-lg w-100"
        onClick={handleSubmit}
        disabled={isRunning}
      >
        {isRunning ? 'Running...' : 'Submit Solution'}
      </button>

      {feedback && (
        <div className="alert alert-info mt-3">
          {feedback}
        </div>
      )}
    </div>
  );
};

export default CodingQuizApp;

