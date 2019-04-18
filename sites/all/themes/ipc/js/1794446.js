var signupFormObj = {

    error_string: "",
    element_count: "3",

    drawForm: function() {
        if(this.error_string != '') {
            document.write(this.error_string);
        }
        else {
            //All old forms will be calling a drawForm method on signupFormObj
            //with no paramaters passed in.
            var json_data = {"content": "\n\n<div class=\"e2ma_signup_form\" id=\"e2ma_signup_form\">\n    \n    <div class=\"e2ma_signup_image_container\" id=\"e2ma_signup_image_container\"><img src=\"https://d31hzlhk6di2h5.cloudfront.net/20181128/63/f8/8e/6b/9c5333c6736c65a24f589c51_800x463.png\" width=\"800\" height=\"463\"></div>\n    \n    <div class=\"e2ma_signup_message\" id=\"e2ma_signup_message\">    \n        <div>To sign up to receive our eUpdates, fill in the following fields and hit submit. Thanks, and welcome!</div>\n    </div>\n    <div class=\"e2ma_signup_form_container\" id=\"e2ma_signup_form_container\">\n        <form method=\"post\" id=\"e2ma_signup\" onSubmit=\"return signupFormObj.checkForm(this)\" action=\"https://app.e2ma.net/app2/audience/signup/1843286/1794446/\" >\n    \n    <input id=\"id_prev_member_email\" name=\"prev_member_email\" type=\"hidden\" />\n    \n    <input id=\"id_source\" name=\"source\" type=\"hidden\" />\n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n      <input type=\"hidden\" name=\"private_set\" value=\"{num_private}\">\n\n    \n    \n    \n    \n    \n    <div class=\"e2ma_signup_form_row\">\n      <div class=\"e2ma_signup_form_label\">\n        First name\n        \n        <span class=\"e2ma_signup_form_required_asterix\">*</span>\n        \n      </div>\n      <div class=\"e2ma_signup_form_element\"><input field_id=\"540046\" id=\"id_member_field_first_name\" name=\"member_field_first_name\" type=\"text\" /></div>\n    </div>\n    \n    \n    \n    <div class=\"e2ma_signup_form_row\">\n      <div class=\"e2ma_signup_form_label\">\n        Last name\n        \n        <span class=\"e2ma_signup_form_required_asterix\">*</span>\n        \n      </div>\n      <div class=\"e2ma_signup_form_element\"><input field_id=\"541070\" id=\"id_member_field_last_name\" name=\"member_field_last_name\" type=\"text\" /></div>\n    </div>\n    \n    \n    \n    <div class=\"e2ma_signup_form_row\">\n      <div class=\"e2ma_signup_form_label\">\n        Email\n        \n        <span class=\"e2ma_signup_form_required_asterix\">*</span>\n        \n      </div>\n      <div class=\"e2ma_signup_form_element\"><input id=\"id_email\" name=\"email\" type=\"email\" /></div>\n    </div>\n    \n    \n     \n    \n     \n    \n     \n    \n     \n    \n     \n    \n     \n    \n     \n    \n    <input type=\"hidden\" name=\"public_set\" value=\"1\">\n    <div class=\"e2ma_signup_form_groups\">\n    <div class=\"e2ma_signup_form_group_label\">I'm interested in:</div>\n      <div class=\"e2ma_signup_form_group_list\">\n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n            <!-- <input type=\"checkbox\" name=\"groups[]\" value=\"\" border=\"0\" > -->\n            <div>\n            <input id=\"id_group_2405774\" name=\"group_2405774\" type=\"checkbox\" />\n            Congregational News\n            </div>\n        \n        \n        \n        \n        \n            <!-- <input type=\"checkbox\" name=\"groups[]\" value=\"\" border=\"0\" > -->\n            <div>\n            <input id=\"id_group_2407822\" name=\"group_2407822\" type=\"checkbox\" />\n            Family News\n            </div>\n        \n        \n        \n        \n        \n            <!-- <input type=\"checkbox\" name=\"groups[]\" value=\"\" border=\"0\" > -->\n            <div>\n            <input id=\"id_group_2553230\" name=\"group_2553230\" type=\"checkbox\" />\n            Jr High Parents\n            </div>\n        \n        \n        \n        \n        \n            <!-- <input type=\"checkbox\" name=\"groups[]\" value=\"\" border=\"0\" > -->\n            <div>\n            <input id=\"id_group_2416014\" name=\"group_2416014\" type=\"checkbox\" />\n            Music &amp; Fine Arts News\n            </div>\n        \n        \n        \n        \n        \n            <!-- <input type=\"checkbox\" name=\"groups[]\" value=\"\" border=\"0\" > -->\n            <div>\n            <input id=\"id_group_2417038\" name=\"group_2417038\" type=\"checkbox\" />\n            Obituary Notifications\n            </div>\n        \n        \n        \n        \n        \n            <!-- <input type=\"checkbox\" name=\"groups[]\" value=\"\" border=\"0\" > -->\n            <div>\n            <input id=\"id_group_2555278\" name=\"group_2555278\" type=\"checkbox\" />\n            Sr High Parents\n            </div>\n        \n        \n        \n        \n        \n            <!-- <input type=\"checkbox\" name=\"groups[]\" value=\"\" border=\"0\" > -->\n            <div>\n            <input id=\"id_group_3092878\" name=\"group_3092878\" type=\"checkbox\" />\n            Young Adults\n            </div>\n        \n        \n        \n      </div>\n    </div>\n    \n    \n\n\n\n\n    <div class=\"e2ma_signup_form_required_footnote\"><span class=\"e2ma_signup_form_required_asterix\">*</span> = required field</div>\n    <div class=\"e2ma_signup_form_button_row\" id=\"e2ma_signup_form_button_row\">\n    <input id=\"e2ma_signup_submit_button\" class=\"e2ma_signup_form_button\" type=\"submit\" name=\"Submit\" value=\"Submit\" {disabled}>\n    </div>\n  </form>\n  </div>\n</div>\n<script type=\"text/javascript\">\n    (function() {\n        var loadCheckEl = document.getElementById('load_check');\n\n        // Hide the link to emma\n        if (loadCheckEl) {\n            loadCheckEl.style.display = 'none';\n        }\n    })();\n</script>\n"};
            
            //print form
            document.write(json_data.content);
            
        }
    },
    
    checkForm: function(form_obj) {
        //now handle required field validation
        json_fields = {"data": [{"widget_type": "text", "field_type": "text", "required": true, "name": "First name", "short_name": "first_name"}, {"widget_type": "text", "field_type": "text", "required": true, "name": "Last name", "short_name": "last_name"}, {"widget_type": "text", "field_type": "text", "required": true, "name": "Email", "short_name": "email"}]};
        var element_array = json_fields.data;
        var why = "";
        for (var loop = 0; loop < element_array.length; loop++) 
        {
            if(element_array[loop].widget_type == 'text' || element_array[loop].widget_type == 'long')
            {   
                if(form_obj[element_array[loop].short_name].value == "")
                {
                    why += element_array[loop].name + " is a required field.\n"
                }
                else if(element_array[loop].short_name == 'email')
                {
                    var filter=/^[a-z0-9_\-\.\+]+@[a-z0-9_\-\.]+\.[a-z]{2,4}$/i;

                    if (!filter.test(form_obj[element_array[loop].short_name].value))
                    {
                        why += element_array[loop].name + " must be a valid email address.\n";
                    }
                }
                continue;
            }
            else if (element_array[loop].widget_type == 'check_multiple')
            {
                var element = form_obj[element_array[loop].short_name];
                if(signupFormObj.checkMulti(element))
                {
                    continue;
                }
                why += element_array[loop].name + " is a required field.\n";
            }
            else if (element_array[loop].widget_type == 'radio')
            {
                var flag = 'false';
                var element = form_obj[element_array[loop].short_name];
                if (signupFormObj.checkMulti(element))
                {
                    continue;
                }
                why += element_array[loop].name + " is a required field.\n";
            } 
            else if (element_array[loop].widget_type == 'select one')
            {
                var index = form_obj[element_array[loop].short_name].selectedIndex;
                if(form_obj[element_array[loop].short_name].options[index].value == "")
                {
                    why += element_array[loop].name + " is a required field.\n";
                }
            }
            else if (element_array[loop].widget_type == 'select multiple')
            {
                var element = form_obj[element_array[loop].short_name];
                if(!signupFormObj.checkSelMulti(element)) {
                    why += element_array[loop].name + " is a required field.\n";
                }
            }
            else if (element_array[loop].widget_type == 'date')
            {
                var str_month = element_array[loop].widget_type + "_month";
                var str_day = element_array[loop].widget_type + "_day";
                var str_year = element_array[loop].widget_type + "_year";

                if (form_obj[str_month].selectedIndex < 1 || form_obj[str_day].selectedIndex < 1 || form_obj[str_year].selectedIndex < 1) 
                {
                    why += element_array[loop].name + " is a required field.\n";
                }
            }
        }
        if (why != "") {
            alert(why);
            return false;
        } 

        return true;   
        
    },
    
    checkSelMulti: function (element) {
        for(var i = 0; i < element.length; i++) {
            if(element[i].selected) {
                return true;
            }
        }
        return false;
    },

    checkMulti: function (element) {
        for (var i = 0; i < element.length; i++) {
            if (element[i].checked)
            {
                return true;
            }
        }
        return false;
    }
}
