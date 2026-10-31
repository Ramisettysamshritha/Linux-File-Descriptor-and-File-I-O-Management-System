// FILEFLOW AUTHENTICATION SYSTEM

const USERS_KEY = "fileflowUsers";
const SESSION_KEY = "fileflowCurrentUser";

// Get registered users
function getUsers() {
    try {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch (error) {
        return [];
    }
}

// SIGNUP
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const message = document.getElementById("signupMessage");

        if (!name || !email || !password) {
            message.textContent = "Please fill in all fields.";
            return;
        }

        if (password.length < 6) {
            message.textContent = "Password must contain at least 6 characters.";
            return;
        }

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match.";
            return;
        }

        const users = getUsers();

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            message.textContent = "This email is already registered.";
            return;
        }

        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);

        try {
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
            message.style.color = "green";
            message.textContent = "Account created successfully! Redirecting...";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);
        } catch (error) {
            message.textContent = "Unable to save account. Browser storage may be full.";
        }
    });
}

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;
        const message = document.getElementById("loginMessage");

        const users = getUsers();

        const user = users.find(
            user => user.email === email && user.password === password
        );

        if (!user) {
            message.textContent = "Invalid email or password.";
            return;
        }

        try {
            sessionStorage.setItem(SESSION_KEY, JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email
            }));

            message.style.color = "green";
            message.textContent = "Login successful! Redirecting...";

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 700);
        } catch (error) {
            message.textContent = "Unable to start your session.";
        }
    });
}

// LOGOUT
function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = "login.html";
}

// GET CURRENT USER
function getCurrentUser() {
    try {
        return JSON.parse(sessionStorage.getItem(SESSION_KEY));
    } catch (error) {
        return null;
    }
}

// PROTECT PRIVATE PAGES
function requireLogin() {
    if (!getCurrentUser()) {
        window.location.href = "login.html";
    }
}