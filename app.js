import { db } from "./firebase-config.js";
import { onSnapshot, collection, addDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Display real-time sensor data
const dataDiv = document.getElementById("data");
const sensorCollection = collection(db, "sensors");

onSnapshot(sensorCollection, (snapshot) => {
    dataDiv.innerHTML = ""; // Clear previous data
    snapshot.forEach((doc) => {
        const data = doc.data();
        dataDiv.innerHTML += `
            <div class="sensor-data">
                <h3>Sensor ID: ${doc.id}</h3>
                <p>Temperature: ${data.temperature} °C</p>
                <p>Humidity: ${data.humidity} %</p>
                <p>Salt Level (TDS): ${data.saltLevel} ppm</p>
                <p>Ground Slipperiness: ${data.slipperiness}</p>
                <p>Snow Depth: ${data.snowDepth} cm</p>
                <p>Last Updated: ${new Date(data.timestamp.seconds * 1000).toLocaleString()}</p>
            </div>
        `;
    });
});

// Handle customer service request submissions
const enquiryForm = document.getElementById("enquiryForm");
enquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const location = document.getElementById("location").value;
    const payment = document.getElementById("payment").value;

    try {
        await addDoc(collection(db, "customer_requests"), {
            name,
            email,
            location,
            payment,
            timestamp: new Date(),
        });
        alert("Request submitted successfully!");
        enquiryForm.reset();
    } catch (error) {
        console.error("Error submitting request:", error);
        alert("Failed to submit request.");
    }
});

// Handle snow-clearing company registrations
const companyForm = document.getElementById("companyForm");
companyForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const companyName = document.getElementById("companyName").value;
    const contactPerson = document.getElementById("contactPerson").value;
    const email = document.getElementById("companyEmail").value;
    const services = document.getElementById("services").value;

    try {
        await addDoc(collection(db, "companies"), {
            companyName,
            contactPerson,
            email,
            services,
            timestamp: new Date(),
        });
        alert("Company registered successfully!");
        companyForm.reset();
    } catch (error) {
        console.error("Error registering company:", error);
        alert("Failed to register company.");
    }
});


// Show the spinner
function showSpinner() {
    document.getElementById('loading-spinner').style.display = 'block';
}

// Hide the spinner
function hideSpinner() {
    document.getElementById('loading-spinner').style.display = 'none';
}

// Simulate Data Loading
function updateData() {
    showSpinner();

    // Simulate a delay for fetching data (replace this with Firebase fetching)
    setTimeout(() => {
        // Simulated data
        const data = `
            <div>Snowfall Depth: 25 cm</div>
            <div>Salt Level: 75%</div>
            <div>Ground Slipperiness: High</div>
            <div>Temperature: -5°C</div>
        `;
        
        // Update the #data section with new data
        document.getElementById('data').innerHTML = data;
        hideSpinner();
    }, 2000); // 2-second delay for demonstration
}

// Trigger the update on page load
window.onload = updateData;


