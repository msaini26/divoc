<?php
   // connect to mongodb
   $connection = new MongoClient( );

   echo "Connection to database successfully";
	
   // select a database
   $db = $connection->RoseHacks2021;
   echo "Database mydb selected";
   $collection = $db->login;
   echo "Collection selected succsessfully";
   $cursor = $collection->find();
   // iterate cursor to display title of documents
	
   foreach ($cursor as $document) {
      echo $document["title"] . "\n";
   }
?>

<?php 
require_once "config.php";
require_once "session.php";
$error = '';
if ($_SERVER["REQUEST_METHOD"]) == "POST" && isset ($_POST['submit']) {
    
}


?>