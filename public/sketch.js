function setup() {
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(160, 120);
    document.getElementById('submit').addEventListener('click', event => {
    if ('geolocation' in navigator) {
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition( async position => {
            const color = document.getElementById('color').value;
            video.loadPixels();
            const image64 = video.canvas.toDataURL();
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            document.getElementById('latitude').textContent = lat;
            document.getElementById('longitude').textContent = lon;
            console.log(position.coords);

            const data = {lat, lon, color, image64};
            const options = {
                method: 'POST',
                //headers have a name a colon and a value
                headers: {
                    'Content-Type': 'application/json'
                 },
                body: JSON.stringify(data)
             };
            
            const response = await fetch('/api', options); 
            const json = await response.json();
            console.log(json);
            });
    } else {
        console.log('geolocation not available');
    }
});

};