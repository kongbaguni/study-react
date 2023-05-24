function WhammyProcess(captureData) {
    var videoBlob = Whammy.fromImageArray(captureData.map(frame => ({
    duration: frame.duration,
    image: frame.image
    }))).toBlob();

    var videoUrl = URL.createObjectURL(videoBlob);

    // 비디오 엘리먼트를 생성하고 소스를 설정합니다.
    var video = document.createElement('video');
    video.src = videoUrl;
    video.controls = true;

    // 비디오를 페이지에 추가합니다.
    document.body.appendChild(video);
}