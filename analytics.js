function goBack() {
    window.location.href = 'new-habits.html';  
}


async function fetchHabitData() {
    return new Promise((resolve) => {
        const habits = JSON.parse(localStorage.getItem('habits')) || [];
        resolve(habits);
    });
}

// Function to render the chart
async function renderActivityChart() {
    const habitData = await fetchHabitData();
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const month = 'October'; // Update this to reflect the current month
    const activityNames = habitData.map(habit => habit.name);
    
    // Example activity data for the week
    const activityData = {
        Exercise: [2, 3, 0, 1, 4, 1, 0], // Example data for each day
        Reading: [1, 0, 2, 1, 1, 0, 3],
        Meditation: [0, 1, 1, 0, 0, 2, 1],
        'Water Intake': [5, 4, 6, 4, 5, 3, 4],
        Sleep: [6, 7, 5, 8, 7, 6, 8],
    };

    const datasets = activityNames.map(name => {
        return {
            label: name,
            data: activityData[name],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        };
    });

    const ctx = document.querySelector('#activityChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: datasets,
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Activities Completed',
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: month,
                    },
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                        }
                    }
                }
            }
        }
    });
}

// Initialize the chart when the page loads
document.addEventListener('DOMContentLoaded', renderActivityChart);
