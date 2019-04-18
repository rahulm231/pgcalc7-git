$(document).ready(function () {

	$('.block').matchHeight();

	// update position
	$('.search-row1').hide();
	$('.search-row2').hide();
	$('.search-row3').hide();
	$('.drop-search .all-load-more').hide();

	if ($(".search-txt-input").length > 0) {
		SearchText();
	}
});

function handleKeyPress(e) {
	var key = e.keyCode || e.which;
	if (key == 13) {
                e.preventDefault();
		SearchFunction();
		/*return false;*/
	}
		$('.search-container .drop-search .all-load-more').css("display", "block");

}

function SearchFunction() {
	var searchText = $('.search-txt-input').val();
	if (searchText.length > 0) {
		window.location.href = "/search/search-advanced?search=" + searchText;
		return false;
	}
}

function SearchText() {
	$(".search-txt-input").autocomplete({
		minLength: 3,
		source: function (request, response) {
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: "/SearchAdvancedPage.aspx/GetAutoCompleteData",
				data: "{'searchText':'" + $('.search-txt-input').val() + "'}",
				dataType: "json",
				success: function (data) {
					var searchData = data.d;

					// total count
					$('.search-header-total-results').text(searchData[0] + ' results');

					// physican data
					//$('.search-header-physician-results').text(searchData[1]);
					$('.search-header-physician-1').html(searchData[2]);
					$('.search-header-physician-2').html(searchData[3]);
					$('.search-header-physician-3').html(searchData[4]);

					if ((searchData[2].length < 16) && (searchData[3].length < 16) && (searchData[4].length < 16)) {
						$('ul.pcol1').hide();
					}

					// location data
					//$('.search-header-location-results').text(searchData[5]);
					$('.search-header-location-1').html(searchData[6]);
					$('.search-header-location-2').html(searchData[7]);
					$('.search-header-location-3').html(searchData[8]);

					// class data
					//$('.search-header-class-results').text(searchData[9]);
					$('.search-header-class-1').html(searchData[10]);
					$('.search-header-class-2').html(searchData[11]);
					$('.search-header-class-3').html(searchData[12]);

					// blog data
					$('.search-header-blog-results').text(searchData[13]);
					$('.search-header-blog-1').html(searchData[14]);
					$('.search-header-blog-2').html(searchData[15]);
					$('.search-header-blog-3').html(searchData[16]);

					// related search terms
					$('.search-header-search-term-1').html(searchData[17]);
					$('.search-header-search-term-2').html(searchData[18]);
					$('.search-header-search-term-3').html(searchData[19]);
					$('.search-header-search-term-4').html(searchData[20]);
					$('.search-header-search-term-5').html(searchData[21]);
					$('.search-header-search-term-6').html(searchData[22]);
					$('.search-header-search-term-7').html(searchData[23]);
					$('.search-header-search-term-8').html(searchData[24]);

					// news data
					//$('.search-header-news-results').text(searchData[25]);
					$('.search-header-news-1').html(searchData[26]);
					$('.search-header-news-2').html(searchData[27]);
					$('.search-header-news-3').html(searchData[28]);

					// content data
					//$('.search-header-content-results').text(searchData[29]);
					$('.search-header-content-1').html(searchData[30]);
					$('.search-header-content-2').html(searchData[31]);
					$('.search-header-content-3').html(searchData[32]);

					// specialty data
					$('.search-header-physicianspec-1').html(searchData[33]);
					$('.search-header-physicianspec-2').html(searchData[34]);
					$('.search-header-physicianspec-3').html(searchData[35]);


					// get hidden fields (url, type and site name)
					var hvSearchUrl = "/search/search-advanced";
					var hvSearchType = "2";
					var hvSiteName = "Munson";

					//$('.search-header-view-all-blogs').attr("href", '/search/search-advanced?search=' + $('.search-txt-input').val() + '&type=blogs');
					$('.search-header-view-all-physicians').attr("href", '/find-a-doctor/find-a-doctor?type=1&search=' + $('.search-txt-input').val());
					$('.search-header-view-all-classes').attr("href", '/classes-and-events/ce-results-category?keywords=' + $('.search-txt-input').val());
					$('.search-header-view-all-locations').attr("href", '/locations/location-map?search=' + $('.search-txt-input').val());
					$('.search-header-view-all-news').attr("href", '/ContentPage.aspx?nd=256&keywords=' + $('.search-txt-input').val());
					$('.search-header-view-all-content').attr("href", '/search/search-advanced?search=' + $('.search-txt-input').val() + '&type=content');

					//
					// display sections with data
					//

					$('.search-row1').hide();
					$('.search-row2').hide();
					$('.search-row3').hide();

					$('.related-block').hide();
					$('.services-block').hide();
					$('.physicians-block').hide();
					$('.locations-block').hide();
					$('.classes-block').hide();
					$('.news-block').hide();

					var count = 0;
					if (searchData[17].length > 0)
						count = count + 1;
					if (searchData[29] > 0)
						count = count + 1;
					if (searchData[5] > 0)
						count = count + 1;
					if (searchData[1] > 0)
						count = count + 1;
					if (searchData[9] > 0)
						count = count + 1;
					if (searchData[25] > 0)
						count = count + 1;

					//console.log(searchData[17].length);
					//console.log(count);

					switch (count) {
						case 1:
							// related search terms
							if (searchData[17].length > 0) {
								$('.search-row1').append($('.related-block'));
								$('.related-block').show();
							}
							// content
							if (searchData[29] > 0) {
								$('.search-row1').append($('.services-block'));
								$('.services-block').show();
							}
							// locations
							if (searchData[5] > 0) {
								$('.search-row1').append($('.locations-block'));
								$('.locations-block').show();
							}
							// physicians
							if (searchData[1] > 0) {
								$('.search-row1').append($('.physicians-block'));
								$('.physicians-block').show();
							}
							// classes
							if (searchData[9] > 0) {
								$('.search-row1').append($('.classes-block'));
								$('.classes-block').show();
							}
							// news
							if (searchData[25] > 0) {
								$('.search-row1').append($('.news-block'));
								$('.news-block').show();
							}

							$('.search-row1').show();
							break;
						case 2:
							// related search terms
							if (searchData[17].length > 0) {
								$('.search-row1').append($('.related-block'));
								$('.related-block').show();
							}
							// content
							if (searchData[29] > 0) {
								$('.search-row1').append($('.services-block'));
								$('.services-block').show();
							}
							// locations
							if (searchData[5] > 0) {
								$('.search-row1').append($('.locations-block'));
								$('.locations-block').show();
							}
							// physicians
							if (searchData[1] > 0) {
								$('.search-row1').append($('.physicians-block'));
								$('.physicians-block').show();
							}
							// classes
							if (searchData[9] > 0) {
								$('.search-row1').append($('.classes-block'));
								$('.classes-block').show();
							}
							// news
							if (searchData[25] > 0) {
								$('.search-row1').append($('.news-block'));
								$('.news-block').show();
							}

							$('.search-row1').show();
							break;
						case 3:
							// related search terms
							if (searchData[17].length > 0) {
								$('.search-row1').append($('.related-block'));
								$('.related-block').show();
							}
							// content
							if (searchData[29] > 0) {
								$('.search-row1').append($('.services-block'));
								$('.services-block').show();
							}
							// locations
							if (searchData[5] > 0) {
								$('.search-row1').append($('.locations-block'));
								$('.locations-block').show();
							}
							// physicians
							if (searchData[1] > 0) {
								$('.search-row1').append($('.physicians-block'));
								$('.physicians-block').show();
							}
							// classes
							if (searchData[9] > 0) {
								$('.search-row1').append($('.classes-block'));
								$('.classes-block').show();
							}
							// news
							if (searchData[25] > 0) {
								$('.search-row1').append($('.news-block'));
								$('.news-block').show();
							}


							$('.search-row1').show();
							//$('.search-row2').show();
							break;
						case 4:
							// related search terms
							if (searchData[17].length > 0) {
								$('.search-row1').append($('.related-block'));
								$('.related-block').show();
							}
							// content
							if (searchData[29] > 0) {
								$('.search-row1').append($('.services-block'));
								$('.services-block').show();
							}
							// locations
							if (searchData[5] > 0) {
								$('.search-row1').append($('.locations-block'));
								$('.locations-block').show();
							}
							// physicians
							if (searchData[1] > 0) {
								$('.search-row1').append($('.physicians-block'));
								$('.physicians-block').show();
							}
							// classes
							if (searchData[9] > 0) {
								$('.search-row1').append($('.classes-block'));
								$('.classes-block').show();
							}
							// news
							if (searchData[25] > 0) {
								$('.search-row1').append($('.news-block'));
								$('.news-block').show();
							}

							$('.search-row1').show();
							//$('.search-row2').show();
							break;
						case 5:
							// related search terms
							if (searchData[17].length > 0) {
								$('.search-row1').append($('.related-block'));
								$('.related-block').show();
							}
							// content
							if (searchData[29] > 0) {
								$('.search-row1').append($('.services-block'));
								$('.services-block').show();
							}
							// locations
							if (searchData[5] > 0) {
								$('.search-row1').append($('.locations-block'));
								$('.locations-block').show();
							}
							// physicians
							if (searchData[1] > 0) {
								$('.search-row1').append($('.physicians-block'));
								$('.physicians-block').show();
							}
							// classes
							if (searchData[9] > 0) {
								$('.search-row1').append($('.classes-block'));
								$('.classes-block').show();
							}
							// news
							if (searchData[25] > 0) {
								$('.search-row1').append($('.news-block'));
								$('.news-block').show();
							}

							$('.search-row1').show();
							//$('.search-row2').show();
							//$('.search-row3').show();
							break;
						case 6:
							// related search terms
							if (searchData[17].length > 0) {
								$('.search-row1').append($('.related-block'));
								$('.related-block').show();
							}
							// content
							if (searchData[29] > 0) {
								$('.search-row1').append($('.services-block'));
								$('.services-block').show();
							}
							// locations
							if (searchData[5] > 0) {
								$('.search-row1').append($('.locations-block'));
								$('.locations-block').show();
							}
							// physicians
							if (searchData[1] > 0) {
								$('.search-row1').append($('.physicians-block'));
								$('.physicians-block').show();
							}
							// classes
							if (searchData[9] > 0) {
								$('.search-row1').append($('.classes-block'));
								$('.classes-block').show();
							}
							// news
							if (searchData[25] > 0) {
								$('.search-row1').append($('.news-block'));
								$('.news-block').show();
							}

							$('.search-row1').show();
							//$('.search-row2').show();
							//$('.search-row3').show();
							break;
						default:
							break;
					}

				},
				error: function (result) {
					/*alert("Error");*/
				}
			});
		}
    });
    $('.search-container .darker-bg').click(function () {
        $(this).toggleClass('show');
        $('.site-search').slideToggle();
        $('.drop-search').slideToggle();
    });
}
