<?php
// Create a new MySQLi connection object with the specified parameters
$conn = new mysqli("localhost", "root", "", "eshop");

// Check if there was an error during the connection attempt
if ($conn->connect_errno) {
 // If there was an error, send a JSON response with the error message
 echo json_encode(['error' => $conn->connect_error]);
 // Terminate the script to prevent further execution
 exit();
}
