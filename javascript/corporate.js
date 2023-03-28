const corporateForm = document.getElementById("corporateForm");

// this listener to the form gets triggred whn submit button is clicked 
corporateForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("hello...");
    // Getting the form input values by the below sytax
    var planNo = document.getElementById("planno").value;
    var sponsor = document.getElementById("sponsor").value;
    var companyname = document.getElementById("companyname").value;
    var sponsoremail = document.getElementById("sponsoremail").value;
    var companyemail = document.getElementById("companyemail").value;
    var occasion = document.getElementById("occasion").value;
    var occasiontime = document.getElementById("occasiontime").value;
    var occasiondate = document.getElementById("occasiondate").value;
    var location = document.getElementById("location").value;

    var test = "" + planNo + sponsor + companyname + sponsoremail + companyemail + occasion + occasiontime + occasiondate + location;
    // testing all the inputs are not null
    if (planNo && sponsor && companyname && sponsoremail && companyemail && occasion && occasiondate && occasiontime && location != "" && (validateEmail(sponsoremail))) {
        saveCorporateFormData();
        alert("saving...");
    } else {
        alert("Please enter all the values");
    }
});

function validateEmail(email) {
    //regular expression to match email addresses
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Testing email address against the regex
    if (!emailRegex.test(email)) {
        //  returns true if its proper else false and shows error
        alert("Invalid email address");
        return false;
    }
    //  returns true if its proper else false
    return true;
}


function saveCorporateFormData() {
    alert("saveCorporateFormData...");
    const formData = new FormData(document.getElementById('corporateForm'));
    const corporateFormValues = Object.fromEntries(formData.entries());
    const json = JSON.stringify(corporateFormValues);

    sendCorporateForm(json);
    var wholedata;
    // checks if the personalForm JSON obj is already present 
    if (localStorage.getItem('corporateForm') != null) {
        //  IF present the new data will be appended to that with push command 
        wholedata = [localStorage.getItem('corporateForm')];
        wholedata.push(json);
        localStorage.setItem('corporateForm', wholedata);
    } else {
        //  else we create a fresh JSON obj and add the data to it and store in local storage
        wholedata = [];
        wholedata.push(json);
        localStorage.setItem('corporateForm', wholedata);
    }
}

function sendCorporateForm(json) {
    alert("network call...");
    fetch('http://localhost:8080/corporateform/post-corporate-form', {

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

// This function retrieves data from the local storage of a web browser & converts it to a JSON and creates an HTML table based on the data.
function getCorporateFormData() {
    // retrieves a JSON string from local storage using the getItem() method and saves it in a variable called retrivedJsonString
    const retrivedJsonString = localStorage.getItem('corporateForm');
    //  wrapping the JSON string in square brackets to create a valid JSON array string
    const jsonString = '[' + retrivedJsonString + ']';

    const data = JSON.parse(jsonString); //JSON.parse() method to parse the JSON string and convert it to a JavaScript object

    // creating a thead element for the table header and a tbody element for the table body
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    // Added column names of the table to create 
    const columns = ['planno', 'sponsor', 'companyname', 'sponsoremail', 'companyemail', 'occasion', 'occasiondate', 'occasiontime', 'location', , 'country', 'officeparty', 'milestoneevents', 'achievements'];

    // Creates table header
    const headerRow = document.createElement('tr');
    // headerRow variable creates the table's header row and adds each column name as a th element using a loop that iterates over the columns array
    columns.forEach(column => {
        const th = document.createElement('th');
        th.innerText = column;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow); // after creating the header row i am appending to table.

    // Creates table body
    data.forEach(item => {
        // creates a new tr element for each object in the array
        const tr = document.createElement('tr');
        columns.forEach(column => {
            // Here for each tr element, a td element is made for each column in the columns array and the innerText attribute of the current object is used to insert the value of that column as text.
            const td = document.createElement('td');
            td.innerText = item[column];
            tr.appendChild(td);
        });
        tbody.appendChild(tr); // again every tr element appending to the tbody..
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    // Now created table element is appending to an HTML div element with an id of 'corporatetable'.. this tag i am
    // getting from html <div> tag and i placed it in HTML file of corporateeventplanner.html
    document.getElementById('corporatetable').appendChild(table);
}
