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
function criarAgendamento(tutor, telefone, email, pet, idade, peso, data, horario, tipoAtendimento, status) {
    return {
        tutor: tutor,
        telefone: telefone,
        email: email,
        pet: pet,
        idade: idade,
        peso: peso,
        data: data,
        horario: horario,
        tipoAtendimento: tipoAtendimento,
        status: status
    };
}

// Função para adicionar um agendamento
function adicionarAgendamento(novoAgendamento) {
    var agenda = carregarAgendamentos();
    
    // Cancelar todas as outras consultas se for uma consulta cirúrgica
    if (novoAgendamento.tipoAtendimento === "Consulta Cirúrgica") {
        agenda = [];
    }

    agenda.push(novoAgendamento);
    salvarAgendamentos(agenda);
    exibirAgendamentos();
    enviarEmailConfirmacao(novoAgendamento);
    enviarMensagemWhatsApp(novoAgendamento);
}

// Função para cancelar um agendamento pelo índice
function cancelarAgendamento(index) {
    var agenda = carregarAgendamentos();
    agenda.splice(index, 1);
    salvarAgendamentos(agenda);
    exibirAgendamentos();
}

// Função para exibir agendamentos no HTML
function exibirAgendamentos() {
    var listaAgendamentos = document.getElementById('lista-agendamentos');
    listaAgendamentos.innerHTML = ''; 

    var agenda = carregarAgendamentos();
    agenda.forEach(function(agendamento, index) {
        var itemLista = document.createElement('li');
        itemLista.textContent = `Tutor: ${agendamento.tutor}, Telefone: ${agendamento.telefone}, Email: ${agendamento.email}, Pet: ${agendamento.pet}, Idade: ${agendamento.idade}, Peso: ${agendamento.peso}, Data: ${agendamento.data}, Horário: ${agendamento.horario}, Tipo de Atendimento: ${agendamento.tipoAtendimento}, Status: ${agendamento.status}`;
        var botaoCancelar = document.createElement('button');
        botaoCancelar.textContent = 'Cancelar';
        botaoCancelar.addEventListener('click', function() {
            cancelarAgendamento(index);
        });
        itemLista.appendChild(botaoCancelar);
        listaAgendamentos.appendChild(itemLista);
    });
}

// Função para enviar email de confirmação
function enviarEmailConfirmacao(agendamento) {
    var email = agendamento.email;
    var assunto = "Confirmação de Agendamento";
    var corpo = `Olá ${agendamento.tutor},\n\nSeu agendamento para ${agendamento.tipoAtendimento} foi confirmado para o dia ${agendamento.data} às ${agendamento.horario}.\n\nAtenciosamente,\nClínica Veterinária`;

    // Simulando envio de email (substituir com funcionalidade real de envio de email)
    console.log(`Enviando email para: ${email}\nAssunto: ${assunto}\nCorpo:\n${corpo}`);
}

// Função para enviar mensagem de confirmação via WhatsApp
function enviarMensagemWhatsApp(agendamento) {
    var telefone = agendamento.telefone.replace(/\D/g, ''); // Remove caracteres não numéricos do telefone
    var mensagem = `Olá ${agendamento.tutor}, seu(a) ${agendamento.tipoAtendimento} foi agendada com sucesso para o dia ${agendamento.data} às ${agendamento.horario}. 
    \nDetalhes do Pet:
    \nNome: ${agendamento.pet}
    \nIdade: ${agendamento.idade} anos
    \nPeso: ${agendamento.peso} kg`;
    var url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

// Evento de clique no botão de adicionar agendamento
document.getElementById('adicionarAgendamento').addEventListener('click', function() {
    var tutor = document.getElementById('tutor').value;
    var telefone = document.getElementById('telefone').value;
    var email = document.getElementById('email').value;
    var pet = document.getElementById('pet').value;
    var idade = document.getElementById('idade').value;
    var peso = document.getElementById('peso').value;
    var data = document.getElementById('data').value;
    var horario = document.getElementById('horario').value;
    var tipoAtendimento = document.getElementById('tipoAtendimento').value;

    var novoAgendamento = criarAgendamento(tutor, telefone, email, pet, idade, peso, data, horario, tipoAtendimento, 'Agendado');
    adicionarAgendamento(novoAgendamento);
});

// Exibir agendamentos ao carregar a página
window.onload = function() {
    exibirAgendamentos();
};
