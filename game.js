let clickCount = 0;
let timeRemaining = 10;
const clickCountElement = document.getElementById('click-count');
const timeRemainingElement = document.getElementById('time-remaining');
const clickButton = document.getElementById('click-button');

function countClick() {
  clickCount++;
  clickCountElement.textContent = clickCount;
}

function updateTimer() {
  timeRemaining--;
  timeRemainingElement.textContent = timeRemaining;

  if (timeRemaining === 0) {
    endGame();
  }
}

function addResultToPreviousResults(result) {
  const listItem = document.createElement('li');
  listItem.textContent = `Clicks: ${result}`;
  document.getElementById('previous-results').appendChild(listItem);
}

function saveResult(result) {
  const results = getPreviousResultsFromLocalStorage();
  results.push(result);
  localStorage.setItem('previousResults', JSON.stringify(results));
}

function getPreviousResultsFromLocalStorage() {
  const resultsJSON = localStorage.getItem('previousResults');
  return resultsJSON ? JSON.parse(resultsJSON) : [];
}

function showPreviousResults() {
  const previousResults = getPreviousResultsFromLocalStorage();
  previousResults.forEach(result => addResultToPreviousResults(result));
}

function endGame() {
  clearInterval(timer);
  clickButton.disabled = true;
  alert(`Time's up! You clicked ${clickCount} times.`);
  saveResult(clickCount);
  addResultToPreviousResults(clickCount);
}

function startGame() {
  clickButton.removeEventListener('click', startGame); // Remove event listener
  clickButton.onclick = countClick; // Add event listener for click counting
  timer = setInterval(updateTimer, 1000); // Start timer
}

// Initialize timer but do not start yet
let timer;

// Add event listener to start game when button is clicked
clickButton.addEventListener('click', startGame);

// Show previous results on page load
showPreviousResults();
