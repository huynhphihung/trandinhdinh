const song = document.querySelector('#audio');
const playBtn = document.querySelector('.play-btn');
const songImage = document.querySelector('.song-img img');
const songTitle = document.querySelector('.song-title');
const songAuthor = document.querySelector('.song-auth');
const durationTime = document.querySelector('.duration');
const remainingTime = document.querySelector('.remaining');
const rangeBar = document.querySelector('.rangeBar');
const volume = document.querySelector('#volume');
const data = [
	{
		title: 'Nàng thơ (cover)',
		author: 'Trần Đình Đình',
		image: './trandinhdinh.jpeg',
	},
];
let isPlaying = true;

function playPauseSong() {
	if (isPlaying) {
		song.play();
		isPlaying = false;
		playBtn.innerHTML = `<ion-icon name="pause-outline"></ion-icon>`;
	} else {
		song.pause();
		isPlaying = true;
		playBtn.innerHTML = `<ion-icon name="play-outline"></ion-icon>`;
	}
}

function displayTimer() {
	const { duration, currentTime } = song;
	rangeBar.max = duration;
	rangeBar.value = currentTime;
	remainingTime.textContent = formatTimer(currentTime);
	if (!currentTime) {
		remainingTime.textContent = '00:00';
	}
	if (!duration) {
		durationTime.textContent = '00:00';
	} else {
		durationTime.textContent = formatTimer(duration);
	}
}

function formatTimer(number) {
	const min = Math.floor(number / 60);
	const sec = Math.floor(number - min * 60);
	return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
}

function render() {
	songImage.setAttribute('src', data[0].image);
	songTitle.innerHTML = data[0].title;
	songAuthor.innerHTML = data[0].author;
}

function handleChangeBar() {
	song.currentTime = rangeBar.value;
	console.log(song.currentTime);
}

function changeVol() {
	song.volume = volume.value / 100;
}

playBtn.addEventListener('click', playPauseSong);
song.addEventListener('ended', () => {
	song.pause();
	playBtn.innerHTML = `<ion-icon name="play-outline"></ion-icon>`;
});
rangeBar.addEventListener('change', handleChangeBar);
volume.addEventListener('change', changeVol);

render();
setInterval(displayTimer, 500);
