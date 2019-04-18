/******** 32 *********/

if (typeof Prototype !== "undefined") {
	var UserPersonalisationDrag = Class.create();
	UserPersonalisationDrag.prototype = {
		initialize: function(homepageID, columns, colour) {
			this.homepageID = homepageID;
			this.columns = columns;
			this.colour = colour;		
			for (var i = 0; i < this.columns.length; i++) {
				Sortable.create(this.columns[i], { 
					tag: 'li', 
					containment: this.columns, 
					handle: 'handle', 
					hoverclass: 'draggableHover', 
					constraint: false, 
					only: 'draggableItem',
					dropOnEmpty: true,
					scroll: window,
					onUpdate: this.setWidgets.bind(this)
				});
				
				// Add placemarkers as the draggable moves throughout the sortables
				Sortable.placeMarker = true;
				
				// Force empty columns to accept widgets
				Droppables.add(this.columns[i], {
					onDrop: this.setWidgets.bind(this)
				});
				
				$$('.removeWidget').each(function(element) {
					element.observe('click', this.removeWidget.bind(this, element.id.split('_')[1]));
				}.bind(this));
			}
		},
		
		removeWidget: function(widgetID) {
			var widget = $('userWidget_' + widgetID);
			if (widget && widget.parentNode.id !== 'widget_farm') {
				$('widget_farm').appendChild(widget);
				this.setWidgets();
			}
		},
		
		setWidgets: function() {
			var data = '';
			// start at 1 to skip the farm
			for (var i = 1; i < this.columns.length; i++) {
				if (i > 1) {
					data += '|';
				}
				
				var widgets = $A($$('#' + this.columns[i] + ' .draggableItem')),
					column = $(this.columns[i]);
			
				if (widgets.length > 0 && column.id !== 'widget_farm') {
					for (var j = 0; j < widgets.length; j++) {
						if (widgets[j] != null) {
							if (j > 0) {
								data += ',';
							}
							
							data += widgets[j].id.split('_')[1];
						}
					}
				}
			}
			
			var date = new Date();
			date.setTime(date.getTime() + (30 * 86400000));
			if (document.getElementById("txtUserID").value < 1) {
				document.cookie = 'draggable_widgets_' + this.homepageID + '=' + data + '; expires=' + date.toGMTString() + '; path=/';
			}
			else {
				this.dbSetWidgetData(data);
			}
		},
		
		resetWidgets: function(event) {
			// Reset the cookie and reload the page
			var date = new Date();
			date.setTime(date.getTime() + (30 * 86400000));
			if (document.getElementById("txtUserID").value < 1) {
				document.cookie = 'draggable_widgets_' + this.homepageID + '=' + data + '; expires=' + date.toGMTString() + '; path=/';
			}
			else {
				this.dbSetWidgetData("");
			}
			window.location.reload();
			event.stop();
		},
		
		setColour: function(colour) {
			var area = $('userPersionalisationAreaWidget');
			if (this.colour) {
				area.removeClassName(this.colour + 'Area');
			}
			
			this.colour = colour;
			area.addClassName(this.colour + 'Area');
			var date = new Date();
			date.setTime(date.getTime() + (30 * 86400000));
			if (document.getElementById("txtUserID").value < 1) {
				document.cookie = 'draggable_colour_' + this.homepageID + '=' + this.colour + '; expires=' + date.toGMTString() + '; path=/';
			}
			else {
				this.dbSetColour(colour);
			}		
		},
		
		dbSetColour: function(colour) {
			if (window.XMLHttpRequest) {
				// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
			}
			else {
				// code for IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			var params = "homepageID=" + this.homepageID + "&colour=" + colour;
			xmlhttp.open("POST","../../site/ajax/user_draggable_settings.php",true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send(params);	    
		},
		
		dbSetWidgetData: function(data) {
			if (window.XMLHttpRequest) {
				// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
			}
			else {
				// code for IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			var params = "homepageID=" + this.homepageID + "&data=" + data;
			xmlhttp.open("POST","../../site/ajax/user_draggable_settings.php",true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send(params);	    
		}
	};
}
