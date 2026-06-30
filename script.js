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

        const lsd = localStorage.getItem("login-details");
        if (lsd == null) {
            window.alert("Invalid username or password!")
            return;
        }

        lsd = JSON.parse(lsd);

        if (lsd[username] == password) {
            console.log("Login Successful");
        }
        else {
            console.log("Login Unsuccessful");
        }
    }
});