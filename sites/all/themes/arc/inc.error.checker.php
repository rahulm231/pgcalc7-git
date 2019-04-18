<style type="text/css">
<? if ($_POST["first_name"] ==""){ ?>#first_name { background-color:#FF9999!important;} <? } ?>
<? if ($_POST["last_name"] ==""){ ?>#last_name { background-color:#FF9999!important;} <? } ?>
<? if ($_POST["address"] ==""){ ?>#address { background-color:#FF9999!important;} <? } ?>
<? if ($_POST["city"]==""){ ?>#city { background-color:#FF9999!important;} <? } ?>
<? if ($_POST["state"] =="none"){ ?>#state { background-color:#FF9999!important;} <? } ?>
<? if ($_POST["zip"] ==""){ ?>#zip { background-color:#FF9999!important;} <? } ?>
<? if ($_POST["email"] ==""){ ?>#email { background-color:#FF9999!important;} <? } ?>

/*Lander Specific Checks*/
<? if ($lander_type=="Donor Email CGA Illustration Request") { if ($cgaBirthday == "") {?>#cgaBirthday { background-color:#FF9999!important;} <? }} ?>
<? if ($lander_type=="Donor Email CGA Illustration Request") { ?><? if ($giftamount!=1) { ?>.otheramounts { background-color:#FF9999!important;} <? }} ?> 

<? if ($lander_type=="Digital Campaign CGA Illustration Request") { if ($cgaBirthday == "") {?>#cgaBirthday { background-color:#FF9999!important;} <? }} ?>
<? if ($lander_type=="Digital Campaign CGA Illustration Request") { ?><? if ($giftamount!=1) { ?>.otheramounts { background-color:#FF9999!important;} <? }} ?> 

<?  if ($lander_type=="Donor Mailing CGA Illustration Request") { if ($cgaBirthday == "") {?>#cgaBirthday { background-color:#FF9999!important;} <? }} ?>
<? if ($lander_type=="Donor Mailing CGA Illustration Request") { ?><? if ($giftamount!=1) { ?>.otheramounts { background-color:#FF9999!important;} <? }} ?> 

 

 
</style>