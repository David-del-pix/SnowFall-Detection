// data.js

// Fetch and display real-time sensor data
function fetchSensorData() {
    // Show loading spinner while fetching data
    document.getElementById('loading-spinner').style.display = 'block';

    // Get Firestore collection reference for each sensor
    const snowfallRef = db.collection('sensorData').doc('snowfall');
    const saltLevelRef = db.collection('sensorData').doc('saltLevel');
    const slipperinessRef = db.collection('sensorData').doc('groundSlipperiness');
    const temperatureRef = db.collection('sensorData').doc('temperature');

    // Fetch all sensor data in parallel
    Promise.all([
        snowfallRef.get(),
        saltLevelRef.get(),
        slipperinessRef.get(),
        temperatureRef.get()
    ]).then(([snowfallDoc, saltLevelDoc, slipperinessDoc, temperatureDoc]) => {
        // If all documents are found, update the dashboard
        if (snowfallDoc.exists && saltLevelDoc.exists && slipperinessDoc.exists && temperatureDoc.exists) {
            const snowfallData = snowfallDoc.data();
            const saltLevelData = saltLevelDoc.data();
            const slipperinessData = slipperinessDoc.data();
            const temperatureData = temperatureDoc.data();

            // Update the dashboard with sensor data
            document.getElementById('snowfall').innerHTML = `${snowfallData.value} cm`;
            document.getElementById('saltLevel').innerHTML = `${saltLevelData.value} %`;
            document.getElementById('slipperiness').innerHTML = slipperinessData.value;
            document.getElementById('temperature').innerHTML = `${temperatureData.value} °C`;
        } else {
            // Display error if any document doesn't exist
            document.getElementById('data').innerHTML = 'Error: Sensor data not found';
        }

        // Hide the loading spinner once data is loaded
        document.getElementById('loading-spinner').style.display = 'none';
    }).catch((error) => {
        // Handle error
        console.error("Error getting documents: ", error);
        document.getElementById('data').innerHTML = 'Error fetching data';
        document.getElementById('loading-spinner').style.display = 'none';
    });
}

// Call the function to fetch data on page load
window.onload = fetchSensorData;
// 