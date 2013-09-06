var codigo = new Array();
var nome = new Array();
var j;
var table;
var idcodigo;
var idnome;
var chamaT1;
document.addEventListener("backbutton", function(e){
    if($.mobile.activePage.is('#homepage')){
        e.preventDefault();
        navigator.app.exitApp();
    }
    else {
        navigator.app.backHistory()
    }
}, false);

function chamat1() {
    chamaT1 = window.open('/data/data/totalcross.apptopt', '');
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
// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// Populate the database
//
function abreDB() {
    return window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
}
function populateDB(tx) {
    //tx.executeSql('DROP TABLE IF EXISTS CLIENTE');
    tx.executeSql('CREATE TABLE IF NOT EXISTS CLIENTE (codigo unique, nome)');
    //tx.executeSql('INSERT INTO CLIENTE (codigo,nome) VALUES (3, "Willian")');
    //tx.executeSql('INSERT INTO CLIENTE (codigo,nome) VALUES (4, "Tiago")');
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
try {
    var mobileDemo = {'center': '57.7973333,12.0502107', 'zoom': 15};
    $('#mapa').live('pageinit', function() {

        demo.add('mapa', function() {
            $('#map_canvas_1').gmap({'center': mobileDemo.center, 'zoom': mobileDemo.zoom, 'disableDefaultUI': true, 'callback': function() {
                    var self = this;
                    self.set('getCurrentPosition', function() {
                        self.refresh();
                        self.getCurrentPosition(function(position, status) {
                            if (status === 'OK') {
                                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                                self.get('map').panTo(latlng);
                                self.search({'location': latlng}, function(results, status) {
                                    if (status === 'OK') {
                                        $('#from').val(results[0].formatted_address);
                                    }
                                });
                            } else {
                                alert('Unable to get current position');
                            }
                        });
                    });
                    $('#submit').click(function() {
                        self.displayDirections({'origin': $('#from').val(), 'destination': $('#to').val(), 'travelMode': google.maps.DirectionsTravelMode.DRIVING}, {'panel': document.getElementById('directions')}, function(response, status) {
                            (status === 'OK') ? $('#results').show() : $('#results').hide();
                        });
                        return false;
                    });
                }});
        }).load('mapa');
    });
    $('#mapa').live('pageshow', function() {
        demo.add('mapa', $('#map_canvas_1').gmap('get', 'getCurrentPosition')).load('mapa');
    });
} catch (e) {
    alert("Erro " + e);
}
