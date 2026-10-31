
// FILEFLOW - PROFILE MANAGEMENT

requireLogin();

const currentUser = getCurrentUser();

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profileAvatar = document.getElementById("profileAvatar");

function displayProfile(user) {
    profileName.textContent = user.name;
    profileEmail.textContent = user.email;

    profileAvatar.textContent = user.name
        .charAt(0)
        .toUpperCase();

    document.getElementById("profileNameInput").value = user.name;
    document.getElementById("profileEmailInput").value = user.email;

    const users = JSON.parse(localStorage.getItem("fileflowUsers")) || [];
    const storedUser = users.find(item => item.id === user.id);

    document.getElementById("accountCreated").value =
        storedUser && storedUser.createdAt
            ? new Date(storedUser.createdAt).toLocaleDateString()
            : "Not available";
}

if (currentUser) {
    displayProfile(currentUser);
}

// UPDATE PERSONAL INFORMATION

document.getElementById("profileForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const newName = document.getElementById("profileNameInput").value.trim();
    const message = document.getElementById("profileMessage");

    if (!newName) {
        message.textContent = "Please enter your name.";
        return;
    }

    try {
        const users = JSON.parse(localStorage.getItem("fileflowUsers")) || [];

        const index = users.findIndex(user => user.id === currentUser.id);

        if (index === -1) {
            message.textContent = "User account not found.";
            return;
        }

        users[index].name = newName;

        localStorage.setItem("fileflowUsers", JSON.stringify(users));

        const updatedUser = {
            id: users[index].id,
            name: users[index].name,
            email: users[index].email
        };

        sessionStorage.setItem(
            "fileflowCurrentUser",
            JSON.stringify(updatedUser)
        );

        displayProfile(updatedUser);

        message.style.color = "green";
        message.textContent = "Profile updated successfully!";

    } catch (error) {
        message.textContent = "Unable to update profile.";
    }
});

// CHANGE PASSWORD

document.getElementById("passwordForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmNewPassword").value;

    const message = document.getElementById("passwordMessage");

    try {
        const users = JSON.parse(localStorage.getItem("fileflowUsers")) || [];

        const index = users.findIndex(user => user.id === currentUser.id);

        if (index === -1) {
            message.textContent = "User account not found.";
            return;
        }

        if (users[index].password !== oldPassword) {
            message.textContent = "Current password is incorrect.";
            return;
        }

        if (newPassword.length < 6) {
            message.textContent = "New password must contain at least 6 characters.";
            return;
        }

        if (newPassword !== confirmPassword) {
            message.textContent = "New passwords do not match.";
            return;
        }

        users[index].password = newPassword;

        localStorage.setItem("fileflowUsers", JSON.stringify(users));

        message.style.color = "green";
        message.textContent = "Password updated successfully!";

        document.getElementById("passwordForm").reset();

    } catch (error) {
        message.textContent = "Unable to update password.";
    }
});
