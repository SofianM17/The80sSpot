var video = document.getElementById('myVideo');
var source = document.getElementById('video-Source');
var vid_sources = ['/Media/The Message by Grandmaster Flash.mp4', '/Media/Ghostbusters.mp4','/Media/Top Gun.mp4', '/Media/Knight Rider.mp4', '/Media/Celebration by Kool & The Gang.mp4', '/Media/Billy Jean By Michael Jackson.mp4', '/Media/Back To The Future.mp4', '/Media/Dont Stop Believin by Journey.mp4'];
var now_playing = document.getElementById('now-playing')
var powerbtn = document.getElementById('powerbtn');
var channelbtn = document.getElementById('channelbtn');
var btn_deg_count = 0;

now_playing.textContent = "NO SIGNAL";
now_playing.style.animation="flicker2 3s ease-in-out infinite";

var power = 0;
var channel_count = 0;


powerbtn.addEventListener('click', power_on, false);
channelbtn.addEventListener('click', change_channel, false);


function power_on() {
    var random_channel = Math.floor(Math.random() * vid_sources.length);
    power++;
    powerbtn.style.transitionProperty = "transform";
    powerbtn.style.transitionDuration = "350ms";
    powerbtn.style.transform = "rotate(90deg)";
    source.setAttribute('src', vid_sources[random_channel]);
    now_playing.textContent = "NOW PLAYING " + vid_sources[random_channel].substr(7, vid_sources[random_channel].indexOf('.')-7).toUpperCase();
    now_playing.style.animation = null;
    if(channel_count+random_channel < vid_sources.length-1){
        channel_count= random_channel+1;
    } else{
        channel_count = 0;
    }

    video.load();
    video.play();

    if (power > 1) {
        source.removeAttribute('src');
        power = 0;
        powerbtn.style.transform = null;
        now_playing.textContent = "NO SIGNAL";
        now_playing.style.animation="flicker2 3s ease-in-out infinite";
    }

    video.addEventListener('ended', change_channel, false);
}

function change_channel() {
    if(power){
        btn_deg_count += 10;
        now_playing.textContent = "NOW PLAYING " + vid_sources[channel_count].substr(7, vid_sources[channel_count].indexOf('.')-7).toUpperCase();
        source.setAttribute('src', vid_sources[channel_count]);
        if (channel_count < vid_sources.length-1) {
            channel_count++;

        } else {
            channel_count = 0;
        }
        channelbtn.style.transitionProperty = "transform";
        channelbtn.style.transitionDuration = "350ms";
        channelbtn.style.transform = "rotate(" + btn_deg_count + "deg)";
        video.pause();
        video.load();
        video.play();
    }
}