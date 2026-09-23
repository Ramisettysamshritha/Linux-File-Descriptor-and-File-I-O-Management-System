# Linux File Descriptor and File I/O Management System

## Operating Systems and Systems Programming (25CS2104E)

### Team Details

- **Section:** 7
- **Team:** 14

### Team Members

- **Ramisetty Samshritha** (2520030045)
- **Gundla Laxmi Sri** (2520030264)

---

## Project Overview

The Linux File Descriptor and File I/O Management System is a menu-driven terminal application developed in C on Ubuntu Linux. The project performs basic file operations using Linux system calls and file descriptors instead of standard C library file functions.

It demonstrates how user programs communicate with the Linux kernel to create, read, write, append, copy, and delete files efficiently.

---

## Problem Statement

File management is an essential service provided by the Linux operating system. This project provides a simple command-line utility that performs low-level file operations using Linux file descriptors and system calls for efficient and reliable file handling.

---

## Objectives

- Create and open files.
- Read and write file contents.
- Append data to existing files.
- Copy files from one location to another.
- Delete files safely using Linux system calls.

---

## Features

1. Create File
2. Write File
3. Read File
4. Append File
5. Copy File
6. Delete File
7. Exit

---

## Linux Concepts Used

| Concept | Description |
|---------|-------------|
| File Descriptor | Integer identifier returned by `open()` |
| System Calls | Interface between user program and Linux kernel |
| File I/O | Reading and writing data using low-level APIs |
| File Pointer | Managed during append operations |

---

## Linux System Calls Used

| System Call | Purpose |
|-------------|---------|
| `open()` | Create or open files |
| `read()` | Read data from files |
| `write()` | Write data into files |
| `lseek()` | Move the file pointer |
| `close()` | Release file descriptor |
| `unlink()` | Delete a file |

---

## Advantages

- Uses low-level Linux system calls.
- Efficient file handling through file descriptors.
- Simple menu-driven interface.
- Demonstrates practical operating system concepts.
- Runs directly on Ubuntu Linux.

---

## Tools and Platform

- **Operating System:** Ubuntu Linux
- **Language:** C
- **Compiler:** GCC
- **Editor:** Nano / VS Code
- **Version Control:** Git & GitHub

---

## Compilation

```bash
gcc file_manager.c
```

## Execution

```bash
./a.out
```

---

## Sample Menu

```text
===== FILE MANAGEMENT SYSTEM =====

1. Create File
2. Write File
3. Read File
4. Append File
5. Copy File
6. Delete File
7. Exit
```

---

## Expected Outcome

The project provides a functional Linux terminal application capable of performing basic file management operations using file descriptors and Linux system calls while demonstrating practical Operating Systems and Systems Programming concepts.
