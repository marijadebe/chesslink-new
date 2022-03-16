import React from 'react';

function VideoFeed() {
    return(
        <>
        {/*me*/}
        <video playsInline muted ref={'myVideoFeed'} autoPlay />
        {/*him*/}
        <video playsInline ref={'UserVideoFeed'} autoPlay />
        </>
    );
}

export default VideoFeed;