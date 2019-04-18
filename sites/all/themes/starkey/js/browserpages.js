
(function ($, window, hziGlobal, undefined) {

    var me = {}; // for private members

    // private members
    me.ddlChangeHandlers = function () {

        // Browser Blog js
        if ($('#ddlBlogsCategories').length > 0) {
            $("#ddlBlogsCategories,#ddlBlogsDate").change(function () {

                var catergoryTerm = $("#ddlBlogsCategories").val();
                var dateTerm = $("#ddlBlogsDate").val();

                var url = '/Blog?categoryTerm=' + catergoryTerm + "&date=" + dateTerm;
                window.location = url;
            });
        }

        //Browser News js
        if ($('#ddlNewsCategories').length > 0) {
            $("#ddlNewsCategories,#ddlNewsArticleDate").change(function () {

                var catergoryTerm = $("#ddlNewsCategories").val();
                var dateTerm = $("#ddlNewsArticleDate").val();

                var url = '/news-and-events?categoryTerm=' + catergoryTerm + "&date=" + dateTerm;
                window.location = url;
            });
        }

        //Browser Videos js
        if ($('#ddlVideoRegions').length > 0) {
            var disableVideosCountry = $("#ddlVideoRegions").val();

            if ((disableVideosCountry == "") | (disableVideosCountry == "U.S.A")) {
                $("#ddlVideoCountries").empty();
                $("#ddlVideoCountries").append("<option value=''>Countries</option>");
                $("#ddlVideoCountries").prop("disabled", true);
            }
            $("#ddlVideoRegions,#ddlVideoCountries,#ddlVideoCategories").change(function () {
                var regionTerm = $('select#ddlVideoRegions option:selected').val();
                var countryTerm = $('select#ddlVideoCountries option:selected').val();
                var categoryTerm = $("#ddlVideoCategories").val();

                var url;
                if (regionTerm.length == 0) {
                    url = '/videos?regionTerm=' + "" + "&countryTerm=" + "" + "&categoryTerm=" + categoryTerm;
                }
                else {
                    url = '/videos?regionTerm=' + encodeURIComponent(regionTerm) + "&countryTerm=" + encodeURIComponent(countryTerm) + "&categoryTerm=" + categoryTerm;
                }
                window.location = url;
            });
            // when country is same but region changes
            if ($('select#ddlVideoCountries option:selected').val().length > 0) {
                if ($("#ddlVideoRegions").change(function () 
                {
                   var regionTerm = $('select#ddlVideoRegions option:selected').val();
                   var categoryTerm = $('select#ddlVideoCategories option:selected').val();

                   var url = '/videos?regionTerm=' + encodeURIComponent(regionTerm) + "&countryTerm=" + "" + "&categoryTerm=" + categoryTerm;
                   window.location = url;
                }));
            }
        }

        // Browser Missions js
        if ($('#ddlRegions').length > 0) {
            var disableCountry = $("#ddlRegions").val();

            if ((disableCountry == "") | (disableCountry == "U.S.A")) {
                $("#ddlCountries").empty();
                $("#ddlCountries").append("<option value=''>Countries</option>");
                $("#ddlCountries").prop("disabled", true);
            }

            // Post back when country or date is selected
            $("#ddlRegions,#ddlCountries,#ddlMissionsDate").change(function () {

                var regionTerm = $('select#ddlRegions option:selected').val();
                var countryTerm = $('select#ddlCountries option:selected').val();
                var dateTerm = $('select#ddlMissionsDate option:selected').val();

                var url;

                if (regionTerm.length == 0) {
                    url = '/missions?regionTerm=' + "" + "&countryTerm=" + "" + "&date=" + dateTerm;
                } else {
                    url = '/missions?regionTerm=' + encodeURIComponent(regionTerm) + "&countryTerm=" + encodeURIComponent(countryTerm) + "&date=" + dateTerm;
                }
                window.location = url;
            });

            // when country is same but region changes
            if ($('select#ddlCountries option:selected').val().length > 0) {
                if ($("#ddlRegions").change(function () {

               var regionTerm = $('select#ddlRegions option:selected').val();
               var dateTerm = $('select#ddlMissionsDate option:selected').val();

               var url = '/missions?regionTerm=' + encodeURIComponent(regionTerm) + "&countryTerm=" + "" + "&date=" + dateTerm;
               window.location = url;
                }));
            }
        }

    };

    // public members
    hziGlobal.documentReady = function () {
        me.ddlChangeHandlers();
    };

}(jQuery, window, window.hziGlobal || (window.hziGlobal = {})));

$(function () {
    window.hziGlobal.documentReady();
});