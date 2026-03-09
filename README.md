# Bariatric Surgery Care and Monitoring System

A comprehensive academic project for digitally monitoring and tracking patient health data before and after bariatric (weight-loss) surgery. The project includes a **full-stack web application** for patient care management and a **Java-based DSA demonstration** showcasing core data structure concepts applied to healthcare data.

---

## 📁 Repository Structure

```
├── FWD/                    # Full-Stack Web Development Module
│   ├── login_page.html     # Authentication (Login / Sign Up)
│   ├── dashboard.html      # Main SPA Dashboard
│   ├── script.js           # Application logic & API integration
│   ├── style.css           # Login page styles
│   ├── styled.css          # Dashboard styles (Grid, Flexbox, Variables)
│   └── README.md           # Detailed FWD documentation & rubric mapping
│
├── DSA/                    # Data Structures & Algorithms Module
│   └── BariatricDSAProject.java  # Java DSA demo (ArrayList, Stack, Queue, Search, Sort)
│
├── .gitignore
└── README.md               # ← You are here
```

---

## 🩺 Web Application (FWD)

A single-page dashboard application built with **HTML5, CSS3, and Vanilla JavaScript** where users can:

- **Register & Login** with email, username, and password
- Record **Pre-Surgery Baseline Data** (weight, height, BMI, medical conditions, surgeon approval)
- Log **Post-Surgery Check-ins** (weight, blood pressure, blood sugar, symptoms)
- View **Reports & Analytics** — weight progression chart, Excess Weight Loss (EWL%), current BMI
- Receive **Daily Motivational Quotes** via async API integration

### Tech Stack
| Technology | Usage |
|---|---|
| HTML5 | Semantic structure, forms with native validation |
| CSS3 | CSS Variables, Flexbox, Grid, Media Queries |
| JavaScript (ES6+) | DOM manipulation, LocalStorage, async/await Fetch API |
| Chart.js | Dynamic weight progression line chart |

### Quick Start
1. Clone the repository
2. Open `FWD/login_page.html` in your browser
3. Sign up for an account and start exploring the dashboard

> No server or build tools required — runs entirely in the browser.

---

## 🧮 DSA Module

A standalone **Java** program demonstrating how core data structures and algorithms apply to bariatric patient monitoring data:

| Concept | Application |
|---|---|
| **ArrayList** | Storing sequential patient monitoring records |
| **Stack (LIFO)** | Viewing weight history in reverse chronological order |
| **Queue (FIFO)** | Managing patient monitoring queue |
| **Linear Search** | Finding a specific weight record |
| **Bubble Sort** | Sorting weight data in ascending order |

### Quick Start
```bash
cd DSA
javac BariatricDSAProject.java
java DSA.BariatricDSAProject
```

---

## 🛠️ Installation

```bash
git clone https://github.com/dugganaboyinamohitvenkatsai-cloud/Bariatric-Surgery-Care-and-Monitoring-System.git
cd Bariatric-Surgery-Care-and-Monitoring-System
```

Then open `FWD/login_page.html` in your browser to use the web app, or compile and run the Java file for the DSA demo.

---

## 👤 Author

**Mohit Venkat Sai Dugganaboyina**
