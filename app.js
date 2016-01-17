var data = {};

//TODO: Style the whole thing (continue by hand or implement a MDL)
//TODO: Dynamically parse the JSON into individual elements 

//creates the new catagory for the skills to be entered
function createNewCatagory () {
	var newCatagory = document.getElementById('catagory-input').value;
	if (newCatagory !== '') {
		data[newCatagory] = [];
		document.getElementById('results').appendChild(skillsWrapper(newCatagory));
		document.getElementById('catagory-form').reset();	
	}
	renderResultsJson();
}

//renders the form that is used to collect skills
function renderFormTemplate (catagoryName) {
	reserveSkills(catagoryName);
	var position = data[catagoryName].length - 1;
		
	var form = document.createElement("form");
	form.id = catagoryName + "-" + position;

	    var skillName = document.createElement("input"); 
	    skillName.placeholder = 'Type skill here...';
	    skillName.type = 'text';
	    skillName.id = catagoryName + '-' + position + '-input';
	    skillName.setAttribute("onkeypress", "updateSkills('" + catagoryName + "','" + position +"')");
	    skillName.setAttribute("onblur", "updateSkills('" + catagoryName + "','" + position +"')");

	    var skillLevel = document.createElement("input"); 
	    skillLevel.id = catagoryName + '-' + position + '-value';
	    skillLevel.type = 'range';
	    skillLevel.setAttribute('min', 1);
	    skillLevel.setAttribute('max', 100);
	    skillLevel.setAttribute('onmouseup', "updateSkills('" + catagoryName + "','" + position +"')");
	    skillLevel.setAttribute('ontouchend', "updateSkills('" + catagoryName + "','" + position +"')");
	    skillLevel.setAttribute("onkeydown", "updateSkills('" + catagoryName + "','" + position +"')");

	    // TODO: Reorder buttons here

	    var skillDelete = document.createElement("input");  
	    skillDelete.className = 'material-icons delete-button round';
	    skillDelete.type = 'button';
	    skillDelete.value = 'clear';
	    skillDelete.setAttribute('onclick', "removeSkill('" + catagoryName + "','" + position +"')");

    form.appendChild(skillName);  
    form.appendChild(skillLevel);  
    form.appendChild(skillDelete);
	return form;
}

//renders the container for each catagories skills
function skillsWrapper (catagoryName) {

	var outerDiv = document.createElement('div');
	outerDiv.className = 'card skills ' + catagoryName;

		var headerDiv = document.createElement('div');
		headerDiv.className = 'header';
		outerDiv.appendChild(headerDiv);

			var heading = document.createElement('H1');                       
			var text = document.createTextNode(catagoryName);      
			heading.appendChild(text);   
			headerDiv.appendChild(heading);

				var moreButton = document.createElement('input');
				moreButton.type = 'button';
				moreButton.className = 'material-icons';
				moreButton.value = 'more_vert';
				headerDiv.appendChild(moreButton);


			var content = document.createElement('div');
			content.className = 'card-content content-' + catagoryName;
			outerDiv.appendChild(content);

			var footerDiv = document.createElement('div');
			footerDiv.className = 'footer';
			outerDiv.appendChild(footerDiv);

				var form = document.createElement('form');

					var createNewCatagorySubmit = document.createElement('input');  
					createNewCatagorySubmit.className = 'flat-button add';
				    createNewCatagorySubmit.type = 'button';
				    createNewCatagorySubmit.value = 'Add New Skill';	
				    createNewCatagorySubmit.setAttribute("onclick", "addNewSkill('" + catagoryName + "')");

				    var deleteCatagory = document.createElement('input'); 
				    deleteCatagory.className = 'flat-button delete'; 
				    deleteCatagory.type = 'button';
				    deleteCatagory.value = 'Delete Catagory';	
				    deleteCatagory.setAttribute("onclick", "deleteCatagory('" + catagoryName + "')");
				
				form.appendChild(createNewCatagorySubmit); 
				form.appendChild(deleteCatagory);	
			footerDiv.appendChild(form);

		content.appendChild(renderFormTemplate(catagoryName));

	return outerDiv;
}

//renders a new skill entry to an existing catagory
function addNewSkill (target) {
	var targetCatagory = document.querySelectorAll('.' + target.toString())[0];
	targetCatagory.querySelectorAll(".card-content")[0].appendChild(renderFormTemplate(target));
	renderResultsJson();
}

//Used to reserve a position in the list when a skills form is generated to provide mapping to inputs
function reserveSkills (catagory) {
	data[catagory].push("dummy placeholder");
}

//updates the data-oject with the newly entered skill
function updateSkills (catagory, location) {
	var targetInputId = catagory + "-" + location + "-input";
	var targetSliderId = catagory + "-" + location + "-value";

	var skill = document.getElementById(targetInputId).value;
	var skillLevel = document.getElementById(targetSliderId).value;
	var skillObject = {
		"skill": skill,
		"level": skillLevel
	}

	data[catagory][location] = skillObject;
	renderResultsJson();
}

//updates the content area of the page with the most up-to-date data object
function renderResultsJson () {  
	document.getElementById('content').innerHTML = JSON.stringify(data);
}

//deletes the catagory from the data structure and the DOM
function deleteCatagory (catagory) {
	var parent = document.getElementById('results');
	var child = document.querySelectorAll('.' + catagory.toString())[0];
	parent.removeChild(child);

	delete data[catagory];
	renderResultsJson();
}

//deletes the skill from the data structure and the DOM
function removeSkill (catagory, location) {
	var parent = document.querySelectorAll('.content-' + catagory)[0];
	var child = document.querySelectorAll('#' + catagory.toString() + '-' + location)[0];
	console.log(parent + " Asdf " + child)
	parent.removeChild(child);

	//nullify, but do not remove to maintain length-based ordering
	data[catagory][location] = null
	renderResultsJson();
}

//itterates through the data object to return the individual components
function dynamicallyParseJson () {
	return true;
}