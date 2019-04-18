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
if (($_SESSION["wgConsiderArcInWill"]=="1")) {
	$message.="<p>Many people like to leave a charity in their will because they care about causes that have been important in their lives. I would consider a gift to charity in my will.</p>"; }	
if ( ($_SESSION["optInForEmails"]=="1")) {
	$message.="<p>I'd like to receive emails from the American Red Cross on planning for my future and other similar topics.</p>";
}
$message.="<p><a href='http://redcrosslegacy.org/mailers/mailers.xls'>Download the Database</a>";



?>

<?php /* No Checkboxes */ if (($_SESSION["considerCharityInWill"]=="") && ($_SESSION["optInForEmails"]=="")) {
$subject="Your Red Cross Will Planning Guide";
$message2="
<p>Dear $first_name,</p>

<p>We hope you find your FREE interactive copy of Touching the Future a useful, timesaving tool. This resource will allow you to save your personal information in one place, make future edits when needed and print multiple copies to share with your attorney and family members.</p>

<p><a href='http://www.redcrosslegacy.org/pdf/WG.pdf'>Click here to download your guide and workbook.</a> You will need Adobe® Reader® (version 8.0 or newer) to view this document.  <a href='https://get.adobe.com/reader/'>Click here to get Adobe Reader</a>.</p>

<p>If you have any questions, please don't hesitate to reach out to us by email at GiftPlanning@redcross.org or by phone at 1-800-797-8022, ext. 5. We're happy to assist you and your advisors with your charitable planning.</p>

<p>Best regards, </p>

<p>Rebecca Locke<br>
Executive Director, Gift Planning <br>
American Red Cross</p>
";	
 } ?>
 
<?php /* No Checkboxes */ if (($_SESSION["considerCharityInWill"]=="1") && ($_SESSION["optInForEmails"]=="")) {
$subject="Your Red Cross Will Planning Guide & Information Request";
$message2="
<p>Dear $first_name,</p>

<p>We hope you find your FREE interactive copy of Touching the Future a useful, timesaving tool. This resource will allow you to save your personal information in one place, make future edits when needed and print multiple copies to share with your attorney and family members.</p>

<p><a href='http://www.redcrosslegacy.org/pdf/WG.pdf'>Click here to download your guide and workbook.</a> You will need Adobe® Reader® (version 8.0 or newer) to view this document.  <a href='https://get.adobe.com/reader/'>Click here to get Adobe Reader</a>. </p>

<p>Your local Red Cross representative will be in touch soon to provide you with more information on how you can make a gift through your will, trust or another gift plan – such as a beneficiary of your retirement account or insurance policy. We honor every planned gift donor with membership in the Legacy Society. To learn more about becoming a Legacy Society member, visit www.redcrosslegacy.org/society.php.</p>

<p>If you have any questions, please don't hesitate to reach out to us by email at GiftPlanning@redcross.org or by phone at 1-800-797-8022, ext. 5. We're happy to assist you and your advisors with your charitable planning.
</p>
<p>Best regards, </p>

<p>Rebecca Locke<br>
Executive Director, Gift Planning <br>
American Red Cross</p>
";	
 } ?>
 
<?php /* No Checkboxes */ if (($_SESSION["considerCharityInWill"]=="") && ($_SESSION["optInForEmails"]=="1")) {
$subject="Your Red Cross Will Planning Guide";
$message2="
<p>Dear $first_name,</p>

<p>We hope you find your FREE interactive copy of Touching the Future a useful, timesaving tool. This resource will allow you to save your personal information in one place, make future edits when needed and print multiple copies to share with your attorney and family members.</p>

<p><a href='http://www.redcrosslegacy.org/pdf/WG.pdf'>Click here to download your guide and workbook.</a> You will need Adobe® Reader® (version 8.0 or newer) to view this document.  <a href='https://get.adobe.com/reader/'>Click here to get Adobe Reader</a>. </p>

<p>If you have any questions, please don't hesitate to reach out to us by email at GiftPlanning@redcross.org or by phone at 1-800-797-8022, ext. 5. We're happy to assist you and your advisors with your charitable planning.</p>

<p>Best regards, </p>

<p>Rebecca Locke<br>
Executive Director, Gift Planning <br>
American Red Cross</p>
";	
 } ?>
 
 <?php /* No Checkboxes */ if (($_SESSION["considerCharityInWill"]=="1") && ($_SESSION["optInForEmails"]=="1")) {
$subject="Your Red Cross Will Planning Guide & Information Request";
$message2="
<p>Dear $first_name,</p>

<p>We hope you find your FREE interactive copy of Touching the Future a useful, timesaving tool. This resource will allow you to save your personal information in one place, make future edits when needed and print multiple copies to share with your attorney and family members.</p>

<p><a href='http://www.redcrosslegacy.org/pdf/WG.pdf'>Click here to download your guide and workbook.</a> You will need Adobe® Reader® (version 8.0 or newer) to view this document.  <a href='https://get.adobe.com/reader/'>Click here to get Adobe Reader</a>. </p>

<p>Your local Red Cross representative will be in touch soon to provide you with more information on how you can make a gift through your will, trust or another gift plan – such as a beneficiary of your retirement account or insurance policy. We honor every planned gift donor with membership in the Legacy Society. To learn more about becoming a Legacy Society member, visit www.redcrosslegacy.org/society.php.</p>

<p>If you have any questions, please don't hesitate to reach out to us by email at GiftPlanning@redcross.org or by phone at 1-800-797-8022, ext. 5. We're happy to assist you and your advisors with your charitable planning.</p>

<p>Best regards, </p>

<p>Rebecca Locke<br>
Executive Director, Gift Planning <br>
American Red Cross</p>
";	
 } ?>


 
<?php
//mail("dj@virtualgiving.com", "$lander_type", "$message", $header);
mail("GiftPlanning@redcross.org", "$lander_type", "$message", $header);
mail("$email", "$subject", "$message2", $header);
?>