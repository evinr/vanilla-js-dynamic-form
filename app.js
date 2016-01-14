var data = {};

//creates the new catagory for the skills to be entered
function createNewCatagory () {
	var newCatagory = document.getElementById('catagory-input').value;
	if (newCatagory !== '') {
		data[newCatagory] = [];
		document.getElementById('results').appendChild(skillsWrapper(newCatagory));
		document.getElementById('catagory-form').reset();
	}
}

//renders the form that is used to collect skills
function renderFormTemplate (catagoryName) {
	reserveSkills(catagoryName);
	var position = data[catagoryName].length - 1;
		
	var form = document.createElement("form");
	form.id = catagoryName + "-" + position;

	    var skillName = document.createElement("input"); 
	    skillName.placeholder = 'Type skill here...';
	    skillName.id = catagoryName + '-' + position + '-input';
	    skillName.setAttribute("onkeypress", "updateSkills('" + catagoryName + "','" + position +"')");

	    var skillLevel = document.createElement("input"); 
	    skillLevel.id = catagoryName + '-' + position + '-value';
	    skillLevel.type = 'range';
	    skillLevel.setAttribute('min', 0);
	    skillLevel.setAttribute('max', 100);
	    skillLevel.setAttribute('onmouseup', "updateSkills('" + catagoryName + "','" + position +"')");
	    skillLevel.setAttribute('ontouchend', "updateSkills('" + catagoryName + "','" + position +"')");
	    skillLevel.setAttribute("onkeydown", "updateSkills('" + catagoryName + "','" + position +"')");

	    var skillSubmit = document.createElement("input");  
	    skillSubmit.type = 'button';
	    skillSubmit.value = 'Update';
	    skillSubmit.setAttribute('onclick', "updateSkills('" + catagoryName + "','" + position +"')");

    form.appendChild(skillName);  
    form.appendChild(skillLevel);  
    form.appendChild(skillSubmit);  

	return form;
}

//renders the container for each catagories skills
function skillsWrapper (catagoryName) {
	var outerDiv = document.createElement("div");
	outerDiv.className = 'skils ' + catagoryName;

		var headerDiv = document.createElement("div");
		headerDiv.className = 'header';
		outerDiv.appendChild(headerDiv);

			var para = document.createElement("P");                       
			var text = document.createTextNode(catagoryName);      
			para.appendChild(text);   

			var form = document.createElement("form");

				var createNewCatagorySubmit = document.createElement("input");  
			    createNewCatagorySubmit.type = 'button';
			    createNewCatagorySubmit.value = 'Add a Skill';	
			    createNewCatagorySubmit.setAttribute("onclick", "addNewSkill('" + catagoryName + "')");

	form.appendChild(createNewCatagorySubmit);  
	headerDiv.appendChild(para);
	headerDiv.appendChild(form);
	outerDiv.appendChild(headerDiv);

	outerDiv.appendChild(renderFormTemplate(catagoryName));

	return outerDiv;
}


function addNewSkill (target) {
	document.querySelectorAll('.' + target.toString())[0].appendChild(renderFormTemplate(target));
}

//Used to reserve a position in the list when a skills form is generated to provide mapping to inputs
function reserveSkills (catagory) {
	data[catagory].push("a");
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

function renderResultsJson () {
	console.log(data)
	var dataText = document.createElement("P");                       
	var text = document.createTextNode(JSON.stringify(data));      
	dataText.appendChild(text);   
	document.getElementById('content').innerHTML = JSON.stringify(data);

}