document.addEventListener("click", (e) => {

    if (e.target.id == "register-here") {
        const loginDiv = document.querySelector("#login-div");

        const register = document.querySelector("#login");
        register.setAttribute("id", "register");
        register.textContent = "Register";

        const accountText = document.querySelector("#account-text");
        accountText.innerHTML = "Already have an account? <span id=\"login-here\">Login here</span>";
    }

    if (e.target.id == "login-here") {

        const login = document.querySelector("#register");
        login.setAttribute("id", "login");
        login.textContent = "Login";

        const accountText = document.querySelector("#account-text");
        accountText.innerHTML = "Don't have an account? <span id=\"register-here\">Register here</span>";
    }

    if (e.target.id == "login") {
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

        var lsd = localStorage.getItem("login-details");
        if (lsd == null) {
            window.alert("Invalid username or password!");
            return;
        }

        lsd = JSON.parse(lsd);

        if (lsd[username] == password) {
            const body = document.body;
            body.innerHTML = `<main>
        <div id="main-1">
            <div id="main-1-part-1">
                <div class="brandname-div">
                    <i class="ri-stack-fill"></i>
                    <div class="brandname">
                        <h2>FinTrack Pro</h2>
                        <p>Enterprise Finance</p>
                    </div>
                </div>
                <div class="buttons-div">
                    <button id="dashboard-button">
                        <i class="ri-layout-grid-line"></i>
                        Dashboard
                    </button>
                    <button id="settings-button">
                        <i class="ri-settings-3-fill"></i>
                        Settings
                    </button>
                </div>
            </div>
            <div id="main-1-part-2">
                <button id="add-transaction">
                    <i class="ri-add-line"></i>
                    Add Transaction
                </button>
            </div>
        </div>
        <div id="main-2">
            <div id="main-2-part-1">
                <div id="username-display">
                    Username
                </div>
                <button id="logout-button">
                    Logout
                </button>
            </div>
            <div id="main-2-part-2">
                <div id="heading">
                    <h1>Financial Overview</h1>
                    <p>Real-time tracking application</p>
                </div>
                <div id="part-1">
                    <div class="card" id="card-1">
                        <div class="card-icon blue-card-icon">
                            <i class="ri-bank-line"></i>
                        </div>
                        <p>Current Balance</p>
                        <div class="card-value" id="current-balance">
                            $0
                        </div>
                    </div>
                    <div class="card" id="card-2">
                        <div class="card-icon green-card-icon">
                            <i class="ri-arrow-right-up-line"></i>
                        </div>
                        <p>Total Income</p>
                        <div class="card-value" id="total-income">
                            $0
                        </div>
                    </div>
                    <div class="card" id="card-3">
                        <div class="card-icon red-card-icon">
                            <i class="ri-arrow-right-down-line"></i>
                        </div>
                        <p>Total Income</p>
                        <div class="card-value" id="total-expense">
                            $0
                        </div>
                    </div>
                    <div class="card" id="card-4">
                        <div class="card-icon blue-card-icon">
                            <i class="ri-hand-coin-line"></i>
                        </div>
                        <p>Total Income</p>
                        <div class="card-value" id="total-transactions">
                            0
                        </div>
                    </div>
                </div>
                <div id="part-2">
                    <h2>Cash Flow Analysis</h2>
                    <canvas id="cashFlowChart" style="box-sizing: border-box; display: block; height: 250px; width: 536.9px;" width="805" height="375"></canvas>
                </div>
                <div id="part-3">
                    <h2>Preferences</h2>
                    <div id="theme-preference">
                        <h4>Dark Mode</h4>
                        <label class="switch">
                            <input type="checkbox">
                            <span class="slider round"></span>
                        </label>
                    </div>
                    <button id="reset-all-data">
                        <i class="ri-delete-bin-4-line"></i>
                        Reset All Data
                    </button>
                </div>
                <div id="part-4">
                    <h2>All Transactions</h2>
                    <table>
                        <th>
                            DATE
                        </th>
                        <th>
                            DESCRIPTION
                        </th>
                        <th>
                            CATEGORY
                        </th>
                        <th>
                            AMOUNT
                        </th>
                        <th>
                            ACTIONS
                        </th>
                    </table>
                </div>
            </div>
        </div>
    </main>`;
        }
        else {
            window.alert("Invalid username or password!");
        }

        
    }

    if (e.target.id == "register") {
        const username = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;

        if (username.trim() == "" || password.trim() == "") {
            window.alert("Username and password cannot be blank");
        }

        var lsd = localStorage.getItem("login-details");
        if (lsd == null) {
            lsd = {};
        }

        else {
            lsd = JSON.parse(lsd);
        }
        
        if (Object.hasOwn(lsd, username)) {
            window.alert("User already exists");
        }

        else {
            lsd[username] = password;
            localStorage.setItem("login-details", JSON.stringify(lsd));
            window.alert("Registration Successful!");

            const login = document.querySelector("#register");
            login.setAttribute("id", "login");
            login.textContent = "Login";

            const accountText = document.querySelector("#account-text");
            accountText.innerHTML = "Don't have an account? <span id=\"register-here\">Register here</span>";
        }
    }
});

let myChart = null;
function updateChart(income, expense) {
        const ctx = document.getElementById('cashFlowChart').getContext('2d');
        if (myChart) { myChart.destroy(); }
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Income vs Expenses'],
                datasets: [
                    { label: 'Income', data: [income], backgroundColor: '#166534', borderRadius: 4 },
                    { label: 'Expenses', data: [expense], backgroundColor: '#991b1b', borderRadius: 4 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } },
                plugins: { legend: { position: 'top' } }
            }
        });
    }

let chart_ = document.querySelector("canvas");
chart_.addEventListener("click", () => {
    updateChart(0, 0);
});