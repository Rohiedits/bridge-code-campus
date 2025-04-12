

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Tab, Row, Col, Card, Button, Accordion } from 'react-bootstrap';
import Navbar from "@/components/Navbar";

const LearningHub = () => {
  const [key, setKey] = useState('EEE');

  const courses = {
    EEE: {
      subjects: [
        {
          name: 'Semester 1-1 & 1-2 (COMMON SUBJECTS) SUBJECT NOTES',
          notes: [
            { title: 'MATHEMATICS-I', url: 'https://drive.google.com/drive/u/0/folders/1as25YSOvkMvSjjsRUHQiP_gnQK8zPjw9' },
            { title: 'Engineering Physics', url: 'https://drive.google.com/file/d/1XjbJHvRTcoM9gmywbre-2W2DKwthDKB0/view?usp=drivesdk' },
            { title: 'Chemistry', url: 'https://drive.google.com/file/d/1XXlLU-QAlM0DX_AvcRHdeonMIyxw_nTV/view?usp=drivesdk' },
            { title: 'PPS', url: 'https://drive.google.com/file/d/1XfpptZNhhl_hN-oLZ-_gMTx9phv32dOG/view?usp=drivesdk' },
            { title: 'BEE', url: 'https://drive.google.com/file/d/1_5rzLLCjhMAAUUaXSm0AJQzeDsSfEpsz/view?usp=drivesdk' },
            { title: 'Maths - II ', url: 'https://drive.google.com/drive/folders/1nfIXg1E5sKDmldR7PerdVOq3UvUQSPHu' },
            { title: 'Applied physics', url: 'https://drive.google.com/file/d/1XrYYeM1RYoRc-UxhfSMlm802KV83JLXh/view?usp=drivesdk' },
            { title: 'Engineering Mechanics', url: 'https://drive.google.com/file/d/1LkJflaFhpAsDCvv-N1Re4Caahv4mLju9/view?usp=drivesdk' }
            
          ],
          videos: ['Introduction to Circuits', 'Kirchhoff\'s Laws', 'AC Analysis'],
          roadmap: 'Start with basic circuit concepts, move to network analysis, then advanced topics.'
        },
        {
          name: 'Semester 2-1 SUBJECT NOTES',
          notes: [
            { title: 'Electronic Circuit Analysis', url: 'https://drive.google.com/drive/folders/1I1GgyolnsvmbltLSqXzN4eTQc0fbGuWA' },
            { title: 'Analog Electronics', url: 'https://drive.google.com/drive/folders/1I1GgyolnsvmbltLSqXzN4eTQc0fbGuWA' },
            { title: 'Electrical Machines I', url: 'https://drive.google.com/drive/folders/1I1GgyolnsvmbltLSqXzN4eTQc0fbGuWA' },
            { title: 'Engineering Mechanics', url: 'https://drive.google.com/drive/folders/1I1GgyolnsvmbltLSqXzN4eTQc0fbGuWA' }
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 2-2 SUBJECT NOTES',
          notes: [ 
            { title: 'Control systems.', url: '/Controlsystems' },
            { title: 'Electrical Machines II ', url: '/em_2' },
            { title: 'Digital-Design ', url: '/Dd' },
            { title: 'Transmission&Distribution ', url: '/Td' },
            { title: 'Power Systems - I', url: 'https://drive.google.com/drive/folders/1yem18C_smgP0CuxHcZFKcRI2XYhNWmU5' },
            { title: 'Laplace Transforms, Numerical methods  & Complex Variables', url: 'https://drive.google.com/drive/folders/1yem18C_smgP0CuxHcZFKcRI2XYhNWmU5' }
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 3-1 SUBJECT NOTES',
          notes: [
            { title: 'POWER ELECTRONICS.', url: 'https://drive.google.com/file/d/1dpT0NVz11yzcSaVZX1KxLKySojDriWLc/view?usp=drivesdk' },
            { title: 'EMI', url: 'https://drive.google.com/drive/folders/1jTOIbJObbAOw2NMMsvU7LHy0azU9sJes?usp=sharing' },
            { title: 'BEFA', url: 'https://drive.google.com/folderview?id=1qU3Wp6C_5uYKZjNfYOOlZFqkTtD7MgoL' },
            { title: 'EMF', url: 'https://drive.google.com/drive/folders/1yzZ-4jAxIrI4487neg14EbXKXVytMixC?usp=share_link' },
            { title: 'Measurements and Instrumentation', url: 'https://drive.google.com/file/d/1tPEDE8w2J18RWavqzgzMUWZDz9tJ_JYL/view?usp=share_link' },
            { title: 'Power Systems - I', url: 'https://drive.google.com/file/d/15K8qpNyCNkS0dNJsXo8CQ15uqavuR7dH/view?usp=share_link' },
            { title: 'Power Systems - II', url: 'https://drive.google.com/file/d/1-rovX4iCsTfukRsklls7DzUM2ltsit9h/view?usp=sharing' }
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 3-2 SUBJECT NOTES',
          notes: [
            { title: 'Signals and Systems', url: 'https://drive.google.com/file/d/1xOPb6iJcvAvHFOoIyTxpYMi6jTu31EqF/view?usp=share_link' },
            { title: 'Microprocessor and Micro controllers', url: 'https://drive.google.com/file/d/1odm974_F6Zhw7UIVuntQ0yDQKh4YHGRz/view?usp=share_link' },
            { title: 'Power system Protection Power system operation and control ', url: 'https://drive.google.com/file/d/1WH9oBNZ1nO_zFTrpH4sLSK-2b0FgKsxB/view?usp=share_link' },
            { title: 'ELECTRONIC SENSORS', url: 'https://drive.google.com/drive/folders/1n01CG4mOr998kjRE4fBnOp0qtON7V5ph?usp=sharing' },
            { title: 'DIGITAL SIGNAL PROCESSING', url: 'https://drive.google.com/drive/folders/1Co2hYgoCgbT0IPPm7V524oxu1Vs-vAUZ?usp=sharing' },
            { title: 'Power Semi Conductor Drive', url: 'https://drive.google.com/file/d/1N_Z2SMdY6pHGp5mG58j0iWUI-HRVLAJw/view?usp=share_link' },
            { title: 'NCES', url: 'https://drive.google.com/file/d/1M9PY-QIjerUYXtBG3bil1rb-KppReOxq/view?usp=sharing' }
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 4-1 SUBJECT NOTES',
          notes: [
            { title: 'Principles of Entrepreneurship', url: 'https://drive.google.com/file/d/1Mk1zjj1JQ5MjWnWBG9bxf1exnEUHrwv9/view?usp=drivesdk' },
            { title: 'Switch Gear and protection', url: 'https://drive.google.com/file/d/1-jQcs4kCgDi6WemKGfluBEMCr3gn2WBg/view?usp=drivesdk' },
            { title: 'Utilisation of Electrical Energy', url: 'https://drive.google.com/file/d/1syAxbnjCdKs5-YI6FsAL31SWXJwjxwoa/view?usp=drivesdk' },
            { title: 'Industrial electrical Systems', url: 'https://drive.google.com/file/d/1X3f-m6VAHYT51igXf79Onxp_Sn5fc1z0/view?usp=drivesdk' },
            { title: 'Digital control Systems', url: 'https://drive.google.com/drive/folders/1XHeaW5cNuQgHADTkiIMkm4EfHDx3uGsf' },
            { title: 'ELECTRICAL AND HYBRID VEHICLES', url: 'https://drive.google.com/file/d/1mzHeoQdQWI069tQK0CyG6RakxGdbu0o_/view?usp=sharing' },
            { title: 'HVDC', url: 'https://drive.google.com/file/d/1mKc_c7n2NxHE1RqXMcyqnGHrrdOoll3S/view?usp=drive_link' },
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 4-2 SUBJECT NOTES',
          notes: [
            { title: 'Power Quality and Facts', url: 'https://drive.google.com/file/d/1StjDnE6iXvHqJod8uXRaVAfQgPQVVgYP/view?usp=drive_link' },
            { title: 'EIA', url: 'https://drive.google.com/drive/folders/1A136SnWeRlzZ6lel49FT9cxZ4wobvHUU?usp=drive_link' },
            { title: 'NCES', url: 'https://drive.google.com/file/d/1LLoMq3seVGs4dJJIMf4S182ISSnDKSJs/view?usp=drive_link' }
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        }
      ]
    },
    ECE: {
      subjects: [
        {
          name: 'Semester 1-1 & 1-2 (COMMON SUBJECTS) SUBJECT NOTES',
          notes: [
            { title: 'MATHEMATICS-I', url: 'https://drive.google.com/drive/u/0/folders/1as25YSOvkMvSjjsRUHQiP_gnQK8zPjw9' },
            { title: 'Engineering Physics', url: 'https://drive.google.com/file/d/1XjbJHvRTcoM9gmywbre-2W2DKwthDKB0/view?usp=drivesdk' },
            { title: 'Chemistry', url: 'https://drive.google.com/file/d/1XXlLU-QAlM0DX_AvcRHdeonMIyxw_nTV/view?usp=drivesdk' },
            { title: 'PPS', url: 'https://drive.google.com/file/d/1XfpptZNhhl_hN-oLZ-_gMTx9phv32dOG/view?usp=drivesdk' },
            { title: 'BEE', url: 'https://drive.google.com/file/d/1_5rzLLCjhMAAUUaXSm0AJQzeDsSfEpsz/view?usp=drivesdk' },
            { title: 'Maths - II ', url: 'https://drive.google.com/drive/folders/1nfIXg1E5sKDmldR7PerdVOq3UvUQSPHu' },
            { title: 'Applied physics', url: 'https://drive.google.com/file/d/1XrYYeM1RYoRc-UxhfSMlm802KV83JLXh/view?usp=drivesdk' },
            { title: 'Engineering Mechanics', url: 'https://drive.google.com/file/d/1LkJflaFhpAsDCvv-N1Re4Caahv4mLju9/view?usp=drivesdk' }
            
          ],
          videos: ['Introduction to Circuits', 'Kirchhoff\'s Laws', 'AC Analysis'],
          roadmap: 'Start with basic circuit concepts, move to network analysis, then advanced topics.'
        },
        {
          name: 'Semester 2-1 SUBJECT NOTES',
          notes: [
            { title: 'Electronic Devices and Circuits', url: 'https://drive.google.com/drive/folders/1Lohpb4UX4I7pTAj_xbtNKBcgXe4rJilY?usp=sharing' },
            { title: 'Network Analysis and Transmission Lines', url: 'https://drive.google.com/drive/folders/1OoWTnQfxsnA_Dv3eWBoz9MxkmDmors1R?usp=sharing' },
            { title: 'Digital System  Design', url: 'https://drive.google.com/drive/folders/1Ls-4k0acfziFhySHWymoV878IGT2RWSQ?usp=sharing' },
            { title: 'Signals and Systems', url: 'https://drive.google.com/drive/folders/1o5aLF22PaFQsMYXA1Jv1HsIITSzMhCKv?usp=sharing' },
            { title: 'Probability Theory and Stochastic Processes', url: 'https://drive.google.com/drive/folders/1nn4F9TR-BTheDNf54Pq6-JJom5Gp6hGB?usp=sharing' },
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
      
        {
          name: 'Semester 3-1 SUBJECT NOTES',
          notes: [
            { title: 'BEFA ', url: 'https://drive.google.com/drive/folders/120BA9w2OLpMhvKGANuiUiKtAF35Z2IlA?usp=drive_link' },
            { title: 'Control Systems', url: 'https://drive.google.com/drive/folders/1-5X67cAIOsh9oI71S9ivk92FzzTLWVPu?usp=drive_link' },
            { title: 'DCN ', url: 'https://drive.google.com/drive/folders/11U_R1HVJbTuRKOka82C5sQT8RhxgDz4S?usp=drive_link' },
            { title: 'EMI', url: 'https://drive.google.com/drive/folders/104u-oou3krKifUeE3q5Rh1YeL-87Uv86?usp=drive_link' },
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 3-2 SUBJECT NOTES',
          notes: [
            { title: 'ANALOG ELECTRONICS', url: 'https://drive.google.com/file/d/1AccVzCaISxebdrOljjwCMbaO4Rd_SPrc/view?usp=sharing' },
            { title: 'LOW POWER VLSI CIRCUITS AND SYSTEMS', url: 'https://drive.google.com/file/d/1EAKsjfRu5dEStaideNy9fuImcsoYOZW4/view?usp=drivesdk' },
            { title: 'FOME ', url: 'https://drive.google.com/drive/folders/1gQ6F8dpKRSO7TPuhMnk417oN24aFA9U_?usp=drive_link' },
            { title: 'Embedded Systems Design', url: 'https://drive.google.com/drive/folders/1G77y1t5mGg2J0LlbzReSYBYidz8EcPlT?usp=drive_link' },
            { title: 'DIGITAL SIGNAL PROCESSING', url: 'https://drive.google.com/drive/folders/1yw4YTZxz2c2FcSFsAabwQruD-LsVZvit?usp=drive_link' },
            { title: 'AWP', url: 'https://drive.google.com/drive/folders/1O8t3cG5fhrK9cwT2rrqTb2_yK9WJsse6?usp=drive_link' },
           
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 4-1 SUBJECT NOTES',
          notes: [
            { title: 'Antennas and Propagation', url: 'https://drive.google.com/file/d/1TfV3Ermh30jx7wg39hYY-3S4ZBHS08ir/view?usp=share_link' },
            { title: 'Digital Signal Processing', url: 'https://drive.google.com/drive/folders/1yw4YTZxz2c2FcSFsAabwQruD-LsVZvit?usp=sharing' },
            { title: 'VLSI Design', url: 'https://drive.google.com/file/d/1YS6k7g9LYyazCCfSHvNLGvYtiHcvVN8m/view?usp=share_link' },
            { title: 'Computer Organization & Operating Systems', url: 'https://www.examupdt.in/p/Download' },
            { title: 'Electronic Measurements and Instrumentation', url: 'https://www.examupdt.in/p/Download' },
            { title: 'Object Oriented Programming through Java Embedded System Design', url: 'https://drive.google.com/file/d/1X8raM9aozZn6dLVF8bU67gJH7pc44L7S/view?usp=share_link' },
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 4-2 SUBJECT NOTES',
          notes: [
            { title: 'Radar Systems', url: 'https://drive.google.com/file/d/1ewV8CY2w31CJKPZ6yTPCdsILjWuigyQP/view?usp=sharing' },
            { title: 'Low Power VLSI Design', url: 'https://drive.google.com/file/d/1JWnZ9um7Sd9_8S6zFL6nFMdIexhptChd/view?usp=sharing' },
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        }
      ]
    },
    CSE: {
      subjects:  [
        {
          name: 'Semester 1-1 & 1-2 (COMMON SUBJECTS) SUBJECT NOTES',
          notes: [
            { title: 'MATHEMATICS-I', url: 'https://drive.google.com/drive/u/0/folders/1as25YSOvkMvSjjsRUHQiP_gnQK8zPjw9' },
            { title: 'Engineering Physics', url: 'https://drive.google.com/file/d/1XjbJHvRTcoM9gmywbre-2W2DKwthDKB0/view?usp=drivesdk' },
            { title: 'Chemistry', url: 'https://drive.google.com/file/d/1XXlLU-QAlM0DX_AvcRHdeonMIyxw_nTV/view?usp=drivesdk' },
            { title: 'PPS', url: 'https://drive.google.com/file/d/1XfpptZNhhl_hN-oLZ-_gMTx9phv32dOG/view?usp=drivesdk' },
            { title: 'BEE', url: 'https://drive.google.com/file/d/1_5rzLLCjhMAAUUaXSm0AJQzeDsSfEpsz/view?usp=drivesdk' },
            { title: 'Maths - II ', url: 'https://drive.google.com/drive/folders/1nfIXg1E5sKDmldR7PerdVOq3UvUQSPHu' },
            { title: 'Maths - III ', url: 'https://drive.google.com/drive/folders/18sRd9qtwkEvc4Dfssc1Wr3JXrcrntzPv' },
            { title: 'Applied physics', url: 'https://drive.google.com/file/d/1XrYYeM1RYoRc-UxhfSMlm802KV83JLXh/view?usp=drivesdk' },
            { title: 'Engineering Mechanics', url: 'https://drive.google.com/file/d/1LkJflaFhpAsDCvv-N1Re4Caahv4mLju9/view?usp=drivesdk' }
            
          ],
          videos: ['Introduction to Circuits', 'Kirchhoff\'s Laws', 'AC Analysis'],
          roadmap: 'Start with basic circuit concepts, move to network analysis, then advanced topics.'
        },
        {
          name: 'Semester 2-1 SUBJECT NOTES',
          notes: [
            { title: 'COA', url: 'https://drive.google.com/open?id=1cPkBLLeTVPsqrI6veaHeI5CZJdZHoCHv' },
            { title: 'OOP Using C++', url: 'https://drive.google.com/folderview?id=1-C9uNa-dIownVWLTDEt82cxkodRaKfNg' },
            { title: 'DS', url: 'https://drive.google.com/folderview?id=1bGtESaG142Rn_YmCufabc5nB6Skep0JW' },
            { title: 'C.O.S.M ', url: 'https://drive.google.com/file/d/1tG1PKAZxcMx40d_uhYlS6QZxOH2LrvPE/view?usp=drivesdk' },
            { title: 'ADE', url: 'https://drive.google.com/drive/folders/1Qe-Qoy6sgJaNjRRBoObqMSv6vLlPFCI9?usp=sharing' },
            { title: 'Cyber Security', url: 'https://drive.google.com/drive/folders/1zSWCQXYKga9CYkNs2o9y7zraH1GY1cQw?usp=sharing' }
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 2-2 SUBJECT NOTES',
          notes: [
            { title: 'BEFA  ', url: 'https://drive.google.com/folderview?id=1qU3Wp6C_5uYKZjNfYOOlZFqkTtD7MgoL' },
            { title: 'DISCRETE MATHEMATICS ', url: 'https://drive.google.com/drive/u/1/folders/1q4Cj3Fwr7aF9QKbbgINggiAECzhGygUN' },
            { title: 'DMS ', url: 'https://drive.google.com/folderview?id=1eYUAMA6rFjOF4sWB_ymR1627dg-_WrSw' },
            { title: 'OPERATING SYSTEMS', url: 'https://drive.google.com/folderview?id=1cpvko0m-lqwiK2XdVr4Uete6DjZlIczt' },
            { title: 'Java programming', url: 'https://drive.google.com/drive/folders/1TpbAD0xDI2vczzyBP9lv24GoDnQW0beF' }
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 3-1 SUBJECT NOTES',
          notes: [
            { title: 'ARTIFICIAL INTELLIGENCE', url: 'https://drive.google.com/drive/folders/1ikuCoElTnlu4L91ZEMpQUxMy_e7lGste?usp=sharing' },
            { title: ' COMPUTER NETWORKS ', url: 'https://drive.google.com/folderview?id=15Lx0xeWSkMpHK7BYy1dXRYF-YpGW8syE' },
            { title: 'COMPUTER GRAPHICS', url: 'https://drive.google.com/drive/folders/15x9O7oQz2e4h5CoRm0A67Wjfc3rEGsJB?usp=sharing' },
            { title: 'WEB TECHNOLOGIES', url: 'https://drive.google.com/drive/folders/1yp0lGLmua_YtmN6tb_U8HeOyx2MgLLsR?usp=sharing' },
            { title: 'IMAGE PROCESSING', url: 'https://drive.google.com/drive/folders/10H-nrdqC3m1THq7tyE6onom2slw3kw92?usp=sharing' },
            { title: 'SOFTWARE ENGINEERING', url: 'https://drive.google.com/file/d/15K8qpNyCNkS0dNJsXo8CQ15uqavuR7dH/view?usp=share_link' },
            { title: 'FLAT', url: 'https://drive.google.com/drive/folders/1tLkls29Ewa5ssAONAJNHhreNz08rTIR8?usp=sharing' },
            { title: 'INFORMATION RETRIEVAL SYSTEMS', url: 'hhttps://drive.google.com/file/d/1dH7BMfkhs1LH65DQsx8DuHx8rzGx-8Xv/view?usp=drivesdk' },
            { title: 'Distributed Databases', url: 'https://drive.google.com/file/d/16zozm1zGY-8QpR1Io5rUffeyGDahwZk7/view?usp=drivesdk' },
            { title: 'PPL ', url: 'https://drive.google.com/drive/folders/1b7V6IPgujkoV3tA1dCQD5mQvPlHtjrB8' },
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 3-2 SUBJECT NOTES',
          notes: [
            { title: 'DAA ', url: 'https://drive.google.com/folderview?id=15IsfdQRBcwQEzEBMJ7EbjOyNHWx35q4P' },
            { title: 'FUNDAMENTALS OF IOT', url: 'https://drive.google.com/drive/folders/1Fe8moCXngY3xikHU45nmoQLVgCMYGPoR?usp=sharing' },
            { title: 'COMPILER DESIGN ', url: 'https://drive.google.com/drive/folders/1zG8f9ScW01hjgmKPuMCny9eOcuodbPuQ?usp=sharing' },
            { title: 'EMACHINE LEARNING', url: 'https://drive.google.com/drive/folders/1mXyHxcfDlSBxXwadLF5W-EiyZvuUGPOM?usp=sharing' },
            { title: 'Mobile Application Development', url: 'https://drive.google.com/file/d/1oWWWFi6d9IjdKUzE2Xkmt-ppBfIYDNXu/view?usp=drivesdk' },
            { title: 'Software Testing Methodology', url: 'https://drive.google.com/file/d/1aD8JMxfG1W2lpL5o6MHg2x6oXaY0TWnR/view?usp=drivesdk' }
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 4-1 SUBJECT NOTES',
          notes: [
            { title: 'DATA MINING', url: 'https://drive.google.com/drive/folders/1nuVnu4sjXXeFGSBdBRa1P0gwT4bYedZy' },
            { title: 'CLOUD COMPUTING', url: 'https://drive.google.com/drive/folders/1WX9twPGmIUAbGzHAdEqNVb-2RDLOpqMu?usp=sharing' },
            { title: 'REAL TIME SYSTEMS', url: 'https://drive.google.com/drive/folders/1RYRYge0sbCkz686YbJTpUfHNuAKN0vYq?usp=sharing' },
            { title: 'ELECTRONIC SENSORS', url: 'https://drive.google.com/drive/folders/1n01CG4mOr998kjRE4fBnOp0qtON7V5ph?usp=sharing' },
            { title: 'Principles Of Entrepreneurship', url: 'https://drive.google.com/drive/folders/1PgJtKbnLYq0z78_KL8FOijTtbqOslvzQ?usp=sharing' },
            { title: 'Advance Algorithm', url: 'https://drive.google.com/drive/folders/1StOc32brAVi_3isivIgDUsePn6KhCg3w?usp=sharing' },
            { title: 'Advance algorithm ( Decode )', url: 'https://drive.google.com/drive/folders/1StOc32brAVi_3isivIgDUsePn6KhCg3w?usp=sharing' },
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 4-2 SUBJECT NOTES',
          notes: [
            { title: 'Organizational Behaviour', url: 'https://drive.google.com/file/d/1TSqphNXm-oUXJlBWTXOBTm3ZN19ySSbQ/view?usp=drivesdk' },
            { title: 'Human Computer Interaction', url: 'https://drive.google.com/drive/folders/1XFeaPndgFUFlnnN-fwR2Ss4POEcnnDA5' }
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        }
      ]
    },
    ME: {
      subjects: [
        {
          name: 'Semester 1-1 & 1-2 (COMMON SUBJECTS) SUBJECT NOTES',
          notes: [
            { title: 'MATHEMATICS-I', url: 'https://drive.google.com/drive/u/0/folders/1as25YSOvkMvSjjsRUHQiP_gnQK8zPjw9' },
            { title: 'Engineering Physics', url: 'https://drive.google.com/file/d/1XjbJHvRTcoM9gmywbre-2W2DKwthDKB0/view?usp=drivesdk' },
            { title: 'Chemistry', url: 'https://drive.google.com/file/d/1XXlLU-QAlM0DX_AvcRHdeonMIyxw_nTV/view?usp=drivesdk' },
            { title: 'PPS', url: 'https://drive.google.com/file/d/1XfpptZNhhl_hN-oLZ-_gMTx9phv32dOG/view?usp=drivesdk' },
            { title: 'BEE', url: 'https://drive.google.com/file/d/1_5rzLLCjhMAAUUaXSm0AJQzeDsSfEpsz/view?usp=drivesdk' },
            { title: 'Maths - II ', url: 'https://drive.google.com/drive/folders/1nfIXg1E5sKDmldR7PerdVOq3UvUQSPHu' },
            { title: 'Maths - III ', url: 'https://drive.google.com/drive/folders/18sRd9qtwkEvc4Dfssc1Wr3JXrcrntzPv' },
            { title: 'Applied physics', url: 'https://drive.google.com/file/d/1XrYYeM1RYoRc-UxhfSMlm802KV83JLXh/view?usp=drivesdk' },
            { title: 'Engineering Mechanics', url: 'https://drive.google.com/file/d/1LkJflaFhpAsDCvv-N1Re4Caahv4mLju9/view?usp=drivesdk' }
            
          ],
          videos: ['Introduction to Circuits', 'Kirchhoff\'s Laws', 'AC Analysis'],
          roadmap: 'Start with basic circuit concepts, move to network analysis, then advanced topics.'
        },
        {
          name: 'Semester 2-1 SUBJECT NOTES',
          notes: [
            { title: 'Probability and Statistics & Complex Variables ', url: 'https://drive.google.com/drive/folders/1US8j91nxZDALhS0d7J2lQsIWM1iVB7qv?usp=share_link' },
            { title: 'Mechanics of Solids', url: 'https://drive.google.com/file/d/14ZjZMxpoBtW6cUu-pKrtMHXKmrMEFcsH/view?usp=share_link' },
            { title: 'Production Technology', url: 'https://drive.google.com/file/d/1xjrIxKoyccMEsfQpLbZ5qwpLSHfJCQcf/view?usp=share_link' },
            { title: 'Thermodynamics', url: 'https://drive.google.com/file/d/1vODc_gmxl2UOF16Ddk3sZUAPzQ8bmWsV/view?usp=share_link' },
            { title: 'Fluid Mechanics  ', url: 'https://drive.google.com/file/d/18xwqKA7j9o78EvRe-ZePOPdz1a9LoZiH/view?usp=sharing' },
            { title: 'Industrial Engineering ', url: 'https://drive.google.com/file/d/1oARy3d_TJeC4DVjEm2k71x6HOJkhMWpQ/view?usp=sharing' },
            { title: 'Renewable Energy Sources ', url: 'https://drive.google.com/file/d/19JDpeNKD_Em4zgbwfyGjLSrTMsDwKQgy/view?usp=sharing' },
            { title: 'Operations Research ', url: 'https://drive.google.com/file/d/1JH-kD5ssgTPPoMIqhCNO9jNkUzI5fYx3/view?usp=sharing' },
            { title: 'Metrology ', url: 'https://drive.google.com/file/d/1j5OKT25FXwIVvPhBIZ5nOrcDlj6YRIka/view?usp=sharing' },
           
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 2-2 SUBJECT NOTES',
          notes: [
            { title: 'Basic Electrical Engineering  ', url: 'https://drive.google.com/drive/folders/1rvzjUgCVV68TJAq5mR940kRTFh3s0hGe?usp=sharing' },
            { title: 'Thermal Engineering 1 ', url: 'https://drive.google.com/drive/folders/1rvzjUgCVV68TJAq5mR940kRTFh3s0hGe?usp=sharing' },
            { title: 'Kinematics of Machinery ', url: 'https://drive.google.com/drive/folders/1rvzjUgCVV68TJAq5mR940kRTFh3s0hGe?usp=sharing' },
            { title: 'Instrumentation and Control Systems ', url: 'https://drive.google.com/drive/folders/1rvzjUgCVV68TJAq5mR940kRTFh3s0hGe?usp=sharing' },
            { title: 'Fluid Mechanics and Hydraulic Machines ', url: 'https://drive.google.com/drive/folders/1rvzjUgCVV68TJAq5mR940kRTFh3s0hGe?usp=sharing' },
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 3-1 SUBJECT NOTES',
          notes: [
            { title: 'Intellectual Property Rights', url: 'https://drive.google.com/drive/folders/1qlXNpemnw5BBPeR5t0v_XRGROWnWCW8z?usp=drive_link' },
           
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 3-2 SUBJECT NOTES',
          notes: [
            { title: 'CAD CAM  ', url: 'https://drive.google.com/drive/folders/1K41C86wCdLi1UC0yuHvO-gUyiuwe1Y-U?usp=sharing' },
            { title: 'Unconventional Machine Process', url: 'https://drive.google.com/drive/folders/1K41C86wCdLi1UC0yuHvO-gUyiuwe1Y-U?usp=sharing' },
            { title: 'Design of Machine Members 2 ', url: 'https://drive.google.com/drive/folders/1K41C86wCdLi1UC0yuHvO-gUyiuwe1Y-U?usp=sharing' },
            { title: 'Heat Transfer', url: 'https://drive.google.com/drive/folders/1K41C86wCdLi1UC0yuHvO-gUyiuwe1Y-U?usp=sharing' },
            { title: 'Fundamentals of Management', url: 'https://drive.google.com/drive/folders/1K41C86wCdLi1UC0yuHvO-gUyiuwe1Y-U?usp=sharing' },
            { title: 'Finite Element Methods', url: 'https://drive.google.com/drive/folders/1K41C86wCdLi1UC0yuHvO-gUyiuwe1Y-U?usp=sharing' },
            { title: 'Renewable Energy Sources  ', url: 'https://drive.google.com/drive/folders/1K41C86wCdLi1UC0yuHvO-gUyiuwe1Y-U?usp=sharing' }
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        // {
        //   name: 'Semester 4-1 SUBJECT NOTES',
        //   notes: [
        //     { title: 'DATA MINING', url: 'https://drive.google.com/drive/folders/1nuVnu4sjXXeFGSBdBRa1P0gwT4bYedZy' },
        //     { title: 'CLOUD COMPUTING', url: 'https://drive.google.com/drive/folders/1WX9twPGmIUAbGzHAdEqNVb-2RDLOpqMu?usp=sharing' },
        //     { title: 'REAL TIME SYSTEMS', url: 'https://drive.google.com/drive/folders/1RYRYge0sbCkz686YbJTpUfHNuAKN0vYq?usp=sharing' },
        //     { title: 'ELECTRONIC SENSORS', url: 'https://drive.google.com/drive/folders/1n01CG4mOr998kjRE4fBnOp0qtON7V5ph?usp=sharing' },
        //     { title: 'Principles Of Entrepreneurship', url: 'https://drive.google.com/drive/folders/1PgJtKbnLYq0z78_KL8FOijTtbqOslvzQ?usp=sharing' },
        //     { title: 'Advance Algorithm', url: 'https://drive.google.com/drive/folders/1StOc32brAVi_3isivIgDUsePn6KhCg3w?usp=sharing' },
        //     { title: 'Advance algorithm ( Decode )', url: 'https://drive.google.com/drive/folders/1StOc32brAVi_3isivIgDUsePn6KhCg3w?usp=sharing' },
        //   ],
        //   videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
        //   roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        // },
        // {
        //   name: 'Semester 4-2 SUBJECT NOTES',
        //   notes: [
        //     { title: 'Organizational Behaviour', url: 'https://drive.google.com/file/d/1TSqphNXm-oUXJlBWTXOBTm3ZN19ySSbQ/view?usp=drivesdk' },
        //     { title: 'Human Computer Interaction', url: 'https://drive.google.com/drive/folders/1XFeaPndgFUFlnnN-fwR2Ss4POEcnnDA5' }
        //   ],
        //   videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
        //   roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        // }
      ]
    },
    Civil: {
      subjects:  [
        {
          name: 'Semester 1-1 & 1-2 (COMMON SUBJECTS) SUBJECT NOTES',
          notes: [
            { title: 'MATHEMATICS-I', url: 'https://drive.google.com/drive/u/0/folders/1as25YSOvkMvSjjsRUHQiP_gnQK8zPjw9' },
            { title: 'Engineering Physics', url: 'https://drive.google.com/file/d/1XjbJHvRTcoM9gmywbre-2W2DKwthDKB0/view?usp=drivesdk' },
            { title: 'Chemistry', url: 'https://drive.google.com/file/d/1XXlLU-QAlM0DX_AvcRHdeonMIyxw_nTV/view?usp=drivesdk' },
            { title: 'PPS', url: 'https://drive.google.com/file/d/1XfpptZNhhl_hN-oLZ-_gMTx9phv32dOG/view?usp=drivesdk' },
            { title: 'BEE', url: 'https://drive.google.com/file/d/1_5rzLLCjhMAAUUaXSm0AJQzeDsSfEpsz/view?usp=drivesdk' },
            { title: 'Maths - II ', url: 'https://drive.google.com/drive/folders/1nfIXg1E5sKDmldR7PerdVOq3UvUQSPHu' },
            { title: 'Maths - III ', url: 'https://drive.google.com/drive/folders/18sRd9qtwkEvc4Dfssc1Wr3JXrcrntzPv' },
            { title: 'Applied physics', url: 'https://drive.google.com/file/d/1XrYYeM1RYoRc-UxhfSMlm802KV83JLXh/view?usp=drivesdk' },
            { title: 'Engineering Mechanics', url: 'https://drive.google.com/file/d/1LkJflaFhpAsDCvv-N1Re4Caahv4mLju9/view?usp=drivesdk' }
            
          ],
          videos: ['Introduction to Circuits', 'Kirchhoff\'s Laws', 'AC Analysis'],
          roadmap: 'Start with basic circuit concepts, move to network analysis, then advanced topics.'
        },
        {
          name: 'Semester 2-1 SUBJECT NOTES',
          notes: [
            { title: 'Fluid Mechanics', url: 'https://drive.google.com/drive/folders/1VA2sqKtAgp46sY_Av11OlxPh1azgbqCo' },
            { title: 'Engineering Geology  ', url: 'https://drive.google.com/drive/folders/1VA2sqKtAgp46sY_Av11OlxPh1azgbqCo' },
            { title: 'PROBABILITY AND STATISTICS ', url: 'https://drive.google.com/drive/folders/10d6AM4ykSbftToT7hagY7GjMklHU2Djc?usp=sharing' },
            { title: 'Strength of Materials - I ', url: 'https://drive.google.com/file/d/1CUMgSGef7tj8ZtksSDPpyHpSPjf27uRf/view?usp=sharing' },
            { title: 'Fluid Mechanics', url: 'https://drive.google.com/drive/folders/1Qe-Qoy6sgJaNjRRBoObqMSv6vLlPFCI9?usp=sharing' },
            { title: 'Building Materials and Construction', url: 'https://drive.google.com/drive/folders/1VA2sqKtAgp46sY_Av11OlxPh1azgbqCo' },
            { title: 'Basic Surveying', url: 'https://drive.google.com/drive/folders/1VA2sqKtAgp46sY_Av11OlxPh1azgbqCo' },
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 2-2 SUBJECT NOTES',
          notes: [
            { title: 'TRANSFORM CALCULUS, FOURIER SERIES AND NUMERICAL TECHNIQUES  ', url: 'https://drive.google.com/drive/folders/1h44JgLffHaV4YKpzbZ7kGbXtW3azkmXy' },
            { title: 'Steel Structures ', url: 'https://drive.google.com/drive/folders/1xpKENmrjBLfSolf_KimMsxT1ucV2o7gX' },
            { title: 'Environmental engineering ', url: 'https://drive.google.com/drive/folders/1xpKENmrjBLfSolf_KimMsxT1ucV2o7gX' },
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 3-1 SUBJECT NOTES',
          notes: [
            { title: 'Foundation Engineering ', url: 'https://drive.google.com/drive/folders/1xpKENmrjBLfSolf_KimMsxT1ucV2o7gX' },
            { title: ' Hydrology and water resource Engineering ', url: 'https://drive.google.com/drive/folders/1xpKENmrjBLfSolf_KimMsxT1ucV2o7gX' },
            { title: 'Pre Stressed Concrete', url: 'https://drive.google.com/drive/folders/1xpKENmrjBLfSolf_KimMsxT1ucV2o7gX' },
            { title: 'Environmental Engineering', url: 'https://drive.google.com/drive/folders/17YnbvdLdo-BxZnmoQS_SnqCu39ezBXYy' },
           
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 3-2 SUBJECT NOTES',
          notes: [
            { title: 'Foundation Engineering  ', url: 'https://drive.google.com/drive/folders/17YnbvdLdo-BxZnmoQS_SnqCu39ezBXYy' },
            { title: 'Design Of Steel Structures', url: 'https://drive.google.com/drive/folders/17YnbvdLdo-BxZnmoQS_SnqCu39ezBXYy' },
            { title: 'NCES', url: 'https://drive.google.com/file/d/1M9PY-QIjerUYXtBG3bil1rb-KppReOxq/view?usp=sharing' },
            { title: 'Environmental Science ', url: 'https://drive.google.com/drive/folders/17YnbvdLdo-BxZnmoQS_SnqCu39ezBXYy' },
           
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 4-1 SUBJECT NOTES',
          notes: [
            { title: 'Air pollution', url: 'https://drive.google.com/file/d/1geuIJzQ0h-1F_0FkC-vkgSt_rdJa6ihP/view?usp=drive_link' },
            { title: 'Solid And Waste Management', url: 'https://drive.google.com/drive/folders/1JuhDilJ7MR4SBqei1jGKMuLsiCn8phHO?usp=drive_link' }
            
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 4-2 SUBJECT NOTES',
          notes: [
            
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        }
      ]
    },
    B_PHARMACY: {
      subjects:  [
        {
          name: 'Semester 1-1 & 1-2 (COMMON SUBJECTS) SUBJECT NOTES',
          notes: [
            { title: 'Human Anatomy and Physiology I', url: 'https://drive.google.com/drive/folders/1dzP7-Q6CLF2yd_rqhNCcPvLuekf4qMH0?usp=sharing' },
            { title: 'Pharmaceutical Analysis I', url: 'https://drive.google.com/drive/folders/1dzP7-Q6CLF2yd_rqhNCcPvLuekf4qMH0?usp=sharing' },
            { title: 'Pharmaceutical Inorganic Chemistry I', url: 'https://drive.google.com/drive/folders/1dzP7-Q6CLF2yd_rqhNCcPvLuekf4qMH0?usp=sharing' },
            { title: 'Human Anatomy and Physiology II', url: 'https://drive.google.com/drive/folders/1dzP7-Q6CLF2yd_rqhNCcPvLuekf4qMH0?usp=sharing' },
            { title: 'Pathophysiology', url: 'https://drive.google.com/drive/folders/1X0B61luBSDWf8NLQpJjdrgq3QN--XxnF?usp=sharing' },
            { title: 'Biochemistry', url: 'https://drive.google.com/drive/folders/1X0B61luBSDWf8NLQpJjdrgq3QN--XxnF?usp=sharing' },
            { title: 'Pharmaceutical Organic Chemistry I ', url: 'https://drive.google.com/drive/folders/1X0B61luBSDWf8NLQpJjdrgq3QN--XxnF?usp=sharing' },
            { title: 'Computer Application in Pharmacy', url: 'https://drive.google.com/drive/folders/1X0B61luBSDWf8NLQpJjdrgq3QN--XxnF?usp=sharing' },
            
          ],
          videos: ['Introduction to Circuits', 'Kirchhoff\'s Laws', 'AC Analysis'],
          roadmap: 'Start with basic circuit concepts, move to network analysis, then advanced topics.'
        },
        {
          name: 'Semester 2-1 SUBJECT NOTES',
          notes: [
            { title: 'Pharmaceutical Organic Chemistry II', url: 'https://drive.google.com/drive/folders/19FEmJfw_2Tw_TcMd1XiZyuTOAdzi2Gf2?usp=sharing' },
            { title: 'Physical Pharmaceutics-I  ', url: 'https://drive.google.com/drive/folders/1XaFUTJmMM6QjeN5_Yl6-nNBElc4-V1Lt?usp=sharing' },
            { title: 'Pharmaceutical Microbiology ', url: 'https://drive.google.com/drive/folders/1XaFUTJmMM6QjeN5_Yl6-nNBElc4-V1Lt?usp=sharing' },
            { title: 'Pharmaceutical Engineering ', url: 'https://drive.google.com/drive/folders/1XaFUTJmMM6QjeN5_Yl6-nNBElc4-V1Lt?usp=sharing' },
           
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 2-2 SUBJECT NOTES',
          notes: [
            { title: 'Medicinal Chemistry- I  ', url: 'https://drive.google.com/drive/folders/1h44JgLffHaV4YKpzbZ7kGbXtW3azkmXy' },
            { title: '	Pharmaceutical Organic Chemistry-III ', url: 'https://drive.google.com/drive/folders/1xpKENmrjBLfSolf_KimMsxT1ucV2o7gX' },
            { title: 'Pharmacognosy and Phytochemistry-I ', url: 'https://drive.google.com/drive/folders/1xpKENmrjBLfSolf_KimMsxT1ucV2o7gX' },
            { title: '	Pharmacology-I ', url: 'https://drive.google.com/drive/folders/1xpKENmrjBLfSolf_KimMsxT1ucV2o7gX' },
            { title: '	Physical Pharmaceutics-II ', url: 'https://drive.google.com/drive/folders/1xpKENmrjBLfSolf_KimMsxT1ucV2o7gX' },
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 3-1 SUBJECT NOTES',
          notes: [
            { title: '	Industrial Pharmacy - I', url: 'https://drive.google.com/drive/folders/17M-Mdylb2Tkj_WSvhdg5Pvux8W1tAahW?usp=sharing' },
            { title: ' 	Medicinal Chemistry II', url: 'https://drive.google.com/drive/folders/17M-Mdylb2Tkj_WSvhdg5Pvux8W1tAahW?usp=sharing' },
            { title: 'Pharmacognosy and Phytochemistry - II', url: 'https://drive.google.com/drive/folders/17M-Mdylb2Tkj_WSvhdg5Pvux8W1tAahW?usp=sharing' },
            { title: '	Pharmacology II', url: 'https://drive.google.com/drive/folders/17M-Mdylb2Tkj_WSvhdg5Pvux8W1tAahW?usp=sharing' },
           
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 3-2 SUBJECT NOTES',
          notes: [
            { title: '	Biopharmaceutics and Pharmacokinetics  ', url: 'https://drive.google.com/drive/folders/1d_5k0-oAC_K6Gylmu-MtSo88XQUPzAQz?usp=sharing' },
            { title: 'Herbal Drug Technology', url: 'https://drive.google.com/drive/folders/1d_5k0-oAC_K6Gylmu-MtSo88XQUPzAQz?usp=sharing' },
            { title: 'Medicinal Chemistry III', url: 'https://drive.google.com/drive/folders/1d_5k0-oAC_K6Gylmu-MtSo88XQUPzAQz?usp=sharing' },
            { title: 'Pharmaceutical Biotechnology ', url: 'https://drive.google.com/drive/folders/1d_5k0-oAC_K6Gylmu-MtSo88XQUPzAQz?usp=sharing' },
            { title: 'PPharmaceutical Quality Assurance ', url: 'https://drive.google.com/drive/folders/1d_5k0-oAC_K6Gylmu-MtSo88XQUPzAQz?usp=sharing' },
            { title: 'Pharmacology  III ', url: 'https://drive.google.com/drive/folders/1d_5k0-oAC_K6Gylmu-MtSo88XQUPzAQz?usp=sharing' },
           
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 4-1 SUBJECT NOTES',
          notes: [
            { title: 'Industrial Pharmacy II', url: 'https://drive.google.com/drive/folders/1nQ8cNNOhQHd0zYnagIIM04Oz9vEBkn4l?usp=sharing' },
            { title: 'Instrument Method Analysis', url: 'https://drive.google.com/drive/folders/1nQ8cNNOhQHd0zYnagIIM04Oz9vEBkn4l?usp=sharing' },
            { title: '	Novel Drug Delivery Systems', url: 'https://drive.google.com/drive/folders/1nQ8cNNOhQHd0zYnagIIM04Oz9vEBkn4l?usp=sharing' },
            { title: '	Pharmacy Practice', url: 'https://drive.google.com/drive/folders/1nQ8cNNOhQHd0zYnagIIM04Oz9vEBkn4l?usp=sharing' },
            
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        },
        {
          name: 'Semester 4-2 SUBJECT NOTES',
          notes: [
            { title: '	Bio statistics and Research Methodology', url: 'https://drive.google.com/drive/folders/19E-juk8CSo65gbo9inM0IDe-bRW3QHTq?usp=sharing' },
            { title: '	Nano technology', url: 'https://drive.google.com/drive/folders/19E-juk8CSo65gbo9inM0IDe-bRW3QHTq?usp=sharing' },
            { title: '	Social and Preventive Pharmacy', url: 'https://drive.google.com/drive/folders/19E-juk8CSo65gbo9inM0IDe-bRW3QHTq?usp=sharing' },
            { title: 'Pharmaceutical Jurisprudence', url: 'https://drive.google.com/drive/folders/19E-juk8CSo65gbo9inM0IDe-bRW3QHTq?usp=sharing' },
            
          ],
          videos: ['Power System Basics', 'Transmission Fundamentals', 'Distribution Networks'],
          roadmap: 'Begin with generation concepts, understand transmission, finally distribution systems.'
        }
      ]
    },
    MBA: {
      subjects:  [
        {
          name: 'ALL- SUBJECT NOTES OF MBA',
          notes: [
            { title: 'Business Economics RMSA', url: 'https://drive.google.com/file/d/13uLYnR2kRtzLpfjQfuEQDNXDip1vzWrt/view' },
            { title: 'Investment Management', url: 'https://drive.google.com/file/d/1Atpy5qtPmn6UR4JAiq8Yy_DbHVBwNP3i/view?usp=sharing' },
            { title: 'Cross Culture Management', url: 'https://drive.google.com/file/d/1B44sWnIxMiVuFlP5au0K7lhqHJIOS6mH/view?usp=sharing' },
            { title: 'Financial Reporting and Analysis', url: 'https://drive.google.com/file/d/15teHf7H3DGiOYrN7yI9Axa6AQh-n0fvk/view?usp=sharing' },
            { title: 'Talent and Knowledge Management', url: 'https://drive.google.com/file/d/1sRk6nWdy34VHCZWzlNCi2Ix1lbJT6KMb/view?usp=sharing' },
            { title: 'International Human Resource', url: 'https://drive.google.com/file/d/1ET9koFwLifl9DMH482QnP5PXlwFmMs3R/view?usp=sharing' },
            { title: 'Financial Management', url: 'https://drive.google.com/file/d/116axIgJfXa0vuKMxqZZFcGiGWPJ4snyl/view?usp=sharing' },
            
          ],
          videos: ['Introduction to Circuits', 'Kirchhoff\'s Laws', 'AC Analysis'],
          roadmap: 'Start with basic circuit concepts, move to network analysis, then advanced topics.'
        },
      ]
    }
    
  };

  return (
    
    <Container fluid className="py-4">
      <Navbar/>
      {/* <h1 className="text-center mb-4">Engineering Learning Hub</h1> */}
      
      <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {Object.keys(courses).map((branch) => (
                <Nav.Item key={branch}>
                  <Nav.Link eventKey={branch} className="mb-2">
                    {branch}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
          
          <Col sm={9}>
            <Tab.Content>
              {Object.entries(courses).map(([branch, data]) => (
                <Tab.Pane key={branch} eventKey={branch}>
                  <h2 className="mb-4">{branch} Engineering</h2>
                  
                  {data.subjects.map((subject, index) => (
                    <Card key={index} className="mb-4">
                      <Card.Header className="bg-primary text-white">
                        <h3 className="mb-0">{subject.name}</h3>
                      </Card.Header>
                      
                      <Card.Body>
                        <Accordion>
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>Digital Notes & PDFs</Accordion.Header>
                            <Accordion.Body>
                              <ul>
                                {subject.notes.map((note, i) => (
                                  <li key={i}>
                                    {note.title}
                                    <Button 
                                      variant="link" 
                                      className="ms-2"
                                      href={note.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      Download PDF
                                    </Button>
                                  </li>
                                ))}
                              </ul>
                            </Accordion.Body>
                          </Accordion.Item>
                          
                          <Accordion.Item eventKey="1">
                            {/* <Accordion.Header>Video Lectures</Accordion.Header> */}
                            <Accordion.Body>
                              <ul>
                                {subject.videos.map((video, i) => (
                                  <li key={i}>
                                    {video}
                                    <Button variant="link" className="ms-2">Watch Video</Button>
                                  </li>
                                ))}
                              </ul>
                            </Accordion.Body>
                          </Accordion.Item>
                          
                          <Accordion.Item eventKey="2">
                            {/* <Accordion.Header>Learning Roadmap</Accordion.Header> */}
                            <Accordion.Body>
                              <p>{subject.roadmap}</p>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </Card.Body>
                    </Card>
                  ))}
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default LearningHub;