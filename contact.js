// JavaScript to handle form submission
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Thank you for you contact we'll reply as soon as possible");
    document.querySelector("form").reset();
});
