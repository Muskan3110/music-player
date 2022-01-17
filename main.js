
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// these are used globally
let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
{
	name: "Peaches",
	artist: "Justin Bieber",
	image: "https://qqcdnpictest.mxplay.com/seo/takatak/webstories/60af92ff988b0d5c2943e864_poster_kp6vvbrxwp2xayqgewl",
	path:  "https://cdn.trendybeatz.com/audio/Justin-Bieber-Peaches-Ft-Daniel-Caesar-Giveon-New-Song-(TrendyBeatz.com).mp3"
},
{
	name: "Butter",
	artist: "BTS",
	image: "https://upload.wikimedia.org/wikipedia/en/d/db/BTS_-_Butter.png",
	path: "https://cdn.trendybeatz.com/audio/BTS-Butter-(TrendyBeatz.com).mp3"
},
{
	name: "Stay",
	artist: "The Kid Laroi",
	image: "https://images.hungama.com/c/1/b84/665/69096287/69096287_300x300.jpg",
	path: "https://cdn.trendybeatz.com/audio/The-Kid-Laroi-Ft-Justin-Bieber-Stay-New-Song-(TrendyBeatz.com).mp3",
},
];

function loadTrack(track_index) {
    // to reset the values
    clearInterval(updateTimer);
    resetValues();
    //updating details w.r.t current track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;
  
    updateTimer = setInterval(seekUpdate, 1000); //to update 00:00 which is on both side
    // move to next track when the current track ended
    curr_track.addEventListener("ended", nextTrack);
   
  }
    // Function to reset all values to their default
    function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }
  loadTrack(track_index);
   //   configuring buttons
   function playpauseTrack(){
       if(!isPlaying) playTrack();
       else
       pauseTrack();
   }
   function playTrack(){
       curr_track.play();
       isPlaying=true;
       //    to change the play btn to pause
       playpause_btn.innerHTML='<i class="fa fa-pause-circle fa-5x"></i>';
   }
   function pauseTrack(){
    curr_track.pause();
    isPlaying=false;
    //    to change the pause btn to play
    playpause_btn.innerHTML='<i class="fa fa-play-circle fa-5x"></i>';
   }
   function nextTrack(){
    //    in case playing track is last go back to first track
    if(track_index<track_list.length-1)
        track_index+=1;
        else track_index=0;

     // load and play new track
     loadTrack(track_index);
     playTrack();
   }
   function prevTrack(){
    //    go to last track in case the track is first one in list
     if(track_index>0)
     track_index-=1;
     else track_index=track_list.length-1;

     loadTrack(track_index);
     playTrack();
   }
   //when we move the slider we will calculate the relative 
   // position of the track using by calculating % of the slider
   function seekTo(){
        seekto = curr_track.duration *(seek_slider.value/100);
        curr_track.currentTime = seekto;
   }
   function setVolume(){
       curr_track.volume= volume_slider.value/100;
   }
   function seekUpdate() {
    let seekPosition = 0;
    
    // checking the duration of current track
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seek_slider.value = seekPosition;

      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
     
     if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

       curr_time.textContent = currentMinutes + ":" + currentSeconds;
       total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

  
