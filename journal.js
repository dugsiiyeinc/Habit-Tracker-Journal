function goBack() {
    window.location.href = 'index.html'; 
}

// Initialize Quill editor
const quill = new Quill('#editor', {
    theme: 'snow'
});

// Save journal entry
document.querySelector('#journal-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const title = document.querySelector('#entry-title').value;
    const content = quill.root.innerHTML;
    const mood = document.querySelector('#mood-select').value;
    const imageInput = document.querySelector('#entry-image');
    const image = imageInput.files.length > 0 ? URL.createObjectURL(imageInput.files[0]) : '';
    const date = new Date().toLocaleString();

    const entry = {
        title,
        content,
        mood,
        image,
        date
    };

    const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    entries.push(entry);
    localStorage.setItem('journalEntries', JSON.stringify(entries));

    displayEntries();
    displayMoodChart();
    document.querySelector('#journal-form').reset();
    quill.setContents([]);
    
    alert("Entry saved successfully!");
});

// Store chart instance
let moodChart;

// Display journal entries
function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    const entryList = document.querySelector('#entry-list');
    entryList.innerHTML = entries.map((entry, index) => `
        <div class="entry" data-index="${index}">
            <h3>${entry.title}</h3>
            <p>${entry.content}</p>
            <small>${entry.date} - Mood: ${entry.mood}</small>
            ${entry.image ? `<img src="${entry.image}" alt="Entry Image" class="entry-image">` : ''}
            <button onclick="editEntry(${index})">Edit</button>
            <button onclick="deleteEntry(${index})">Delete</button>
        </div>
    `).join('');
}

// Edit an entry
async function editEntry(index) {
    const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    
    // Check if the entry exists
    if (index < 0 || index >= entries.length) {
        alert("Error: Entry does not exist. Please select a valid entry to edit.");
        return; // Exit if the index is invalid
    }

    const entry = entries[index];

    // Populate the form fields with the entry data
    document.querySelector('#entry-title').value = entry.title;
    quill.root.innerHTML = entry.content;
    document.querySelector('#mood-select').value = entry.mood;
    document.querySelector('#journal-form').dataset.editIndex = index; 
    alert("Entry loaded for editing successfully!");
}

async function deleteEntry(index) {
    const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    
    // Check if the entry exists
    if (index < 0 || index >= entries.length) {
        alert("Error: Entry does not exist. Please select a valid entry to delete.");
        return; // Exit if the index is invalid
    }

    // Remove the entry and update localStorage
    entries.splice(index, 1);
    localStorage.setItem('journalEntries', JSON.stringify(entries));
    
    // Update the displayed entries and mood chart
    displayEntries();
    displayMoodChart();
    
    alert("Entry deleted successfully!");
}


// Display mood chart
function displayMoodChart() {
    const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    const moodCounts = {};
    
    entries.forEach(entry => {
        moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });

    const labels = Object.keys(moodCounts);
    const data = Object.values(moodCounts);
    
    const ctx = document.querySelector('#moodChart').getContext('2d');
    
    // Destroy the existing chart instance if it exists
    if (moodChart) {
        moodChart.destroy();
    }

    moodChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Mood Frequency',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Initial display of entries and mood chart when the page loads
displayEntries();
displayMoodChart();

// Search functionality
function filterEntries() {
    const searchTerm = document.querySelector('#search-bar').value.toLowerCase();
    const entries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    const filteredEntries = entries.filter(entry => 
        entry.title.toLowerCase().includes(searchTerm) || 
        entry.content.toLowerCase().includes(searchTerm)
    );
    
    const entryList = document.querySelector('#entry-list');
    entryList.innerHTML = filteredEntries.map((entry, index) => `
        <div class="entry" data-index="${index}">
            <h3>${entry.title}</h3>
            <p>${entry.content}</p>
            <small>${entry.date} - Mood: ${entry.mood}</small>
            ${entry.image ? `<img src="${entry.image}" alt="Entry Image" class="entry-image">` : ''}
            <button onclick="editEntry(${index})">Edit</button>
            <button onclick="deleteEntry(${index})">Delete</button>
        </div>
    `).join('');
}

// Add event listener for the search input field
document.querySelector('#search-bar').addEventListener('input', filterEntries);

// Export entries
function exportEntries() {
    const entries = localStorage.getItem('journalEntries');
    const blob = new Blob([entries], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'journal-entries.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Import entries
function importEntries(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const entries = JSON.parse(e.target.result);
        localStorage.setItem('journalEntries', JSON.stringify(entries));
        displayEntries();
        displayMoodChart();
    };
    
    reader.readAsText(file);
}
