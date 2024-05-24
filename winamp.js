import Webamp from 'webamp';

window.onload = () => {
    new Webamp({
        initialTracks: [{
            metaData: {
                artist: "Artist Name",
                title: "Track Title",
            },
            url: "assets/music/track.mp3",
        }],
        initialSkin: {
            url: "assets/skins/classic.wsz",
        },
    }).renderWhenReady(document.getElementById('winamp'));
};
