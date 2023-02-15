const personalForm = document.getElementById("personalForm");

personalForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    if (name && email != null) {
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        alert("Form data has been saved to local storage.");
    } else {
        alert("Form data has Null values.");
    }
    savePersonalFormData();
});


function savePersonalFormData() {
    const formData = new FormData(document.getElementById('personalForm'));
    const formValues = Object.fromEntries(formData.entries());
    const json = JSON.stringify(formValues);
    var wholedata;

    if (localStorage.getItem('formData') != null) {
        alert("IF");
        wholedata = [localStorage.getItem('formData')];
        wholedata.push(json);
        localStorage.setItem('formData', wholedata);
    } else {
        alert("else");
        wholedata = [];
        wholedata.push(json);
        localStorage.setItem('formData', wholedata);
    }
    alert(json);
}

function getFormData() {
    const retrivedJsonString = localStorage.getItem('formData');

    alert(retrivedJsonString);

    // {"name":"vishnu","email":"vishnusimha98@gmail.com"}
    const jsonString = '[' + retrivedJsonString + ']';

    const data = JSON.parse(jsonString);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const columns = ['planno', 'sponsor', 'name', 'email', 'occasion', 'location', 'Anniversary', 'MothersDay', 'FathersDay'];

    // Create table header
    const headerRow = document.createElement('tr');
    columns.forEach(column => {
        const th = document.createElement('th');
        th.innerText = column;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Create table body
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
    document.getElementById('personaltable').appendChild(table);

}


function ValidateEmail(inputText) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.value.match(mailformat)) {
        alert("Valid email address!");
        document.form1.text1.focus();
        return true;
    }
    else {
        alert("You have entered an invalid email address!");
        document.form1.text1.focus();
        return false;
    }
}








