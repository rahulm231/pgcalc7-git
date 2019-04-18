<?php include('connection.php');

	if(!(isset($wgBooklet))){
		$wgBooklet = '';
	}   

// Check connection
	if ($conn->connect_error) {		
		
	    //die("Connection failed: " . $conn->connect_error);
	    //Store Data in a Database
		$tab = "\t";
		$cr = "\n";
		//The code below sets up the excel doc
		//$data = "Response Date" . $tab ."Site URL" . $tab . "Lander Type" . $tab . "First Name" . $tab . "Last Name" . $tab . "Professional Title" . $tab . "Company Name" . $tab . "Address" . $tab . "Address (cont.)" . $tab . "City" . $tab . "State" . $tab . "Zip" . $tab . "Phone" . $tab . "Email" . $tab . "WG Booklet" . $tab . "WG ARC in will" . $tab . "WG Consider ARC in will" . $tab . "CGA Birthdate" . $tab . "CGA Spouse Birthdate" . $tab .  "CGA 5K" . $tab . "CGA 10K" . $tab . "CGA 50K" . $tab . "CGA 100K" . $tab . "CGA Other Amount" . $tab . "Consider charity in will" . $tab . "Opt in For Emails"  . $tab . "LI Gift With Stocks Interest"  . $tab . "LI Gift With IRA Interest"  . $tab . "LI Gift With Real Estate Interest" . $cr;
		
		$data .= "$hrs:$mins / $today "   . $tab ."$referrer" . $tab . "$lander_type" . $tab . "$first_name" . $tab . "$last_name" . $tab . "$professional_title" . $tab . "$company_name" . $tab . "$address" . $tab . "$address2" . $tab . "$city" . $tab . "$state" . $tab . "$zip" . $tab . "$phone" . $tab . "$email" . $tab . "$wgBooklet" . $tab . "$wgArcInWill" . $tab . "$wgConsiderArcInWill" . $tab . "$cgaBirthday" . $tab . "$cgaSpouseBirthdate" . $tab .  "$cga5k" . $tab . "$cga10k" . $tab . "$cga50k" . $tab . "$cga100k" . $tab . "$cgaOtherAmount" . $tab . "$cgaStartage" . $tab . "$giftsThroughWill" . $tab . "$giftsOutsideWill" . $tab . "$giftsThatPayBack" . $tab . "$considerCharityInWill" . $tab . "$optInForEmails" . $tab . "$giftsWithStocks" . $tab . "$giftsWithIRA" . $tab . "$giftsWithRealEstate" . $cr;
		
		
		$fp = fopen("mailers.xls","a"); // $fp is now the file pointer to file $filename
	    fwrite($fp,$data);    //    Write information to the file
	    fclose($fp);  //    Close the file
	}else{
		
		$sql_insert = "INSERT INTO tracking (date, referrer, lander_type, first_name, last_name, professional_title, company_name, address, address2, city, state, zip, phone, email, wg_booklet, wg_arcinwill, wg_considerarcinwill, cga_birthday, cga_spouse_birthdate, cga_5k, cga_10k, cga_50k, cga_100k, cga_other_amount, cga_age_payment, gifts_in_will, gifts_outside_will, gifts_pay_back, consider_charity_inwill, optin_emails, gifts_with_stocks, gifts_with_ira, gifts_with_real_estate)
VALUES (now(), '".$referrer."', '".$lander_type."', '".$first_name."', '".$last_name."', '".$professional_title."', '".$company_name."', '".$address."', '".$address2."', '".$city."', '".$state."', '".$zip."', '".$phone."', '".$email."', '".$wgBooklet."', '".$wgArcInWill."', '".$wgConsiderArcInWill."', '".$cgaBirthday."', '".$cgaSpouseBirthdate."', '".$cga5k."', '".$cga10k."', '".$cga50k."', '".$cga100k."', '".$cgaOtherAmount."', '".$cgaStartage."', '".$giftsThroughWill."', '".$giftsOutsideWill."', '".$giftsThatPayBack."', '".$considerCharityInWill."', '".$optInForEmails."', '".$giftsWithStocks."', '".$giftsWithIRA."', '".$giftsWithRealEstate."')";

		if ($conn->query($sql_insert) === TRUE) {
		    echo "New record created successfully";			
		} else {
		    echo "Error: " . $conn->error;
		}
		$conn->close();
	}
?>