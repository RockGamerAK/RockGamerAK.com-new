// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var vids = []

var modal = document.querySelector('dialog')
var aElement = document.querySelector('a[data-video]')
var vElement = document.getElementById('videos')

const cids = [
    'UCb35v6VAVFI8Q0aIpwPoW1g', 
    'UCLK0Lj3V864AbKfutfyztYA', 
    'UC8cV2cdrp1ccBWzoi1R-UwQ', 
]
var vids = []

let vidsNum = 9
let vidsPerChannel = vidsNum/cids.length

cids.forEach(function(cid, cI) {
    let channelURL = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${cid}`)
    let reqURL = `https://api.rss2json.com/v1/api.json?rss_url=${channelURL}`
    
    fetch(reqURL)
        .then(response => response.json())
        .then(result => {
            let links = []
            for (let i = 0; i < vidsPerChannel; i++) {
                if (!!result.items[i].link) {
                    links.push(result.items[i].link)
                }
            }
            links.forEach(function(link, i) {
                let id = link.substring(link.indexOf("=") + 1);
                vids.push(id)
            })
        })
        .catch(error => console.log('error', error));
})
for (let i = 0; i < vidsPerChannel; i++) {
    var player = document.createElement('div')
    player.id = `player${(i+1)}`
    vElement.appendChild(player)
}

var players = []

function onYouTubeIframeAPIReady() {
    vids.forEach(function(id, i) {
        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        var player
        player = new YT.Player(`player${i+1}`, {
            height: 'auto',
            width: 'auto',
            videoId: id,
            playerVars: {
                'playsinline': 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
        players.push(player)
    })
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    // event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        // setTimeout(function(e) {
        //     stopVideo(e)
        // }, 6000);
        done = true;
    }
}
function stopVideo(event) {
    event.target.stopVideo();
}
