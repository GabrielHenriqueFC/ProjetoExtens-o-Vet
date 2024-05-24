// Exemplo de dados de usuários e o usuário logado
var usuarios = [
    {
        nome: "usuario1",
        tutores: ["Tutor1", "Tutor2"],
        pets: ["Pet1", "Pet2"]
    },
    {
        nome: "usuario2",
        tutores: ["Tutor3"],
        pets: ["Pet3"]
    }
];
var usuarioLogado = "usuario1";

// Funções de carregar e salvar agendamentos no localStorage
function carregarAgendamentos() {
    var agendamentosString = localStorage.getItem('agendamentos');
    if (agendamentosString) {
        return JSON.parse(agendamentosString);
    } else {
        return [];
    }
}

function salvarAgendamentos(agendamentos) {
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
}

// Função para criar um novo agendamento
function criarAgendamento(tutor, data, horario, pet, tipoAtendimento, status) {
    return {
        tutor: tutor,
        data: data,
        horario: horario,
        pet: pet,
        tipoAtendimento: tipoAtendimento,
        status: status
    };
}

// Função para adicionar um agendamento
function adicionarAgendamento(novoAgendamento) {
    var agenda = carregarAgendamentos();
    agenda.push(novoAgendamento);
    salvarAgendamentos(agenda);
    exibirAgendamentos();
}

// Função para cancelar um agendamento pelo índice
function cancelarAgendamento(index) {
    var agenda = carregarAgendamentos();
    agenda.splice(index, 1);
    salvarAgendamentos(agenda);
    exibirAgendamentos();
}

// Verificar existência de consulta cirúrgica em uma data específica
function verificarConsultaCirurgicaExistente(data) {
    var agenda = carregarAgendamentos();
    return agenda.some(function(agendamento) {
        return agendamento.data === data && agendamento.tipoAtendimento === "Consulta Cirúrgica";
    });
}

// Verificar existência de consulta de rotina em um horário específico
function verificarConsultaRotinaExistente(horario) {
    var agenda = carregarAgendamentos();
    return agenda.some(function(agendamento) {
        return agendamento.horario === horario && agendamento.tipoAtendimento === "Consulta de Rotina";
    });
}

// Verificar existência de consulta de rotina no próximo horário
function verificarConsultaRotinaProximoHorario(horario) {
    var agenda = carregarAgendamentos();
    var horaAtual = new Date(`1970-01-01T${horario}:00`).getHours(); 
    var proximoHorario = new Date();
    proximoHorario.setHours(horaAtual + 1, 0, 0, 0); 
    var proximoHorarioString = proximoHorario.toTimeString().substring(0, 5); 

    return agenda.some(function(agendamento) {
        return agendamento.horario === proximoHorarioString && agendamento.tipoAtendimento === "Consulta de Rotina";
    });
}

// Preencher select de tutores baseado no usuário logado
function preencherTutores(usuarioLogado) {
    var selectTutor = document.getElementById('tutor');
    selectTutor.innerHTML = ''; 

    usuarios.forEach(function(usuario) {
        if (usuario.nome === usuarioLogado) {
            usuario.tutores.forEach(function(tutor) {
                var option = document.createElement('option');
                option.value = tutor;
                option.textContent = tutor;
                selectTutor.appendChild(option);
            });
        }
    });
}

// Preencher select de pets baseado no tutor selecionado
function preencherPets(tutorSelecionado) {
    var selectPet = document.getElementById('pet');
    selectPet.innerHTML = ''; 

    usuarios.forEach(function(usuario) {
        usuario.tutores.forEach(function(tutor) {
            if (tutor === tutorSelecionado) {
                usuario.pets.forEach(function(pet) {
                    var option = document.createElement('option');
                    option.value = pet;
                    option.textContent = pet;
                    selectPet.appendChild(option);
                });
            }
        });
    });
}

// Evento de alteração no select de tutor
document.getElementById('tutor').addEventListener('change', function() {
    var tutorSelecionado = this.value;
    preencherPets(tutorSelecionado);
});

// Preencher tutores ao carregar a página
preencherTutores(usuarioLogado);

// Exibir agendamentos no HTML
function exibirAgendamentos() {
    var listaAgendamentos = document.getElementById('lista-agendamentos');
    listaAgendamentos.innerHTML = ''; 

    var agenda = carregarAgendamentos();
    agenda.forEach(function(agendamento, index) {
        var itemLista = document.createElement('li');
        itemLista.textContent = `Tutor: ${agendamento.tutor}, Data: ${agendamento.data}, Horário: ${agendamento.horario}, Pet: ${agendamento.pet}, Tipo de Atendimento: ${agendamento.tipoAtendimento}, Status: ${agendamento.status}`;
        var botaoCancelar = document.createElement('button');
        botaoCancelar.textContent = 'Cancelar';
        botaoCancelar.addEventListener('click', function() {
            cancelarAgendamento(index);
        });
        itemLista.appendChild(botaoCancelar);
        listaAgendamentos.appendChild(itemLista);
    });
}

// Evento de clique no botão de adicionar agendamento
document.getElementById('adicionarAgendamento').addEventListener('click', function() {
    var tutor = document.getElementById('tutor').value;
    var data = document.getElementById('data').value;
    var horario = document.getElementById('horario').value;
    var pet = document.getElementById('pet').value;
    var tipoAtendimento = document.getElementById('tipoAtendimento').value;

    var novoAgendamento = criarAgendamento(tutor, data, horario, pet, tipoAtendimento, 'Agendado');
    adicionarAgendamento(novoAgendamento);
});

// Exibir agendamentos ao carregar a página
window.onload = function() {
    exibirAgendamentos();
};
