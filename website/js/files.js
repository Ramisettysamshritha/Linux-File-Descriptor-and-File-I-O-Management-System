
// FILEFLOW - VIEW FILES

requireLogin();

const fileTableBody = document.getElementById("fileTableBody");
const totalFiles = document.getElementById("totalFiles");
const totalStorage = document.getElementById("totalStorage");
const emptyMessage = document.getElementById("emptyMessage");
const directoryOutput = document.getElementById("directoryOutput");

function formatSize(bytes) {
    if (bytes === 0) return "0 Bytes";

    if (bytes < 1024) return bytes + " Bytes";

    if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(2) + " KB";
    }

    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

function formatDate(date) {
    return new Date(date).toLocaleString();
}

async function loadFiles() {
    try {
        const files = await FileFlow.list();

        fileTableBody.replaceChildren();
        directoryOutput.replaceChildren();

        totalFiles.textContent = files.length;

        let storageUsed = 0;

        if (files.length === 0) {
    emptyMessage.hidden = false;

    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 4;
    cell.textContent = "No files available.";

    row.appendChild(cell);
    fileTableBody.appendChild(row);

    directoryOutput.textContent = "Directory is empty.";

} else {
    emptyMessage.hidden = true;

    files.forEach(file => {
        const size = new Blob([file.content || ""]).size;
        storageUsed += size;

        const row = document.createElement("tr");

        const values = [
            "📄 " + file.name,
            formatSize(size),
            formatDate(file.createdAt),
            formatDate(file.updatedAt)
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        fileTableBody.appendChild(row);

        const line = document.createElement("p");
        line.textContent = file.name;
        directoryOutput.appendChild(line);
    });
}

        totalStorage.textContent = formatSize(storageUsed);

    } catch (error) {
        fileTableBody.replaceChildren();

        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 4;
        cell.textContent = error.message;

        row.appendChild(cell);
        fileTableBody.appendChild(row);

        emptyMessage.hidden = true;
    }
}

document.getElementById("refreshFiles").addEventListener("click", loadFiles);

loadFiles();
