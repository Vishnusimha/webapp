const corporateForm = document.getElementById("corporateForm");

// this listener to the form gets triggred whn submit button is clicked 
corporateForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Getting the form input values by the below sytax
    var planNo = document.getElementById("plan no").value;
    var sponsor = document.getElementById("sponsor").value;
    var companyname = document.getElementById("companyname").value;
    var sponsoremail = document.getElementById("sponsoremail").value;
    var companyemail = document.getElementById("companyemail").value;
    var occasion = document.getElementById("occasion").value;
    var occasiontime = document.getElementById("occasiontime").value;
    var occasiondate = document.getElementById("occasiondate").value;
    var location = document.getElementById("location").value;

    var test = "" + planNo + sponsor + companyname + sponsoremail + companyemail + occasion + occasiontime + occasiondate + location;

    alert(validateEmail(sponsoremail));
    // testing all the inputs are not null
    if (planNo && sponsor && companyname && sponsoremail && companyemail && occasion && occasiondate && occasiontime && location != "" && (validateEmail(sponsoremail))) {
        saveCorporateFormData();
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
    const formData = new FormData(document.getElementById('corporateForm'));
    const corporateFormValues = Object.fromEntries(formData.entries());
    const json = JSON.stringify(corporateFormValues);
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

function getCorporateFormData() {
    const retrivedJsonString = localStorage.getItem('corporateForm');

    const jsonString = '[' + retrivedJsonString + ']';

    const data = JSON.parse(jsonString);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    // Added column names of the table to create 
    const columns = ['plan no', 'sponsor', 'companyname', 'sponsoremail', 'companyemail', 'occasion', 'occasiondate', 'occasiontime', 'location', , 'country', 'officeparty', 'milestoneevents', 'achievements'];

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

    // getting html <div> tag by its element ID and peending created table to it 
    document.getElementById('corporatetable').appendChild(table);
}



