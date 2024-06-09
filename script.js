const input = document.querySelectorAll(' input'),
	price = document.querySelector('#price'),
	tipPercent = document.querySelectorAll('.input-grid  > *'),
	varPercent = document.querySelector('#percent'),
	people = document.querySelector('#people'),
	sumTotal = document.querySelector('.sum-total'),
	tipTotal = document.querySelector('.tip-total'),
	btn = document.querySelector('.display .btn');

let priceVal, peopleVal, tip, sum, removeChar, formatedNum, removeDot;

const calcTip = () => {
		checkTipPercent();

		priceVal = Number(price.value);
		peopleVal = Number(people.value);

		if (isNaN(percent)) {
			percent = 0;
		}

		tip = (priceVal * percent) / (peopleVal * 100);
	},
	calcSum = () => {
		calcTip();

		priceVal = Number(price.value);
		peopleVal = Number(people.value);

		sum = priceVal / peopleVal + tip;
	},
	clearInput = () => {
		people.parentElement.nextElementSibling.textContent = ` `;
		people.parentElement.style.borderColor = `var(--strong-cyan)`;
		tipTotal.textContent = `$0.00`;
		sumTotal.textContent = `$0.00`;
		btn.style.opacity = '.2';
		people.value = ``;
	},
	calc = e => {
		calcTip();
		calcSum();

		peopleVal == '0'
			? ((people.parentElement.nextElementSibling.textContent = `Can't be zero`),
			  (people.parentElement.style.borderColor = `var(--red)`))
			: peopleVal != '0'
			? ((people.parentElement.nextElementSibling.textContent = ` `),
			  (people.parentElement.style.borderColor = `var(--strong-cyan)`),
			  (tipTotal.textContent = `$${tip.toFixed(2)}`),
			  (sumTotal.textContent = `$${sum.toFixed(2)}`),
			  (btn.style.opacity = '1'))
			: '';
	},
	checkTipPercent = () => {
		tipPercent.forEach(e => {
			e.addEventListener('click', () => {
				varPercent.value = '';
				e.classList.contains('clicked')
					? tipPercent.forEach(l => l.classList.remove('clicked'))
					: tipPercent.forEach(l => l.classList.remove('clicked')),
					e.classList.add('clicked');
			});
		});

		tipPercent.forEach(e =>
			e.classList.contains('clicked') ? (percent = parseFloat(e.value)) : ''
		);
	};

// | Event Listeners
btn.addEventListener('click', () => location.reload());

input.forEach(e => {
	e.addEventListener('input', () => {
		// To remove Alphabets and special numbers
		removeChar = e.value.replace(/[^0-9\.]/g, '');
		// To format Number to lacale string
		formatedNum = removeChar.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

		e.id === 'people'
			? // To remove dots
			  ((removeDot = formatedNum.replace(/\./g, '')), (e.value = removeDot))
			: (e.value = formatedNum);
	});
});

people.addEventListener('input', calc);

people.parentElement.addEventListener('click', () => clearInput());

// | Call Fnxs
checkTipPercent();
