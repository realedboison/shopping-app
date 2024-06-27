<?php
// Include the database connection file
require './include/db.php';
// header("Access-Control-Allow-Origin: *");

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
 // SQL query to select names from the product table where status is 1
 $stmt = "SELECT * FROM product WHERE status=1 order by rand() limit 3;";

 // Execute the query and check if it was successful
 if ($result = $conn->query($stmt)) {
  // Initialize an empty array to store the category names
  $arr = array();

  // Fetch the results as an associative array
  while ($rowArray = $result->fetch_assoc()) {
   // Add each category name to the array
   // $arr[] = $row['name'] -- single
   $arr[] = $rowArray;
   // This is the alternative to array_push($arr, $row['name'])
  }

  // Encode the array into JSON format and return it
  echo json_encode(['featured' => $arr]);
 } else {
  // If there was a problem with the query, return an error message
  echo json_encode(['error' => 'Oops.. we have a problem']);
 }
 exit();
}
