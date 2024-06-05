

document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('loggedInUserId');
    if (userId !== null) {
        const user = JSON.parse(localStorage.getItem(userId));
        if (user !== null) {
            document.getElementById('user-name').textContent = user.nome;
            document.getElementById('user-email').textContent = user.email;
            // Se houver um campo de número, adicione o valor correspondente
            // document.getElementById('user-phone').textContent = user.numero || 'N/A';
        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const addPetButton = document.getElementById('add-pet-button');
    const petFormContainer = document.getElementById('pet-form-container');
    const cancelButton = document.getElementById('cancel-button');
    const petForm = document.getElementById('pet-form');
    const petsContainer = document.getElementById('pets-container');

    addPetButton.addEventListener('click', () => {
        petFormContainer.classList.add('form-visible');
    });

    cancelButton.addEventListener('click', () => {
        petFormContainer.classList.remove('form-visible');
    });

    petForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const petName = document.getElementById('pet-name').value;
        const petSpecies = document.getElementById('pet-species').value;
        const petBreed = document.getElementById('pet-breed').value;
        const petSize = document.getElementById('pet-size').value;
        const petAge = document.getElementById('pet-age').value;

        const newPetCard = document.createElement('div');
        newPetCard.classList.add('card', 'card-pet');
        newPetCard.innerHTML = `
            <h2>Pet</h2>
            <div class="pet">
                <p><strong>Nome:</strong> ${petName}</p>
                <p><strong>Espécie:</strong> ${petSpecies}</p>
                <p><strong>Raça:</strong> ${petBreed}</p>
                <p><strong>Porte:</strong> ${petSize}</p>
                <p><strong>Idade:</strong> ${petAge}</p>
            </div>
        `;

        petsContainer.appendChild(newPetCard);

        petFormContainer.classList.remove('form-visible');
        petForm.reset();
    });
});