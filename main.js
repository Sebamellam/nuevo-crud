function validateForm(){
    let name = document.getElementById('inputName').value;
    let email = document.getElementById('inputEmail').value;
    let address = document.getElementById('inputAddress').value;
    let city = document.getElementById('inputCity').value;
    let date = document.getElementById('inputDate').value;
    let time = document.getElementById('inputTime').value;

    if(name ==""){
        alert('El campo nombre y apellido es requerido');
        return false;
    }
    if(email ==""){
        alert('El campo correo es requerido');
        return false;
    }else if(!email.includes('@')){
        alert('El correo no es valido')
        return false;
    }
    if(address ==""){
        alert('El campo dirrecion es requerido');
        return false;
    }
    if(city ==""){
        alert('El campo comuna es requerido');
        return false;
    }
    if(date ==""){
        alert('El campo fecha es requerido');
        return false;
    }
    if(time ==""){
        alert('El campo horario es requerido');
        return false;
    }

    return true;
}

function ReadData(){
    let listPeople;

    if(localStorage.getItem('listPeople') == null) {
        listPeople = [];
    }else{
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    var html = "";
    
    listPeople.forEach(function(element, index) {
        html +="<tr>";
        html +="<td>"+ element.name + "</td>";
        html +="<td>"+ element.email + "</td>";
        html +="<td>"+ element.address + "</td>";
        html +="<td>"+ element.city + "</td>";
        html +="<td>"+ element.date + "</td>";
        html +="<td>"+ element.time + "</td>";
        html +='<td><button onclick="deleteData('+ index +')" class="btn btn-danger">Eliminar Dato</button> <button onclick="editData('+ index +')" class="btn btn-warning">Editar Dato</button>';
        html +="</tr>";
        
    });

    document.querySelector('#tableData').innerHTML = html;

}

document.onload = ReadData();

function AddData(){
    if (validateForm() == true ) {
        let name = document.getElementById('inputName').value;
        let email = document.getElementById('inputEmail').value;
        let address = document.getElementById('inputAddress').value;
        let city = document.getElementById('inputCity').value;
        let date = document.getElementById('inputDate').value;
        let time = document.getElementById('inputTime').value;

        var listPeople;

        if (localStorage.getItem('listPeople') == null) {
            listPeople = []
        }else{
            listPeople = JSON.parse(localStorage.getItem('listPeople'));
        }
    
        listPeople.push({
            name: name,
            email: email,
            address: address,
            city: city,
            date: date,
            time: time,

        });
        localStorage.setItem('listPeople', JSON.stringify(listPeople));

        ReadData();

        document.getElementById('inputName').value="";
        document.getElementById('inputEmail').value="";
        document.getElementById('inputAddress').value="";
        document.getElementById('inputCity').value="";
        document.getElementById('inputDate').value="";
        document.getElementById('inputTime').value="";


    }

}

function deleteData(index){

    let listPeople;

    if(localStorage.getItem('listPeople') == null) {
        listPeople = [];
    }else{
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    listPeople.splice(index, 1);
    localStorage.setItem('listPeople', JSON.stringify(listPeople));

    ReadData();

}

function editData (index){
    document.getElementById('btnAdd').style.display = 'none';
    document.getElementById('btnUpdate').style.display = 'block';

    let listPeople;

    if(localStorage.getItem('listPeople') == null) {
        listPeople = [];
    }else{
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    document.getElementById('inputName').value = listPeople[index].name;
    document.getElementById('inputEmail').value = listPeople[index].email;
    document.getElementById('inputAddress').value = listPeople[index].address;
    document.getElementById('inputCity').value = listPeople[index].city;
    document.getElementById('inputDate').value = listPeople[index].date;
    document.getElementById('inputTime').value = listPeople[index].time;

    document.querySelector('#btnUpdate').onclick = function () {
        if (validateForm() == true) {
            listPeople[index].name = document.getElementById('inputName').value;
            listPeople[index].email = document.getElementById('inputEmail').value;
            listPeople[index].address = document.getElementById('inputAddress').value;
            listPeople[index].city = document.getElementById('inputCity').value;
            listPeople[index].date = document.getElementById('inputDate').value;
            listPeople[index].time = document.getElementById('inputTime').value;

            localStorage.setItem('listPeople', JSON.stringify(listPeople));
            ReadData();

            document.getElementById('inputName').value = "";
            document.getElementById('inputEmail').value = "";
            document.getElementById('inputAddress').value = "";
            document.getElementById('inputCity').value = "";
            document.getElementById('inputDate').value = "";
            document.getElementById('inputTime').value = "";
            
            document.getElementById('btnAdd').style.display ='block';
            document.getElementById('btnUpdate').style.display ='none';
        }

    };

}


