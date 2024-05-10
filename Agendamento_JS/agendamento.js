
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


function adicionarAgendamento(novoAgendamento) {
    var agenda = carregarAgendamentos();
    agenda.push(novoAgendamento);
    salvarAgendamentos(agenda);
    exibirAgendamentos();
}


function cancelarAgendamento(index) {
    var agenda = carregarAgendamentos();
    agenda.splice(index, 1);
    salvarAgendamentos(agenda);
    exibirAgendamentos();
}


function verificarConsultaCirurgicaExistente(data) {
    var agenda = carregarAgendamentos();
    return agenda.some(function(agendamento) {
        return agendamento.data === data && agendamento.tipoAtendimento === "Consulta Cirúrgica";
    });
}


function verificarConsultaRotinaExistente(horario) {
    var agenda = carregarAgendamentos();
    return agenda.some(function(agendamento) {
        return agendamento.horario === horario && agendamento.tipoAtendimento === "Consulta de Rotina";
    });
}


function verificarConsultaRotinaProximoHorario(horario) {
    var agenda = carregarAgendamentos();
    var horaAtual = new Date(horario).getHours(); 
    var proximoHorario = new Date(horario);
    proximoHorario.setHours(horaAtual + 1); 
    var proximoHorarioString = proximoHorario.toTimeString().substring(0, 5); 

    return agenda.some(function(agendamento) {
        return agendamento.horario === proximoHorarioString && agendamento.tipoAtendimento === "Consulta de Rotina";
    });
}

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


document.getElementById('tutor').addEventListener('change', function() {
    var tutorSelecionado = this.value;
    preencherPets(tutorSelecionado);
});



preencherTutores(usuarioLogado);


function exibirAgendamentos() {
    var listaAgendamentos = document.getElementById('lista-agendamentos');
    listaAgendamentos.innerHTML = ''; 

    var agenda = carregarAgendamentos();
    agenda.forEach(function(agendamento) {
        var itemLista = document.createElement('li');
        itemLista.textContent = `Tutor: ${agendamento.tutor}, Data: ${agendamento.data}, Horário: ${agendamento.horario}, Pet: ${agendamento.pet}, Tipo de Atendimento: ${agendamento.tipoAtendimento}, Status: ${agendamento.status}`;
        listaAgendamentos.appendChild(itemLista);
    });
}


window.onload = function() {
    exibirAgendamentos();
};
