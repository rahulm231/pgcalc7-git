<?php session_start();  include("processor.php");  ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="no index, no follow" />
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>American Red Cross | Download Your FREE Planning Guide and Workbook today!</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/user.css" rel="stylesheet">
    <link rel="shortcut icon" href="images/favicon.ico">

    <script src="//use.typekit.net/dme8eld.js"></script>
    <script>try{Typekit.load();}catch(e){}</script>

    <!-- Google Tag Manager -->
    <script>
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-T7Z63LD');
    </script>
    <!-- End Google Tag Manager -->

    <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-869735-36', 'auto');
    ga('send', 'pageview');
    </script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>

   <!-- Google Tag Manager (noscript) -->
   <noscript>
   <iframe src="//www.googletagmanager.com/ns.html?id=GTM-T7Z63LD" height="0" width="0" style="display:none;visibility:hidden"></iframe>
   </noscript>
   <!-- End Google Tag Manager (noscript) -->

    <nav>
      <div class="container">
        <div class="row">
          <div class="col-sm-3 logo"><a href="http://www.redcrosslegacy.org/" target="_blank"><img src="images/logo-arc.png" alt="American Red Cross logo" class="img-responsive"></a></div>
          <div class="col-sm-9 text-right nav-sign-up"><a href="https://www.redcross.org/accounthelp/signIn.jsp" target="_blank">Sign In</a>&nbsp;&nbsp;&bull;&nbsp;&nbsp;<a href="https://www.redcross.org/accounthelp/createAccount.jsp" target="_blank">Sign Up</a></div>
        </div>
      </div>
    </nav>

    <section id="main">
      <div class="container">
        <div class="row">
          <div class="col-sm-7 main">
            <div class="row">
              <div class="col-sm-12"><img src="images/professionals.jpg" alt="Get a Head Start on Writing Your Will" class="img-responsive"></div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <h1 class="text-center">Get a Head Start on Writing Your&nbsp;Will</h1>
                <h2 class="text-center">FREE Planning Guide and Workbook</h2>
                <p>Organize all of your important information in one convenient place so you can begin writing or updating your will. Your guide and workbook will make it easy for family members to find critical documents and will help you gather:</p>
                <ul>
                  <li>A detailed record of all assets</li>
                  <li>Bank accounts, insurance policies and other financial details</li>
                  <li>Family and legal contacts</li>
                  <li>Memorial arrangements and who should be notified</li>
                  <li>Current desires for distribution of property</li>
                </ul>
                <p>This informative 44-page resource comes in an <strong>easy-to-use electronic file</strong> (PDF) that you can edit and save as needed. Or you can also request a <strong>bound booklet</strong> with perforated workbook pages that can be easily removed for copying.</p>
                <p>Simply fill out the form to <strong>get your FREE guide and workbook now.</strong></p>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <h3 class="text-center hidden-xs">This comprehensive guide will help you:</h3>
                <div class="row">
                  <div class="col-sm-7 hidden-xs">
                    <ul class="secondary">
                      <li>Understand the importance of having a will</li>
                      <li>Gather the information you need to write or update your will</li>
                      <li>Discover ways to minimize taxes and liabilities for your family</li>
                      <li>Explore the benefits of making charitable gifts in your will or other gift plan</li>
                    </ul>
                  </div>
                  <div class="col-sm-5 text-center photo"><img src="images/epwb.jpg" alt="Estate Planning Guide &amp; Workbook" class="img-responsive"></div>
                </div>
              </div>
            </div> 
          </div>
          <div class="col-md-4 col-md-offset-1 col-sm-5 form-container">
            <div class="row">
              <div class="col-sm-12 text-center form-header"><h1>Download Your <strong>FREE</strong> Planning Guide and Workbook today!</h1></div>
            </div>
            <div class="row">
              <div class="col-sm-12"><h2>Collect and organize all of your important information in one place to help you write or update your will.</h2></div>
            </div>
            <div class="row">
              <div class="col-sm-12 text-right required"><p><strong>*</strong> Indicates a required field</p></div>
            </div>
            <div class="row">
              <div class="col-sm-12">
               <form method="post" action="<?php echo $_SERVER['REQUEST_URI'];?>" name="" id="" role="form">
                  <div class="form-group">
                    <label for="first_name">First Name <span>*</span></label>
                    <input type="text" name="first_name" value="<?php echo $_SESSION["first_name"]; ?>" id="first_name" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="last_name">Last Name <span>*</span></label>
                    <input type="text" name="last_name" value="<?php echo $_SESSION["last_name"]; ?>" id="last_name" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="address">Address <span>*</span></label>
                    <input type="text" name="address" value="<?php echo $_SESSION["address"]; ?>" id="address" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="address2">Address (cont.)</label>
                    <input type="text" name="address2" value="<?php echo $_SESSION["address2"]; ?>" id="address2" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="city">City <span>*</span></label>
                    <input type="text" name="city" value="<?php echo $_SESSION["city"]; ?>" id="city" class="form-control" />
                  </div>
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="state">State <span>*</span></label>
                        <select class="form-control" name="state" id="state">
                          <option value="none" >Please Select</option>
						  <option value="AL">AL</option>
                          <option value="AK">AK</option>
                          <option value="AZ">AZ</option>
                          <option value="AR">AR</option>
                          <option value="CA">CA</option>
                          <option value="CO">CO</option>
                          <option value="CT">CT</option>
                          <option value="DE">DE</option>
                          <option value="DC">DC</option>
                          <option value="FL">FL</option>
                          <option value="GA">GA</option>
                          <option value="HI">HI</option>
                          <option value="ID">ID</option>
                          <option value="IL">IL</option>
                          <option value="IN">IN</option>
                          <option value="IA">IA</option>
                          <option value="KS">KS</option>
                          <option value="KY">KY</option>
                          <option value="LA">LA</option>
                          <option value="ME">ME</option>
                          <option value="MD">MD</option>
                          <option value="MA">MA</option>
                          <option value="MI">MI</option>
                          <option value="MN">MN</option>
                          <option value="MS">MS</option>
                          <option value="MO">MO</option>
                          <option value="MT">MT</option>
                          <option value="NE">NE</option>
                          <option value="NV">NV</option>
                          <option value="NH">NH</option>
                          <option value="NJ">NJ</option>
                          <option value="NM">NM</option>
                          <option value="NY">NY</option>
                          <option value="NC">NC</option>
                          <option value="ND">ND</option>
                          <option value="OH">OH</option>
                          <option value="OK">OK</option>
                          <option value="OR">OR</option>
                          <option value="PA">PA</option>
                          <option value="RI">RI</option>
                          <option value="SC">SC</option>
                          <option value="SD">SD</option>
                          <option value="TN">TN</option>
                          <option value="TX">TX</option>
                          <option value="UT">UT</option>
                          <option value="VT">VT</option>
                          <option value="VA">VA</option>
                          <option value="WA">WA</option>
                          <option value="WV">WV</option>
                          <option value="WI">WI</option>
                          <option value="WY">WY</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="zip">Zip Code <span>*</span></label>
                        <input type="text" name="zip" value="<?php echo $_SESSION["zip"]; ?>" id="zip" class="form-control" />
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="text" name="phone" value="<?php echo $_SESSION["phone"]; ?>" id="phone" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="email">Email <span>*</span></label>
                    <input type="text" name="email" value="<?php echo $_SESSION["email"]; ?>" id="email" class="form-control" />
                  </div>
                  <div class="checkbox">
                    <label><input type="checkbox" name="wgBooklet" value="<?php echo $_SESSION["wgBooklet"]; ?>">I would also like a booklet version of the FREE guide and workbook mailed to me.</label>
                  </div>
                  <div class="form-callout">Many people like to leave a charity in their will because they care about causes that have been important in their lives.</div>
                  <div class="checkbox">
                    <label><input type="checkbox" name="wgArcInWill" value="<?php echo $_SESSION["wgArcInWill"]; ?>">I already included the Red Cross in my will, trust or another gift plan, such as a beneficiary of my retirement account or insurance policy.</label>
                  </div>
                  <div class="checkbox">
                    <label><input type="checkbox" name="wgConsiderArcInWill" value="<?php echo $_SESSION["wgConsiderArcInWill"]; ?>">I would consider a gift to the Red Cross in my will.</label>
                  </div>
                  <div class="form-group">
                  <input type="text"   name="lander_type" style="display:none;" value="Donor Mailing WG Request">
                   <input type="text"   name="pagename" style="display:none;" value="<?php echo $_SERVER['REQUEST_URI'];?>">
                   <input type="text" name="filter" value="" id="filter" class="filter" style="display:none;"    />
                    <button type="submit" id="submit" name="submit" value="submit" class="btn btn-default btn-block">Get My FREE<br/>Guide &amp; Workbook</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <ul>
              <li>&copy; Copyright 2017 The American Red Cross</li>
              <li><a href="http://www.redcross.org/privacy-policy" target="_blank">Privacy Policy</a></li>
              <li><a href="http://www.redcross.org/terms-of-use" target="_blank">Terms and Conditions</a></li>
              <li><a href="http://www.redcross.org/connect-with-us" target="_blank">Connect With Us</a></li>
              <li><a href="http://www.redcross.org/help-faq" target="_blank">FAQ</a></li>
              <li><a href="http://www.redcross.org/contact-us" target="_blank">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <?php include("https://www.calculator.planyourlegacy.org/stats-file.php?pwid=524"); ?>
  </body>
</html>