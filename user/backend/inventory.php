<?php

require './include/db.php';
// header("Access-Control-Allow-Origin: *");

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
 // SQL query to select names from the product table where status is 1

 $stmt = "SELECT stock FROM inventory WHERE product_id = ?;";
 $prep_stmt = $conn->prepare($stmt);
 $id = $_GET['id'];
 //var_dump($id);
 $prep_stmt->bind_param("i", $id);
 $prep_stmt->execute();

 // var_dump($stmt);
 // Execute the query and check if it was successful
 if ($result = $prep_stmt->get_result()) {

  // Encode the array into JSON format and return it
  echo json_encode(['stock' => $result->fetch_assoc()['stock']]);
 } else {
  // If there was a problem with the query, return an error message
  echo json_encode(['error' => 'Oops.. we have a problem']);
 }
 $prep_stmt->close();
 exit();
}
