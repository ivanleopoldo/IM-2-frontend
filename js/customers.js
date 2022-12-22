var header = {
    'Content-Type': 'application/json',
}

function handleInput(){
    var inputIdValue = document.getElementById('input-id').value;
    var inputFirstNameValue = document.getElementById('input-first-name').value;
    var inputLastNameValue = document.getElementById('input-last-name').value;
    var inputEmailValue = document.getElementById('input-email').value;
    var inputPhoneNumberValue = document.getElementById('input-phone-number').value;

    if(inputIdValue === "" && inputFirstNameValue === "" && inputLastNameValue === "" && inputEmailValue === "" && inputPhoneNumberValue === ""){
        getAllRecords();
    } else if(inputIdValue != "" && inputFirstNameValue === "" && inputLastNameValue === "" && inputEmailValue === "" && inputPhoneNumberValue === ""){
        getRecordById(inputIdValue);
    } else if(inputIdValue === "" && inputFirstNameValue != "" && inputLastNameValue === "" && inputEmailValue === "" && inputPhoneNumberValue === ""){
        getRecordByFirstName(inputFirstNameValue);
    } else if(inputIdValue === "" && inputFirstNameValue === "" && inputLastNameValue != "" && inputEmailValue === "" && inputPhoneNumberValue === ""){
        getRecordByLastName(inputLastNameValue);
    } else if(inputIdValue === "" && inputFirstNameValue === "" && inputLastNameValue === "" && inputEmailValue != "" && inputPhoneNumberValue === ""){
        getRecordByEmail(inputEmailValue);
    } else if(inputIdValue === "" && inputFirstNameValue === "" && inputLastNameValue === "" && inputEmailValue === "" && inputPhoneNumberValue != ""){
        getRecordByPhoneNum(inputPhoneNumberValue);
    }
}

function addRecord(){
    $('#input-id').val("")
    var inputFirstNameValue = document.getElementById('input-first-name').value;
    var inputLastNameValue = document.getElementById('input-last-name').value;
    var inputEmailValue = document.getElementById('input-email').value;
    var inputPhoneNumberValue = document.getElementById('input-phone-number').value;

    fetch('http://localhost:5000/customers', {
        method: 'post',
        body: JSON.stringify({
            customer_firstname: inputFirstNameValue,
            customer_lastname: inputLastNameValue,
            customer_email: inputEmailValue,
            phone_number: inputPhoneNumberValue

        }),
        headers: header
    }).then((response) => response.json()).then(function(data){
        getAllRecords();
    });
}

function getAllRecords(){
    fetch('http://localhost:5000/customers').then((response) => response.json()).
        then(function(data){
            initTable(data['response']);
        });
}

function getRecordById(id){
    fetch(`http://localhost:5000/customers/${id}`).then((response) => response.json()). 
        then(function(data){
            initTable(data['response']);
        });
}

function getRecordByFirstName(firstname){
    fetch('http://localhost:5000/customers_firstname', {
        method: 'post',
        body: JSON.stringify({
            firstname: firstname
        }),
        headers: header
    }).then((response) => response.json()).
        then(function(data){
            initTable(data['response']);
        });
}

function getRecordByLastName(lastname){
    fetch('http://localhost:5000/customers_lastname', {
        method: 'post',
        body: JSON.stringify({
            lastname: lastname
        }),
        headers: header
    }).then((response) => response.json()).
        then(function(data){
            initTable(data['response']);
        });
}

function getRecordByEmail(email){
    fetch('http://localhost:5000/customers_email', {
        method: 'post',
        body: JSON.stringify({
            email: email
        }),
        headers: header
    }).then((response) => response.json()).
        then(function(data){
            initTable(data['response']);
        });
}

function getRecordByPhoneNum(phone_number){
    fetch('http://localhost:5000/customers_phonenumber', {
        method: 'post',
        body: JSON.stringify({
            phone_number: phone_number
        }),
        headers: header
    }).then((response) => response.json()).
        then(function(data){
            initTable(data['response']);
        });
}

var id_holder;
function pushUpdate(id, firstname, lastname, email, phonenum){
    $('#update-input-first-name').val(firstname);
    $('#update-input-last-name').val(lastname);
    $('#update-input-email').val(email);
    $('#update-input-phone-number').val(phonenum);
    show();
    id_holder = id; 
}

function updateRecord(){
    var inputFirstNameValue = document.getElementById('update-input-first-name').value;
    var inputLastNameValue = document.getElementById('update-input-last-name').value;
    var inputEmailValue = document.getElementById('update-input-email').value;
    var inputPhoneNumberValue = document.getElementById('update-input-phone-number').value;

    hide();
    fetch(`http://localhost:5000/customers/${id_holder}`, {
        method: 'put',
        body: JSON.stringify({
            customer_firstname: inputFirstNameValue,
            customer_lastname: inputLastNameValue,
            customer_email: inputEmailValue,
            phone_number: inputPhoneNumberValue
        }),
        headers: header
    }).
    then((response) => response.json()).
    then(function(data){
        getAllRecords();
    });
}

function deleteRecord(id){
    fetch(`http://localhost:5000/customers/${id}`, {
        method: 'delete'
    }).then((response) => response.json()).then(function(data){
        getAllRecords();
    });
}

function show(){
    var formTag = document.getElementById('form-wrapper-id');
    var updateFormTag = document.getElementById('update-form-wrapper-id');

    formTag.style['display'] = "none";
    updateFormTag.style['display'] = "block";
}

function hide(){
    var formTag = document.getElementById('form-wrapper-id');
    var updateFormTag = document.getElementById('update-form-wrapper-id');

    formTag.style['display'] = "block";
    updateFormTag.style['display'] = "none";
}

function initTable(dataRes){
    if ($.fn.DataTable.isDataTable('#table-style')){
        $('#table-style').DataTable().destroy();
    };
    var table = $('#table-style').DataTable(
        {
            "aaData": dataRes,
            "columns": [
                {"dataRes": "customer_id"},
                {"dataRes": "customer_firstname"},
                {"dataRes": "customer_lastname"},
                {"dataRes": "customer_email"},
                {"dataRes": "phone_number"},
                {"Buttons": "Buttons"}
            ],
            "columnDefs": [
                {
                    targets: -1,
                    data: null,
                    defaultContent: `<button class="update-btn">Update</button><button class="delete-btn">Delete</button>`,
                },
            ],
            "pageLength": 7,
            "searching": false,
            "lengthChange": false,
        }
    );

    $('#table-style tbody').on('click', '.delete-btn', function(){
        var data = table.row($(this).parents('tr')).data();
        deleteRecord(data[0]);
    });

    $('#table-style tbody').on('click', '.update-btn', function(){
        var data = table.row($(this).parents('tr')).data();
        pushUpdate(data[0], data[1], data[2], data[3], data[4]);    
    });
}

$(document).ready(function(){
    getAllRecords();
    $('#table-style').DataTable({
        "searching": false,
        "lengthChange": false,
    });
});