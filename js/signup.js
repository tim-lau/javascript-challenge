/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";

document.addEventListener('DOMContentLoaded', onReady);

function onReady() {
	var signupForm = document.getElementById('signup');
	var stateSelect = signupForm.elements['state'];
	var opt
	var i;

    // loads the state array into the options for display in the dropdown menu
	for (i = 0; i < usStates.length; i++) {
		opt = document.createElement('option');
		opt.text = usStates[i].name;
		opt.value = usStates[i].code;
		stateSelect.appendChild(opt);
	}	

	signupForm.addEventListener('submit', onSubmit);

    // shows a text input field if "other" is selected for occupation
	var occupationSelect = document.getElementById('occupation');
    var otherField = signupForm.elements['occupationOther'];
    occupationSelect.addEventListener('change', function () {
        if (occupationSelect.value == 'other') {
            otherField.style.display = 'block';
        }
        else {
            otherField.style.display = 'none';
        }
    });

    // opens a confirmation box if clicked asking if the user wants to leave
    // redirects the user's browser to google.com if they confirm
    cancelButton.addEventListener('click', function () {
    	if(window.confirm("Are you sure you want to leave?")) {
    		window.location.replace("http://google.com");
    	}
    });

}

// Validates the form for each of the required fields
function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate', 'occupation'];
    var idx;
    var valid = true;

    for (idx = 0; idx < requiredFields.length; idx++) {
		valid &= validateRequiredField(form.elements[requiredFields[idx]]); 
    }

    if (document.getElementById('occupation').value == 'other') {
    	valid &= validateRequiredField(form.elements['occupationOther']); 
    }

    return valid;
} 

// For each required field, computes whether field inputs are valid 
// based on a variety of parameters, such as excluding empty string 
// submissions

function validateRequiredField(field) {
    var signupForm = document.getElementById('signup');
	var value = field.value;
	value = value.trim();
	var valid = value.length > 0;

	if (valid) {
		field.className = 'form-control';
	}
	else {
		field.className = 'form-control invalid-field';
	}

    // Ensures the zip input is a valid zipcode (five digit number)
    if (field.name === 'zip') {
        var zipRegExp = new RegExp('^\\d{5}$');
        if (!zipRegExp.test(value)) {
            valid = false;
            field.className = 'form-control invalid-field';
        } 
    } 

    // Ensures the registering user is at least thirteen based on their date of birth
    // inputs. If age is under thirteen, notifies the user with error message.
    if (field.name === 'birthdate') {
        var dob = signupForm.elements['birthdate'].value;
        var errMsg = document.getElementById('birthdateMessage');
        console.log(dob);
        dob = new Date(dob);
        var today = new Date();

        var yearsDiff = today.getFullYear() - dob.getUTCFullYear();
        var monthsDiff = today.getMonth() - dob.getUTCMonth();
        var daysDiff = today.getDate() - dob.getUTCDate();

        if (monthsDiff < 0 || (0 == monthsDiff && daysDiff < 0)) {
            yearsDiff--;
        }

        if (yearsDiff < 13) {
            valid = false; 
            field.className = 'form-control invalid-field';
        
            errMsg.innerHTML = 'You must be older than thirteen years of age to signup.';
            errMsg.style.display = 'block';
        }

        if (yearsDiff >= 13) {
            errMsg.style.display = 'none';
        }

    }
	return valid;
} 

// Attempts to validate form, catches errors if they happen
function onSubmit(evt) {
    try {
        var valid = validateForm(this);
    }

    catch (e) {
        console.log("error");
        window.alert("Exception! Form was not submitted.");
    }

    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }

    evt.returnValue = valid;
    return valid;
} 