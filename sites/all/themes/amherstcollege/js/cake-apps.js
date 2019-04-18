$(document).ready(function() {

	$('.tooltip-top').tooltip({'placement': 'top'});
	
	// Default datable settings
	$.extend( $.fn.dataTable.defaults, {
		"pagingType": "simple",
		"autoWidth": false,
		"pageLength": 20,
		"dom": 'CRTfrtip',
		"language": {
			"info": "_START_ to _END_ of _TOTAL_",
			"infoFiltered": ""
		}    
	});

});


$('button').on('click', function(){
	if ($(this).data('href')){
		window.location.href = $(this).data('href');
	}
});

//Click event to scroll to top
$('#scrollToTop').click(function(){
	$('html, body').animate({scrollTop : 0},500);
	return false;
});


function displayFlash(id, message, status, parentId, childClass){
	if (parentId === undefined){
		$('#ajaxFlash').before('<div class="message '+status+'" id="'+id+'" role="alert">'+message+'</div>');
	}else{
		if (childClass === undefined){
			$('#'+parentId+' .ajaxModalFlash').before('<div class="message '+status+'" id="'+id+'" role="alert">'+message+'</div>');
		}
		else{
			$('#'+parentId+' .'+childClass).before('<div class="message '+status+'" id="'+id+'" role="alert">'+message+'</div>');
		}
	}
	
}

function clearFlash(className){
	if (className !== undefined){
		$('.'+className).prev('#flashErrorMessage').remove().end();
		$('.'+className).prev('#flashMessage').remove().end();
	}else{
		$('#flashMessage').remove();
		$('#flashErrorMessage').remove();
	}
}

function clearErrors(callClearFlash, flashClass){
	$('.error-message').remove();
	if (callClearFlash !== undefined){
		if (flashClass !==undefined){
			clearFlash(flashClass);
		}else{
			clearFlash();
		}
	}
}

function setErrors(data){
	$.each(data.data, function(model, errors) {
        for (fieldName in this) {
            var element = $("#" + camelCase(model + '_' + fieldName));
            var _insert = $(document.createElement('div')).insertAfter(element);
            _insert.addClass('error-message').text(this[fieldName]);
            
        }
    });
}

function camelCase(string) {
    var a = string.split('_'), i;
    s = [];
    for (i=0; i<a.length; i++){
        s.push(a[i].charAt(0).toUpperCase() + a[i].substring(1));
    }
    s = s.join('');
    return s;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatDateFromString(x) {
	
	// Split timestamp into [ Y, M, D, h, m, s ]
	var t = x.split(/[- :]/);

	// Apply each element to the Date function
	var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);

	return ("0" + (d.getMonth() + 1)).slice(-2) + '/' + ("0" + d.getDate()).slice(-2) + '/' + d.getFullYear();
}

//confirmation box using Bootstrap modal
function confirmModal(question, cancelButtonTxt, okButtonTxt, callback) {
	
	//blur active button or anchor so pressing enter again won't load another modal
	$(document.activeElement).blur();

    var confirmModal = 
      $('<div class="modal fade" role="dialog" tabindex="-1" aria-labelledby="modalQuestion">' +   
          '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
    		  '<div id="modalQuestion" class="modal-body">' +
                '<strong>' + question + '</strong>' +
              '</div>' +
              '<div class="modal-footer">' +
                '<button type="button" class="btn btn-default" data-dismiss="modal">' + cancelButtonTxt + '</button>' +
                '<button id="okButton" type="button" class="btn btn-success">' + okButtonTxt + '</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>');

    confirmModal.find('#okButton').click(function(event) {
      callback();
      confirmModal.modal('hide');
    });
    
    confirmModal.modal({
		backdrop: 'static',
		show: true
	});
    
};

jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "formatted-num-pre": function ( a ) {
        a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" );
        return parseFloat( a );
    },
 
    "formatted-num-asc": function ( a, b ) {
        return a - b;
    },
 
    "formatted-num-desc": function ( a, b ) {
        return b - a;
    }
} );