let refreshAttributes = () => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {
        if (transaction.type == "Income") 
            income += Number(transaction.amount);
        else 
            expense += Number(transaction.amount);
    });

    updateChart(income, expense);

    let currentBalance = document.querySelector("#current-balance");
    let totalIncome = document.querySelector("#total-income");
    let totalExpense = document.querySelector("#total-expense");
    let totalTransactions = document.querySelector("#total-transactions");

    currentBalance.textContent = `$${income - expense}`;
    totalIncome.textContent = `$${income}`;
    totalExpense.textContent = `$${expense}`;
    totalTransactions.textContent =`${transactions.length}`;
}

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
            const main = document.querySelector("main");
            const loginDiv = document.querySelector("#login-div");
            loginDiv.style.display = "none";
            main.style.display = "flex";
            
            const usernameDisplay = document.querySelector("#username-display");
            usernameDisplay.textContent = username;
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

    if (e.target.id == "add-transaction") {
        const dialog = document.querySelector("#add-transaction-dialog");
        const form = document.querySelector("#add-transaction-form");
        dialog.showModal();
        dialog.style.display = "flex";
    }

    if (e.target.id == "save-transaction") {
        e.preventDefault();

        const dialog = document.querySelector("#add-transaction-dialog");
        const form = document.querySelector("#add-transaction-form");

        const transactionType = document.querySelector("#transaction-type").value;
        const transactionDescription = document.querySelector("#transaction-description").value;
        const transactionAmount = document.querySelector("#transaction-amount").value;
        const transactionDate = document.querySelector("#transaction-date").value;
        const transactionCategory = document.querySelector("#transaction-category").value;

        if (transactionType.trim() == "" || transactionDescription.trim() == "" || transactionAmount.trim() == "" || transactionDate.trim() == "" || transactionCategory.trim() == "") 
        {
            window.alert("Please fill all fields correctly!");
            return;
        }

        var lsd = localStorage.getItem("transactions");
        if (lsd == null) {
            lsd = [];
        }
        else {
            lsd = JSON.parse(lsd);
        }

        lsd.push({
            date: transactionDate,
            description: transactionDescription,
            category: transactionCategory,
            amount: transactionAmount,
            type: transactionType
        })
        localStorage.setItem("transactions", JSON.stringify(lsd));

        const table = document.querySelector("table");
        table.innerHTML += `
            <tr>
                <td>
                    ${transactionDate}
                </td>
                <td>
                    ${transactionDescription}
                </td>
                <td>
                    ${transactionCategory}
                </td>
                <td>
                    ${transactionAmount}
                </td>
                <td>
                    
                </td>
            </tr>
        `
        let chart_ = document.querySelector("canvas");

        dialog.close();      
        dialog.style.display = "none";
        form.reset();
        refreshAttributes();
    }
    
    if (e.target.id == "reset-all-data") {
        localStorage.setItem("transactions", JSON.stringify([]));

        updateChart(0, 0);

        const table = document.querySelector("table");
        table.innerHTML = `
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
        `;

        let currentBalance = document.querySelector("#current-balance");
        let totalIncome = document.querySelector("#total-income");
        let totalExpense = document.querySelector("#total-expense");
        let totalTransactions = document.querySelector("#total-transactions");

        currentBalance.textContent = "$0";
        totalIncome.textContent = "$0";
        totalExpense.textContent = "$0";
        totalTransactions.textContent = "0";
    }

    if (e.target.id == "logout-button") {
        const main = document.querySelector("main");
        const loginDiv = document.querySelector("#login-div");
        main.style.display = "none";
        loginDiv.style.display = "flex";
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
updateChart(0, 0);

var lsd = localStorage.getItem("transactions");
    if (lsd != null) {

        const table = document.querySelector("table");

        lsd = JSON.parse(lsd);

        lsd.forEach(element => {
            table.innerHTML += `
            <tr>
                <td>
                    ${element.date}
                </td>
                <td>
                    ${element.description}
                </td>
                <td>
                    ${element.category}
                </td>
                <td>
                    ${element.amount}
                </td>
                <td>
                    
                </td>
            </tr>
            `

            refreshAttributes();
        });
        
    }

