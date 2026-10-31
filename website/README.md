# FileFlow – File Management System

## 1. Project Overview

FileFlow is a web-based File Management System developed as an Operating Systems academic project.

It allows users to perform basic file operations through a simple and user-friendly interface.

The system demonstrates file management concepts such as creating, reading, writing, appending, copying, deleting, and viewing files.

## 2. Project Objectives

- Understand basic file management concepts.
- Implement common file operations.
- Store and retrieve file contents.
- Develop a user-friendly interface.
- Demonstrate practical Operating Systems concepts.

## 3. Features

FileFlow provides the following features:

1. **Create File:** Creates a new empty file.
2. **Write File:** Writes or replaces file content.
3. **Read File:** Displays the content of a file.
4. **Append File:** Adds content without removing existing content.
5. **Copy File:** Creates a duplicate of an existing file.
6. **Delete File:** Removes a selected file.
7. **View Files:** Displays all available files.
8. **Download File:** Downloads files to the computer.
9. **User Authentication:** Provides demo signup and login functionality.
10. **Dashboard:** Displays file count and storage information.

## 4. Technologies Used

| Technology | Purpose |
|---|---|
| HTML | Website structure |
| CSS | Website styling |
| JavaScript | Application functionality |
| IndexedDB | Browser-based file storage |
| Local Storage | Demo user information |

## 5. Project Structure

```text
fileflow/
│
├── assets/
│   └── images/
│
├── c-program/
│   └── file_manager.c
│
├── css/
│   ├── style.css
│   ├── auth.css
│   └── app.css
│
├── js/
│   ├── auth.js
│   ├── dashboard.js
│   ├── file-manager.js
│   ├── files.js
│   ├── main.js
│   ├── operations.js
│   └── profile.js
│
├── index.html
├── login.html
├── signup.html
├── dashboard.html
├── operations.html
├── files.html
├── about.html
├── profile.html
│
└── README.md
```

## 6. System Architecture

```text
        USER
          |
          v
    FILEFLOW WEBSITE
          |
          v
    USER INTERFACE
          |
          v
    JAVASCRIPT LOGIC
          |
          v
     INDEXEDDB
          |
          v
    FILE OPERATIONS
          |
          v
 CREATE / READ / WRITE
 APPEND / COPY / DELETE
```

## 7. How to Run the Project

1. Download or clone the project.
2. Open the `fileflow` folder in Visual Studio Code.
3. Install the Live Server extension.
4. Open `index.html`.
5. Right-click and select **Open with Live Server**.
6. Sign up for a demo account.
7. Log in and access the dashboard.
8. Navigate to File Operations to manage files.

## 8. Storage Information

FileFlow uses IndexedDB to store file names and contents in the browser.

The stored files remain available in the same browser and website origin.

Users can download their files to their computers.

The demo authentication system uses browser storage and is not suitable for production security.

## 9. Advantages

- Simple and user-friendly interface.
- Supports seven basic file operations.
- Persistent browser-based storage.
- No backend server required for file operations.
- Responsive design.
- Easy file downloading.

## 10. Conclusion

FileFlow demonstrates the working principles of a basic File Management System through a web-based application.

It provides practical understanding of file operations and storage concepts using HTML, CSS, JavaScript, and IndexedDB.

The project helps connect theoretical Operating Systems concepts with practical implementation.
