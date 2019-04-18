/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 *
 * Google CDN, Latest jQuery
 * To use the default WordPress version of jQuery, go to lib/config.php and
 * remove or comment out: add_theme_support('jquery-cdn');
 * ======================================================================== */


(function($) {

  var OHSSB = {
    // All pages
    common: {
      init: function() {
        var $group_filter = $('.ohssb-filter');
        var $group_sort   = $('.ohssb-sort');

        // handle 404ed animal images
        $('.animal-results .result-item img, .animal-details .detail-image img').error(function(){
          $(this).attr('src', ohssb_params['animal_placeholder']);
        });


        // no sorting or isotope for IE8 and lower
        if ( $('.lt-ie9').length == 0 ) {
          // sort and filter search results
          if ( $('.result-item').length > 1 && $group_filter.length > 0 ) {
            $group_filter.show();
            $group_sort.show();

            $('.animal-results').isotope({
              itemSelector: '.result-item',
              layoutMode: 'fitRows',
              getSortData: {
                date : '[data-ohssb-ts]',
                loc  : '[data-ohssb-loc]',
                ken  : '[data-ohssb-ken]',
                name : '[data-ohssb-name]'
              }
            });

            if ( $('.ohssb-sort .sort_by').length > 0 ) {
              var selected_val = $('.ohssb-sort .sort_by').val();
              $('.animal-results').isotope({
                sortBy: [ selected_val ],
                sortAscending: true
              });
            }

            // change sort field
            $('.ohssb-sort .sort_by').change(function(){
              var selected_val = $(this).val();
              $('.animal-results').isotope( {sortBy: selected_val} );
            });


            // change filter field
            $('.ohssb-filter .filter_by').change(function(){
              $('.animal-results').isotope( {
                filter: function() {
                  var result = true;

                  // type filter
                  if ( $('.ohssb-filter .filter_by_type').length > 0 ) {
                    var filter_type = $('.ohssb-filter .filter_by_type').val();
                    var data_type = $(this).data('ohssb-type');

                    if ( filter_type != 'all' ) {
                      result = result && (filter_type == data_type || filter_type == (data_type+'s'));
                    }
                  }

                  // location filter
                  if ( $('.ohssb-filter .filter_by_loc').length > 0 ) {
                    var filter_loc = $('.ohssb-filter .filter_by_loc').val();
                    var data_loc = $(this).data('ohssb-loc');

                    if ( filter_loc != 'all' ) {
                      result = result && (filter_loc == data_loc);
                    }
                  }

                  return result;
                }
              });
            });

            // change sort direction
            $('.ohssb-sort .sort_direction').change(function(){
              var selected_val = $(this).val();
              var is_ascending = false;
              if (selected_val === 'asc') {
                is_ascending = true;
              }
              $('.animal-results').isotope( {sortAscending: is_ascending } );
            });
          }
        }
      }
    },

    // Adopt page
    page_template_template_adopt_php: {
      init: function() {
        var $toggle_adv       = $('.ohssb-search-form .toggle-advanced-fields');
        var $box_adv          = $('.ohssb-search-form .advanced-fields');
        var $btn_search_top   = $('.ohssb-search-form .basic-submit');
        var $field_breed      = $('.ohssb-search-form #breed');
        var $field_color      = $('.ohssb-search-form #color');
        var $field_weight     = $('.ohssb-search-form #weight');
        var $field_age        = $('.ohssb-search-form #age');
        var $field_type       = $('.ohssb-search-form #type');
        var $field_sex        = $('.ohssb-search-form #sex');
        var $field_mode       = $('.ohssb-search-form #mode');
        var $field_code       = $('.ohssb-search-form #code');
        var $group_age        = $('.ohssb-search-form .group-age');
        var $group_color      = $('.ohssb-search-form .group-color');
        var $group_weight     = $('.ohssb-search-form .group-weight');
        var $group_breed      = $('.ohssb-search-form .group-breed');
        var $group_sex        = $('.ohssb-search-form .group-sex');
        var $group_code       = $('.ohssb-search-form .group-code');
        var $group_sort       = $('.ohssb-sort');
        var is_oldie          = ( $('.lt-ie9').length > 0) ? true : false;
        var show_sort         = ( is_oldie ) ? false : true;

        /**
         * Init
         * Restore state based on querystring vars
         */
        if ( $field_type.val() != '' ) {
          // a search has been performed so setup
          // the form and display based on the search params
          $toggle_adv.slideDown('fast');
          $btn_search_top.fadeIn('fast');

          // show sort?
          if ( show_sort && $('.result-item').length > 1 ) {
            $group_sort.show();
          }

          $group_code.hide();

          ohssb_setup_advanced_fields( $field_type.val(), false );

          if ( $field_mode.val() == 'adv' ) {
            ohssb_show_advanced_fields();
          } else {
            ohssb_set_field_names();
          }
        }

        /**
         * Handle display of advanced search fields
         */
        function ohssb_show_advanced_fields() {
          $toggle_adv.html('Hide search options').addClass('open');
          $btn_search_top.fadeOut('fast');
          $box_adv.slideDown('fast');
          $field_mode.val('adv');
        }
        function ohssb_hide_advanced_fields() {
          $toggle_adv.html('More search options...').removeClass('open');
          $btn_search_top.fadeIn('fast');
          $box_adv.slideUp('fast');
          $field_mode.val('');
          $field_breed.val('');
          $field_color.val('');
          $field_weight.val('');
          $field_age.val('');
          $field_sex.val('');

          ohssb_set_field_names();
        }

        /**
         * Show/hide field groups
         */
        function ohssb_show_field_group( $group ) {
          $group.fadeIn('fast');
        }
        function ohssb_hide_field_group( $group ) {
          $group.fadeOut('fast');
        }

        /**
         * Setup advanced controls based on type
         */
        function ohssb_setup_advanced_fields( type, clear ) {
          $field_color.empty();
          $field_breed.empty();
          $field_age.empty();

          switch ( type ) {
            case 'dogs':
              ohssb_show_field_group($group_age);
              ohssb_show_field_group($group_weight);
              ohssb_show_field_group($group_breed);
              ohssb_show_field_group($group_sex);
              ohssb_hide_field_group($group_color);
              $field_color.append( window['color_' + type] );
              $field_breed.append( window['breed_' + type] );
              $field_age.append( window['age_' + type] );
              break;
            case 'cats':
              ohssb_show_field_group($group_age);
              ohssb_hide_field_group($group_weight);
              ohssb_show_field_group($group_color);
              ohssb_show_field_group($group_breed);
              ohssb_show_field_group($group_sex);
              $field_color.append( window['color_' + type] );
              $field_breed.append( window['breed_' + type] );
              $field_age.append( window['age_' + type] );
              break;
            case 'horsefarm':
              ohssb_show_field_group($group_sex);
              ohssb_hide_field_group($group_age);
              ohssb_hide_field_group($group_weight);
              ohssb_hide_field_group($group_color);
              ohssb_hide_field_group($group_breed);
              break;
            case 'small':
              ohssb_show_field_group($group_sex);
              ohssb_hide_field_group($group_age);
              ohssb_hide_field_group($group_weight);
              ohssb_hide_field_group($group_color);
              ohssb_hide_field_group($group_breed);
              break;
            case 'all':
              ohssb_show_field_group($group_sex);
              ohssb_hide_field_group($group_age);
              ohssb_hide_field_group($group_weight);
              ohssb_hide_field_group($group_color);
              ohssb_hide_field_group($group_breed);
              break;
            default:
              ohssb_hide_field_group($group_age);
              ohssb_hide_field_group($group_weight);
              ohssb_hide_field_group($group_color);
              ohssb_hide_field_group($group_breed);
              ohssb_show_field_group($group_sex);
              break;
          }

          if ( clear ) {
            $field_breed.val('');
            $field_color.val('');
            $field_weight.val('');
            $field_age.val('');
            $field_sex.val('');
          }

          ohssb_set_field_names();
        }

        /**
         * Add/remove name attribute from fields depending on if the field is empty.  Prevents empty fields from appearing in querystring.
         */
        function ohssb_set_field_names() {
          $('.ohssb-search-form select, .ohssb-search-form input[type!=submit]').each(function(){
              var my_val = $(this).val();
              var my_id  = $(this).attr('id');

              if ( my_val == '' ) {
                $(this).attr( 'name', '' );
              } else {
                $(this).attr( 'name', my_id );
              }
          });
        }

        /**
         * Perform actions when field val is changed
         */
        $('.ohssb-search-form').submit(function(){
          ohssb_set_field_names();
        });

        /**
         * Modify the form based on the Type chosen
         */
        $('.ohssb-search-form #type').change(function(){
          var selected_val = $(this).val();

          // Advanced controls
          if ( selected_val == '' ) {
            // selected default option
            $toggle_adv.hide().removeClass('open');
            $box_adv.slideUp('fast');
            $field_mode.val('');
            ohssb_setup_advanced_fields('', true);
            $group_code.animate({width:'show'}, 350, 'swing');
            $btn_search_top.fadeIn('fast');

          } else {
            // show the advanced controls box
            if ( $box_adv.filter(':visible').length < 1 ) {
              $toggle_adv.show().html('Show additional search options');
              $btn_search_top.fadeIn('fast');
              $group_code.animate({width:'hide'}, 350, 'swing');
              $field_code.val('');
            }
            ohssb_setup_advanced_fields( selected_val, true );
          }
        });

        /**
         * Advanced form controls
         */
        $toggle_adv.click(function(e) {
          e.preventDefault();
          if ( $box_adv.filter(':visible').length < 1 ) {
            ohssb_show_advanced_fields();
          } else {
            ohssb_hide_advanced_fields();
          }
        });


        function update_sort_direction_copy() {
          var selected_val =  $('.ohssb-sort .sort_by').val();

          switch ( selected_val ) {
            case 'date' :
              $('.ohssb-sort .sort_direction .asc').html('Longest Stay First');
              $('.ohssb-sort .sort_direction .desc').html('Most Recent First');
              break;
            case 'name' :
              $('.ohssb-sort .sort_direction .asc').html('A -> Z');
              $('.ohssb-sort .sort_direction .desc').html('Z -> A');
              break;
          }
        }

        /**
         * Search result layout, sorting
         */
        // no sorting or isotope for IE8 and lower
        if ( $('.lt-ie9').length == 0 ) {
          // initial state of sort fields (due to return from another page)
          var sort_by  = $('.ohssb-sort .sort_by').val();
          var sort_asc = ($('.ohssb-sort .sort_direction').val() == 'asc') ? true : false;
          update_sort_direction_copy();

          $('.animal-results').isotope({
            itemSelector: '.result-item',
            layoutMode: 'fitRows',
            getSortData: {
              date: '[data-ohssb-ts]',
              name: '[data-ohssb-name]'
            },
            sortBy: [ sort_by ],
            sortAscending: sort_asc
          });

          // change sort field
          $('.ohssb-sort .sort_by').change(function(){
            var selected_val = $(this).val();
            $('.animal-results').isotope( {sortBy: selected_val} );

            update_sort_direction_copy();
          });

          // change sort direction
          $('.ohssb-sort .sort_direction').change(function(){
            var selected_val = $(this).val();
            var is_ascending = false;
            if (selected_val === 'asc') {
              is_ascending = true;
            }
            $('.animal-results').isotope( {sortAscending: is_ascending } );
          });
        }

      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var namespace = OHSSB;
      funcname = (funcname === undefined) ? 'init' : funcname;
      if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      UTIL.fire('common');

      $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {
        UTIL.fire(classnm);
      });
    }
  };

  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
