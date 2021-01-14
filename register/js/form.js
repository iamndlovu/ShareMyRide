'use strict';
//get formGroups
const formGroups = document.querySelectorAll('.form-group');

//getButtons(next, prev)
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

//containers: left, right, current
let left = [], right = [], current;

// hide all formGroups and add to left container
formGroups.forEach(formGroup => {
  formGroup.classList.add('right');
  right.push(formGroup);
});

current = right.shift();

//showCurrentFormGroup()
const showCurrent = () => {
  current.classList.remove('left');
  current.classList.remove('right');
  current.classList.add('current');

  let input = document.querySelector('.current input') || document.querySelector('.current button');
  input.focus();
};

showCurrent();

const handleNextButtonClick = () => {
  let nextFormGroup = right.shift();
  current.classList.remove('current');
  current.classList.add('left');
  left.push(current);
  current = nextFormGroup;
  showCurrent();
};

const handlePrevButtonClick = () => {
  if (left.length < 1) return;

  let prevFormGroup = left.pop();
  current.classList.remove('current');
  current.classList.add('right');
  right.unshift(current);
  current = prevFormGroup;
  showCurrent();
};

//validate current input
const validate = input => {
  const value = input.value;
  const type = input.type;
  const length = value.length;

  if (length == 0) return false;

  else if (type == 'email') {
    if (
      value.indexOf('@') < 1 ||
      value.indexOf('@') > length - 2 ||
      value.indexOf('@') !== value.lastIndexOf('@')
    ) return false;
  }
  console.log(value.lastIndexOf('7'));
  return true;
};

//handleFormControlClick
const handleFormControlClick = (e) => {
  let targetElement = e.target;
  switch (targetElement) {
    case nextButton:
      if (right.length < 1) return;
      if (validate(document.querySelector('.current input')))
        handleNextButtonClick();
      //console.log('next');
      break;

    case prevButton:
      handlePrevButtonClick();
      //console.log('Prev')
      break;
  
    default:
      return;
  }
}


//listenForClick(nextButton)
  //validate(current)
  //decision ? showNext : showCurrent

//listenForClick(prevButton)

document.querySelector('.form-controls').addEventListener('click', handleFormControlClick);

//valideAndSubmit(form)