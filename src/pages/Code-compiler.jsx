import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import MonacoEditor from "@monaco-editor/react";
import axios from "axios";

const CodeEditor = () => {
  const [code, setCode] = useState("// Write your code here Developed by Rohi...");
  const [language, setLanguage] = useState("python"); // Default language
  const [output, setOutput] = useState("");

  const handleRunCode = async () => {
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "false", fields: "*" },
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "d33cd466d1msh09abc8f56e0c0cbp1f480fjsn5ea548d7bfce", 
      },
      data: {
        language_id: getLanguageId(language),
        source_code: code,
        stdin: "",
      },
    };

    try {
      const response = await axios.request(options);
      const submissionId = response.data.token;
      setTimeout(async () => {
        const outputResponse = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${submissionId}`,
          { headers: options.headers }
        );
        setOutput(outputResponse.data.stdout || outputResponse.data.stderr);
      }, 3000);
    } catch (error) {
      console.error("Error executing code:", error);
    }
  };

  const getLanguageId = (lang) => {
    const languageMap = {
      cpp: 54,
      python: 71,
      java: 62,
      javascript: 63,
    };
    return languageMap[lang] || 54;
  };

  return (
    <Container>
      <h2 className="text-center mt-4">Code Playground</h2>
      <Row className="mt-3">
        <Col md={8}>
          <MonacoEditor
            height="600px"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(newCode) => setCode(newCode)}
          />
        </Col>
        <Col md={4}>
          <Form.Group controlId="languageSelect">
            <Form.Label>Select Language</Form.Label>
            <Form.Control as="select" value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              {/* <option value="java">Java</option> */}
              <option value="javascript">JavaScript</option>
            </Form.Control>
          </Form.Group>
          <Button className="mt-3 w-100" variant="primary" onClick={handleRunCode}>
            Run Code
          </Button>
          <h5 className="mt-4">Output:</h5>
          <pre className="bg-dark text-white p-2">{output}</pre>
        </Col>
      </Row>
    </Container>
  );
};

export default CodeEditor;