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
\n\n";
if ($giftsWithStocks=="1" || $giftsWithIRA=="1" || $giftsWithRealEstate=="1") {
	$message.="<p><strong>I'm interested in more information on funding a life income gift with:</strong></p>";
	if ($$giftsWithStocks=="1") {
		$message.="<p>Stocks, mutual funds or other appreciated securities.</p>"; }
	if ($giftsWithIRA=="1") {
		$message.="<p>IRA or other retirement assets.</p>"; }
	if ($giftsWithRealEstate=="1") {
		$message.="<p>Income property or other real estate.</p>"; }
}
if ($wgArcInWill=="1") {
		$message.="<p>I already included the Red Cross in my will, trust or another gift plan, such as a beneficiary of my retirement account or insurance policy.</p>"; }
if ($optInForEmails ==1) {$message.="<p>I'd also like to receive emails from the American Red Cross on planning for my future and other similar topics.</p>";}
$message.="<p><a href='http://redcrosslegacy.org/mailers/mailers.xls'>Download the Database</a>";

?>

<?php 
$subject="Your Information Request";
$message2="
<p>Dear $first_name,</p>

<p>A member of our American Red Cross Gift Planning Team will contact you soon with more information. In the meantime, please don't hesitate to reach out to us by email at GiftPlanning@redcross.org or by phone at 1-800-797-8022 ext. 5 with any questions. We're happy to assist you and your advisors with your charitable planning.
</p>
<p>Best regards, </p>

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