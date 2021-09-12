const btn1 = document.querySelector('.button1');
const btn2 = document.querySelector('.button2');
const frontside = document.querySelector('.card__side--front');
const backside = document.querySelector('.card__side--back');
const button1 = document.querySelector('.js--btn-1');
const form1 = document.getElementById('signin-form');
const form2 = document.getElementById('signup-form');

var lowerCaseLetters = /[a-z]/g;
var upperCaseLetters = /[A-Z]/g;
var numbers = /[0-9]/g;

btn1.addEventListener('click', function (e) {
	e.preventDefault();
	frontside.classList.toggle('card__side--front-switch');
	backside.classList.toggle('card__side--back-switch');
});

btn2.addEventListener('click', function (e) {
	e.preventDefault();
	frontside.classList.toggle('card__side--front-switch');
	backside.classList.toggle('card__side--back-switch');
});

form1.addEventListener('submit', checkUser);

async function checkUser(e) {
	e.preventDefault();

	var name = document.querySelector('.name1');
	var password = document.querySelector('.password1');

	const result1 = await fetch('/form/signin', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: name.value,
			password: password.value,
		}),
	}).then((res) => res.json());

	if (result1.status == 'ok') {
		alert('You are logged in');
		window.location.href = '../face_detection/index.html';
	} else {
		alert('Error on login');
	}
}

form2.addEventListener('submit', addUser);

async function addUser(e) {
	e.preventDefault();
	var name = document.querySelector('.name2');
	var password = document.querySelector('.password2');
	var email = document.querySelector('.email');

	if (name.value.length == 0) {
		alert('Please fill in name');
	} else if (password.value.length == 0) {
		alert('Please fill in password');
	} else if (name.value.length == 0 && password.value.length == 0) {
		alert('Please fill in name and password');
	} else if (password.value.length < 8) {
		alert('Password should be greater than 8 characters');
	} else if (!password.value.match(numbers)) {
		alert('Password should include at least 1 number');
	} else if (!password.value.match(upperCaseLetters)) {
		alert('Password should include at least 1 upperCaseLetter');
	} else if (!password.value.match(lowerCaseLetters)) {
		alert('Password should include at least 1 lowerCaseLetter');
	} else if (!email.value.match('@')) {
		alert('Please add a valid email address');
	} else {
		alert('Your account has been created');
		const result2 = fetch('/form/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name.value,
				password: password.value,
				email: email.value,
			}),
		}).then((res) => res.json());

		window.location.href = '../face_detection/index.html';
	}
}
