var header = {
    'Content-Type': 'application/json',
}

function handleInput(){
    var inputIdValue = document.getElementById('input-id').value;
    var inputDateValue = document.getElementById('input-date').value;
    var inputTimeValue = document.getElementById('input-time').value;
    var inputCustomerId = document.getElementById('input-customer-id').value;
    var inputFirstName = document.getElementById('input-first-name').value;
    var inputLastName = document.getElementById('input-last-name').value;

    if(inputIdValue === "" && inputCustomerId === "" && inputFirstName === "" && inputLastName === ""){
        getAllRecords();
    } else if(inputIdValue != "" && inputCustomerId === "" && inputFirstName === "" && inputLastName === ""){
        getRecordById(inputIdValue);
    } else if(inputIdValue === "" && inputCustomerId != "" && inputFirstName === "" && inputLastName === ""){
        getRecordByCustId(inputCustomerId);
    } else if(inputIdValue === "" && inputCustomerId === "" && inputFirstName != "" && inputLastName === ""){
        getRecordByFirstName(inputFirstName);
    } else if(inputIdValue === "" && inputCustomerId === "" && inputFirstName === "" && inputLastName != ""){
        getRecordByLastName(inputLastName);
    }
}

function addRecord(){
    $('#input-id').val("");
    var inputDateValue = document.getElementById('input-date').value;
    var inputTimeValue = document.getElementById('input-time').value;
    var inputCustomerId = document.getElementById('input-customer-id').value;
    var inputPartySize = document.getElementById('input-party-size').value;

    fetch('http://localhost:5000/reservations', {
        method: 'post',
        body: JSON.stringify({
            reservation_date: inputDateValue,
            reservation_time: inputTimeValue,
            party_size: inputPartySize,
            customer_id: inputCustomerId,
        }),
        headers: header
    }).then((response) => response.json()).then(function(data){
        getAllRecords();
    });
}

function getAllRecords(){
    fetch('http://localhost:5000/reservations').then((response) => response.json()).
        then(function(data){
            initTable(data['response']);
        });
}

function getRecordById(id){
    fetch(`http://localhost:5000/reservations/${id}`).then((response) => response.json()). 
        then(function(data){
            initTable(data['response']);
        });
}

function getRecordByCustId(id){
    fetch(`http://localhost:5000/reservations_cust/${id}`).then((response) => response.json()). 
        then(function(data){
            initTable(data['response']);
        });
}

function getRecordByFirstName(firstname){
    fetch('http://localhost:5000/reservations_firstname', {
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
    fetch('http://localhost:5000/reservations_lastname', {
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

var id_holder;
function pushUpdate(id, date, time, party_size, customer_id){
    $('#update-input-date').val(date);
    $('#update-input-time').val(time);
    $('#update-input-party-size').val(party_size);
    $('#update-input-customer-id').val(customer_id);
    show();
    id_holder = id; 
}

function updateRecord(){
    var inputDateValue = document.getElementById('update-input-date').value;
    var inputTimeValue = document.getElementById('update-input-time').value;
    var inputCustomerId = document.getElementById('update-input-customer-id').value;
    var inputPartySize = document.getElementById('update-input-party-size').value;

    hide();
    fetch(`http://localhost:5000/reservations/${id_holder}`, {
        method: 'put',
        body: JSON.stringify({
            reservation_date: inputDateValue,
            reservation_time: inputTimeValue,
            party_size: inputPartySize,
            customer_id: inputCustomerId,
        }),
        headers: header
    }).
    then((response) => response.json()).
    then(function(data){
        getAllRecords();
    });
}

function deleteRecord(id){
    fetch(`http://localhost:5000/reservations/${id}`, {
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
                {"dataRes": "reservation_id"},
                {"dataRes": "reservation_createddate"},
                {"dataRes": "reservation_date"},
                {"dataRes": "reservation_time"},
                {"dataRes": "party_size"},
                {"dataRes": "customer_id"},
                {"dataRes": "customer_firstname"},
                {"dataRes": "customer_lastname"},
                {"Buttons": "Buttons"}
            ],
            "columnDefs": [
                {
                    targets: -1,
                    data: null,
                    defaultContent: `<button class="update-btn">Update</button><button class="delete-btn">Delete</button>`,
                },
            ],
            "responsive": true,
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
        pushUpdate(data[0], data[1]);    
    });
}

$(document).ready(function(){
    getAllRecords();
    $('#table-style').DataTable({
        "searching": false,
        "lengthChange": false,
    });
});