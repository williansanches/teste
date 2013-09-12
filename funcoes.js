var codigo = new Array();
var nome = new Array();
var j;
var table;
var idcodigo;
var idnome;
var chamaT1;
src ="js/phonegap-1.2.0.js";
function saiapp(){
    if(confirm('Deseja mesmo sair?')){
        navigator.device.exitApp();
    }
}
function chamat1() {
    chamaT1 = window.open('T1.apk', '');
    camaT1.show;
}
function idTable(idTable) {
    table = document.getElementById(idTable);
}
function idCodigo(idCodigo) {
    idcodigo = idCodigo;
}
function idNome(idNome) {
    idnome = idNome;
}
function abreDB() {
    return window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
}
function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS CLIENTE (codigo unique, nome)');
}

// Query the database
//
function queryDB(tx) {
    tx.executeSql('SELECT * FROM CLIENTE ORDER BY(CODIGO)', [], querySuccess, errorCB);

}

// Query the success callback
//
function querySuccess(tx, results) {
    try {
        var len = results.rows.length;
        for (var i = 0; i < len; i++) {
            var newRow = table.insertRow(i);
            var newCell = newRow.insertCell(0);
            newCell.innerHTML = results.rows.item(i).codigo;
            newCell.setAttribute("onclick", "selectlinha(this)");
            codigo[i] = results.rows.item(i).codigo;
            var newCell = newRow.insertCell(1);
            newCell.innerHTML = results.rows.item(i).nome;
            newCell.setAttribute("onclick", "selectlinha(this)");
            nome[i] = results.rows.item(i).nome;
            newCell = newRow.insertCell(2);
            var botao = document.createElement("input");
            botao.type = "button";
            botao.value = "Excluir";
            botao.class = "btn btn-primary";
            botao.setAttribute("onclick", "deletelinha(this)");
            newCell.appendChild(botao);

        }
    } catch (e) {
        alert("Erro" + e);
    }

}

// Transaction error callback
//
function errorCB(err) {
    console.log("Error processing SQL: " + err.code);
}

// Transaction success callback
//
function successCB() {
    //var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    abreDB().transaction(queryDB, errorCB);
}
function successdelete() {
    //var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    abreDB().transaction(deleteDB, errorCB);
}
function deleteDB(tx) {
    try {
        tx.executeSql('DELETE FROM CLIENTE WHERE codigo =' + codigo[j]);
        alert("Excluido com sucesso!");
    } catch (e) {
        alert(e);
    }
    j = null;
}

// device APIs are available
//
function onDeviceReady() {
    //var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    abreDB().transaction(populateDB, errorCB, successCB);
}
function onDevicevalores() {
    //var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
    abreDB().transaction(populateDB);
    abreDB().transaction(pesquisaUnique);
}
//insere no banco    
function pesquisaUnique(tx) {
    try {
        var codigo = document.getElementById(idcodigo).value;
        //Verifica se é número ou letra retorna false se existem somente numeros 
        //true se tiver letras junto
        if (isNaN(codigo)) {
            alert("Digite somente números por favor!");
        } else {
            tx.executeSql('SELECT codigo FROM CLIENTE WHERE codigo = ' + codigo, [], valida);
        }
    } catch (err) {
        alert("erro sel" + err);
    }
}
function valida(tx, results) {
    try {
        if (results.rows.item(0).codigo)
            alert("Já existe");
        document.getElementById(idcodigo).value = null;
        document.getElementById(idnome).value = null;
    } catch (err) {

        var codigo = document.getElementById(idcodigo).value;
        var nome = document.getElementById(idnome).value;
        tx.executeSql('INSERT INTO CLIENTE (codigo,nome)values (' + codigo + ',"' + nome + '")');
        alert("Salvo com Sucesso!");



    }
}
function limpaTable(tableid) {
    try {
        var rowCount = table.rows.length;

        for (var i = 0; i < rowCount; i++) {
            table.deleteRow(i);
            rowCount--;
            i--;
        }
    } catch (e) {
        alert(e);
    }

}
function deletelinha(r) {
    j = r.parentNode.parentNode.rowIndex;
    successdelete(codigo[j]);
    limpaTable('minhatabela');
    successCB();

}
function selectlinha(r) {
    var i = r.parentNode.parentNode.rowIndex;
    alert(i);
    document.getElementById('codigo').value = codigo[i];
    document.getElementById('nome').value = nome[i];
}
var codigo1;
var nome1;
function confirma() {

    codigo1 = document.getElementById('codigo1').value;
    nome1 = document.getElementById('nome1').value;
    alert("Cod:" + document.getElementById('codigo1').value);
    alert(codigo1);


}
function valor() {
    try {
        document.getElementById('iptcodigo').value = codigo1;
        alert(codigo1);
        document.getElementById('iptnome').value = nome1;
        alert(nome1);
    } catch (e) {
        alert("erro" + e);
    }
}
google.maps.event.addDomListener(window, 'load', DeviceReady);
document.addEventListener("online", testaconect(true) ,false);
document.addEventListener("offline", testaconect(false) ,false);
function testaconect(va){
    if(va){
        alert("Conectou");
    }else{
        alert("desconectado");
    }
    DeviceReady;
}
function DeviceReady() {
        navigator.geolocation.getCurrentPosition(Sucesso,onError,{timeout:10000,enableHighAccuracy:false});
    }
function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
function Sucesso(position) { 
    var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var location = document.getElementById('geoLocation');
    location.innerHTML=
         ('Latitude: '          + position.coords.latitude          + '<br/>' + 
          'Longitude: '         + position.coords.longitude         + '<br/>' +
          'Altitude: '          + position.coords.altitude          + '<br/>' +
          'Accuracy: '          + position.coords.accuracy          + '<br/>' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br/>' +
          'Heading: '           + position.coords.heading           + '<br/>' +
          'Speed: '             + position.coords.speed             + '<br/>' +
          'Timestamp: '         + new Date(position.timestamp)      + '<br/>');
    map  = new google.maps.Map(document.getElementById('geo'), {
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	center: myLocation,
	zoom: 15
        
    }); 
    createMarker(myLocation);
}
var request = { location: myLocation, radius: currentRadiusValue, types: [currentPlaceType] }; 
var service = new google.maps.places.PlacesService(map); 
service.nearbySearch(request, callback);
    
function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
	map: map,
	position: place.geometry.location
    });
}
function trocaContent(idDiv,valor){
    objDiv = document.getElementById(idDiv);
    if(valor){
        objDiv.style.display = "";
    }else{
        objDiv.style.display = "none"
    }
}
