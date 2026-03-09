# Bariatric Surgery Care and Monitoring System

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

A comprehensive academic project for digitally monitoring and tracking patient health data before and after bariatric (weight-loss) surgery. Includes a **web application** for patient care management and a **Java-based DSA demonstration** of core data structures applied to healthcare data.

---

## Features

- **Secure Authentication** — Register and login with email, username, and password
- **Pre-Surgery Module** — Record baseline weight, height, BMI, medical conditions, and surgeon approval
- **Post-Surgery Monitoring** — Log check-ins with weight, blood pressure, and blood sugar tracking
- **Reports & Analytics** — Interactive weight chart, Excess Weight Loss (EWL%), BMI tracking, and detailed logs
- **Health Alerts** — Toast notifications for high BP (>140) and high blood sugar (>180)
- **Daily Motivation** — Async API integration that fetches a daily quote
- **Responsive Design** — Works on desktop, tablet, and mobile
- **DSA Demo** — Java program demonstrating ArrayList, Stack, Queue, HashMap, Search, and Sort

---

## Repository Structure

```
├── FWD/                    # Web Development Module
│   ├── login_page.html     # Authentication (Login / Sign Up)
│   ├── dashboard.html      # Main Dashboard (SPA)
│   ├── script.js           # Application logic & API integration
│   ├── style.css           # Login page styles
│   ├── styled.css          # Dashboard styles
│   └── README.md           # Detailed FWD documentation
│
├── DSA/                    # Data Structures & Algorithms Module
│   └── BariatricDSAProject.java
│
├── .gitignore
└── README.md               # This file
```

---

## Web Application (FWD)

A single-page dashboard application built with **HTML5, CSS3, and Vanilla JavaScript**.

### Tech Stack

| Technology | Usage |
|---|---|
| **HTML5** | Semantic structure, forms with native validation |
| **CSS3** | CSS Variables, Flexbox, Grid, Media Queries |
| **JavaScript (ES6+)** | DOM manipulation, LocalStorage, async/await Fetch API, toast notifications |
| **Chart.js** | Weight progression line chart |

### Quick Start
```bash
git clone https://github.com/dugganaboyinamohitvenkatsai-cloud/Bariatric-Surgery-Care-and-Monitoring-System.git
cd Bariatric-Surgery-Care-and-Monitoring-System
```
Then open `FWD/login_page.html` in your browser. No server or build tools required.

---

## DSA Module

A standalone **Java** program demonstrating how core data structures apply to patient monitoring:

| # | Concept | Application |
|---|---|---|
| 1 | **ArrayList** | Sequential patient monitoring records |
| 2 | **Stack (LIFO)** | Weight history in reverse order |
| 3 | **Queue (FIFO)** | Patient monitoring queue |
| 4 | **HashMap** | O(1) patient lookup by name |
| 5 | **Linear Search** | Find a specific weight record |
| 6 | **Bubble Sort** | Sort weight data ascending |

### Quick Start
```bash
cd DSA
javac BariatricDSAProject.java
java DSA.BariatricDSAProject
```

---

## Author

**Mohit Venkat Sai Dugganaboyina**
