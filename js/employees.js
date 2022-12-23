
var header = {
    'Content-Type': 'application/json',
}

function handleInput(){
    var inputIdValue = document.getElementById('input-id').value;
    var inputFirstNameValue = document.getElementById('input-first-name').value;
    var inputLastNameValue = document.getElementById('input-last-name').value;
    var inputSexValue = document.getElementById('input-sex').value;
    var inputPhoneNumValue= document.getElementById('input-phone-number').value;
    var inputPositionValue = document.getElementById('input-position').value;

    if(inputIdValue === "" && inputFirstNameValue === "" && inputLastNameValue === "" && inputSexValue === "" && inputPhoneNumValue === "" && inputPositionValue === ""){
        getAllRecords();
    } else if(inputIdValue != "" && inputFirstNameValue === "" && inputLastNameValue === "" && inputSexValue === "" && inputPhoneNumValue === "" && inputPositionValue === ""){
        getRecordById(inputIdValue);
    } else if(inputIdValue === "" && inputFirstNameValue != "" && inputLastNameValue === "" && inputSexValue === "" && inputPhoneNumValue === "" && inputPositionValue === ""){
        getRecordByFirstName(inputFirstNameValue);
    } else if(inputIdValue === "" && inputFirstNameValue === "" && inputLastNameValue != "" && inputSexValue === "" && inputPhoneNumValue === "" && inputPositionValue === ""){
        getRecordByLastName(inputLastNameValue);
    } else if(inputIdValue === "" && inputFirstNameValue === "" && inputLastNameValue === "" && inputSexValue != "" && inputPhoneNumValue === "" && inputPositionValue === ""){
        getRecordBySex(inputSexValue);
    } else if(inputIdValue === "" && inputFirstNameValue === "" && inputLastNameValue === "" && inputSexValue === "" && inputPhoneNumValue != "" && inputPositionValue === ""){
        getRecordByPhoneNum(inputPhoneNumValue);
    } else if(inputIdValue === "" && inputFirstNameValue === "" && inputLastNameValue === "" && inputSexValue === "" && inputPhoneNumValue === "" && inputPositionValue != ""){
        getRecordByPosition(inputPositionValue);
    }
}

function addRecord(){
    $('#input-id').val("")
    var inputFirstNameValue = document.getElementById('input-first-name').value;
    var inputLastNameValue = document.getElementById('input-last-name').value;
    var inputSexValue = document.getElementById('input-sex').value;
    var inputPhoneNumValue= document.getElementById('input-phone-number').value;
    var inputPositionValue = document.getElementById('input-position').value;

    fetch('http://localhost:5000/employees', {
        method: 'post',
        body: JSON.stringify({
            employee_firstname: inputFirstNameValue,
            employee_lastname: inputLastNameValue,
            employee_sex: inputSexValue,
            employee_phonenum: inputPhoneNumValue,
            employee_position: inputPositionValue
        }),
        headers: header
    }).then((response) => response.json()).then(function(data){
        alert(data['response']);
        getAllRecords();
    });
}

function getAllRecords(){
    fetch('http://localhost:5000/employees').then((response) => response.json()).
        then(function(data){
            initTable(data['response']);
        });
}

function getRecordById(id){
    fetch(`http://localhost:5000/employees/${id}`).then((response) => response.json()). 
        then(function(data){
            initTable(data['response']);
        });
}

function getRecordByFirstName(firstname){
    fetch('http://localhost:5000/employees_firstname', {
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
    fetch('http://localhost:5000/employees_lastname', {
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

function getRecordByPhoneNum(phone_number){
    fetch('http://localhost:5000/employees_phonenum', {
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

function getRecordBySex(sex){
    fetch('http://localhost:5000/employees_sex', {
        method: 'post',
        body: JSON.stringify({
            sex: sex
        }),
        headers: header
    }).then((response) => response.json()).
        then(function(data){
            initTable(data['response']);
        });
}

function getRecordByPosition(position){
    fetch('http://localhost:5000/employees_position', {
        method: 'post',
        body: JSON.stringify({
            position: position
        }),
        headers: header
    }).then((response) => response.json()).
        then(function(data){
            initTable(data['response']);
        });
}

var id_holder;
function pushUpdate(id, firstname, lastname, sex, phonenum, position){
    $('#update-input-first-name').val(firstname);
    $('#update-input-last-name').val(lastname);
    $('#update-input-sex').val(sex);
    $('#update-input-position').val(position);
    $('#update-input-phone-number').val(phonenum);
    show();
    id_holder = id; 
}

function updateRecord(){
    var inputFirstNameValue = document.getElementById('update-input-first-name').value;
    var inputLastNameValue = document.getElementById('update-input-last-name').value;
    var inputSexValue = document.getElementById('update-input-sex').value;
    var inputPhoneNumValue= document.getElementById('update-input-phone-number').value;
    var inputPositionValue = document.getElementById('update-input-position').value;

    hide();
    fetch(`http://localhost:5000/employees/${id_holder}`, {
        method: 'put',
        body: JSON.stringify({
            employee_firstname: inputFirstNameValue,
            employee_lastname: inputLastNameValue,
            employee_sex: inputSexValue,
            employee_phonenum: inputPhoneNumValue,
            employee_position: inputPositionValue
        }),
        headers: header
    }).
    then((response) => response.json()).
    then(function(data){
        alert(data['response']);
        getAllRecords();
    });
}

function deleteRecord(id){
    fetch(`http://localhost:5000/employees/${id}`, {
        method: 'delete'
    }).then((response) => response.json()).then(function(data){
        alert(data['response']);
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

function emptyInput(){
    document.getElementById('input-first-name').value = "";
    document.getElementById('input-last-name').value = "";
    document.getElementById('input-sex').value = "";
    document.getElementById('input-phone-number').value = "";
    document.getElementById('input-position').value = "";
}

function initTable(dataRes){
    emptyInput();
    if ($.fn.DataTable.isDataTable('#table-style')){
        $('#table-style').DataTable().destroy();
    };
    var table = $('#table-style').DataTable(
        {
            "aaData": dataRes,
            "columns": [
                {"dataRes": "employee_id"},
                {"dataRes": "employee_firstname"},
                {"dataRes": "employee_lastname"},
                {"dataRes": "employee_sex"},
                {"dataRes": "employee_phonenum"},
                {"dataRes": "employee_position"},
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
        pushUpdate(data[0], data[1], data[2], data[3], data[4], data[5]);    
    });
}

$(document).ready(function(){
    getAllRecords();
    $('#table-style').DataTable({
        "searching": false,
        "lengthChange": false,
    });
});