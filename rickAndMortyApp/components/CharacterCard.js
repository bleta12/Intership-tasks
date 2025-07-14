export function createCharacterCard(character) {
  const card = document.createElement('div');
  card.className = 'card';

  const statusClass = character.status.toLowerCase();

  card.innerHTML = `
    <img src="${character.image}" alt="${character.name}">
    <div class="card-body">
      <h3>${character.name}</h3>
      <p><strong>Status:</strong> <span class="status ${statusClass}">${character.status}</span></p>
      <p><strong>Species:</strong> ${character.species}</p>
      <p><strong>Gender:</strong> ${character.gender}</p>
      <p><strong>Origin:</strong> ${character.origin.name}</p>
    </div>
  `;

  return card;
}
