const usuario = document.querySelector('#user');
const senha = document.querySelector('#senha');
const email = document.querySelector('#email');
const checkSenha = document.querySelector('#senha-confirm');

let container = document.getElementById('container')
var indice;



var usuariolog = {
    user1 : {
        nome: '',
        email: '',
        pets: [
            {
                nome: '',
                idade: 0,
                raça: '',
                porte: '',
            }
        ]
    },
    user2 : {
        nome: 'fulano',
        email: 'fulano@gmail.com',
        pets: [
            {
                nome: 'toto',
                idade: 4,
                raça: 'pastor alemão',
                porte: 'grande',
            }
        ]
    },
    user3 : {
        nome: 'fulano',
        email: 'fulano@gmail.com',
        pets: [
            {
                nome: 'toto',
                idade: 4,
                raça: 'pastor alemão',
                porte: 'grande',
            }
        ]
    }
}



//cadastro js
function Enviar() {
    var cadastro = {};
    indice = localStorage.length;
    cadastro.id = indice;
    cadastro.nome = usuario.value;
    cadastro.senha = senha.value;
    cadastro.email = email.value;
    cadastro.confirmaSenha = checkSenha.value;

    // Função para verificar se o email já está cadastrado
    function emailJaCadastrado(email) {
        for (var i = 0; i < localStorage.length; i++) {
            var item = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if (item.email === email) {
                return true;
            }
        }
        return false;
    }

    if (cadastro.nome !== "" && cadastro.email !== "" && cadastro.senha !== "" && cadastro.confirmaSenha !== "" 
        && cadastro.senha === cadastro.confirmaSenha
    ) {
        if (emailJaCadastrado(cadastro.email)) {
            alert('Este email já está cadastrado. Por favor, use outro email.');
        } else {
            localStorage.setItem(indice, JSON.stringify(cadastro));
            alert('Obrigado sr(a) ' + cadastro.nome + ' cadastro realizado com sucesso');  
        }
    } else if (cadastro.senha !== cadastro.confirmaSenha) {
        alert('Confirme corretamente sua senha.');
    }
}


//Login
function Login() {
    var loginEmail = document.querySelector('#loginEmail').value;
    var loginSenha = document.querySelector('#loginSenha').value;
    var loginSuccess = false;

    for (var i = 0; i < localStorage.length; i++) {
        var item = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (item.email === loginEmail && item.senha === loginSenha) {
            alert('Login bem-sucedido! Bem-vindo, ' + item.nome + '!');
            loginSuccess = true;
			location.href = 'homelog.html';
            break;
        }
    }

    if (!loginSuccess) {
        alert('Email ou senha incorretos.');
    }
}





// animação js 
toggle = () => {
	container.classList.toggle('sign-in')
	container.classList.toggle('sign-up')
}

setTimeout(() => {
	container.classList.add('sign-in')
}, 200)


function entrar() {
    window.location.href = 'home.html'
}