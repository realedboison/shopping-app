<?php
// Include the database connection file
require './include/db.php';
// header("Access-Control-Allow-Origin: *");

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['category'])) {
 // SQL query to select names from the product table where status is 1
 $stmt = "SELECT * FROM product WHERE status=1 AND category_id = (SELECT id FROM category WHERE NAME = ?);";
 $prep_stmt = $conn->prepare($stmt);
 $category = $_GET['category'];
 $prep_stmt->bind_param("s", $category);
 $prep_stmt->execute();

 // Execute the query and check if it was successful
 if ($result = $prep_stmt->get_result()) {
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
  echo json_encode(['products' => $arr]);
 } else {
  // If there was a problem with the query, return an error message
  echo json_encode(['error' => 'Oops.. we have a problem']);
 }
 $prep_stmt->close();
 exit();
}
