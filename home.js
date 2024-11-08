// Function to toggle feature info and store view status in localStorage
function toggleFeatureInfo(featureId) {
    const featureInfo = document.getElementById(`${featureId}-info`);

    // Toggle display
    if (featureInfo.style.display === "block") {
        featureInfo.style.display = "none";
        localStorage.setItem(`${featureId}-viewed`, "false"); 
    } else {
        featureInfo.style.display = "block";
        localStorage.setItem(`${featureId}-viewed`, "true"); 
    }
}

// Ensure all feature info sections are hidden by default, even after reloads
window.addEventListener('DOMContentLoaded', () => {
    const features = ["visualize", "motivational", "community"];

    features.forEach(featureId => {
        const featureInfo = document.getElementById(`${featureId}-info`);

        // Hide each info section by default
        featureInfo.style.display = "none";

        // Check localStorage to see if the user previously viewed this info
        const isViewed = localStorage.getItem(`${featureId}-viewed`) === "true";

        // Display info if previously viewed
        if (isViewed) {
            featureInfo.style.display = "block";
        }
    });
});
