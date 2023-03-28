const personalForm = document.getElementById("personalForm");

// this listener to the form gets triggred whn submit button is clicked 
personalForm.addEventListener("submit", function(event) {
	event.preventDefault();

	alert("Hello new");
	// Getting the form input values by the below sytax
	var planNo = document.getElementById("planno").value;
	var sponsor = document.getElementById("sponsor").value;
	var name = document.getElementById("name").value;
	var sponsoremail = document.getElementById("sponsoremail").value;
	var occasion = document.getElementById("occasion").value;
	var occasiondate = document.getElementById("occasiondate").value;
	var occasiontime = document.getElementById("occasiontime").value;
	var location = document.getElementById("location").value;

	// testing all the inputs are not null & validating sponsoremail formats
	if (planNo && sponsor && name && sponsoremail && occasion && occasiondate && occasiontime && location != "" && (validateEmail(sponsoremail))) {
		savePersonalFormData();
	} else {
		alert("Please enter all the values");
	}
});

function validateEmail(sponsoremail) {
	//regular expression to match sponsor email addresses
	const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	// Testing sponsor email address against the regex
	if (!emailRegex.test(sponsoremail)) {
		//  returns true if its proper else false and shows error
		alert("Invalid sponsor email address");
		return false;
	}
	//  returns true if its proper else false
	return true;
}

function savePersonalFormData() {
	const formData = new FormData(document.getElementById('personalForm'));
	const formValues = Object.fromEntries(formData.entries());
	const json = JSON.stringify(formValues);

	alert("Sending...");
	sendPersonalForm(json);


	var wholedata;
	// checks if the personalForm JSON obj is already present 
	if (localStorage.getItem('personalForm') != null) {
		//  IF present the new data will be appended to that with push command 
		wholedata = [localStorage.getItem('personalForm')];
		wholedata.push(json);
		localStorage.setItem('personalForm', wholedata);
	} else {
		//  else we create a fresh JSON obj and add the data to it and store in local storage
		wholedata = [];
		wholedata.push(json);
		localStorage.setItem('personalForm', wholedata);
	}
}

function sendPersonalForm(json) {
	alert("network call...");
	fetch('http://localhost:8080/personalform/post-personal-form', {
		// http://localhost:8080/lecture
		// http://localhost:8080/lecture/post-personal-form
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: json
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			console.log('Data received:', data);
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
}

// Code explanation for the below method, is clearly written in corporate.js file. Please refer that. 
function getPersonalFormData() {
	const retrivedJsonString = localStorage.getItem('personalForm');

	// {"name":"vishnu","sponsor email":"XXXX@gmail.com" .....}
	const jsonString = '[' + retrivedJsonString + ']';

	const data = JSON.parse(jsonString);

	const table = document.createElement('table');
	const thead = document.createElement('thead');
	const tbody = document.createElement('tbody');
	// Added column names of the table to create 
	const columns = ['planno', 'sponsor', 'name', 'sponsoremail', 'occasion', 'occasiondate', 'occasiontime', 'location', 'Anniversary', 'MothersDay', 'FathersDay', 'country'];

	// Creates table header
	const headerRow = document.createElement('tr');
	columns.forEach(column => {
		const th = document.createElement('th');
		th.innerText = column;
		headerRow.appendChild(th);
	});
	thead.appendChild(headerRow);

	// Creates table body
	data.forEach(item => {
		const tr = document.createElement('tr');
		columns.forEach(column => {
			const td = document.createElement('td');
			td.innerText = item[column];
			tr.appendChild(td);
		});
		tbody.appendChild(tr);
	});

	table.appendChild(thead);
	table.appendChild(tbody);
	// getting html <div> tag by its element ID and apending created table to it 
	document.getElementById('personaltable').appendChild(table);
}
