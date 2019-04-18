/**
 * @file
 * JS Implementation of OpenLayers behavior.
 */
/**
 * Class: OpenLayers.Control.GeofieldEditingToolbar
 * The GeofieldEditingToolbar is a panel controls to modify or draw polygons, lines,
 * points, or to navigate the map by panning. You can select which tool to enable
 * with options.tools.
 *
 * Inherits from:
 *  - <OpenLayers.Control.Panel>
 */
OpenLayers.Control.GeofieldEditingToolbar = OpenLayers.Class(
  OpenLayers.Control.Panel, {

    /**
     * Constructor: OpenLayers.Control.GeofieldEditingToolbar
     * Create an editing toolbar for a given layer.
     *
     * Parameters:
     * layer - {<OpenLayers.Layer.Vector>}
     * options - {Object}
     */
    initialize: function(layer, options) {
        OpenLayers.Control.Panel.prototype.initialize.apply(this, [options]);

        var controls = [];
        var tool = null;

        if (options.allow_edit && options.allow_edit !== 0) {
          // add an Edit feature
          controls.push(new OpenLayers.Control.ModifyFeature(layer, {
            deleteCodes: [46, 68, 100],
            handleKeypress: function(evt) {
              if (this.feature && OpenLayers.Util.indexOf(this.deleteCodes, evt.keyCode) > -1) {
                // We must unselect the feature before we delete it
                var feature_to_delete = this.feature;
                this.selectControl.unselectAll();
                this.layer.removeFeatures([feature_to_delete]);
              }
            }
          }));
        } else {
          controls = [new OpenLayers.Control.Navigation()];
        }

        if (options.feature_types && options.feature_types.length) {
          for (var i = 0, il = options.feature_types.length; i < il; i += 1) {
            // capitalize first letter
            tool = options.feature_types[i][0].toUpperCase() + options.feature_types[i].slice(1);
            controls.push(
              new OpenLayers.Control.DrawFeature(layer, OpenLayers.Handler[tool], {'displayClass': 'olControlDrawFeature' + tool})
            );
          }
        }

        this.addControls(controls);
    },

    /**
     * Method: draw
     * calls the default draw, and then activates mouse defaults.
     *
     * Returns:
     * {DOMElement}
     */
    draw: function() {
        OpenLayers.Control.Panel.prototype.draw.apply(this, arguments);
        this.div.className += " olControlEditingToolbar";
        if (this.defaultControl === null) {
            this.defaultControl = this.controls[0];
        }
        return this.div;
    },

    CLASS_NAME: "OpenLayers.Control.GeofieldEditingToolbar"
});


(function($) {
  /**
   * Geofield Behavior
   */
  Drupal.behaviors.openlayers_behavior_geofield = {
    'attach': function(context, settings) {
      
      // Only attach the behavior to a map
      if (!$(context).hasClass('openlayers-map')) return;

      var data = $(context).data('openlayers'),
          dataProjection = new OpenLayers.Projection('EPSG:4326'),
          features, wktFormat;

      // helper to create a WKT format object with the right projections
      function initWktFormat (inp, outp) {
        var WktWriter = new OpenLayers.Format.WKT();
        WktWriter.internalProjection = inp;
        WktWriter.externalProjection = outp || dataProjection;
        return WktWriter;
      }

      // populate our wkt input field
      function updateWKTField (features) {
        var WktWriter = initWktFormat(features.object.map.projection);
        // limits are to checked both server-side and here.
        // for a single shape avoid GEOMETRYCOLLECTION
        var toSerialize = features.object.features;
        // don't serialize empty feature
        if (toSerialize.length) {
          if (toSerialize.length === 1) { toSerialize = toSerialize[0]; }
          this.val(WktWriter.write(toSerialize));
        }
        // but clear the value
        else {
          this.val('');
        }
      }

      // keep only one features for each map input
      function limitFeatures (features) {
        var cardinality = Drupal.settings.geofield.widget_settings.cardinality;
        if (cardinality >= 1) {
          // Calculate how many features we need to delete off the beginning of the feature array
          var deleteNum = features.object.features.length - cardinality;
          if (deleteNum > 0) {
            var featuresToDelete = features.object.features.slice(0,deleteNum);
            // we remove a lot of features, don't trigger events
            features.object.destroyFeatures(featuresToDelete, {silient: true});
          }
        }
      }

      if (!$(context).hasClass('geofield-processed')) {
        // we get the .form-item wrapper which is a slibling of our hidden input
        var $wkt = $(context).closest('.form-item').parent().find('input.geofield_wkt');
        // if there is no form input this shouldn't be activated
        if ($wkt.length) {
          var dataLayer = new OpenLayers.Layer.Vector(Drupal.t('Feature Layer'), {
                projection: dataProjection,
                drupalID: 'openlayers_behavior_geofield'
              });

          dataLayer.styleMap = Drupal.openlayers.getStyleMap(data.map, 'openlayers_behavior_geofield');
          data.openlayers.addLayer(dataLayer);

          // only one feature on each map register before adding our data
          if (Drupal.settings.geofield.widget_settings.data_storage == 'single') {
            dataLayer.events.register('featureadded', $wkt, limitFeatures);
          }

          if ($wkt.val() != '') {
            wktFormat = initWktFormat(data.openlayers.projection);
            features = wktFormat.read($wkt.val());
            dataLayer.addFeatures(features);
          }

          // registering events late, because adding data
          // would result in a reprojection loop
          dataLayer.events.register('featureadded', $wkt, updateWKTField);
          dataLayer.events.register('featureremoved', $wkt, updateWKTField);
          dataLayer.events.register('afterfeaturemodified', $wkt, updateWKTField);

          // create toolbar
          var geofieldControl = new OpenLayers.Control.GeofieldEditingToolbar(dataLayer, Drupal.settings.geofield.widget_settings);
          data.openlayers.addControl(geofieldControl);

          // Process features-modified on form submission: write features to WKT field / recalculate everything to be up to date.
          var formData = {
            'control': geofieldControl,
            'dataLayer': dataLayer
          };
          $(context).parents('form').bind('submit', formData, function(e) {
            $.map(e.data.control.controls, function(c) { c.deactivate(); });
            dataLayer.events.triggerEvent('afterfeaturemodified');
          });
        }
        $(context).addClass('geofield-processed');
      }
    }
  };
})(jQuery);
;
/**
 * @file
 * JS Implementation of OpenLayers behavior.
 */

/**
 * Attribution Behavior.  Implements the Attribution OpenLayers
 * Control.
 */
Drupal.openlayers.addBehavior('openlayers_behavior_attribution', function (data, options) {
  Drupal.openlayers.addControl(data.openlayers, 'Attribution', options);
});
;
/**
 * @file
 * JS Implementation of OpenLayers behavior.
 */

/**
 * Layer Switcher Behavior
 */
Drupal.openlayers.addBehavior('openlayers_behavior_layerswitcher', function (data, options) {
  options.ascending = !! options.ascending;
  Drupal.openlayers.addControl(data.openlayers, 'LayerSwitcher', options);

  // Maximize if needed.
  if (!! options.maximizeDefault == true) {
    data.openlayers.getControlsByClass('OpenLayers.Control.LayerSwitcher')[0].maximizeControl();
  }
});
;

/**
 * @file
 * JS Implementation of OpenLayers behavior.
 */

/**
 * Keyboard Defaults Behavior.  Implements the KeyboardDefaults OpenLayers
 * Control.
 */
Drupal.openlayers.addBehavior('openlayers_behavior_keyboarddefaults', function (data, options) {
  Drupal.openlayers.addControl(data.openlayers, 'KeyboardDefaults');
});
;
/**
 * @file
 * JS Implementation of OpenLayers behavior.
 */

/**
 * Navigation Behavior
 */
Drupal.openlayers.addBehavior('openlayers_behavior_navigation', function (data, options) {
  options.documentDrag = !!options.documentDrag;
  Drupal.openlayers.addControl(data.openlayers, 'Navigation', options);
});
;
/**
 * @file
 * JS Implementation of OpenLayers behavior.
 */

/**
 * OpenLayers Zoom to Layer Behavior
 */
Drupal.openlayers.addBehavior('openlayers_behavior_zoomtolayer', function (data, options) {
  var map = data.openlayers;
  var zoomtolayer_scale = parseInt(options.zoomtolayer_scale, 10);
  var point_zoom_level = parseInt(options.point_zoom_level, 10);

  var layers = map.getLayersBy('drupalID', {
    test: function(id) {
      for (var i in options.zoomtolayer) {
        if (options.zoomtolayer[i] == id) {
          return true;
        }
      }
      return false;
    }
  });

  // Combined extent of all layers.
  var fullExtent = undefined;
  // Number of layers that are still loading.
  var pending_load_ends = 0;

  // Go through selected layers to get full extent.
  jQuery(layers).each(function(index, layer) {
    accumulate_extent(layer);

    if (layer instanceof OpenLayers.Layer.Vector) {
      // This should not register the handler in case no data is available.
      if (layer.getDataExtent() === null) {
        // Try again to determine the extent after layer has loaded.
        pending_load_ends = pending_load_ends + 1;
        layer.events.register('loadend', layer, handle_loadend_once);
      }

    }
  });
  // Zoom if all data was sychronously load.
  show_extent_if_determined();

  /**
   * Handler for loadend event of layer that is still loading.
   */
  function handle_loadend_once(event) {
    var layer = event.object;
    layer.events.unregister('loadend', layer, handle_loadend_once);
    pending_load_ends = pending_load_ends - 1;

    accumulate_extent(layer);
    // Zoom if no other layer is still loading.
    show_extent_if_determined();
  }

  /**
   * Add data extent of layer to total data extent.
   */
  function accumulate_extent(layer){
    var layerextent = layer.getDataExtent();
    if(fullExtent instanceof OpenLayers.Bounds){
      fullExtent.extend(layerextent);
    } else {
      fullExtent = layerextent;
    }
  }

  /**
   * Zooms map if all layers have finished loading.
   */
  function show_extent_if_determined(){
    if(pending_load_ends===0 && fullExtent instanceof OpenLayers.Bounds){
      if (fullExtent.getWidth()===0 && fullExtent.getHeight()===0) {
        // If extent is a single point,
        // zoom in with point_zoom_level option.
        map.setCenter(fullExtent.getCenterLonLat(), point_zoom_level)
      } else {
        var scaled = fullExtent.scale(zoomtolayer_scale);
        map.zoomToExtent(scaled);
        if(!map.getExtent().contains(scaled)){
          // OpenLayers silently ignores zoom in case the date line would need
          // to be displayed more than once. Move map to where the data is at
          // least.
          map.setCenter(scaled.getCenterLonLat());
        }
      }
    }
  }
});
;
/**
* author Remy Sharp
* url http://remysharp.com/tag/marquee
*/

(function ($) {
    $.fn.marquee = function (klass) {
        var newMarquee = [],
            last = this.length;

        // works out the left or right hand reset position, based on scroll
        // behavior, current direction and new direction
        function getReset(newDir, marqueeRedux, marqueeState) {
            var behavior = marqueeState.behavior, width = marqueeState.width, dir = marqueeState.dir;
            var r = 0;
            if (behavior == 'alternate') {
                r = newDir == 1 ? marqueeRedux[marqueeState.widthAxis] - (width*2) : width;
            } else if (behavior == 'slide') {
                if (newDir == -1) {
                    r = dir == -1 ? marqueeRedux[marqueeState.widthAxis] : width;
                } else {
                    r = dir == -1 ? marqueeRedux[marqueeState.widthAxis] - (width*2) : 0;
                }
            } else {
                r = newDir == -1 ? marqueeRedux[marqueeState.widthAxis] : 0;
            }
            return r;
        }

        // single "thread" animation
        function animateMarquee() {
            var i = newMarquee.length,
                marqueeRedux = null,
                $marqueeRedux = null,
                marqueeState = {},
                newMarqueeList = [],
                hitedge = false;
                
            while (i--) {
                marqueeRedux = newMarquee[i];
                $marqueeRedux = $(marqueeRedux);
                marqueeState = $marqueeRedux.data('marqueeState');
                
                if ($marqueeRedux.data('paused') !== true) {
                    // TODO read scrollamount, dir, behavior, loops and last from data
                    marqueeRedux[marqueeState.axis] += (marqueeState.scrollamount * marqueeState.dir);

                    // only true if it's hit the end
                    hitedge = marqueeState.dir == -1 ? marqueeRedux[marqueeState.axis] <= getReset(marqueeState.dir * -1, marqueeRedux, marqueeState) : marqueeRedux[marqueeState.axis] >= getReset(marqueeState.dir * -1, marqueeRedux, marqueeState);
                    
                    if ((marqueeState.behavior == 'scroll' && marqueeState.last == marqueeRedux[marqueeState.axis]) || (marqueeState.behavior == 'alternate' && hitedge && marqueeState.last != -1) || (marqueeState.behavior == 'slide' && hitedge && marqueeState.last != -1)) {                        
                        if (marqueeState.behavior == 'alternate') {
                            marqueeState.dir *= -1; // flip
                        }
                        marqueeState.last = -1;

                        $marqueeRedux.trigger('stop');

                        marqueeState.loops--;
                        if (marqueeState.loops === 0) {
                            if (marqueeState.behavior != 'slide') {
                                marqueeRedux[marqueeState.axis] = getReset(marqueeState.dir, marqueeRedux, marqueeState);
                            } else {
                                // corrects the position
                                marqueeRedux[marqueeState.axis] = getReset(marqueeState.dir * -1, marqueeRedux, marqueeState);
                            }

                            $marqueeRedux.trigger('end');
                        } else {
                            // keep this marquee going
                            newMarqueeList.push(marqueeRedux);
                            $marqueeRedux.trigger('start');
                            marqueeRedux[marqueeState.axis] = getReset(marqueeState.dir, marqueeRedux, marqueeState);
                        }
                    } else {
                        newMarqueeList.push(marqueeRedux);
                    }
                    marqueeState.last = marqueeRedux[marqueeState.axis];

                    // store updated state only if we ran an animation
                    $marqueeRedux.data('marqueeState', marqueeState);
                } else {
                    // even though it's paused, keep it in the list
                    newMarqueeList.push(marqueeRedux);                    
                }
            }

            newMarquee = newMarqueeList;
            
            if (newMarquee.length) {
                setTimeout(animateMarquee, 25);
            }            
        }
        
        // TODO consider whether using .html() in the wrapping process could lead to loosing predefined events...
        this.each(function (i) {
            var $marquee = $(this),
                width = $marquee.attr('width') || $marquee.width(),
                height = $marquee.attr('height') || $marquee.height(),
                $marqueeRedux = $marquee.after('<div ' + (klass ? 'class="' + klass + '" ' : '') + 'style="display: block-inline; width: ' + width + 'px; height: ' + height + 'px; overflow: hidden;"><div style="float: left; white-space: nowrap;">' + $marquee.html() + '</div></div>').next(),
                marqueeRedux = $marqueeRedux.get(0),
                hitedge = 0,
                direction = ($marquee.attr('direction') || 'left').toLowerCase(),
                marqueeState = {
                    dir : /down|right/.test(direction) ? -1 : 1,
                    axis : /left|right/.test(direction) ? 'scrollLeft' : 'scrollTop',
                    widthAxis : /left|right/.test(direction) ? 'scrollWidth' : 'scrollHeight',
                    last : -1,
                    loops : $marquee.attr('loop') || -1,
                    scrollamount : $marquee.attr('scrollamount') || this.scrollAmount || 2,
                    behavior : ($marquee.attr('behavior') || 'scroll').toLowerCase(),
                    width : /left|right/.test(direction) ? width : height
                };
            
            // corrects a bug in Firefox - the default loops for slide is -1
            if ($marquee.attr('loop') == -1 && marqueeState.behavior == 'slide') {
                marqueeState.loops = 1;
            }

            $marquee.remove();
            
            // add padding
            if (/left|right/.test(direction)) {
                $marqueeRedux.find('> div').css('padding', '0 ' + width + 'px');
            } else {
                $marqueeRedux.find('> div').css('padding', height + 'px 0');
            }
            
            // events
            $marqueeRedux.bind('stop', function () {
                $marqueeRedux.data('paused', true);
            }).bind('pause', function () {
                $marqueeRedux.data('paused', true);
            }).bind('start', function () {
                $marqueeRedux.data('paused', false);
            }).bind('unpause', function () {
                $marqueeRedux.data('paused', false);
            }).data('marqueeState', marqueeState); // finally: store the state
            
            // todo - rerender event allowing us to do an ajax hit and redraw the marquee

            newMarquee.push(marqueeRedux);

            marqueeRedux[marqueeState.axis] = getReset(marqueeState.dir, marqueeRedux, marqueeState);
            $marqueeRedux.trigger('start');
            
            // on the very last marquee, trigger the animation
            if (i+1 == last) {
                animateMarquee();
            }
        });            

        return $(newMarquee);
    };
}(jQuery));
;


// ******************************************
// onReady()
// ******************************************
jQuery(function() { // onReady()
	// jQuery('marquee.alert-marquee').marquee('alert-marquee');
} ); // end onReady()
// ******************************************
// End onReady()
// ******************************************
;
/**
 * @file
 * JS Implementation of OpenLayers behavior.
 */

/**
 * Javascript Drupal Theming function for inside of Popups
 *
 * To override
 *
 * @param feature
 *  OpenLayers feature object.
 * @return
 *  Formatted HTML.
 */
Drupal.theme.prototype.openlayersPopup = function(feature) {
  var output = '';

  if (feature.attributes.name) {
    output += '<div class="openlayers-popup openlayers-tooltip-name">' + feature.attributes.name + '</div>';
  }
  if (feature.attributes.description) {
    output += '<div class="openlayers-popup openlayers-tooltip-description">' + feature.attributes.description + '</div>';
  }

  return output;
};

// Make sure the namespace exists
Drupal.openlayers.popup = Drupal.openlayers.popup || {};

/**
 * OpenLayers Popup Behavior
 */
Drupal.openlayers.addBehavior('openlayers_behavior_popup', function (data, options) {
  var map = data.openlayers;
  var layers = [];
  var selectedFeature;

  // For backwards compatiability, if layers is not
  // defined, then include all vector layers
  if (typeof options.layers == 'undefined' || options.layers.length == 0) {
    layers = map.getLayersByClass('OpenLayers.Layer.Vector');
  }
  else {
    for (var i in options.layers) {
      var selectedLayer = map.getLayersBy('drupalID', options.layers[i]);
      if (typeof selectedLayer[0] != 'undefined') {
        layers.push(selectedLayer[0]);
      }
    }
  }

  // if only 1 layer exists, do not add as an array.  Kind of a
  // hack, see https://drupal.org/node/1393460
  if (layers.length == 1) {
    layers = layers[0];
  }

  var popupSelect = new OpenLayers.Control.SelectFeature(layers,
    {
      onSelect: function(feature) {
        // Create FramedCloud popup.
        popup = new OpenLayers.Popup.FramedCloud(
          'popup',
          feature.geometry.getBounds().getCenterLonLat(),
          null,
          Drupal.theme('openlayersPopup', feature),
          null,
          true,
          function(evt) {
            while( map.popups.length ) {
              map.removePopup(map.popups[0]);
              }
            Drupal.openlayers.popup.popupSelect.unselect(selectedFeature);
          }
        );

        // Assign popup to feature and map.
        popup.panMapIfOutOfView = options.panMapIfOutOfView;
        popup.keepInMap = options.keepInMap;
        selectedFeature = feature;
        feature.popup = popup;
        Drupal.attachBehaviors();
        map.addPopup(popup);
      },
      onUnselect: function(feature) {
        map.removePopup(feature.popup);
        feature.popup.destroy();
        feature.popup = null;
        this.unselectAll();
      }
    }
  );

  map.addControl(popupSelect);
  popupSelect.activate();
  Drupal.openlayers.popup.popupSelect = popupSelect;
});
;
