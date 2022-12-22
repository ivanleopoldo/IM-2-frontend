fetch('http://localhost:5000/peaktime').
    then((response) => response.json()).
    then(function(data){
        document.querySelector('.common-wrapper #result-id').innerHTML=data['response'][0];
    });

fetch('http://localhost:5000/totalpeopleever').
    then((response) => response.json()).
    then(function(data){
        document.querySelector('.total-wrapper #result-id').innerHTML=data['response'][0];
    });

fetch('http://localhost:5000/totalpeoplethismonth').
    then((response) => response.json()).
    then(function(data){
        document.querySelector('.month-wrapper #result-id').innerHTML=data['response'][0];
    });

fetch('http://localhost:5000/totalpeoplethisyear').
    then((response) => response.json()).
    then(function(data){
        console.log(data['response'][0])
        document.querySelector('.year-wrapper #result-id').innerHTML=data['response'][0];
    });