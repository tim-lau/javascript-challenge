/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";

document.addEventListener('DOMContentLoaded', onReady);

function onReady() {
	var stateSelect = signup.elements['state'];
	var opt
	var i;

	for (i = 0; i < usStates.length; i++) {
		opt = document.createElement('option');
		opt.text = usStates[i].name;
		opt.value = usStates[i].code;
		stateSelect.appendChild(opt);
	}	

	var occupationSelect = document.getElementById('occupation');
    var otherField = signup.elements['occupationOther'];
    occupationSelect.addEventListener('change', function () {
        if (occupationSelect.value == 'other') {
            otherField.style.display = 'block';
        }
        else {
            otherField.style.display = 'none';
        }
    });

    cancelButton.addEventListener('click', function () {
    	if(window.confirm("Are you sure you want to leave?")) {
    		window.location.replace("http://google.com");
    	}
    });

}

function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    var idx;
    var valid = true;

    for (idx = 0; idx < requiredFields.length; idx++) {
		valid &= validRequiredField(requiredFields[idx], form); 

    }

    //if you wanted to require emails. you could add it to this array, and update the HTML class required-field 
    //to the notation

    requiredFields.forEach(validateRequiredField, form);

    //return true;
} //validateForm()

function validateRequiredField(field, form) {


}
