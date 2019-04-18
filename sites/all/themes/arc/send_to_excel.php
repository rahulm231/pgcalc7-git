<? 
//Store Data in a Database
$tab = "\t";
$cr = "\n";
//The code below sets up the excel doc
//$data = "Response Date" . $tab ."Site URL" . $tab . "Lander Type" . $tab . "First Name" . $tab . "Last Name" . $tab . "Professional Title" . $tab . "Company Name" . $tab . "Address" . $tab . "Address (cont.)" . $tab . "City" . $tab . "State" . $tab . "Zip" . $tab . "Phone" . $tab . "Email" . $tab . "WG Booklet" . $tab . "WG ARC in will" . $tab . "WG Consider ARC in will" . $tab . "CGA Birthdate" . $tab . "CGA Spouse Birthdate" . $tab .  "CGA 5K" . $tab . "CGA 10K" . $tab . "CGA 50K" . $tab . "CGA 100K" . $tab . "CGA Other Amount" . $tab . "Consider charity in will" . $tab . "Opt in For Emails" . $cr;

$data .= "$hrs:$mins / $today "   . $tab ."$referrer" . $tab . "$lander_type" . $tab . "$first_name" . $tab . "$last_name" . $tab . "$professional_title" . $tab . "$company_name" . $tab . "$address" . $tab . "$address2" . $tab . "$city" . $tab . "$state" . $tab . "$zip" . $tab . "$phone" . $tab . "$email" . $tab . "$wgBooklet" . $tab . "$wgArcInWill" . $tab . "$wgConsiderArcInWill" . $tab . "$cgaBirthday" . $tab . "$cgaSpouseBirthdate" . $tab .  "$cga5k" . $tab . "$cga10k" . $tab . "$cga50k" . $tab . "$cga100k" . $tab . "$cgaOtherAmount" . $tab . "$considerCharityInWill" . $tab . "$optInForEmails" . $cr;


$fp = fopen("mailers.xls","a"); // $fp is now the file pointer to file $filename
    fwrite($fp,$data);    //    Write information to the file
    fclose($fp);  //    Close the file
	
?>