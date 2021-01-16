"use strict";
//get formGroups
const formGroups = document.querySelectorAll(".form-group");

//getButtons(next, prev)
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".prev");

//containers: left, right, current
let left = [],
	right = [],
	current;

// hide all formGroups and add to left container
formGroups.forEach((formGroup) => {
	formGroup.classList.add("right");
	right.push(formGroup);
});

current = right.shift();

//showCurrentFormGroup()
const showCurrent = () => {
	current.classList.remove("left");
	current.classList.remove("right");
	current.classList.add("current");

	let input =
		document.querySelector(".current input") ||
		document.querySelector(".current button") ||
		document.querySelector(".current select");
	input.focus();
};

showCurrent();

const handleNextButtonClick = () => {
	let nextFormGroup = right.shift();
	current.classList.remove("current");
	current.classList.add("left");
	left.push(current);
	current = nextFormGroup;
	showCurrent();
};

const handlePrevButtonClick = () => {
	if (left.length < 1) return;

	let prevFormGroup = left.pop();
	current.classList.remove("current");
	current.classList.add("right");
	right.unshift(current);
	current = prevFormGroup;
	showCurrent();
};

//validate current input
const validate = (input) => {
	if(right.length < 1) return true;

	const parent = input.parentElement;
	const value = input.value;
	const type = input.type;
	const length = value.length;
	const errorContainer = document.createElement("p");
	errorContainer.className = "error";

	if (document.querySelector(".error"))
		parent.removeChild(document.querySelector(".error"));

	parent.appendChild(errorContainer);

	if (length === 0) {
		errorContainer.textContent = "This field is required";
		return false;
	} else if (type == "email") {
		if (
			value.indexOf("@") < 1 ||
			value.indexOf("@") > length - 2 ||
			value.indexOf("@") !== value.lastIndexOf("@")
		) {
			errorContainer.textContent = "Please provide a valid email address";
			return false;
		}
	} else if (type == "text") {
		if (length < 2) {
			errorContainer.textContent = "Uhmmm... this seems too short";
			return false;
		}
	}

	if (type == "date" && input.name == "date-of-birth") {
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth() + 1;
		const currentDay = currentDate.getDate();
		const userYear = Number(value.slice(0, 4));
		const userMonth = Number(value.slice(5, 7));
		const userDay = Number(value.slice(8));

		if (
			currentYear - userYear < 16 ||
			(currentYear - userYear == 16 && userMonth > currentMonth) ||
			(currentYear - userYear == 16 &&
				userMonth == currentMonth &&
				userDay > currentDay)
		) {
			errorContainer.textContent = "You must be at least 16 years to register";
			return false;
		} else if (currentYear - userYear > 100) {
			errorContainer.textContent = `Are you sure you are ${
				currentYear - userYear
			} years old🤔`;
			return false;
		}
	}

	if (type == 'password') {
		const confirmPassword = document.querySelector('#confirm-password');
		const confirmValue = confirmPassword.value;
		if (length < 8) {
			errorContainer.textContent = "Password must be at least 8 characters long";
			return false;
		}
		else if (value !== confirmValue) {
			errorContainer.textContent = "Passwords do not match";
			confirmPassword.classList.add('danger');
			return false;
		}
		confirmPassword.classList.remove('danger');
		confirmPassword.classList.add('success');
	}

	//TODO: validate(TOS, privacyPolicy)

	input.classList.remove("danger");
	input.classList.add("success");
	parent.removeChild(errorContainer);
	return true;
};

//handleFormControlClick
const handleFormControlClick = (e) => {
	const targetElement = e.target;
	const input = document.querySelector(".current input") ||
	              document.querySelector(".current select");
	switch (targetElement) {
		case nextButton:
			if (right.length < 1) return;
			if (validate(input)) handleNextButtonClick();
			else {
				input.classList.add("danger");
				input.classList.remove("success");
				input.focus();
			}
			//console.log('next');
			break;

		case prevButton:
			if (validate(input)) handlePrevButtonClick();
			else {
				input.classList.add("danger");
				input.classList.remove("success");
				input.focus();
			}
			//console.log('Prev')
			break;

		default:
			return;
	}
};

//listenForClick(nextButton)
//validate(current)
//decision ? showNext : showCurrent

//listenForClick(prevButton)

document
	.querySelector(".form-controls")
	.addEventListener("click", handleFormControlClick);

// TODO: handleSubmit(form)
	// TODO: onEnterClick(Next())
