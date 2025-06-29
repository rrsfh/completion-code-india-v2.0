// Function to get URL parameter
function getURLParameter(name) {
    return new URLSearchParams(window.location.search).get(name);
}

// Function to submit data to Google Sheets automatically
function submitForm(assignmentID, responseID, completionCode) {
    var formData = new FormData();
    formData.append('assignmentID', assignmentID);
    formData.append('responseID', responseID);
    formData.append('completionCode', completionCode);

    // Google Sheets URL for form submission
    var googleSheetURL = 'https://script.google.com/macros/s/AKfycbypBD4Qn88K-QSo9L2wuS0-BglzZljbdfEumLQStUsLgrlyIGK6-iHar8fZR6zI3ZPL/exec';

    // Make the API request to Google Sheets
    return fetch(googleSheetURL, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Form submitted successfully", data);
    })
    .catch(error => {
        console.error("Error submitting the form", error);
    });
}


// Extract and store the participant ID and completion token from the URL
var assignmentID = getURLParameter('assignment_id')
var responseID = getURLParameter('response_id');

// Check if participantID exists and handle the completion code
if (responseID) {
    var n1 = 97580; // The hard-coded number
    var completionCode = n1 * responseID;
    document.getElementById('completionCode').innerHTML = `Your Completion Code is: ${completionCode}`;

    // Show the h2 message with instructions
    document.getElementById('completionCodeMessage').style.display = 'block';

    // Submit the participantID and completionCode to Google Sheets automatically
    submitForm(assignmentID, responseID, completionCode);

    // Display the button after 5 seconds
    setTimeout(() => {
        document.getElementById('linkButton').style.display = 'block'; // Show the button
        document.getElementById('linkButton').disabled = false;        // Enable the button
    }, 5000); // 5000 milliseconds = 5 seconds

} else {
    document.getElementById('completionCode').innerHTML = `ERROR: Unable to advance as response_id is missing. Please contact BeSample for assistance.`;

    // Hide the h2 message if participantID is missing
    document.getElementById('completionCodeMessage').style.display = 'none';

    // Hide the button if participantID is missing
    document.getElementById('linkButton').style.display = 'none';
}




// Function to show alerts for different tabs
function showAlert(tabName) {
    let message;
    switch (tabName) {
      case 'Home':
        message = "This is your completion code. Please take note of it and press the button to finish the study.";
        break;
      case 'Instructions':
        message = "Instructions: Take note of your completion code and press the button to finish the study.";
        break;
      case 'Contact':
        message = "If you are stuck on this page, please do not worry. Just provide your completion code to BeSample to finish the study";
        break;
      default:
        message = "No information available.";
    }
    alert(message);
}
