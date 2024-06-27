<?php
// Include the database connection file
require './include/db.php';

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
 // SQL query to select names from the category table where status is 1
 $stmt = "SELECT name FROM category WHERE status=1;";

 // Execute the query and check if it was successful
 if ($result = $conn->query($stmt)) {
  // Initialize an empty array to store the category names
  $arr = array();

  // Fetch the results as an associative array
  while ($row = $result->fetch_assoc()) {
   // Add each category name to the array
   $arr[] = $row['name'];
   // This is the alternative to array_push($arr, $row['name'])
  }

  // Encode the array into JSON format and return it
  echo json_encode(['categories' => $arr]);
 } else {
  // If there was a problem with the query, return an error message
  echo json_encode(['error' => 'Oops.. we have a problem']);
 }
}
// else {
//  // If the request method is not GET, return an error message
//  echo json_encode(['error' => 'Invalid request method']);
// }

exit();
