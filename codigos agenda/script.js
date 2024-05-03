const cabeca = document.querySelector("#cabeca");
const menu = document.querySelector("#menu");
const bt_home = document.querySelector("#bt_home");
const bt_novo = document.querySelector("#bt_novo");
const bt_pesq = document.querySelector("#bt_pesq");
const bt_gest = document.querySelector("#bt_gest");
const bt_sobre = document.querySelector("#bt_sobre");
const principal = document.querySelector("#principal");

bt_home.addEventListener("click",(evt)=>{
    abrirPagina(evt.target, "./pagina.html")
});
bt_novo.addEventListener("click",(evt)=>{
    abrirPagina(evt.target, "./novo.html")
});
bt_pesq.addEventListener("click",(evt)=>{
    abrirPagina(evt.target, "./pesquisar.html") 
});
bt_gest.addEventListener("click",(evt)=>{
    abrirPagina(evt.target, "./gestão.html")
});
bt_sobre.addEventListener("click",(evt)=>{
    abrirPagina(evt.target, "./sobre.html")
});

const abrirPagina = (el, url)=>{  
    const abas = [...document.querySelectorAll(".aba")];
    abas.forEach(e=>{
        e.classList.remove("abaSelecionada");
    })
    el.classList.add("abaSelecionada");
    window.open(url,"if_principal");

}
