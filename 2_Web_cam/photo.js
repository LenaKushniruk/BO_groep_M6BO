const width = 640, height = 480,
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext('2d'),
    downloadButton = document.getElementById("downloadButton");

let video = null, isSetup = false;

Setup();

function Setup() {
    if (!isSetup) {
        canvas.width = width;
        canvas.height = height;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        canvas.style.background = 'white';

        video = document.getElementById('camera');
        document.addEventListener('click', TakePhoto);

        downloadButton.addEventListener('click', DownloadPhoto);

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then((stream) => {
                video.srcObject = stream;
                video.play();

            }).catch((error) => {
                console.error(`Error obtaining video stream:\n${error}`);
            });

        isSetup = true;
    }
}

function TakePhoto(e) {
    e.preventDefault();
    ctx.drawImage(video, 0, 0, width, height);
}

function DownloadPhoto() {
    const imageDataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imageDataURL;
    link.download = 'webcam_photo.png';

    // Simulate click on the link to trigger download
    link.click();
}
