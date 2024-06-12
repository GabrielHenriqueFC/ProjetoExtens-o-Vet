document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('loggedInUserId');
    if (userId !== null) {
        const user = JSON.parse(localStorage.getItem(userId));
        if (user !== null) {
            document.getElementById('user-name').textContent = user.nome;
            document.getElementById('user-email').textContent = user.email; //Carrega as informações do usuario
           
        }
    }

    const addPetButton = document.getElementById('add-pet-button');
    const petFormContainer = document.getElementById('pet-form-container');
    const cancelButton = document.getElementById('cancel-button');
    const petForm = document.getElementById('pet-form');
    const petsContainer = document.getElementById('pets-container');
    const appointmentFormContainer = document.getElementById('appointment-form-container');
    const cancelAppointmentButton = document.getElementById('cancel-appointment-button');
    const appointmentForm = document.getElementById('appointment-form');

    // Carrega os pets do localStorage associados ao usuário logado
    const userPets = JSON.parse(localStorage.getItem(`pets_${userId}`)) || [];

    const renderPet = (pet, index) => {
        const newPetCard = document.createElement('div');
        newPetCard.classList.add('card', 'card-pet');
        const petImageSrc = pet.species.toLowerCase() === 'gato' ? '../Imagens/gato.png' : '../Imagens/cachorro.png';
        newPetCard.innerHTML = `
            <h2>Pet</h2>
            <div class="pet">
                <div class="pet-card-info">
                    <p><strong>Nome:</strong> ${pet.name}</p>
                    <p><strong>Espécie:</strong> ${pet.species}</p>
                    <p><strong>Raça:</strong> ${pet.breed}</p>
                    <p><strong>Porte:</strong> ${pet.size}</p>
                    <p><strong>Idade:</strong> ${pet.age}</p>
                </div>
                <img src="${petImageSrc}" alt="img-${pet.species.toLowerCase()}" height="60px" width="60px" class="pet-card-img">
            </div>
        `;
        newPetCard.addEventListener('click', () => {
            openAppointmentForm(index);
        });
        petsContainer.appendChild(newPetCard);
    };

    userPets.forEach((pet, index) => {
        renderPet(pet, index);
    });

    addPetButton.addEventListener('click', () => {
        petFormContainer.classList.add('form-visible');
    });

    cancelButton.addEventListener('click', () => {
        petFormContainer.classList.remove('form-visible');
    });

    cancelAppointmentButton.addEventListener('click', () => {
        appointmentFormContainer.classList.remove('form-visible');
    });

    petForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const petName = document.getElementById('pet-name').value;
        const petSpecies = document.getElementById('pet-species').value;
        const petBreed = document.getElementById('pet-breed').value;
        const petSize = document.getElementById('pet-size').value;
        const petAge = document.getElementById('pet-age').value;

        const newPet = {
            name: petName,
            species: petSpecies,
            breed: petBreed,
            size: petSize,
            age: petAge
        };

        userPets.push(newPet);
        localStorage.setItem(`pets_${userId}`, JSON.stringify(userPets));

        renderPet(newPet, userPets.length - 1);

        petFormContainer.classList.remove('form-visible');
        petForm.reset();
    });

    appointmentForm.addEventListener('submit', (event) => {
        event.preventDefault();
    
        const appointmentDate = document.getElementById('appointment-date').value;
        const appointmentTime = document.getElementById('appointment-time').value;
        const appointmentType = document.getElementById('appointment-type').value;
    
        const appointmentDay = new Date(appointmentDate).getDay();
    
        if (appointmentDay === 6 || appointmentDay === 5) {
            alert('Consultas não estão disponíveis aos sábados ou domingos. Por favor, selecione um dia útil.');
            return;
        }
    
        
        const existingAppointments = Object.values(localStorage).filter(item => {
            try {
                const parsedItem = JSON.parse(item);
                const existingTime = new Date(parsedItem.date + ' ' + parsedItem.time);
                const selectedTime = new Date(appointmentDate + ' ' + appointmentTime);
                const diffInMinutes = Math.abs(existingTime - selectedTime) / (1000 * 60);
                return diffInMinutes < 60;
            } catch (error) {
                return false;
            }
        });
    
        if (existingAppointments.length > 0) {
            alert('Já existe um agendamento para este horário ou dentro da próxima hora. Por favor, selecione outro horário.');
            return;
        }
    
        
        const newAppointment = {
            date: appointmentDate,
            time: appointmentTime,
            type: appointmentType
        };
        
        const appointmentId = `appointment_${userId}_${new Date().getTime()}`;
        localStorage.setItem(appointmentId, JSON.stringify(newAppointment));
    
        
        const message = `Olá! Gostaria de agendar um(a) ${newAppointment.type} no dia ${newAppointment.date} às ${newAppointment.time}.`;
    
        
        const whatsappLink = `https://wa.me/83999941279/?text=${encodeURIComponent(message)}`;
    
        
        const whatsappLinkElement = document.createElement('a');
        whatsappLinkElement.setAttribute('href', whatsappLink);
        whatsappLinkElement.setAttribute('target', '_blank');
        whatsappLinkElement.classList = 'link-zap';
        whatsappLinkElement.textContent = 'Agendamento realizado! Fale conosco no Whatsapp';
        appointmentForm.appendChild(whatsappLinkElement);
    
        
        appointmentForm.reset();
    });
    
    
    

    const openAppointmentForm = (petIndex) => {
      
        appointmentFormContainer.classList.add('form-visible');
    };
});
