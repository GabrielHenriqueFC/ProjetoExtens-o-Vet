var nome = document.getElementById("f_nome");
var fone = document.getElementById("f_celular");
var email = document.getElementById("f_email");
var nasc = document.getElementById("f_dtnasc");
var indice;
var 
function Enviar(){
    var cadastro = {};
    indice = localStorage.length;
    cadastro.indice = indice;
    cadastro.nome = nome.value;
    cadastro.fone = fone.value;
    cadastro.email = email.value;
    cadastro.nasc = nasc.value;
    
    if(nome.value != "" &&  fone.value != "" && email.value != "" && nasc.value != ""){
        localStorage.setItem(indice, JSON.stringify(cadastro));
        alert('Obrigado sr(a) ' + nome.value + ' consulta agendada com sucesso');  
    }
}
function Limpar(){
    nome.value="";
    fone.value="";
    email.value="";
    nasc.value="";
}
document.getElementById("visualizar_frame").innerHTML = JSON.stringify(localStorage);
function Apagar_Storage(){

} 







