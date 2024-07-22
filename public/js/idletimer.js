let idleTimer;
const idleTimeoutDuration = 2 * 60 * 1000; // 2 minutes in milliseconds

function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(logoutUser, idleTimeoutDuration);
}

async function logoutUser() {
    try {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        document.location.replace('/');
    } catch (error) {
        console.error('Logout error:', error);
        alert('An error occurred during logout.');
    }
    console.log("User logged out due to inactivity");
}

// Listen for user activity events
document.addEventListener("mousemove", resetIdleTimer);
document.addEventListener("keypress", resetIdleTimer);

// Start the initial idle timer
document.addEventListener('DOMContentLoaded', (event) => {
    resetIdleTimer();
});