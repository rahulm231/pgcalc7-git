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
<p>Downloaded wills guide</p>\n\n";
if ((isset($_POST["wgBooklet"]))) {$message.="<p>I would also like a booklet version of the FREE guide and workbook mailed to me.</p>";}
if ((isset($_POST["wgArcInWill"]))) {$message.="<p>I already included the Red Cross in my will, trust or another gift plan, such as a beneficiary of my retirement account or insurance policy.</p>";}
if ((isset($_POST["wgConsiderArcInWill"]))) {$message.="<p>I would consider a gift to the Red Cross in my will.</p>";}
$message.="<p><a href='http://redcrosslegacy.org/mailers/mailers.xls'>Download the Database</a>";

?>
 
 
 
 <?php /* No Checkboxes */ if (($_SESSION["wgBooklet"]=="") && ($_SESSION["wgArcInWill"]=="") && ($_SESSION["wgConsiderArcInWill"]=="")) {  
$subject="Your Red Cross Will Planning Guide"; 
$message2 = "<p>Dear $first_name,</p>

<p>We hope you find your FREE interactive copy of Touching the Future a useful, timesaving tool. This resource will allow you to save your personal information in one place, make future edits when needed and print multiple copies to share with your attorney and family members. </p>

<p><a href='http://www.redcrosslegacy.org/pdf/WG.pdf'>Click here to download your guide and workbook</a>. You will need Adobe® Reader® (version 8.0 or newer) to view this document.  <a href='https://get.adobe.com/reader/'>Click here to get Adobe Reader</a>.</p>

<p>If you have any questions, please don't hesitate to reach out to us by email at GiftPlanning@redcross.org or by phone at 1-800-797-8022, ext. 5. We're happy to assist you and your advisors with your charitable planning.</p>

<p>Best regards, </p>

<p>Rebecca Locke<br>
Executive Director, Gift Planning<br>
American Red Cross</p>
 "; } ?>
<?php /* Only wgbooklet*/ if (($_SESSION["wgBooklet"]=="1") && ($_SESSION["wgArcInWill"]=="") && ($_SESSION["wgConsiderArcInWill"]=="")) {
$subject="Your Red Cross Will Planning Guide"; 
$message2 = "
<p>Dear $first_name,</p>

<p>Your FREE hard copy of Touching the Future will be delivered to the address you provided. Please allow 3-4 weeks for delivery. In the meantime, we hope you find your FREE interactive copy of Touching the Future a useful, timesaving tool. This resource will allow you to save your personal information in one place, make future edits when needed and print multiple copies to share with your attorney and family members.</p>

<p><a href='http://www.redcrosslegacy.org/pdf/WG.pdf'>Click here to download your guide and workbook</a>. You will need Adobe® Reader® (version 8.0 or newer) to view this document.   <a href='https://get.adobe.com/reader/'>Click here to get Adobe Reader</a>.</p>

<p>If you have any questions, please don't hesitate to reach out to us by email at GiftPlanning@redcross.org or by phone at 1-800-797-8022, ext. 5. We're happy to assist you and your advisors with your charitable planning.</p>

<p>Best regards, </p>

<p>Rebecca Locke<br>
Executive Director, Gift Planning <br>
American Red Cross</p>";	
	 } ?>

<?php /* Only wgArcInWill*/ if (($_SESSION["wgBooklet"]=="") && ($_SESSION["wgArcInWill"]=="1") && ($_SESSION["wgConsiderArcInWill"]=="")) {
$subject="Your Red Cross Will Planning Guide & Gift Notification";
$message2="
<p>Dear $first_name,</p>

<p>We hope you find your FREE interactive copy of Touching the Future a useful, timesaving tool. This resource will allow you to save your personal information in one place, make future edits when needed and print multiple copies to share with your attorney and family members.</p>

<p><a href='http://www.redcrosslegacy.org/pdf/WG.pdf'>Click here to download your guide and workbook</a>. You will need Adobe® Reader® (version 8.0 or newer) to view this document.   <a href='https://get.adobe.com/reader/'>Click here to get Adobe Reader</a>.</p>

<p>Your local Red Cross representative will contact you to personally offer our thanks and appreciation for your gift. We honor every planned gift donor with membership in the Legacy Society. To learn more about becoming a Legacy Society member, visit <a href='www.redcrosslegacy.org/society.php'>www.redcrosslegacy.org/society.php</a>.</p>

<p>If you have any questions, please don't hesitate to reach out to us by email at GiftPlanning@redcross.org or by phone at 1-800-797-8022, ext. 5. We're happy to assist you and your advisors with your charitable planning.</p>

<p>Best regards, </p>

<p>Rebecca Locke<br>
Executive Director, Gift Planning <br>
American Red Cross</p>
";	
	} ?>

<?php /* Only wgConsiderArcInWill*/ if (($_SESSION["wgBooklet"]=="") && ($_SESSION["wgArcInWill"]=="") && ($_SESSION["wgConsiderArcInWill"]=="1")) {
$subject="Your Red Cross Will Planning Guide & Information Request
";
$message2="
<p>Dear $first_name,</p>

<p>We hope you find your FREE interactive copy of Touching the Future a useful, timesaving tool. This resource will allow you to save your personal information in one place, make future edits when needed and print multiple copies to share with your attorney and family members.</p>

<p><a href='http://www.redcrosslegacy.org/pdf/WG.pdf'>Click here to download your guide and workbook</a>. You will need Adobe® Reader® (version 8.0 or newer) to view this document.   <a href='https://get.adobe.com/reader/'>Click here to get Adobe Reader</a>.</p>

<p>Your local Red Cross representative will be in touch soon to provide you with more information on how you can make a gift through your will, trust or another gift plan – such as a beneficiary of your retirement account or insurance policy. We honor every planned gift donor with membership in the Legacy Society. To learn more about becoming a Legacy Society member, visit www.redcrosslegacy.org/society.php.</p>

<p>If you have any questions, please don't hesitate to reach out to us by email at GiftPlanning@redcross.org or by phone at 1-800-797-8022, ext. 5. We're happy to assist you and your advisors with your charitable planning.</p>

<p>Best regards, </p>

<p>Rebecca Locke<br>
Executive Director, Gift Planning <br>
American Red Cross</p>
";	
	
	 } ?>


<?php /* Two wgBooklet and wgArcInWill*/ if (($_SESSION["wgBooklet"]=="1") && ($_SESSION["wgArcInWill"]=="1") && ($_SESSION["wgConsiderArcInWill"]=="1")) {
$subject="Your Red Cross Will Planning Guide & Gift Notification";
$message2="
<p>Dear $first_name,</p>

<p>Your FREE hard copy of Touching the Future will be delivered to the address you provided. Please allow 3-4 weeks for delivery. In the meantime, we hope you find your FREE interactive copy of Touching the Future a useful, timesaving tool. This resource will allow you to save your personal information in one place, make future edits when needed and print multiple copies to share with your attorney and family members.</p>

<p><a href='http://www.redcrosslegacy.org/pdf/WG.pdf'>Click here to download your guide and workbook</a>. You will need Adobe® Reader® (version 8.0 or newer) to view this document.   <a href='https://get.adobe.com/reader/'>Click here to get Adobe Reader</a>.</p>

<p>Your local Red Cross representative will contact you to personally offer our thanks and appreciation for your gift. We honor every planned gift donor with membership in the Legacy Society. To learn more about becoming a Legacy Society member, visit www.redcrosslegacy.org/society.php.</p>

<p>If you have any questions, please don't hesitate to reach out to us by email at GiftPlanning@redcross.org or by phone at 1-800-797-8022, ext. 5. We're happy to assist you and your advisors with your charitable planning.</p>

<p>Best regards,</p> 

<p>Rebecca Locke<br>
Executive Director, Gift Planning <br>
American Red Cross</p>
";	
	
	
	
	 } ?>

<?php /* two*/ if (($_SESSION["wgBooklet"]=="1") && ($_SESSION["wgArcInWill"]=="1") && ($_SESSION["wgConsiderArcInWill"]=="")) {
$subject="Your Red Cross Will Planning Guide & Gift Notification";
$message2 = "
<p>Dear $first_name,</p>

<p>Your FREE hard copy of Touching the Future will be delivered to the address you provided. Please allow 3-4 weeks for delivery. In the meantime, we hope you find your FREE interactive copy of Touching the Future a useful, timesaving tool. This resource will allow you to save your personal information in one place, make future edits when needed and print multiple copies to share with your attorney and family members.</p>

<p><a href='http://www.redcrosslegacy.org/pdf/WG.pdf'>Click here to download your guide and workbook</a>. You will need Adobe® Reader® (version 8.0 or newer) to view this document.   <a href='https://get.adobe.com/reader/'>Click here to get Adobe Reader</a>.</p>

<p>Your local Red Cross representative will contact you to personally offer our thanks and appreciation for your gift. We honor every planned gift donor with membership in the Legacy Society. To learn more about becoming a Legacy Society member, visit www.redcrosslegacy.org/society.php.</p>

<p>If you have any questions, please don't hesitate to reach out to us by email at GiftPlanning@redcross.org or by phone at 1-800-797-8022, ext. 5. We're happy to assist you and your advisors with your charitable planning.</p>

<p>Best regards, </p>

<p>Rebecca Locke<br>
Executive Director, Gift Planning <br>
American Red Cross	</p>
";
	 } ?>
<?php /* two*/ if (($_SESSION["wgBooklet"]=="1") && ($_SESSION["wgArcInWill"]=="") && ($_SESSION["wgConsiderArcInWill"]=="1")) {
$subject="Your Red Cross Will Planning Guide & Information Request";	
$message2="Dear $first_name,

<p>Your FREE hard copy of Touching the Future will be delivered to the address you provided. Please allow 3-4 weeks for delivery. In the meantime, we hope you find your FREE interactive copy of Touching the Future a useful, timesaving tool. This resource will allow you to save your personal information in one place, make future edits when needed and print multiple copies to share with your attorney and family members.</p>

<p><a href='http://www.redcrosslegacy.org/pdf/WG.pdf'>Click here to download your guide and workbook</a>. You will need Adobe® Reader® (version 8.0 or newer) to view this document.   <a href='https://get.adobe.com/reader/'>Click here to get Adobe Reader</a>.</p>

<p>Your local Red Cross representative will be in touch soon to provide you with more information on how you can make a gift through your will, trust or another gift plan – such as a beneficiary of your retirement account or insurance policy. We honor every planned gift donor with membership in the Legacy Society. To learn more about becoming a Legacy Society member, visit www.redcrosslegacy.org/society.php.</p>

<p>If you have any questions, please don't hesitate to reach out to us by email at GiftPlanning@redcross.org or by phone at 1-800-797-8022, ext. 5. We're happy to assist you and your advisors with your charitable planning.</p>

<p>Best regards,</p> 

<p>Rebecca Locke<br>
Executive Director, Gift Planning <br>
American Red Cross</p>";
	
	} ?> 


 
<?php /* two*/ if (($_SESSION["wgBooklet"]=="") && ($_SESSION["wgArcInWill"]=="1") && ($_SESSION["wgConsiderArcInWill"]=="1")) { 
$subject="Your Red Cross Will Planning Guide & Gift Notification";
$message2="<p>Dear $first_name,</p>

<p>We hope you find your FREE interactive copy of Touching the Future a useful, timesaving tool. This resource will allow you to save your personal information in one place, make future edits when needed and print multiple copies to share with your attorney and family members.</p>

<p><a href='http://www.redcrosslegacy.org/pdf/WG.pdf'>Click here to download your guide and workbook</a>. You will need Adobe® Reader® (version 8.0 or newer) to view this document.   <a href='https://get.adobe.com/reader/'>Click here to get Adobe Reader</a>.</p>

<p>Your local Red Cross representative will contact you to personally offer our thanks and appreciation for your gift. We honor every planned gift donor with membership in the Legacy Society. To learn more about becoming a Legacy Society member, visit www.redcrosslegacy.org/society.php.</p>

<p>If you have any questions, please don't hesitate to reach out to us by email at GiftPlanning@redcross.org or by phone at 1-800-797-8022, ext. 5. We're happy to assist you and your advisors with your charitable planning.</p>

<p>Best regards, </p>

<p>Rebecca Locke<br>
Executive Director, Gift Planning <br>
American Red Cross</p>";

 } ?>

<?php
//mail("dj@virtualgiving.com", "$lander_type", "$message", $header);
mail("GiftPlanning@redcross.org", "$lander_type", "$message", $header);
mail("$email", $subject, "$message2", $header);
?>