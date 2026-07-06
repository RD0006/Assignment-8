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
            const loginDiv = document.querySelector("#login-div");
            body.removeChild(loginDiv);
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