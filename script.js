const textElement = document.getElementById("text");
const leftButton = document.getElementById("leftText");
const rightButton = document.getElementById("rightText");
const warriorButton = document.getElementById("warriorButton");
const mageButton = document.getElementById("mageButton");
const classSelect = document.getElementById("classSelect");
const actions = document.getElementById("actions");
const enemyHealthElement = document.getElementById("enemyHealth");
const missedElement = document.getElementById("missed");
const healthElement = document.getElementById("health");
const enemyHitElement = document.getElementById("enemyHit");
const deathCounterElement = document.getElementById("deathCounter");
const statsElement = document.getElementById("stats");
const heroName = document.getElementById("heroName");
const restartContainer = document.getElementById("restart");
const restartButton = document.getElementById("restartButton");

let count = 0;
let damage = 3;
let currentEnemyHealth;
let userClass;
let gameSteps;
let health = 10;
let deaths = 0;

// const userInput = prompt("Enter your name");
// heroName.classList.remove("hidden");
// if (userInput != null && userInput !== "") {
// 	heroName.textContent = "Hero: " + userInput;
// }

function chanceToHit() {
	return Math.floor(Math.random() * 2); // 0, 1
}
function chanceEnemyHit() {
	return Math.floor(Math.random() * 5); // 0, 1, 2, 3, 4
}

//button to pick between the two classes
function selectClass() {
	warriorButton.addEventListener("click", function () {
		classSelect.classList.add("hidden");
		actions.classList.remove("hidden");
		textElement.classList.remove("hidden");
		statsElement.classList.remove("hidden");

		userClass = "Warrior";
		gameSteps = warriorSteps;

		const warrior = gameSteps[0];
		leftButton.textContent = warrior.leftButton;
		rightButton.textContent = warrior.rightButton;
		textElement.textContent = warrior.storyText;
	});

	mageButton.addEventListener("click", function () {
		classSelect.classList.add("hidden");
		actions.classList.remove("hidden");
		textElement.classList.remove("hidden");
		statsElement.classList.remove("hidden");

		userClass = "Mage";
		gameSteps = mageSteps;

		const mage = gameSteps[0];
		leftButton.textContent = mage.leftButton;
		rightButton.textContent = mage.rightButton;
		textElement.textContent = mage.storyText;
	});
}

selectClass();
restartGame();

//restarts the game after beating boss
function restartGame() {
	restartButton.addEventListener("click", function () {
		// reset stats
		count = 0;
		health = 10;
		deaths = 0;

		// hide restart container
		restartContainer.classList.add("hidden");
		// back to class select
		textElement.textContent = "Choose Your Class";
		classSelect.classList.remove("hidden");
	});
}

//Left button
leftButton.addEventListener("click", function () {
	let currentStep = gameSteps[count];
	let restart = false;
	if (currentEnemyHealth == null) {
		currentEnemyHealth = currentStep.enemyHealth;
	}

	leftButton.textContent = currentStep.leftButton;
	rightButton.textContent = currentStep.rightButton;
	textElement.textContent = currentStep.storyText;

	if (chanceToHit() === 1) {
		// enemy is hit
		currentEnemyHealth = currentEnemyHealth - damage;
		missedElement.classList.add("hidden");

		if (currentEnemyHealth <= 0) {
			if (gameSteps.length - 1 === count) {
				restartContainer.classList.remove("hidden");
				textElement.classList.add("hidden");
				statsElement.classList.add("hidden");
				actions.classList.add("hidden");
				enemyHitElement.classList.add("hidden");
				restart = true;
			} else {
				currentStep = gameSteps[count + 1];

				currentEnemyHealth = currentStep.enemyHealth;
				leftButton.textContent = currentStep.leftButton;
				rightButton.textContent = currentStep.rightButton;
				textElement.textContent = currentStep.storyText;
				enemyHealthElement.textContent = currentEnemyHealth;

				health = health + 5;
				healthElement.textContent = health;

				count++;
			}
		} else {
			enemyHealthElement.textContent = currentEnemyHealth;
		}
	} else {
		// missed enemy
		missedElement.classList.remove("hidden");
		enemyHealthElement.textContent = currentEnemyHealth;
	}

	// enemy attacks
	if (chanceEnemyHit() > 3) {
		// enemy hits
		health = health - damage;
		healthElement.textContent = health;

		if (!restart) {
			enemyHitElement.classList.remove("hidden");
		}
	} else {
		enemyHitElement.classList.add("hidden");
	}

	if (health <= 0) {
		deaths++;
		count = 0; // start over
		health = 10;

		deathCounterElement.textContent = deaths;
	}
});

//Right button
rightButton.addEventListener("click", function () {
	let currentStep = gameSteps[count];
	let restart = false;
	if (currentEnemyHealth == null) {
		currentEnemyHealth = currentStep.enemyHealth;
	}
	leftButton.textContent = currentStep.leftButton;
	rightButton.textContent = currentStep.rightButton;
	textElement.textContent = currentStep.storyText;
	if (chanceToHit() === 1) {
		currentEnemyHealth = currentEnemyHealth - (damage + 3);
		missedElement.classList.add("hidden");
		if (currentEnemyHealth <= 0) {
			//restart game
			if (gameSteps.length - 1 === count) {
				restartContainer.classList.remove("hidden");
				textElement.classList.add("hidden");
				statsElement.classList.add("hidden");
				actions.classList.add("hidden");
				enemyHitElement.classList.add("hidden");
				restart = true;
			} else {
				currentStep = gameSteps[count + 1];
				currentEnemyHealth = currentStep.enemyHealth;
				leftButton.textContent = currentStep.leftButton;
				rightButton.textContent = currentStep.rightButton;
				textElement.textContent = currentStep.storyText;
				enemyHealthElement.textContent = currentEnemyHealth;
				health = health + 5;
				healthElement.textContent = health;
				count++;
			}
		} else {
			enemyHealthElement.textContent = currentEnemyHealth;
		}
	} else {
		missedElement.classList.remove("hidden");
		enemyHealthElement.textContent = currentEnemyHealth;
	}

	if (chanceEnemyHit() < 3) {
		health = health - damage;
		healthElement.textContent = health;

		if (!restart) {
			enemyHitElement.classList.remove("hidden");
		}
	} else {
		enemyHitElement.classList.add("hidden");
	}

	if (health <= 0) {
		deaths++;
		count = 0;
		deathCounterElement.textContent = deaths;
		health = 10;
	}
});

//steps in the game
var warriorSteps = [
	//Warrior
	//1
	{
		storyText: "You've encountered a goblin",
		enemyHealth: 5,
		leftButton: "Swing",
		rightButton: "Strike",
	},
	//2
	{
		storyText: "You've encountered a hunter",
		enemyHealth: 7,
		leftButton: "Swing",
		rightButton: "Strike",
	},
	//3
	{
		storyText: "You've encountered an enemy warrior",
		enemyHealth: 4,
		leftButton: "Swing",
		rightButton: "Strike",
	},
	//4
	{
		storyText: "You've encountered an ogre",
		enemyHealth: 10,
		leftButton: "Swing",
		rightButton: "Strike",
	},
	//5
	{
		storyText: "You've encountered the boss",
		enemyHealth: 15,
		leftButton: "Swing",
		rightButton: "Strike",
	},
];
var mageSteps = [
	//Mage
	//1
	{
		storyText: "You've encountered a goblin",
		enemyHealth: 5,
		leftButton: "Fireball",
		rightButton: "Ice Punch",
	},
	//2
	{
		storyText: "You've encountered a hunter",
		enemyHealth: 7,
		leftButton: "Fireball",
		rightButton: "Ice Punch",
	},
	//3
	{
		storyText: "You've encountered an enemy mage",
		enemyHealth: 4,
		leftButton: "Fireball",
		rightButton: "Ice Punch",
	},
	//4
	{
		storyText: "You've encountered an ogre",
		enemyHealth: 10,
		leftButton: "Fireball",
		rightButton: "Ice Punch",
	},
	//5
	{
		storyText: "You've encountered the boss",
		enemyHealth: 15,
		leftButton: "Fireball",
		rightButton: "Ice Punch",
	},
];
