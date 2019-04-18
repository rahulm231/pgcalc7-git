<?php include('connection.php');

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[mt_rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

  // query to fetch all records then write them in excel file
	foreach (glob("mailers*.xls") as $filename) {
		if ( (time() - filemtime($filename)) > 5*60 )
			{
				unlink($filename);
			}
	}//End foreach to delete old reports

    do {//Create file name
	$OutputFileName = "mailers_db_" . date("m-d-Y_H.i.s") . "_" . generateRandomString(20) . ".xls";    
	} while (file_exists($OutputFileName));

    $sql="SELECT * FROM tracking ORDER BY id asc";
	$result=mysqli_query($conn,$sql);
	
	
	$tab = "\t";
	$cr = "\n";
	//The code below sets up the excel doc
	$data = "Response Date" . $tab ."Site URL" . $tab . "Lander Type" . $tab . "First Name" . $tab . "Last Name" . $tab . "Professional Title" . $tab . "Company Name" . $tab . "Address" . $tab . "Address (cont.)" . $tab . "City" . $tab . "State" . $tab . "Zip" . $tab . "Phone" . $tab . "Email" . $tab . "WG Booklet" . $tab . "WG ARC in will" . $tab . "WG Consider ARC in will" . $tab . "CGA Birthdate" . $tab . "CGA Spouse Birthdate" . $tab .  "CGA 5K" . $tab . "CGA 10K" . $tab . "CGA 50K" . $tab . "CGA 100K" . $tab . "CGA Other Amount"  . $tab . "CGA Age Payments Begin"  . $tab . "Interest in Gifts in Will"  . $tab . "Interest in Gifts Outside Will"  . $tab . "Interest in Gifts that Pay Back" . $tab . "Consider charity in will" . $tab . "Opt in For Emails" . $tab . "LI Gift With Stocks Interest" . $tab . "LI Gift With IRA Interest" . $tab . "LI Gift With Real Estate Interest" . $cr;
	
	
	while ($row = $result->fetch_assoc()) {
	  $date = date('m/d/Y h:i',strtotime($row['date']));	
	  $referrer = $row['referrer'];
	  $lander_type = $row['lander_type'];
	  $first_name = $row['first_name'];
	  $last_name = $row['last_name'];
	  $professional_title = $row['professional_title'];
	  $company_name = $row['company_name'];
	  $address = $row['address'];
	  $address2 = $row['address2'];
	  $city = $row['city'];
	  $state = $row['state'];
	  $zip = $row['zip'];
	  $phone = $row['phone'];
	  $email = $row['email'];
	  $wgBooklet = $row['wg_booklet'];
	  $wgArcInWill = $row['wg_arcinwill'];
	  $wgConsiderArcInWill = $row['wg_considerarcinwill'];
	  $cgaBirthday = $row['cga_birthday'];
	  $cgaSpouseBirthdate = $row['cga_spouse_birthdate'];
	  $cga5k = $row['cga_5k'];
	  $cga10k = $row['cga_10k'];
	  $cga50k = $row['cga_50k'];
	  $cga100k = $row['cga_100k'];
	  $cgaOtherAmount = $row['cga_other_amount'];
	  $cgaAgePayment = $row['cga_age_payment'];
	  $giftsInWill = $row['gifts_in_will'];
	  $giftsOutsideWill = $row['gifts_outside_will'];
	  $giftsPayBack = $row['gifts_pay_back'];
	  $considerCharityInWill = $row['consider_charity_inwill'];
	  $optInForEmails = $row['optin_emails'];	
	  $giftsWithStocks = $row['gifts_with_stocks'];	
	  $giftsWithIRA = $row['gifts_with_ira'];	
	  $giftsWithRealEstate = $row['gifts_with_real_estate'];
	
	  $data.= "$date "   . $tab ."$referrer" . $tab . "$lander_type" . $tab . "$first_name" . $tab . "$last_name" . $tab . "$professional_title" . $tab . "$company_name" . $tab . "$address" . $tab . "$address2" . $tab . "$city" . $tab . "$state" . $tab . "$zip" . $tab . "$phone" . $tab . "$email" . $tab . "$wgBooklet" . $tab . "$wgArcInWill" . $tab . "$wgConsiderArcInWill" . $tab . "$cgaBirthday" . $tab . "$cgaSpouseBirthdate" . $tab .  "$cga5k" . $tab . "$cga10k" . $tab . "$cga50k" . $tab . "$cga100k" . $tab . "$cgaOtherAmount" . $tab . "$cgaAgePayment" . $tab . "$giftsInWill" . $tab . "$giftsOutsideWill" . $tab . "$giftsPayBack" . $tab . "$considerCharityInWill" . $tab . "$optInForEmails" . $tab . "$giftsWithStocks" . $tab . "$giftsWithIRA" . $tab . "$giftsWithRealEstate" . $cr;
	  
    }

    $fp = fopen($OutputFileName,"a"); // $fp is now the file pointer to file $filename
	fwrite($fp,$data);    //    Write information to the file
	fclose($fp);
	//    Close the file
	
	// Free result set
	mysqli_free_result($result);
	
	mysqli_close($conn);

echo "<a href='". $OutputFileName . "'>Download Mailers History Here</a>";

?>
