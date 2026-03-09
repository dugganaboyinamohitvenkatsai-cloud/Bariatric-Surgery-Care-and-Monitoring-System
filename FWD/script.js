// =======================================
// Bariatric Surgery Care & Monitoring System
// Main Application Logic (script.js)
// =======================================

// ===== Toast Notification System =====

function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const icons = {
        success: '✓',
        warning: '!',
        error: '✗',
        info: 'i'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Auto-dismiss after 3.5 seconds
    setTimeout(() => {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ===== Password Visibility Toggle =====

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const btn = input.parentElement.querySelector('.toggle-password');

    if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = 'Hide';
    } else {
        input.type = 'password';
        btn.textContent = 'Show';
    }
}

// ===== Authentication =====

function login() {
    let email = document.getElementById("email").value.trim();
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let errorMsg = document.getElementById("error-msg");

    if (!email || !username || !password) {
        errorMsg.textContent = "Please fill all fields!";
        errorMsg.style.color = "#ef4444";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    let isValid = false;

    // Check credentials (hardcoded demo accounts or from local storage)
    if ((username === "Srinivas" || username === "admin") && password === "1234") {
        isValid = true;
    } else if (users[username]) {
        if (typeof users[username] === 'string' && users[username] === password) {
            isValid = true; // Legacy user support
        } else if (users[username].password === password && users[username].email === email) {
            isValid = true;
        }
    }

    if (isValid) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", username);
        window.location.href = "dashboard.html";
    } else {
        errorMsg.textContent = "Invalid email, username, or password!";
        errorMsg.style.color = "#ef4444";
    }
}

function signup() {
    let newEmail = document.getElementById("new-email").value.trim();
    let newUsername = document.getElementById("new-username").value.trim();
    let newPassword = document.getElementById("new-password").value.trim();
    let errorMsg = document.getElementById("signup-error-msg");

    if (!newEmail || !newUsername || !newPassword) {
        errorMsg.textContent = "Please fill all fields!";
        errorMsg.style.color = "#ef4444";
        return;
    }

    // Basic email validation
    if (!newEmail.includes('@') || !newEmail.includes('.')) {
        errorMsg.textContent = "Please enter a valid email address!";
        errorMsg.style.color = "#ef4444";
        return;
    }

    if (newPassword.length < 4) {
        errorMsg.textContent = "Password must be at least 4 characters!";
        errorMsg.style.color = "#ef4444";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[newUsername] || newUsername === "Srinivas" || newUsername === "admin") {
        errorMsg.textContent = "Username already exists!";
        errorMsg.style.color = "#ef4444";
    } else {
        users[newUsername] = { password: newPassword, email: newEmail };
        localStorage.setItem("users", JSON.stringify(users));
        errorMsg.textContent = "Registration successful! Redirecting to login...";
        errorMsg.style.color = "#10b981";
        setTimeout(() => toggleAuthMode(), 1500);
    }
}

function toggleAuthMode() {
    let loginBox = document.getElementById("login-box");
    let signupBox = document.getElementById("signup-box");

    if (loginBox.style.display === "none") {
        loginBox.style.display = "block";
        signupBox.style.display = "none";
        document.getElementById("error-msg").textContent = "";
        document.getElementById("email").value = "";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
    } else {
        loginBox.style.display = "none";
        signupBox.style.display = "block";
        document.getElementById("signup-error-msg").textContent = "";
        document.getElementById("new-email").value = "";
        document.getElementById("new-username").value = "";
        document.getElementById("new-password").value = "";
    }
}

// ===== Dashboard Protection & Initialization =====

if (window.location.pathname.includes("dashboard.html")) {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login_page.html";
    } else {
        window.addEventListener("DOMContentLoaded", () => {
            let currentUser = localStorage.getItem("currentUser") || "User";
            let h2 = document.getElementById("welcome-text");
            if (h2) h2.textContent = "Welcome, " + currentUser;

            let avatar = document.getElementById("user-avatar");
            if (avatar) avatar.src = "https://ui-avatars.com/api/?name=" + currentUser + "&background=0f4c81&color=fff&rounded=true";

            if (!localStorage.getItem("patientsData")) {
                localStorage.setItem("patientsData", JSON.stringify({}));
            }

            // CO4: Async API Integration — Daily Motivational Quote
            fetchDailyMotivation();
        });
    }
}

// ===== CO4: Async API Integration =====

async function fetchDailyMotivation() {
    let quoteEl = document.getElementById("daily-quote");
    if (!quoteEl) return;

    try {
        const response = await fetch("https://dummyjson.com/quotes/random");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        quoteEl.innerHTML = `"${data.quote}" <br><strong>- ${data.author}</strong>`;
    } catch (error) {
        quoteEl.textContent = `"Health is a state of body. Wellness is a state of being." - J. Stanford`;
        console.error("Failed to fetch quote:", error);
    }
}

// ===== Navigation =====

function showSection(sectionId) {
    document.getElementById("dashboardHome").classList.add("hidden");
    document.getElementById("preSection").classList.add("hidden");
    document.getElementById("postSection").classList.add("hidden");
    document.getElementById("reportSection").classList.add("hidden");

    let section = document.getElementById(sectionId);
    if (section) section.classList.remove("hidden");

    // Update active nav link
    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
    let activeNav = document.getElementById("nav-" + sectionId);
    if (activeNav) activeNav.classList.add("active");

    // Auto refresh reports when navigating to report section
    if (sectionId === 'reportSection') {
        viewReports();
    }
}

function goHome() {
    showSection('dashboardHome');
    // Re-activate the Dashboard Home nav item
    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
    let homeNav = document.getElementById("nav-dashboardHome");
    if (homeNav) homeNav.classList.add("active");
}

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("currentUser");
        window.location.href = "login_page.html";
    }
}

// ===== Pre-Surgery Data =====

function calculateBMI() {
    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value / 100;

    if (weight && height) {
        let bmi = (weight / (height * height)).toFixed(2);
        let category = "";

        if (bmi < 18.5) category = "Underweight";
        else if (bmi < 24.9) category = "Normal Weight";
        else if (bmi < 29.9) category = "Overweight";
        else category = "Obese";

        document.getElementById("bmiResult").textContent =
            "BMI: " + bmi + " (" + category + ")";
    } else {
        showToast("Please enter both weight and height first.", "warning");
    }
}

function savePreData() {
    let currentUser = localStorage.getItem("currentUser");
    if (!currentUser) { showToast("You must be logged in!", "error"); return; }

    let pname = document.getElementById("pname").value.trim();
    let age = document.getElementById("age").value;
    let weight = document.getElementById("weight").value;
    let height = document.getElementById("height").value;
    let approval = document.getElementById("approval").value;

    // Validate required fields
    if (!pname || !age || !weight || !height || !approval) {
        showToast("Please fill all required fields.", "warning");
        return;
    }

    let data = {
        name: pname,
        age: age,
        weight: weight,
        height: height,
        bmi: document.getElementById("bmiResult").textContent,
        conditions: document.getElementById("conditions").value,
        approval: approval,
        date: new Date().toISOString().split('T')[0]
    };

    let patientsData = JSON.parse(localStorage.getItem("patientsData")) || {};
    if (!patientsData[currentUser]) patientsData[currentUser] = {};
    patientsData[currentUser].preSurgery = data;

    if (!patientsData[currentUser].postSurgeryRecords) {
        patientsData[currentUser].postSurgeryRecords = [];
    }

    localStorage.setItem("patientsData", JSON.stringify(patientsData));
    showToast("Pre-Surgery data saved successfully!", "success");

    // Reset form fields
    document.getElementById("pname").value = "";
    document.getElementById("age").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("height").value = "";
    document.getElementById("conditions").value = "";
    document.getElementById("approval").value = "";
    document.getElementById("bmiResult").textContent = "";
}

// ===== Post-Surgery Data =====

function savePostData() {
    let weight = document.getElementById("postWeight").value;
    let bp = document.getElementById("bp").value;
    let sugar = document.getElementById("sugar").value;
    let symptoms = document.getElementById("symptoms").value;

    if (!weight || !bp || !sugar) {
        showToast("Please fill Weight, BP, and Sugar fields.", "warning");
        return;
    }

    // Health alerts via toast notifications
    if (bp > 140) {
        showToast("High Blood Pressure detected! (" + bp + " mmHg)", "warning");
    }

    if (sugar > 180) {
        showToast("High Blood Sugar detected! (" + sugar + " mg/dL)", "warning");
    }

    let data = {
        weight,
        bp,
        sugar,
        symptoms,
        date: new Date().toISOString().split('T')[0]
    };

    let currentUser = localStorage.getItem("currentUser");
    if (!currentUser) { showToast("You must be logged in!", "error"); return; }

    let patientsData = JSON.parse(localStorage.getItem("patientsData")) || {};
    if (!patientsData[currentUser]) patientsData[currentUser] = { preSurgery: null, postSurgeryRecords: [] };
    if (!patientsData[currentUser].postSurgeryRecords) patientsData[currentUser].postSurgeryRecords = [];

    patientsData[currentUser].postSurgeryRecords.push(data);

    localStorage.setItem("patientsData", JSON.stringify(patientsData));
    showToast("Monitoring data saved successfully!", "success");

    // Reset form fields
    document.getElementById("postWeight").value = "";
    document.getElementById("bp").value = "";
    document.getElementById("sugar").value = "";
    document.getElementById("symptoms").value = "";
}

// ===== Reports & Analytics =====

let weightChartInstance = null;

function viewReports() {
    let currentUser = localStorage.getItem("currentUser");
    if (!currentUser) return;

    let patientsData = JSON.parse(localStorage.getItem("patientsData")) || {};
    let userData = patientsData[currentUser];

    let metricsCards = document.getElementById("metricsCards");
    let reportOutput = document.getElementById("reportOutput");

    if (!userData || (!userData.preSurgery && (!userData.postSurgeryRecords || userData.postSurgeryRecords.length === 0))) {
        metricsCards.innerHTML = "";
        reportOutput.innerHTML = "<p class='empty-state'>No data available yet. Start by filling out the Pre-Surgery module.</p>";
        if (weightChartInstance) weightChartInstance.destroy();
        return;
    }

    let pre = userData.preSurgery;
    let records = userData.postSurgeryRecords || [];
    let latestPost = records.length > 0 ? records[records.length - 1] : null;

    // Calculate key metrics
    let ewlDisplay = "N/A";
    let currentBMI = pre ? pre.bmi : "N/A";
    let weightLossDisplay = "0 kg";
    let totalRecords = records.length;

    if (pre && latestPost) {
        let preWeight = parseFloat(pre.weight);
        let currentWeight = parseFloat(latestPost.weight);
        let heightM = parseFloat(pre.height) / 100;

        // Recalculate current BMI
        currentBMI = (currentWeight / (heightM * heightM)).toFixed(2);

        // EWL % (Excess Weight Loss) Calculation
        let idealWeight = 25 * (heightM * heightM);
        let excessWeight = preWeight - idealWeight;
        let weightLoss = preWeight - currentWeight;

        weightLossDisplay = weightLoss.toFixed(1) + " kg";

        if (excessWeight > 0) {
            let ewl = (weightLoss / excessWeight) * 100;
            ewlDisplay = ewl.toFixed(1) + "%";
        }
    }

    // Render Metrics Cards
    metricsCards.innerHTML = `
        <div class="metric-card">
            <h4>Total Weight Loss</h4>
            <div class="value">${weightLossDisplay}</div>
        </div>
        <div class="metric-card">
            <h4>Current BMI</h4>
            <div class="value">${currentBMI}</div>
        </div>
        <div class="metric-card">
            <h4>EWL % (Excess Weight Loss)</h4>
            <div class="value">${ewlDisplay}</div>
        </div>
        <div class="metric-card">
            <h4>Total Check-ins</h4>
            <div class="value">${totalRecords}</div>
        </div>
    `;

    // Render Logs using Semantic HTML Table (CO2)
    let htmlOutput = "";
    if (pre) {
        htmlOutput += `
            <div class="log-entry" style="background: rgba(15, 76, 129, 0.04); margin-bottom: 16px; border-radius: 10px;">
                <strong>Pre-Surgery Baseline (${pre.date}):</strong><br>
                Patient: ${pre.name || 'N/A'} | Weight: ${pre.weight}kg | Height: ${pre.height}cm | BMI: ${pre.bmi} | Clearance: ${pre.approval || 'Pending'}
            </div>
        `;
    }

    if (records.length > 0) {
        htmlOutput += `
            <table class="monitoring-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Weight (kg)</th>
                        <th>BP (Sys)</th>
                        <th>Sugar (mg/dL)</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // CO3: Array methods — slice, reverse, forEach
        records.slice().reverse().forEach(log => {
            htmlOutput += `
                <tr>
                    <td>${log.date}</td>
                    <td>${log.weight}</td>
                    <td>${log.bp}</td>
                    <td>${log.sugar}</td>
                    <td>${log.symptoms || "—"}</td>
                </tr>
            `;
        });

        htmlOutput += `
                </tbody>
            </table>
        `;
    }

    reportOutput.innerHTML = htmlOutput;

    // ===== Chart.js: Weight Progression =====

    let labels = [];
    let dataPoints = [];

    if (pre) {
        labels.push(pre.date || "Pre-Op");
        dataPoints.push(pre.weight);
    }

    records.forEach(r => {
        labels.push(r.date);
        dataPoints.push(r.weight);
    });

    const ctx = document.getElementById('weightProgressChart');
    if (ctx) {
        if (weightChartInstance) {
            weightChartInstance.destroy();
        }

        weightChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Weight Progression (kg)',
                    data: dataPoints,
                    borderColor: '#0f4c81',
                    backgroundColor: 'rgba(15, 76, 129, 0.08)',
                    borderWidth: 3,
                    pointBackgroundColor: '#3fa9f5',
                    pointBorderColor: '#0f4c81',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    fill: true,
                    tension: 0.35
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            font: { family: "'Inter', sans-serif", weight: 600 },
                            padding: 20
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Weight (kg)',
                            font: { family: "'Inter', sans-serif", weight: 600 }
                        },
                        grid: { color: 'rgba(0, 0, 0, 0.05)' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }
}