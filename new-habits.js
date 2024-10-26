// Function to simulate saving the habit to a backend
function goBack() {
    window.history.back();
}

function goBack() {
    window.location.href = 'index.html'; 
}

function goToAnalytics() {
    window.location.href = 'analytics.html'; 
}


document.addEventListener("DOMContentLoaded", () => {
    const habitForm = document.getElementById('habit-form');

    habitForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const habitName = document.getElementById('habit-name').value.trim();
        const habitGoal = document.getElementById('habit-goal').value.trim();
        const reminderTime = document.getElementById('reminder-time').value; // e.g., "14:00"
        const ampm = document.getElementById('reminder-ampm').value;

        if (habitName && habitGoal && reminderTime) {
            // Combine the time with AM/PM
            const formattedTime = formatTime(reminderTime, ampm);

            const habit = {
                name: habitName,
                goal: habitGoal,
                reminder: formattedTime
            };

            try {
                const saveMessage = await saveHabit(habit);
                alert(saveMessage);
            } catch (error) {
                console.error('Error saving the habit:', error);
                alert('There was an error saving your habit. Please try again.');
            }

            habitForm.reset();
        } else {
            alert('Please fill out all fields including time.');
        }
    });
});

// Helper function to format the time string
function formatTime(time, ampm) {
    const [hours, minutes] = time.split(':');
    let formattedHours = parseInt(hours, 10);

    if (ampm === "PM" && formattedHours < 12) {
        formattedHours += 12; // Convert to 24-hour format
    } else if (ampm === "AM" && formattedHours === 12) {
        formattedHours = 0; // Midnight case
    }

    return `${String(formattedHours).padStart(2, '0')}:${minutes}`;
}

// Function to simulate saving the habit to localStorage
async function saveHabit(habit) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (habit.name.length < 3) {
                reject('Habit name must be at least 3 characters long.');
            } else {
                // Save the habit to localStorage
                const habits = JSON.parse(localStorage.getItem('habits')) || [];
                habits.push(habit);
                localStorage.setItem('habits', JSON.stringify(habits));
                resolve(`Habit "${habit.name}" saved successfully.`);
            }
        }, 1000); 
    });
}


// Function to fetch and display habit data
// Function to fetch and display habit data
// Function to fetch habit data from localStorage
async function fetchHabitData() {
    return new Promise((resolve) => {
        const habits = JSON.parse(localStorage.getItem('habits')) || [];
        resolve(habits);
    });
}

// Function to fetch and display habit data
async function fetchHabits() {
    try {
        const habits = await fetchHabitData(); // Fetch data from localStorage
        displayHabitStatus(habits); // Call a function to display the habit status
    } catch (error) {
        console.error('Error fetching habits:', error);
        alert('There was an error fetching the habits. Please try again.');
    }
}

// Function to display habits on the page
function displayHabitStatus(habits) {
    const habitStatusContainer = document.querySelector('#habit-status'); // A container to display habits
    habitStatusContainer.innerHTML = ''; // Clear existing content

    if (habits.length === 0) {
        habitStatusContainer.innerHTML = '<p>No habits found.</p>'; // Show message if no habits exist
        return;
    }

    // Iterate through habits and create a display for each
    habits.forEach(habit => {
        const habitElement = document.createElement('div');
        habitElement.classList.add('habit-status-item'); // Add a class for styling
        
        // Create a status message for each habit
        habitElement.innerHTML = `
            <strong>${habit.name}</strong>: ${habit.goal} <br>
            Reminder: ${habit.reminder}
        `;

        habitStatusContainer.appendChild(habitElement); // Append to the container
    });
}
