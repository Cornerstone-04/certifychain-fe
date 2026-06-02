const uppercaseCharacters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const lowercaseCharacters = "abcdefghijkmnopqrstuvwxyz";
const numberCharacters = "23456789";
const symbolCharacters = "!@#$%^&*_-+=";
const allCharacters =
  uppercaseCharacters +
  lowercaseCharacters +
  numberCharacters +
  symbolCharacters;

function randomCharacter(characters: string) {
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  return characters[values[0] % characters.length];
}

export function generateStrongPassword(length = 20) {
  const password = [
    randomCharacter(uppercaseCharacters),
    randomCharacter(lowercaseCharacters),
    randomCharacter(numberCharacters),
    randomCharacter(symbolCharacters),
  ];

  while (password.length < length) {
    password.push(randomCharacter(allCharacters));
  }

  for (let index = password.length - 1; index > 0; index--) {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    const swapIndex = values[0] % (index + 1);
    [password[index], password[swapIndex]] = [
      password[swapIndex],
      password[index],
    ];
  }

  return password.join("");
}
