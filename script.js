function playGame(playerChoice) {
  // Array of choices
  const choices = ['orc', 'elf', 'dwarf'];
  // Randomly select computer's choice
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  // Get the result element
  const resultElement = document.getElementById('result');

  // Compare player's choice with computer's choice to determine the winner
  if (playerChoice === computerChoice) {
    resultElement.textContent = "It's a tie!";
  } else if (
    (playerChoice === 'orc' && computerChoice === 'dwarf') ||
    (playerChoice === 'elf' && computerChoice === 'orc') ||
    (playerChoice === 'dwarf' && computerChoice === 'elf')
  ) {
    resultElement.textContent = 'You Succeed!';
  } else {
    resultElement.textContent = 'You Fail!';
  }
}