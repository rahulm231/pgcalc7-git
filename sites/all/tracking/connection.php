<?php error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username = "arc";
$password = "arc";
$dbname = "mailers";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

/*
$sql_alter_table = "ALTER TABLE tracking ADD COLUMN redcross_in_will varchar(255)";
if ($conn->query($sql_alter_table) === TRUE){
  }else{
	echo "Errormessage: %s\n", $conn->error;
  }
*/ 

// Check connection
if ($conn->connect_error) {
  echo "Something went wrong! Not able to connect to mailers database";
}else{
  /*
  $sql_create_table = "CREATE TABLE IF NOT EXISTS `tracking` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `referrer` longtext,
  `lander_type` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `professional_title` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `wg_booklet` varchar(255) DEFAULT NULL,
  `wg_arcinwill` varchar(255) DEFAULT NULL,
  `wg_considerarcinwill` varchar(255) DEFAULT NULL,
  `cga_birthday` varchar(255) DEFAULT NULL,
  `cga_spouse_birthdate` varchar(255) DEFAULT NULL,
  `cga_5k` varchar(255) DEFAULT NULL,
  `cga_10k` varchar(255) DEFAULT NULL,
  `cga_50k` varchar(255) DEFAULT NULL,
  `cga_100k` varchar(255) DEFAULT NULL,
  `cga_other_amount` varchar(255) DEFAULT NULL,
  `cga_age_payment` varchar(255) DEFAULT NULL,
  `gifts_in_will` varchar(255) DEFAULT NULL,
  `gifts_outside_will` varchar(255) DEFAULT NULL,
  `gifts_pay_back` varchar(255) DEFAULT NULL,
  `consider_charity_inwill` varchar(255) DEFAULT NULL,
  `optin_emails` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
)";
  
  $sql_create_table = "TRUNCATE TABLE tracking";
  if ($conn->query($sql_create_table) === TRUE){
  }else{
	echo "Errormessage: %s\n", $conn->error;
  }
 */
}



?>