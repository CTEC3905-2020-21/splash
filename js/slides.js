"use strict";

let queryParams = new URLSearchParams(window.location.search);
let currentSlide = queryParams.has('slide') ? queryParams.get('slide') : 0;
let filename = queryParams.has('file') ? queryParams.get('file') : 'index.md';
let slides;

loadSlides(filename).then(container => {
	slides = container.querySelectorAll('section');
	slides.item(0).classList.add('current');
	setSlide(currentSlide);
});



function setSlide(slide_number) {
	let previous = document.querySelector('#slideDeck section.current');
	let candidate = slides.item(slide_number);
	previous.classList.remove('current');
	candidate.classList.add('current');
	current.textContent = `${slide_number + 1} of ${slides.length}`;
	queryParams.set('slide', slide_number);
	window.history.replaceState({}, "", `/?${queryParams.toString()}`);
}

prev.addEventListener('click', prevSlide);
next.addEventListener('click', nextSlide);

function prevSlide(ev) {
	slideDeck.classList.add('backwards');
	currentSlide--;
	if(currentSlide < 0) { currentSlide = slides.length - 1; }
	setSlide(currentSlide);
}
function nextSlide(ev) {
	slideDeck.classList.remove('backwards');
	currentSlide++;
	if(currentSlide >= slides.length) { currentSlide = 0; }
	setSlide(currentSlide);
}

document.addEventListener('keydown', ev => {
	switch (ev.key) {
		case "ArrowRight":
			nextSlide();
			break;
		case "ArrowLeft":
			prevSlide();
			break;
	}
});
