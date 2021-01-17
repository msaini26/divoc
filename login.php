<?php
$host='divoc.online';
// replace userName, password, 458xxxxxx, with your specific info
$user='RoseHacks2021';
$password='RoseHacks2021';
$database="RoseHacks2021";
$conn = mysqli_connect($host,$user,$password,$database) 
     or die ("Couldn't connect to server");
$result = mysqli_query($conn,"SELECT * FROM login");    //NOTE: No semicolon inside quotes


//defining values
$myVar1 = mysqli_real_escape_string($conn, trim($_POST['username']));
$myVar2 = mysqli_real_escape_string($conn, trim($_POST['password']));

//attempted insertion
$Query1 = "INSERT INTO login (username, password) 
          VALUES('$myVar1', '$myVar2')";

if ($conn->query($Query1) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $Query1 . "<br>" . $conn->error;
}

$conn->close();
?>