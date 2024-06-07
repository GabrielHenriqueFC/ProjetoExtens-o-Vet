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

       
        if (appointmentDay === 6 || appointmentDay === 0) {
            alert('Consultas não estão disponíveis aos sábados ou domingos. Por favor, selecione um dia útil.');
            return;
        }

       

        appointmentFormContainer.classList.remove('form-visible');
        appointmentForm.reset();
    });

    const openAppointmentForm = (petIndex) => {
      
        appointmentFormContainer.classList.add('form-visible');
    };
});
