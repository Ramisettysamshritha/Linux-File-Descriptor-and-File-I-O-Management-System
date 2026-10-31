// FILEFLOW - INDEXEDDB FILE MANAGEMENT SYSTEM

const FileFlow = (() => {
    const DB_NAME = "FileFlowDatabase";
    const DB_VERSION = 2;
    const STORE_NAME = "files";

    let databasePromise;

    // Open or create the database
   function openDatabase() {
    if (databasePromise) return databasePromise;

    databasePromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {
                    keyPath: "name"
                });
            }
        };

        request.onsuccess = function () {
            const db = request.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.close();
                databasePromise = null;
                reject(new Error("Files object store is missing. Please reload FileFlow."));
                return;
            }

            db.onversionchange = function () {
                db.close();
                databasePromise = null;
            };

            resolve(db);
        };

        request.onerror = function () {
            databasePromise = null;
            reject(request.error || new Error("Unable to open database."));
        };

        request.onblocked = function () {
            reject(new Error("Close other FileFlow tabs and reload this page."));
        };
    });

    return databasePromise;
}

    // Validate file names
    function validateName(name) {
        if (typeof name !== "string") {
            throw new Error("Please enter a valid file name.");
        }

        name = name.trim();

        if (!name) {
            throw new Error("File name cannot be empty.");
        }

        if (name.length > 120) {
            throw new Error("File name cannot exceed 120 characters.");
        }

        if (name.startsWith(".")) {
            throw new Error("Hidden file names are not allowed.");
        }

        if (/[\/\\:*?"<>|\x00-\x1F]/.test(name)) {
            throw new Error("File name contains invalid characters.");
        }

        if (name === "." || name === "..") {
            throw new Error("Invalid file name.");
        }

        return name;
    }

    // Perform a database request
    async function requestStore(mode, action) {
        const db = await openDatabase();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, mode);
            const store = transaction.objectStore(STORE_NAME);

            let request;

            try {
                request = action(store);
            } catch (error) {
                reject(error);
                return;
            }

            let result;

            request.onsuccess = () => {
                result = request.result;
            };

            request.onerror = () => {
                reject(request.error || new Error("Database request failed."));
            };

            transaction.oncomplete = () => resolve(result);

            transaction.onerror = () => {
                reject(transaction.error || new Error("Database transaction failed."));
            };

            transaction.onabort = () => {
                reject(transaction.error || new Error("Database transaction was cancelled."));
            };
        });
    }

    // CREATE FILE
    async function create(name) {
        name = validateName(name);

        const record = {
            name,
            content: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        try {
            await requestStore("readwrite", store => store.add(record));
            return `File "${name}" created successfully.`;
        } catch (error) {
            if (error.name === "ConstraintError") {
                throw new Error("A file with this name already exists.");
            }
            throw error;
        }
    }

    // GET FILE
    async function get(name) {
        name = validateName(name);
        return requestStore("readonly", store => store.get(name));
    }

    // WRITE FILE (overwrite content; create if missing)
    async function write(name, content) {
        name = validateName(name);

        const existing = await get(name);
        const now = new Date().toISOString();

        const record = {
            name,
            content: String(content),
            createdAt: existing ? existing.createdAt : now,
            updatedAt: now
        };

        await requestStore("readwrite", store => store.put(record));

        return `Content written successfully to "${name}".`;
    }

    // READ FILE
    async function read(name) {
        const record = await get(name);

        if (!record) {
            throw new Error(`File "${name}" does not exist.`);
        }

        return record.content;
    }

    // APPEND FILE (create it if it does not exist)
    async function append(name, content) {
        name = validateName(name);

        const existing = await get(name);
        const now = new Date().toISOString();

        const record = {
            name,
            content: (existing ? existing.content : "") + String(content),
            createdAt: existing ? existing.createdAt : now,
            updatedAt: now
        };

        await requestStore("readwrite", store => store.put(record));

        return `Content appended successfully to "${name}".`;
    }

    // COPY FILE
    async function copy(sourceName, destinationName) {
        sourceName = validateName(sourceName);
        destinationName = validateName(destinationName);

        if (sourceName === destinationName) {
            throw new Error("Source and destination names must be different.");
        }

        const source = await get(sourceName);

        if (!source) {
            throw new Error(`Source file "${sourceName}" does not exist.`);
        }

        const destination = {
            name: destinationName,
            content: source.content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        try {
            await requestStore("readwrite", store => store.add(destination));
        } catch (error) {
            if (error.name === "ConstraintError") {
                throw new Error(`Destination file "${destinationName}" already exists.`);
            }
            throw error;
        }

        return `File copied from "${sourceName}" to "${destinationName}".`;
    }

    // DELETE FILE
    async function remove(name) {
        name = validateName(name);

        const existing = await get(name);

        if (!existing) {
            throw new Error(`File "${name}" does not exist.`);
        }

        await requestStore("readwrite", store => store.delete(name));

        return `File "${name}" deleted successfully.`;
    }

    // VIEW ALL FILES (exclude hidden files)
    async function list() {
        const records = await requestStore("readonly", store => store.getAll());

        return records
            .filter(file => !file.name.startsWith("."))
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    return {
        openDatabase,
        validateName,
        create,
        get,
        write,
        read,
        append,
        copy,
        remove,
        list
    };
})();

window.FileFlow = FileFlow;