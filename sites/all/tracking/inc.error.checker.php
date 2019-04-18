<style type="text/css">
<?php if ($_POST["first_name"] ==""){ ?>#first_name { background-color:#FF9999!important;} <?php } ?>
<?php if ($_POST["last_name"] ==""){ ?>#last_name { background-color:#FF9999!important;} <?php } ?>
<?php if ($_POST["address"] ==""){ ?>#address { background-color:#FF9999!important;} <?php } ?>
<?php if ($_POST["city"]==""){ ?>#city { background-color:#FF9999!important;} <?php } ?>
<?php if ($_POST["state"] =="none"){ ?>#state { background-color:#FF9999!important;} <?php } ?>
<?php if ($_POST["zip"] ==""){ ?>#zip { background-color:#FF9999!important;} <?php } ?>
<?php if ($_POST["email"] ==""){ ?>#email { background-color:#FF9999!important;} <?php } ?>

/*Lander Specific Checks*/

<?php if (($lander_type=="Donor Mailing CGA Illustration Request") ) {if ($cgaStartage == "") { ?>#cgaStartage { background-color:#FF9999!important;} <?php }} ?>
<?php if (($lander_type=="Donor Email CGA Illustration Request") ) {if ($cgaStartage == "") { ?>#cgaStartage { background-color:#FF9999!important;} <?php }} ?>

<?php if ($lander_type=="Donor Mailing CGA Illustration Request") { ?><?php if ($giftamount!=1) { ?>.otheramounts { background-color:#FF9999!important;} <?php }} ?> 
<?php if ($lander_type=="Donor Email CGA Illustration Request") { ?><?php if ($giftamount!=1) { ?>.otheramounts { background-color:#FF9999!important;} <?php }} ?> 

</style>