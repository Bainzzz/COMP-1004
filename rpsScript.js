function playGame(playerChoice) {
 
  const choices = ['orc', 'elf', 'dwarf'];
  
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

 
  const resultElement = document.getElementById('result');

 
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