// FILEFLOW - OPERATIONS CONTROLLER

requireLogin();

const terminal = document.getElementById("terminalOutput");

// Display messages in the terminal
function showOutput(message, type = "success") {
    const line = document.createElement("p");

    line.textContent = "> " + message;
    line.className = type === "error" ? "terminal-error" : "terminal-success";

    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
}

// Handle errors
function showError(error) {
    showOutput(error.message || "Something went wrong.", "error");
}

// Switch between operation tabs
const operationTabs = document.querySelectorAll("[data-operation]");
const operationForms = document.querySelectorAll("[data-panel]");

operationTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const selected = tab.dataset.operation;

        operationTabs.forEach(item => item.classList.remove("active"));
        operationForms.forEach(form => form.classList.remove("active"));

        tab.classList.add("active");

        const selectedForm = document.querySelector(
            `[data-panel="${selected}"]`
        );

        if (selectedForm) {
            selectedForm.classList.add("active");
        }
    });
});

// CREATE FILE
document.getElementById("createForm").addEventListener("submit", async event => {
    event.preventDefault();

    try {
        const name = document.getElementById("createName").value;

        const result = await FileFlow.create(name);

        showOutput(result);
        event.target.reset();
    } catch (error) {
        showError(error);
    }
});

// WRITE FILE
document.getElementById("writeForm").addEventListener("submit", async event => {
    event.preventDefault();

    try {
        const name = document.getElementById("writeName").value;
        const content = document.getElementById("writeContent").value;

        const result = await FileFlow.write(name, content);

        showOutput(result);
        event.target.reset();
    } catch (error) {
        showError(error);
    }
});

// READ FILE
document.getElementById("readForm").addEventListener("submit", async event => {
    event.preventDefault();

    try {
        const name = document.getElementById("readName").value;
        const content = await FileFlow.read(name);

        showOutput(`Content of ${name}:`);

        const contentBox = document.createElement("pre");
        contentBox.className = "file-content-preview";
        contentBox.textContent = content || "(This file is empty.)";

        terminal.appendChild(contentBox);
        terminal.scrollTop = terminal.scrollHeight;

        event.target.reset();
    } catch (error) {
        showError(error);
    }
});

// APPEND FILE
document.getElementById("appendForm").addEventListener("submit", async event => {
    event.preventDefault();

    try {
        const name = document.getElementById("appendName").value;
        const content = document.getElementById("appendContent").value;

        const result = await FileFlow.append(name, content);

        showOutput(result);
        event.target.reset();
    } catch (error) {
        showError(error);
    }
});

// COPY FILE
document.getElementById("copyForm").addEventListener("submit", async event => {
    event.preventDefault();

    try {
        const source = document.getElementById("sourceName").value;
        const destination = document.getElementById("destinationName").value;

        const result = await FileFlow.copy(source, destination);

        showOutput(result);
        event.target.reset();
    } catch (error) {
        showError(error);
    }
});

// DELETE FILE
document.getElementById("deleteForm").addEventListener("submit", async event => {
    event.preventDefault();

    const name = document.getElementById("deleteName").value.trim();

    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
        showOutput("Delete operation cancelled.", "error");
        return;
    }

    try {
        const result = await FileFlow.remove(name);

        showOutput(result);
        event.target.reset();
    } catch (error) {
        showError(error);
    }
});

// EXIT
// EXIT APPLICATION
document.getElementById("exitButton").addEventListener("click", () => {
    if (confirm("Are you sure you want to exit FileFlow?")) {
        window.location.href = "index.html";
    }
});