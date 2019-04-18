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
<p>Downloaded wills guide</p>
\n\n";
if ((isset($_POST["wgBooklet"]))) {$message.="<p>I would also like a booklet version of the FREE guide and workbook mailed to me.</p>";}
$message.="<p><a href='http://redcrosslegacy.org/mailers/mailers.xls'>Download the Database</a>";



/* Message to donor */
if ($_SESSION["wgBooklet"]==1) {
	$message2 = "<p>Dear $first_name,</p>
	 
<p>Your FREE hard copy of Touching the Future will be delivered to the address you provided. Please allow 3-4 weeks for delivery. In the meantime, we hope you find your FREE interactive copy of Touching the Future a useful, timesaving tool. This resource will allow you or your clients to save their personal information in one place, make future edits when needed and print multiple copies for sharing with family members or other important contacts.</p>
<p><a href='http://www.redcrosslegacy.org/pdf/WG.pdf'>Click here to download your guide and workbook</a>. You will need Adobe® Reader® (version 8.0 or newer) to view this document.  <a href='https://get.adobe.com/reader/'>Click here to get Adobe Reader</a>.</p>
<p>If you have any questions, please don't hesitate to reach out to us by email at GiftPlanning@redcross.org or by phone at 1-800-797-8022, ext. 5. We're happy to assist you and your clients with their charitable planning.</p>
<p>Best regards, </p>
<p>Rebecca Locke<br>
  Executive Director, Gift Planning <br>
  American Red Cross</p>";
}
else {
	$message2 = "
<p>Dear $first_name,</p>
	<p>
We hope you find your FREE interactive copy of Touching the Future a useful, timesaving tool. This resource will allow you or your clients to save their personal information in one place, make future edits when needed and print multiple copies to share with family members or other important contacts.</p>
	<p><a href='http://www.redcrosslegacy.org/pdf/WG.pdf'>Click here to download your guide and workbook</a>. You will need Adobe® Reader® (version 8.0 or newer) to view this document.  <a href='https://get.adobe.com/reader/'>Click here to get Adobe Reader</a>.</p>
	<p>If you have any questions, please don't hesitate to reach out to us by email at GiftPlanning@redcross.org or by phone at 1-800-797-8022, ext. 5. We're happy to assist you and your clients with their charitable planning.</p>
	<p>Best regards, </p>
	<p>Rebecca Locke<br>
	Executive Director, Gift Planning <br>
	American Red Cross</p>
	";
	
	
}


//mail("dj@virtualgiving.com", "$lander_type", "$message", $header);
mail("GiftPlanning@redcross.org", "$lander_type", "$message", $header);
mail("$email", "Your Red Cross Will Planning Guide", "$message2", $header);
?>