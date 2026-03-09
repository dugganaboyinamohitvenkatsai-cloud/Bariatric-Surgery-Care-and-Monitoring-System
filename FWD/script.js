function login() {
    let email = document.getElementById("email").value.trim();
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let errorMsg = document.getElementById("error-msg");

    if (!email || !username || !password) {
        errorMsg.textContent = "Please fill all fields!";
        errorMsg.style.color = "red";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    let isValid = false;

    // Check credentials (hardcoded or from local storage)
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
        errorMsg.style.color = "red";
    }
}

function signup() {
    let newEmail = document.getElementById("new-email").value.trim();
    let newUsername = document.getElementById("new-username").value.trim();
    let newPassword = document.getElementById("new-password").value.trim();
    let errorMsg = document.getElementById("signup-error-msg");

    if (!newEmail || !newUsername || !newPassword) {
        errorMsg.textContent = "Please fill all fields!";
        errorMsg.style.color = "red";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[newUsername] || newUsername === "Srinivas" || newUsername === "admin") {
        errorMsg.textContent = "Username already exists!";
        errorMsg.style.color = "red";
    } else {
        users[newUsername] = { password: newPassword, email: newEmail };
        localStorage.setItem("users", JSON.stringify(users));
        errorMsg.textContent = "Registration successful! Please sign in.";
        errorMsg.style.color = "green";
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

// Protect dashboard page
if (window.location.pathname.includes("dashboard.html")) {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login_page.html";
    } else {
        // Initialize dashboard UI
        window.addEventListener("DOMContentLoaded", () => {
            let currentUser = localStorage.getItem("currentUser") || "User";
            let h2 = document.getElementById("welcome-text");
            if (h2) h2.textContent = "Welcome, " + currentUser;

            let avatar = document.getElementById("user-avatar");
            if (avatar) avatar.src = "https://ui-avatars.com/api/?name=" + currentUser + "&background=0f4c81&color=fff&rounded=true";

            if (!localStorage.getItem("patientsData")) {
                localStorage.setItem("patientsData", JSON.stringify({}));
            }

            // CO4: Async API Integration
            fetchDailyMotivation();
        });
    }
}

// CO4: Async API Integration
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

    // Auto refresh reports if going to report section
    if (sectionId === 'reportSection') {
        viewReports();
    }
}

function goHome() {
    showSection('dashboardHome');
}

function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    window.location.href = "login_page.html";
}
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
    }
}

function savePreData() {
    let currentUser = localStorage.getItem("currentUser");
    if (!currentUser) { alert("You must be logged in!"); return; }

    let data = {
        name: document.getElementById("pname").value,
        age: document.getElementById("age").value,
        weight: document.getElementById("weight").value,
        height: document.getElementById("height").value,
        bmi: document.getElementById("bmiResult").textContent,
        conditions: document.getElementById("conditions").value,
        approval: document.getElementById("approval").value,
        date: new Date().toISOString().split('T')[0]
    };

    let patientsData = JSON.parse(localStorage.getItem("patientsData")) || {};
    if (!patientsData[currentUser]) patientsData[currentUser] = {};
    patientsData[currentUser].preSurgery = data;

    if (!patientsData[currentUser].postSurgeryRecords) {
        patientsData[currentUser].postSurgeryRecords = [];
    }

    localStorage.setItem("patientsData", JSON.stringify(patientsData));
    alert("Pre-Surgery Data Saved Successfully!");
}
function savePostData() {
    let weight = document.getElementById("postWeight").value;
    let bp = document.getElementById("bp").value;
    let sugar = document.getElementById("sugar").value;
    let symptoms = document.getElementById("symptoms").value;

    let alertMessage = "";

    if (bp > 140) {
        alertMessage += "High Blood Pressure Alert!\n";
    }

    if (sugar > 180) {
        alertMessage += "High Blood Sugar Alert!\n";
    }

    if (alertMessage !== "") {
        alert(alertMessage);
    }

    let data = {
        weight,
        bp,
        sugar,
        symptoms,
        date: new Date().toISOString().split('T')[0]
    };

    let currentUser = localStorage.getItem("currentUser");
    if (!currentUser) { alert("You must be logged in!"); return; }

    let patientsData = JSON.parse(localStorage.getItem("patientsData")) || {};
    if (!patientsData[currentUser]) patientsData[currentUser] = { preSurgery: null, postSurgeryRecords: [] };
    if (!patientsData[currentUser].postSurgeryRecords) patientsData[currentUser].postSurgeryRecords = [];

    patientsData[currentUser].postSurgeryRecords.push(data);

    localStorage.setItem("patientsData", JSON.stringify(patientsData));
    alert("Monitoring Data Saved Successfully!");
}
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
        reportOutput.innerHTML = "<p class='empty-state'>No data available. Please fill out Pre-Surgery care first.</p>";
        if (weightChartInstance) weightChartInstance.destroy();
        return;
    }

    let pre = userData.preSurgery;
    let records = userData.postSurgeryRecords || [];
    let latestPost = records.length > 0 ? records[records.length - 1] : null;

    // Calculate EWL % (Excess Weight Loss)
    let ewlDisplay = "N/A";
    let currentBMI = pre ? pre.bmi : "N/A";
    let weightLossDisplay = "0 kg";

    if (pre && latestPost) {
        let preWeight = parseFloat(pre.weight);
        let currentWeight = parseFloat(latestPost.weight);
        let heightM = parseFloat(pre.height) / 100;

        // Calculate new BMI
        currentBMI = (currentWeight / (heightM * heightM)).toFixed(2);

        // EWL Calc
        let idealWeight = 25 * (heightM * heightM);
        let excessWeight = preWeight - idealWeight;
        let weightLoss = preWeight - currentWeight;

        weightLossDisplay = weightLoss.toFixed(1) + " kg";

        if (excessWeight > 0) {
            let ewl = (weightLoss / excessWeight) * 100;
            ewlDisplay = ewl.toFixed(1) + "%";
        }
    }

    // Update Metrics Dashboard
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
    `;

    // Render Logs Output
    let htmlOutput = "";
    if (pre) {
        htmlOutput += `
            <div class="log-entry" style="background: rgba(15, 76, 129, 0.05); margin-bottom: 20px;">
                <strong>Pre-Surgery Baseline (${pre.date}):</strong><br>
                Weight: ${pre.weight}kg | Height: ${pre.height}cm | BMI: ${pre.bmi} | Clearance: ${pre.approval || 'Pending'}
            </div>
        `;
    }

    // CO2: Using Semantic HTML Tables instead of just divs
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

        records.slice().reverse().forEach(log => {
            htmlOutput += `
                <tr>
                    <td>${log.date}</td>
                    <td>${log.weight}</td>
                    <td>${log.bp}</td>
                    <td>${log.sugar}</td>
                    <td>${log.symptoms || "None"}</td>
                </tr>
            `;
        });

        htmlOutput += `
                </tbody>
            </table>
        `;
    }

    reportOutput.innerHTML = htmlOutput;

    // Render Chart using Chart.js
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
                    backgroundColor: 'rgba(15, 76, 129, 0.1)',
                    borderWidth: 3,
                    pointBackgroundColor: '#3fa9f5',
                    pointRadius: 5,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        title: { display: true, text: 'Weight (kg)' }
                    }
                }
            }
        });
    }
}