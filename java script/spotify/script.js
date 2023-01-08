console.log("Welcome to spotify");

let songIndex=0;
let audioElement = new Audio('audio1.mp3');
let masterplay=document.getElementById('masterplay');
let myprogressbar=document.getElementById('myprogressbar');
let mastersongname=document.getElementById('masterSongName');
let gif=document.getElementById('gif');
let songItems=Array.from(document.getElementsByClassName('songItem'));
//audioElement.play();
let songs=[
    {songName:"starboy",filePath:"audio1.mp3",coverPath:"The_Weeknd_-_Starboy.png"},
    {songName:"As it was",filePath:"audio2.mp3",coverPath:"as it was.jpg"},
    {songName:"Shape of you",filePath:"audio3.mp3",coverPath:"shapeofyou.jpg"},
    {songName:"I don't care",filePath:"audio4.mp3",coverPath:"i dont care.jpg"},
]

songItems.forEach((element,i) => {
         // console.log(element,i);
          element.getElementsByTagName("img")[0].src=songs[i].coverPath;
          element.getElementsByClassName("songname")[0].innerText=songs[i].songName;
})


//handle play/pause
masterplay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})


//listen to event
audioElement.addEventListener('timeupdate',()=>{
//    console.log(audioElement.duration);
    //update skeebar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value=progress;
})

myprogressbar.addEventListener('change',()=>{
     audioElement.currentTime=myprogressbar.value*audioElement.duration/100;
})

  const makeallplay=()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
            // console.log(element);   
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
    })
  }

  Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeallplay();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `audio${songIndex+1}.mp3`;
        mastersongname.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=3){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `audio${songIndex+1}.mp3`;
    mastersongname.innerText=songs[songIndex].songName;
     audioElement.currentTime = 0;
     audioElement.play();
     masterplay.classList.remove('fa-play-circle');
     masterplay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex>=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `audio${songIndex+1}.mp3`;
    mastersongname.innerText=songs[songIndex].songName;
     audioElement.currentTime = 0;
     audioElement.play();
     masterplay.classList.remove('fa-play-circle');
     masterplay.classList.add('fa-pause-circle');
})