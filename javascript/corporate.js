const corporateForm = document.getElementById("corporateForm");

corporateForm.addEventListener("submit", function (event) {
    event.preventDefault();
    saveCorporateFormData();
});

function saveCorporateFormData() {
    const formData = new FormData(document.getElementById('corporateForm'));
    const corporateFormValues = Object.fromEntries(formData.entries());
    const json = JSON.stringify(corporateFormValues);
    var wholedata;

    if (localStorage.getItem('corporateForm') != null) {
        alert("IF");
        wholedata = [localStorage.getItem('corporateForm')];
        wholedata.push(json);
        localStorage.setItem('corporateForm', wholedata);
    } else {
        alert("else");
        wholedata = [];
        wholedata.push(json);
        localStorage.setItem('corporateForm', wholedata);
    }
    // alert(json);
}

function getCorporateFormData() {
    const retrivedJsonString = localStorage.getItem('corporateForm');
    // alert(retrivedJsonString);

    // {"name":"vishnu","email":"vishnusimha98@gmail.com"}
    const jsonString = '[' + retrivedJsonString + ']';

    const data = JSON.parse(jsonString);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const columns = ['plan no', 'sponsor', 'companyname', 'sponsoremail', 'companyemail', 'occasion', 'occasiondate', 'occasiontime', 'location', , 'country', 'officeparty', 'milestoneevents', 'achievements'];

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
    document.getElementById('corporatetable').appendChild(table);
}



