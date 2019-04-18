<?php
session_start();

if(isset($_POST["submit"])) {
//Gets Referring URL to set lander types
$referrer=htmlspecialchars($_SERVER['HTTP_REFERER']);
//Gets query string to store lander suffix
$query=htmlspecialchars($_SERVER['QUERY_STRING']);
 
//Sets Lander Types
//not needed as of 2/2/16
//include("inc.mailer-types.php");
 
//Post Data 
$today = date("n/j/Y"); // 10/ 3/ 2001 
$responseDate = date('h:i:s:u'); list($hrs,$mins,$secs,$msecs) = explode(':',$responseDate); 
$pagename = $_POST["pagename"];
$siteUrl = $_POST["siteUrl"];
$submit= $_POST["submit"];
$first_name = $_POST["first_name"];
$last_name = $_POST["last_name"];
$professional_title = $_POST["professional_title"];
$company_name = $_POST["company_name"];
$address = $_POST["address"];
$address2 = $_POST["address2"];
$city = $_POST["city"];
$state = $_POST["state"];
$zip = $_POST["zip"];
$phone = $_POST["phone"];
$email = $_POST["email"];
$wgArcInWill = $_POST["wgArcInWill"];
$wgConsiderArcInWill = $_POST["wgConsiderArcInWill"];
$optInForEmails = $_POST["optInForEmails"];
$giftsThroughWill = $_POST["giftsThroughWill"];
$giftsOutsideWill = $_POST["giftsOutsideWill"];
$giftsThatPayBack = $_POST["giftsThatPayBack"];
$giftsWithStocks = $_POST["giftsWithStocks"];
$giftsWithIRA = $_POST["giftsWithIRA"];
$giftsWithRealEstate = $_POST["giftsWithRealEstate"];
$cgaBirthday = $_POST["cgaBirthday"];
$cgaSpouseBirthdate = $_POST["cgaSpouseBirthdate"];
$cga5k = $_POST["cga5k"];
$cga10k = $_POST["cga10k"];
$cga50k = $_POST["cga50k"];
$cga100k = $_POST["cga100k"];
$cgaOtherAmount = $_POST["cgaOtherAmount"];
$considerCharityInWill = $_POST["considerCharityInWill"];
$cgaStartage = $_POST["cgaStartage"];
$lander_type= $_POST["lander_type"];
//Set Checkboxes
if ((isset($_POST["wgBooklet"]))) {$wgBooklet=1;}
if ((isset($_POST["wgArcInWill"]))) {$wgArcInWill=1;}
if ((isset($_POST["wgConsiderArcInWill"]))) {$wgConsiderArcInWill=1;}
if ((isset($_POST["cga5k"]))) {$cga5k=1; $giftamount=1;}
if ((isset($_POST["cga10k"]))) {$cga10k=1; $giftamount=1;}
if ((isset($_POST["cga50k"]))) {$cga50k=1; $giftamount=1;}
if ((isset($_POST["cga100k"]))) {$cga100k=1; $giftamount=1;}
if ((isset($_POST["considerCharityInWill"]))) {$considerCharityInWill=1;}
if ((isset($_POST["optInForEmails"]))) {$optInForEmails=1;}
if ((isset($_POST["giftsThroughWill"]))) {$giftsThroughWill=1;}
if ((isset($_POST["giftsOutsideWill"]))) {$giftsOutsideWill=1;}
if ((isset($_POST["giftsThatPayBack"]))) {$giftsThatPayBack=1;}
if ((isset($_POST["giftsWithStocks"]))) {$giftsWithStocks=1;}
if ((isset($_POST["giftsWithIRA"]))) {$giftsWithIRA=1;}
if ((isset($_POST["giftsWithRealEstate"]))) {$giftsWithRealEstate=1;}

//End Post Data
//Sets Session Variables
$_SESSION["err"] = $err;
$_SESSION["referer"] = $referer;
$_SESSION["first_name"] = $first_name;
$_SESSION["last_name"] = $last_name;
$_SESSION["professional_title"] = $professional_title;
$_SESSION["company_name"] = $company_name;
$_SESSION["address"] = $address;
$_SESSION["address2"] = $address2;
$_SESSION["city"] = $city;
$_SESSION["state"] = $state;
$_SESSION["zip"] = $zip;
$_SESSION["phone"] = $phone;
$_SESSION["email"] = $email;
$_SESSION["wgBooklet"] = $wgBooklet; 
$_SESSION["wgArcInWill"] = $wgArcInWill;
$_SESSION["wgConsiderArcInWill"] = $wgConsiderArcInWill;
$_SESSION["optInForEmails"] = $optInForEmails;
$_SESSION["giftsThroughWill"] = $giftsThroughWill;
$_SESSION["giftsOutsideWill"] = $giftsOutsideWill;
$_SESSION["giftsThatPayBack"] = $giftsThatPayBack;
$_SESSION["giftsWithStocks"] = $giftsWithStocks;
$_SESSION["giftsWithIRA"] = $giftsWithIRA;
$_SESSION["giftsWithRealEstate"] = $giftsWithRealEstate;

$_SESSION["cgaBirthday"] = $cgaBirthday;
$_SESSION["cgaSpouseBirthdate"] = $cgaSpouseBirthdate;
$_SESSION["cga5k"] = $cga5k;
$_SESSION["cga10k"] = $cga10k;
$_SESSION["cga50k"] = $cga50k;
$_SESSION["cga100k"] = $cga100k;
$_SESSION["cgaOtherAmount"] = $cgaOtherAmount;
$_SESSION["considerCharityInWill"] = $considerCharityInWill;
$_SESSION["cgaStartage"] = $cgaStartage;

//Required Fields
//if ($filter!="") {$err=1;}
if ($_SESSION["first_name"] == "") { $err=1; $_SESSION["err"]=1;} 
if ($_SESSION["last_name"] == "") { $err=1;$_SESSION["err"]=1;}
if ($_SESSION["address"] == "") { $err=1;$_SESSION["err"]=1;}
if ($_SESSION["city"] == "") { $err=1;$_SESSION["err"]=1;}
if ($_SESSION["state"] == "none") { $err=1;$_SESSION["err"]=1;}
if ($_SESSION["zip"]  == "") { $err=1;$_SESSION["err"]=1;}
if ($_SESSION["email"] == "") { $err=1;$_SESSION["err"]=1;}

if (($lander_type=="Donor Mailing CGA Illustration Request") ) {if ($_SESSION["cgaStartage"] == "") { $err=1;$_SESSION["err"]=1;}}
if (($lander_type=="Donor Email CGA Illustration Request") ) {if ($_SESSION["cgaStartage"] == "") { $err=1;$_SESSION["err"]=1;}}

//if (($lander_type=="Donor Mailing CGA Illustration Request") ) {if ($_SESSION["cgaBirthday"] == "") { $err=1;$_SESSION["err"]=1;}}
//if (($lander_type=="Donor Email CGA Illustration Request") ) {if ($_SESSION["cgaBirthday"] == "") { $err=1;$_SESSION["err"]=1;}}
//if (($lander_type=="Digital Campaign CGA Illustration Request") ) {if ($_SESSION["cgaBirthday"] == "") { $err=1;$_SESSION["err"]=1;}}

if (($lander_type=="Donor Mailing CGA Illustration Request") ) {if (($cga5k=="") && ($cga10k=="") && ($cga50k=="") && ($cga100k=="") && ($cgaOtherAmount=="")) { $err=1;$_SESSION["err"]=1;}}
if (($lander_type=="Donor Email CGA Illustration Request") ) {if (($cga5k=="") && ($cga10k=="") && ($cga50k=="") && ($cga100k=="") && ($cgaOtherAmount=="")) { $err=1;$_SESSION["err"]=1;}}
//if (($lander_type=="Digital Campaign CGA Illustration Request") ) {if (($cga5k=="") && ($cga10k=="") && ($cga50k=="") && ($cga100k=="") && ($cgaOtherAmount=="")) { $err=1;$_SESSION["err"]=1;}}
         
include("inc.error.checker.php"); 

//Error Checker
if ($err<=0) {
	//Send Posted Data to Excel Database
	include("send_to_excel.php");
	//Send to Email
	include("send_out_emails.php");
	// Thank you Pages
	//Lander Type: Professional WG Request
	if ( ($lander_type=="Professional WG Request")) {header("Location: ARC-Wills-Guide-Offer-Professionals-Lander-Thanks.php");}
//Lander Type: Donor Mailing WG Request
	if (($lander_type=="Donor Mailing WG Request")  ) {header("Location: ARC-Wills-Guide-Offer-Donor-Mailing-Lander-Thanks.php");}
	if (($lander_type=="Digital Campaign WG Request")  ) {header("Location: ARC-Wills-Guide-Digital-Campaign-Lander-Thanks.php");} 
	if (($lander_type=="Life Income Email Campaign")  ) {header("Location: ARC-Life-Income-Gifts-Lander-Thanks.php");} 
	if (($lander_type=="Digital Campaign General Gift Planning Info Request") ||($referrer=="http://www.redcrosslegacy.org/giftsummary")  ) {header("Location: ARC-General-Gift-Planning-Lander-Thanks.php");} 
	if (($lander_type=="Legacy Newsletter WG Request")  ) {header("Location: ARC-Wills-Guide-Donor-Email-Lander-Thanks.php");} 
	if (($lander_type=="Donor Mailing CGA Illustration Request")  ) {header("Location: ARC-CGA-Mailing-Campaign-Lander-Thanks.php");} 
	if (($lander_type=="Digital Campaign CGA Illustration Request")  ) {header("Location: ARC-CGA-Digital-Campaign-Lander-Thanks.php");}
	if ( ($lander_type=="Donor Email WG Request")) {header("Location: ARC-Wills-Guide-Donor-Email-Lander-Thanks.php");}
	if ( ($lander_type=="Donor Email CGA Illustration Request")) {header("Location: ARC-CGA-Donor-Mailing-Email-Lander-Thanks.php");}
	if ( ($lander_type=="Make a Will Month")) {header("Location: ARC-Make-a-Will-Thanks.php");}
	if (($lander_type=="Legacy News WG response")  ) {header("Location: ARC-Wills-Guide-Offer-Donor-Mailing-Lander-Thanks.php");}
	if (($lander_type=="Retiree Newsletter WG response")  ) {header("Location: ARC-Wills-Guide-Offer-Donor-Mailing-Lander-Thanks.php");}
	if (($lander_type=="CGA Video CGA Illustration Request")  ) {header("Location: ARC-CGA-Digital-Campaign-Lander-Thanks.php");}
	}	
}   

?>

 