var header = {
    'Content-Type': 'application/json',
}

function handleInput(){
    var inputIdValue = document.getElementById('input-id').value;
    var inputMessageValue = document.getElementById('input-message').value;
    var inputCustomerIdValue = document.getElementById('input-message').value;
    var inputFirstNameValue = document.getElementById('input-first-name').value;
    var inputLastNameValue = document.getElementById('input-last-name').value;
    var inputEmailValue = document.getElementById('input-email').value;

    if(inputIdValue === "" && inputFirstNameValue === "" && inputLastNameValue === "" && inputEmailValue === "" && inputCustomerIdValue === "" && inputMessageValue === ""){
        getAllRecords();
    } else if(inputIdValue != "" && inputFirstNameValue === "" && inputLastNameValue === "" && inputEmailValue === "" && inputCustomerIdValue === "" && inputMessageValue === ""){
        getRecordById(inputIdValue);
    } else if(inputIdValue === "" && inputFirstNameValue !== "" && inputLastNameValue === "" && inputEmailValue === "" && inputCustomerIdValue === "" && inputMessageValue === ""){
        getRecordByFirstName(inputFirstNameValue);
    } else if(inputIdValue === "" && inputFirstNameValue === "" && inputLastNameValue !== "" && inputEmailValue === "" && inputCustomerIdValue === "" && inputMessageValue === ""){
        getRecordByLastName(inputLastNameValue);
    } else if(inputIdValue === "" && inputFirstNameValue === "" && inputLastNameValue === "" && inputEmailValue !== "" && inputCustomerIdValue === "" && inputMessageValue === ""){
        getRecordByEmail(inputEmailValue);
    } else if(inputIdValue === "" && inputFirstNameValue === "" && inputLastNameValue === "" && inputEmailValue === "" && inputCustomerIdValue !== "" && inputMessageValue === ""){
        getRecordByCustId(inputCustomerIdValue);
    } else if(inputIdValue === "" && inputFirstNameValue === "" && inputLastNameValue === "" && inputEmailValue === "" && inputCustomerIdValue === "" && inputMessageValue !== ""){
        getRecordByMessage(inputMessageValue);
    }
}

function addRecord(){
    $('#input-id').val("")
    var inputMessageValue = document.getElementById('input-message').value;
    var inputCustomerIdValue = document.getElementById('input-customer-id').value;

    fetch('http://localhost:5000/feedbacks', {
        method: 'post',
        body: JSON.stringify({
            message_body: inputMessageValue,
            customer_id: inputCustomerIdValue,
        }),
        headers: header
    }).then((response) => response.json()).then(function(data){
        getAllRecords();
    });
}

function getAllRecords(){
    fetch('http://localhost:5000/feedbacks').then((response) => response.json()).
        then(function(data){
            initTable(data['response']);
        });
}

function getRecordById(id){
    fetch(`http://localhost:5000/feedbacks/${id}`).then((response) => response.json()). 
        then(function(data){
            initTable(data['response']);
        });
}

function getRecordByCustId(id){
    fetch(`http://localhost:5000/feedbacks_cust/${id}`).then((response) => response.json()). 
        then(function(data){
            initTable(data['response']);
        });
}

function getRecordByFirstName(firstname){
    fetch('http://localhost:5000/feedbacks_firstname', {
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
    fetch('http://localhost:5000/feedbacks_lastname', {
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
    fetch('http://localhost:5000/feedbacks_email', {
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

function getRecordByMessage(message){
    fetch('http://localhost:5000/feedbacks_message', {
        method: 'post',
        body: JSON.stringify({
            message_body: message
        }),
        headers: header
    }).then((response) => response.json()).
        then(function(data){
            initTable(data['response']);
        });
}

var id_holder;
function pushUpdate(id, message_body, customer_id){
    $('#update-input-message').val(message_body);
    $('#update-input-customer-id').val(customer_id);
    show();
    id_holder = id; 
}

function updateRecord(){
    var inputMessageValue = document.getElementById('update-input-message').value;
    var inputCustomerIdValue = document.getElementById('update-input-customer-id').value;

    hide();
    fetch(`http://localhost:5000/feedbacks/${id_holder}`, {
        method: 'put',
        body: JSON.stringify({
            message_body: inputMessageValue,
            customer_id: inputCustomerIdValue,
        }),
        headers: header
    }).
    then((response) => response.json()).
    then(function(data){
        getAllRecords();
    });
}

function deleteRecord(id){
    fetch(`http://localhost:5000/feedbacks/${id}`, {
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
                {"dataRes": "feedback_id"},
                {"dataRes": "message_body"},
                {"dataRes": "customer_id"},
                {"dataRes": "customer_firstname"},
                {"dataRes": "customer_lastname"},
                {"dataRes": "customer_email"},
                {"Buttons": "Buttons"}
            ],
            "columnDefs": [
                {
                    "width":"20%", "targets": "1"
                },
                {
                    targets: -1,
                    data: null,
                    defaultContent: `<button class="update-btn">Update</button><button class="delete-btn">Delete</button>`,
                },
            ],
            "responsive": true,
            "pageLength": 7,
            "searching": false,
            "lengthChange": false
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
        "responsive": true,
        "searching": false,
        "lengthChange": false
    });
});