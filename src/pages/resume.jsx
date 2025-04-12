
import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import html2pdf from 'html2pdf.js';

const ResumeBuilder = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: ''
  });

  const [experience, setExperience] = useState([{
    company: '',
    position: '',
    duration: '',
    achievements: ''
  }]);

  const [achievements, setAchievements] = useState([{
    title: '',
    description: ''
  }]);

  const [certifications, setCertifications] = useState([{
    name: '',
    issuer: '',
    year: ''
  }]);

  const [education, setEducation] = useState([{
    school: '',
    degree: '',
    year: '',
    gpa: ''
  }]);

  const [skills, setSkills] = useState('');
  const [showError, setShowError] = useState(false);

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleExperienceChange = (index, e) => {
    const newExperience = [...experience];
    newExperience[index] = {
      ...newExperience[index],
      [e.target.name]: e.target.value
    };
    setExperience(newExperience);
  };

  const addExperience = () => {
    setExperience([...experience, {
      company: '',
      position: '',
      duration: '',
      achievements: ''
    }]);
  };

  const removeExperience = (index) => {
    const newExperience = experience.filter((_, i) => i !== index);
    setExperience(newExperience);
  };

  const handleAchievementChange = (index, e) => {
    const newAchievements = [...achievements];
    newAchievements[index] = {
      ...newAchievements[index],
      [e.target.name]: e.target.value
    };
    setAchievements(newAchievements);
  };

  const addAchievement = () => {
    setAchievements([...achievements, {
      title: '',
      description: ''
    }]);
  };

  const removeAchievement = (index) => {
    const newAchievements = achievements.filter((_, i) => i !== index);
    setAchievements(newAchievements);
  };

  const handleCertificationChange = (index, e) => {
    const newCertifications = [...certifications];
    newCertifications[index] = {
      ...newCertifications[index],
      [e.target.name]: e.target.value
    };
    setCertifications(newCertifications);
  };

  const addCertification = () => {
    setCertifications([...certifications, {
      name: '',
      issuer: '',
      year: ''
    }]);
  };

  const removeCertification = (index) => {
    const newCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(newCertifications);
  };

  const handleEducationChange = (index, e) => {
    const newEducation = [...education];
    newEducation[index] = {
      ...newEducation[index],
      [e.target.name]: e.target.value
    };
    setEducation(newEducation);
  };

  const addEducation = () => {
    setEducation([...education, {
      school: '',
      degree: '',
      year: '',
      gpa: ''
    }]);
  };

  const removeEducation = (index) => {
    const newEducation = education.filter((_, i) => i !== index);
    setEducation(newEducation);
  };

  const validateExperience = () => {
    if (experience.length === 0) {
      setShowError(true);
      return false;
    }
    const hasValidExperience = experience.some(exp => 
      exp.company.trim() && exp.position.trim() && exp.duration.trim()
    );
    setShowError(!hasValidExperience);
    return hasValidExperience;
  };

  const downloadPDF = () => {
    if (!validateExperience()) {
      window.scrollTo(0, 0);
      return;
    }
    const element = document.getElementById('resume-preview');
    const opt = {
      margin: 1,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <Container fluid className="p-4">
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              {showError && (
                <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                  Please add at least one valid work experience entry before downloading.
                </Alert>
              )}

              <h3>Personal Information</h3>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={personalInfo.name}
                    onChange={handlePersonalInfoChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handlePersonalInfoChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={personalInfo.location}
                    onChange={handlePersonalInfoChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>LinkedIn</Form.Label>
                  <Form.Control
                    type="text"
                    name="linkedin"
                    value={personalInfo.linkedin}
                    onChange={handlePersonalInfoChange}
                  />
                </Form.Group>
              </Form>

              <h3 className="mt-4">Experience</h3>
              {experience.map((exp, index) => (
                <Form key={index} className="mb-3 border p-3 rounded">
                  <div className="d-flex justify-content-end">
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => removeExperience(index)}
                    >
                      Remove
                    </Button>
                  </div>
                  <Form.Group className="mb-3">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      type="text"
                      name="company"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(index, e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                      type="text"
                      name="position"
                      value={exp.position}
                      onChange={(e) => handleExperienceChange(index, e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                      type="text"
                      name="duration"
                      value={exp.duration}
                      onChange={(e) => handleExperienceChange(index, e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Achievements</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="achievements"
                      value={exp.achievements}
                      onChange={(e) => handleExperienceChange(index, e)}
                    />
                  </Form.Group>
                </Form>
              ))}
              <Button variant="secondary" onClick={addExperience}>Add Experience</Button>

              <h3 className="mt-4">Achievements</h3>
              {achievements.map((achievement, index) => (
                <Form key={index} className="mb-3 border p-3 rounded">
                  <div className="d-flex justify-content-end">
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => removeAchievement(index)}
                    >
                      Remove
                    </Button>
                  </div>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={achievement.title}
                      onChange={(e) => handleAchievementChange(index, e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={achievement.description}
                      onChange={(e) => handleAchievementChange(index, e)}
                    />
                  </Form.Group>
                </Form>
              ))}
              <Button variant="secondary" onClick={addAchievement}>Add Achievement</Button>

              <h3 className="mt-4">Certifications</h3>
              {certifications.map((cert, index) => (
                <Form key={index} className="mb-3 border p-3 rounded">
                  <div className="d-flex justify-content-end">
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => removeCertification(index)}
                    >
                      Remove
                    </Button>
                  </div>
                  <Form.Group className="mb-3">
                    <Form.Label>Certification Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={cert.name}
                      onChange={(e) => handleCertificationChange(index, e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Issuing Organization</Form.Label>
                    <Form.Control
                      type="text"
                      name="issuer"
                      value={cert.issuer}
                      onChange={(e) => handleCertificationChange(index, e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      type="text"
                      name="year"
                      value={cert.year}
                      onChange={(e) => handleCertificationChange(index, e)}
                    />
                  </Form.Group>
                </Form>
              ))}
              <Button variant="secondary" onClick={addCertification}>Add Certification</Button>

              <h3 className="mt-4">Skills</h3>
              <Form.Group className="mb-3">
                <Form.Label>Skills (comma-separated)</Form.Label>
                <Form.Control
                  as="textarea"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </Form.Group>

              <h3 className="mt-4">Education</h3>
              {education.map((edu, index) => (
                <Form key={index} className="mb-3 border p-3 rounded">
                  <div className="d-flex justify-content-end">
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={() => removeEducation(index)}
                    >
                      Remove
                    </Button>
                  </div>
                  <Form.Group className="mb-3">
                    <Form.Label>School</Form.Label>
                    <Form.Control
                      type="text"
                      name="school"
                      value={edu.school}
                      onChange={(e) => handleEducationChange(index, e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Degree</Form.Label>
                    <Form.Control
                      type="text"
                      name="degree"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(index, e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      type="text"
                      name="year"
                      value={edu.year}
                      onChange={(e) => handleEducationChange(index, e)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>GPA</Form.Label>
                    <Form.Control
                      type="text"
                      name="gpa"
                      value={edu.gpa}
                      onChange={(e) => handleEducationChange(index, e)}
                    />
                  </Form.Group>
                </Form>
              ))}
              <Button variant="secondary" onClick={addEducation}>Add Education</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Resume Preview</h3>
                <Button variant="primary" onClick={downloadPDF}>Download PDF</Button>
              </div>
              <div id="resume-preview" className="p-4" style={{ backgroundColor: 'white' }}>
                <div className="text-center mb-4">
                  <h2>{personalInfo.name}</h2>
                  <p>
                    {personalInfo.email} | {personalInfo.phone} | {personalInfo.location}
                    <br />
                    {personalInfo.linkedin}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="border-bottom pb-2">Professional Experience</h4>
                  {experience.map((exp, index) => (
                    <div key={index} className="mb-3">
                      <h5>{exp.position}</h5>
                      <h6>{exp.company} | {exp.duration}</h6>
                      <p>{exp.achievements}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <h4 className="border-bottom pb-2">Achievements</h4>
                  {achievements.map((achievement, index) => (
                    <div key={index} className="mb-3">
                      <h5>{achievement.title}</h5>
                      <p>{achievement.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <h4 className="border-bottom pb-2">Certifications</h4>
                  {certifications.map((cert, index) => (
                    <div key={index} className="mb-3">
                      <h5>{cert.name}</h5>
                      <p>{cert.issuer} | {cert.year}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <h4 className="border-bottom pb-2">Skills</h4>
                  <p>{skills}</p>
                </div>

                <div className="mb-4">
                  <h4 className="border-bottom pb-2">Education</h4>
                  {education.map((edu, index) => (
                    <div key={index} className="mb-3">
                      <h5>{edu.school}</h5>
                      <h6>{edu.degree} | {edu.year}</h6>
                      {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResumeBuilder;