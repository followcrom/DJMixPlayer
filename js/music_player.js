const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');


// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}


// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}


// Skip Backward
function skipBackward(e) {
  const now = audio.currentTime;
  
  audio.currentTime = now - 10;
}

// Skip Forward
function skipForward(e) {
    const now = audio.currentTime;
    audio.currentTime = now + 10;
  }



// Update progress bar
function updateTrack(clicked) {
    var tracktitle = clicked.dataset.name;
    var tracktime = clicked.dataset.time;
    audio.currentTime = tracktime;
    playSong()
    // title.innerText = tracktitle;
  }



// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }
  
  // Set progress bar
  function setProgress(e) {
    const width = this.clientWidth 
    const clickX = e.offsetX;
    const duration = audio.duration;
  
    audio.currentTime = (clickX / width) * duration;
  }


  function seektimeupdate(){
    var nt = audio.currentTime;
    var curhours = Math.floor(audio.currentTime / 3600);
    var curmins = Math.floor(audio.currentTime / 60);
    var cursecs = Math.floor(audio.currentTime - curmins * 60);
    if (curhours < 10) { curhours = "0"+curhours; }
    if (curmins < 10) { curmins = "0"+curmins; }
    else if (curmins >= 60) { curmins -= 60; curmins = "0"+curmins; }
    if (cursecs < 10) { cursecs = "0"+cursecs; }
    if (nt >= 4200) { curmins = curmins-"0"; }
    currTime.innerHTML = curhours +':'+ curmins +':'+ cursecs;
  }




// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', skipBackward);
nextBtn.addEventListener('click', skipForward);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Time of song
audio.addEventListener('timeupdate', seektimeupdate);

// Song ends
audio.addEventListener('ended', pauseSong);

// Sync playlist data
const timings = document.querySelector('.timings')
const lines = timings.textContent.trim().split('\n')

timings.removeAttribute('style')
timings.innerText = ''

let syncData = []

lines.map((line, index) => {
    const [time, text] = line.trim().split('|')
    syncData.push({'start': time.trim(), 'text': text.trim()})
})

audio.addEventListener('timeupdate', () => {
    syncData.forEach((item) => {
        // console.log(item)
        if (audio.currentTime >= item.start) title.innerText = item.text
    })
})