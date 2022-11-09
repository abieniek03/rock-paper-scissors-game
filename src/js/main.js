// AUTHOR INFO
console.log('%cCreator: %cAdrian Bieniek', 'color: #31d27d; font-size: 30px', 'color: #0fbade; font-size: 30px');
console.log('%cCreation ate: 25/09/2022', 'color: #ebebeb;  font-size: 15px');
console.log('%cModifications date: 25/10/2022', 'color: #ebebeb;  font-size: 15px');

// GAME CODE
window.addEventListener('DOMContentLoaded', () => {
	const selectionSection = document.querySelector('.section__choice');
	const resultSection = document.querySelector('.section__result');
	const resultItemContainer = document.querySelector('.section__item-container--result');
	const playerPickBtns = document.querySelectorAll('.section__item-element-btn');
	const playAgainBtn = document.querySelector('.section__btn');
	const tempPickElement = document.querySelector('.section__pick-element-temp');

	const computerPickOptions = ['ROCK', 'PAPER', 'SCISSORS'];

	let playerPickValue, computerPickValue;

	const createPick = () => {
		const pickElement = tempPickElement.content.cloneNode(true);
		resultItemContainer.append(pickElement);
	};

	const playerChoice = pick => {
		createPick();
		playerPickValue = pick.target.id.toUpperCase();
		console.log(`Player pick: ${playerPickValue}`);
		const playerChoiceElement = resultItemContainer.childNodes[1];
		playerChoiceElement.classList.add('section__item-element--player');
		const playerChoiceIcon = resultItemContainer.childNodes[1].childNodes[1];
		playerChoiceIcon.classList.add('section__item-element', 'section__item-element--animation');
		checkIcon(playerChoiceIcon);
	};

	const computerChoice = () => {
		createPick();
		computerPickValue = computerPickOptions[Math.floor(Math.random() * computerPickOptions.length)];
		console.log(`Computer pick: ${computerPickValue}`);
		const computerChoiceElement = resultItemContainer.childNodes[4];
		computerChoiceElement.classList.add('section__item-element--computer');
		const computerChoiceIcon = resultItemContainer.childNodes[4].childNodes[1];
		computerChoiceIcon.classList.add('section__item-element', 'section__item-element--animation');
		checkIcon(computerChoiceIcon);
	};

	const checkIcon = (item, pick) => {
		const pickElements = [playerPickValue, computerPickValue];
		pickElements.forEach(pick => {
			switch (pick) {
				case 'ROCK':
					item.setAttribute('src', './dist/img/icon__rock.png');
					item.setAttribute('alt', 'ROCK');
					break;
				case 'PAPER':
					item.setAttribute('src', './dist/img/icon__paper.png');
					item.setAttribute('alt', 'PAPER');
					break;
				case 'SCISSORS':
					item.setAttribute('src', './dist/img/icon__scissors.png');
					item.setAttribute('alt', 'SCISSORS');
			}
		});
	};

	const showResultInfo = () => {
		const resultTitle = document.createElement('p');
		resultTitle.classList.add('section__result-title', 'section__result-title--animation');
		resultItemContainer.append(resultTitle);

		if (playerPickValue === computerPickValue) {
			resultTitle.textContent = 'DRAW!';
			resultTitle.classList.add('section__result-title--draw');
		} else if (
			(playerPickValue === 'PAPER' && computerPickValue === 'ROCK') ||
			(playerPickValue === 'ROCK' && computerPickValue === 'SCISSORS') ||
			(playerPickValue === 'SCISSORS' && computerPickValue === 'PAPER')
		) {
			resultTitle.textContent = 'YOU WIN!';
			resultTitle.classList.add('section__result-title--win');
		} else {
			resultTitle.textContent = 'YOU LOSE!';
			resultTitle.classList.add('section__result-title--lose');
		}

		playAgainBtn.classList.add('section__btn--animation');
	};

	const checkResult = pick => {
		selectionSection.style.display = 'none';
		resultSection.style.display = 'flex';
		playerChoice(pick);
		computerChoice();
		showResultInfo();
	};

	playerPickBtns.forEach(playerPick => playerPick.addEventListener('click', checkResult));
});
