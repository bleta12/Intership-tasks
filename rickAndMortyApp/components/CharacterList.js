import { createCharacterCard } from './CharacterCard.js';

export function renderCharacterList(container, characters, append = false) {
  if (!append) container.innerHTML = '';

  characters.forEach(character => {
    const card = createCharacterCard(character);
    container.appendChild(card);
  });
}
