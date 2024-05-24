var nome = document.getElementById("f_nome");
var fone = document.getElementById("f_celular");
var email = document.getElementById("f_email");
var nasc = document.getElementById("f_dtnasc");
var indice;

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
        location.reload();
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
   var decisão = prompt("Deseja mesmo apagar os arquivos??")
   if(decisão = "sim"){
        localStorage.clear();
        location.reload();
   }
   else{
        location.reload();
   }
} 
function Apagar_dado(){
    var escolha = parseInt(prompt("Digite o número do indice do cadastro!"));
    localStorage.removeItem(escolha);
    location.reload();
}







