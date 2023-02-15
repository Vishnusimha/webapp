const personalForm = document.getElementById("personalForm");

personalForm.addEventListener("submit", function (event) {
    event.preventDefault();
    savePersonalFormData();
});

function savePersonalFormData() {
    const formData = new FormData(document.getElementById('personalForm'));
    const formValues = Object.fromEntries(formData.entries());
    const json = JSON.stringify(formValues);
    var wholedata;

    if (localStorage.getItem('personalForm') != null) {
        alert("IF");
        wholedata = [localStorage.getItem('personalForm')];
        wholedata.push(json);
        localStorage.setItem('personalForm', wholedata);
    } else {
        alert("else");
        wholedata = [];
        wholedata.push(json);
        localStorage.setItem('personalForm', wholedata);
    }
    // alert(json);
}

function getPersonalFormData() {
    const retrivedJsonString = localStorage.getItem('personalForm');
    // alert(retrivedJsonString);

    // {"name":"vishnu","email":"vishnusimha98@gmail.com"}
    const jsonString = '[' + retrivedJsonString + ']';

    const data = JSON.parse(jsonString);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const columns = ['plan no', 'sponsor', 'name', 'email', 'occasion', 'occasiondate', 'occasiontime', 'location', 'Anniversary', 'MothersDay', 'FathersDay', 'country'];

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

