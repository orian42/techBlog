let idleTimer;
const idleTimeoutDuration = 5 * 60 * 1000; // 5 minutes in milliseconds

function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(logoutUser, idleTimeoutDuration);
}

function logoutUser() {
    // Perform logout actions here, such as clearing session data or redirecting to the login page
    console.log("User logged out due to inactivity");
}

// Listen for user activity events
document.addEventListener("mousemove", resetIdleTimer);
document.addEventListener("keypress", resetIdleTimer);

// Start the initial idle timer
resetIdleTimer();