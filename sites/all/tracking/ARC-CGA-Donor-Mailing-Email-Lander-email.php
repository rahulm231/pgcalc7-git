<?php
if(isset($email)) { $from = "$email"; } else { $from = "NO EMAIL"; }

$header = "From: $from\r\n";
$header .= "MIME-Version: 1.0" . "\r\n";
$header .= "Content-type:text/html;charset=UTF-8" . "\r\n";
//$header .= "X-Mailer: PHP/" . phpversion();
/*  Message to Admins */
$message = "
<p>URL: $referrer</p>

<p><strong>Name:</strong> $first_name $last_name<br>
<strong>Professional Title:</strong>  $professional_title<br>
<strong>Company Name:</strong> $company_name<br>
<strong>Address:</strong> $address, $address2<br>
<strong>City/State/Zip:</strong> $city, $state, $zip<br>
<strong>Telephone:</strong> $phone<br>
<strong>E-Mail:</strong> $email</p>
<strong>DOB:</strong> $cgaBirthday</p>
<strong>Spouse DOB:</strong> $cgaSpouseBirthdate</p>
<strong>Start Age:</strong> $cgaStartage</p>
\n\n";
if (($cga5k==1) || ($cga10k==1) || ($cga50k==1) || ($cga100k==1) || (isset($cgaOtherAmount))) { $message .="<p>Which gift amount(s) would you like more information about in your illustration?</p>";}
if ($cga5k==1) {$message.="<p>$5,000</p>";}
if ($cga10k==1) {$message.="<p>$10,000</p>";}
if ($cga50k==1) {$message.="<p>$50,000</p>";}
if ($cga100k==1) {$message.="<p>$100,000</p>";}
if (isset($cgaOtherAmount)) {$message.="<p>$cgaOtherAmount</p>";}
$message.="<p><a href='http://redcrosslegacy.org/mailers/mailers.xls'>Download the Database</a>";

?>

<?php 
$subject="Your Personalized Gift Illustration Request";
$message2="
<p>Dear $first_name,</p>

<p>A member of our American Red Cross Gift Planning Team will contact you soon to develop your personalized gift illustration. In the meantime, please don't hesitate to reach out to us by email at GiftPlanning@redcross.org or by phone at 1-800-797-8022, ext. 5 with any questions. We're happy to assist you and your advisors with your charitable planning.</p>

<p>Best regards,</p> 

<p>Rebecca Locke<br>
Executive Director, Gift Planning <br>
American Red Cross</p>
";	
 ?>
 
 
<?php
//mail("dj@virtualgiving.com", "$lander_type", "$message", $header);
mail("GiftPlanning@redcross.org", "$lander_type", "$message", $header);
mail("$email", "$subject", "$message2", $header);
?>