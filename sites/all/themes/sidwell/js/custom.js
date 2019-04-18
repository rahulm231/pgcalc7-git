(function() {
	/* 04/28/2017 RD- Script to Remove Relationship Type from being listed */

	//List Page IDs You'd like the script to apply to. 
	var applyToPagesList = ['434'];
	//Grab Finalsite PageID
	var currPageID = document.body.getAttribute('data-pageid');

	//if currPageID is in applyToPagesList, run the script.
	if(applyToPagesList !== -1) {
		setInterval(function() {
			if(window.runningCustomRelationshipCleanup === undefined) {
				window.runningCustomRelationshipCleanup = true;
				var allDivs = document.getElementsByClassName('fsConstituentProfileLink');
				for(var i = 0; i < allDivs.length; i += 1) {
					var parentDiv = allDivs[i].parentElement;
					if(parentDiv.hasBeenParsed === undefined) {
						var textToEdit = parentDiv.innerHTML;
						textToEdit = textToEdit.replace('(Parent)','');
						textToEdit = textToEdit.replace('(Son)','');
						textToEdit = textToEdit.replace('(Daughter)','');
						textToEdit = textToEdit.replace('(Child)','');
						textToEdit = textToEdit.replace('(Mother)','');
						textToEdit = textToEdit.replace('(Father)','');
						parentDiv.innerHTML = textToEdit;
						parentDiv.hasBeenParsed = true;
					}
				}
				window.runningCustomRelationshipCleanup = undefined;
			}
		},(1000/20))
	}
}())