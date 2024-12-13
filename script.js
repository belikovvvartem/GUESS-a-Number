let randomNumber = Math.floor(Math.random() * 15) + 1;

let attempts = 3;

const taskElement = document.querySelector(".task");
const attemptsElement = document.createElement("p");
attemptsElement.textContent = `У вас залишилось ${attempts} спроби`;
taskElement.after(attemptsElement);

const retryButton = document.createElement("button");
retryButton.textContent = "Спробувати ще";
retryButton.style.display = "none";
retryButton.addEventListener("click", () => {
  window.location.reload(); 
});
taskElement.after(retryButton);

const numberElements = document.querySelectorAll(".number");

numberElements.forEach((numberElement) => {
  numberElement.addEventListener("click", () => {
    const chosenNumber = parseInt(numberElement.textContent);
    attempts--;

    if (chosenNumber === randomNumber) {
      attemptsElement.textContent = "🥇Вітаю! Ви відгадали число!🥇";
      disableNumbers();
      showRetryButton();
      changeBackgroundColor("green"); 
    } else if (attempts > 0 && chosenNumber < randomNumber) {
      attemptsElement.textContent = `Загадане число більше. У вас залишилось ${attempts} спроби`;
      markInvalidNumbers(chosenNumber, "less");
      changeBackgroundColor("orange"); 
    } else if (attempts > 0 && chosenNumber > randomNumber) {
      attemptsElement.textContent = `Загадане число менше. У вас залишилось ${attempts} спроби`;
      markInvalidNumbers(chosenNumber, "greater");
      changeBackgroundColor("orange"); 
    } else {
      attemptsElement.textContent = `Ви програли. Правильне число було: ${randomNumber}`;
      disableNumbers();
      showRetryButton();
      changeBackgroundColor("red"); 
    }
  });
});

function disableNumbers() {
  numberElements.forEach((numberElement) => {
    numberElement.style.pointerEvents = "none";
  });
}

function showRetryButton() {
  retryButton.style.display = "block"; 
}

function markInvalidNumbers(number, condition) {
  numberElements.forEach((numberElement) => {
    const num = parseInt(numberElement.textContent);
    if (
      (condition === "less" && num <= number) ||
      (condition === "greater" && num >= number)
    ) {
      numberElement.style.pointerEvents = "none";
      numberElement.style.backgroundColor = "red";
      numberElement.innerHTML = `${num}<span style='color: black; font-size: 24px; position: absolute;'>❌</span>`;
      numberElement.style.position = "relative";
    }
  });
}

function changeBackgroundColor(color) {
  const body = document.body;
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = color;
  overlay.style.opacity = "0.5"; 
  overlay.style.zIndex = "9999"; 
  body.appendChild(overlay);

  setTimeout(() => {
    body.removeChild(overlay);
  }, 250); 
}
