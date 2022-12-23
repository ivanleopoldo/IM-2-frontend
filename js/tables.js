var header = {
    'Content-Type': 'application/json',
}

function handleInput(){
    var inputIdValue = document.getElementById('input-id').value;
    var inputTypeValue = document.getElementById('input-type').value;

    if(inputIdValue === "" && inputTypeValue === ""){
        getAllRecords();
    } else if (inputIdValue != "" && inputTypeValue === ""){
        getRecordById(inputIdValue);
    } else if (inputIdValue === "" && inputTypeValue != ""){
        getRecordByType(inputTypeValue);
    }
}

function getAllRecords(){
    fetch('http://localhost:5000/tables').then((response) => response.json()).
        then(function(data){
            initTable(data['response']);
        });
}

function getRecordById(id){
    fetch(`http://localhost:5000/tables/${id}`).then((response) => response.json()). 
        then(function(data){
            initTable(data['response']);
        });
}

function getRecordByType(type){
    fetch('http://localhost:5000/tables', {
        method: 'post',
        body: JSON.stringify({
            table_type: type
        }),
        headers: header
    }).then((response) => response.json()).
        then(function(data){
            initTable(data['response']);
        });
}

var id_holder;
function pushUpdate(id, quantity){
    $('#input-quantity').val(quantity);
    show();
    id_holder = id; 
}

function updateRecord(){
    var inputQuanValue = document.getElementById('input-quantity').value;
    hide();
    fetch(`http://localhost:5000/tables/${id_holder}`, {
        method: 'put',
        body: JSON.stringify({
            table_quantity: inputQuanValue
        }),
        headers: header
    }).
    then((response) => response.json()).
    then(function(data){
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
    document.getElementById('input-id').value = "";
    document.getElementById('input-type').value = "";
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
                {"dataRes": "table_id"},
                {"dataRes": "table_type"},
                {"dataRes": "table_quantity"},
                {"Buttons": "Buttons"}
            ],
            "columnDefs": [
                {
                    targets: -1,
                    data: null,
                    defaultContent: `<button class="update-btn">Update</button>`,
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