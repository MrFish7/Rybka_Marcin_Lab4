let warsaw, map, marker, webSocket
let players = {}
let nick = '1'

function getLocalization() {
    navigator.geolocation.getCurrentPosition(Permission, Deny)
}

//Zgoda na pobranie lokalizacji
function Permission(data) {
    let coords = {
        lat: data.coords.latitude,
        lng: data.coords.longitude
    }
    map.setCenter(coords)
    marker.setPosition(coords)
}

//Odmowa pobrania lokalizacji
function Deny(err) {
    console.log(err)
}

// Inicjalizacja mapy
function initMap() {
    warsaw = {
        lat: 52.229,
        lng: 21.012
    };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: warsaw,
    });

    marker = new google.maps.Marker({
        position: warsaw,
        map: map,
        animation: google.maps.Animation.DROP
    });
    getLocalization()
    startWebSocket()
    addKeyboardEvents()
}

function addKeyboardEvents() {
    window.addEventListener('keydown', moveMarker)
}

// poruszanie markerem
function moveMarker(ev) {
    let lat = marker.getPosition().lat()
    let lng = marker.getPosition().lng()

    switch (ev.code) {
        case 'ArrowUp':
            lat += 0.1
            break;
        case 'ArrowDown':
            lat -= 0.1
            break;
        case 'ArrowLeft':
            lng -= 0.1
            break;
        case 'ArrowRight':
            lng += 0.1
            break;
    }
    let position = {
        lat,
        lng
    }
    let wsData = {
        lat: lat,
        lng: lng,
        id: nick
    }
    marker.setPosition(position)
    webSocket.send(JSON.stringify(wsData))
}

function startWebSocket() {
    let url = 'ws://91.121.6.192:8010'
    webSocket = new WebSocket(url)
    webSocket.addEventListener('open', onWSOpen)
    webSocket.addEventListener('message', onWSMessage)
}

function onWSOpen(data) {
    console.log(data)
}

function onWSMessage(e) {
    let data = JSON.parse(e.data)

    if (!players['user' + data.id]) {
        players['user' + data.id] = new google.maps.Marker({
            position: {
                lat: data.lat,
                lng: data.lng
            },
            map: map,
            animation: google.maps.Animation.DROP
        })
    } else {
        players['user' + data.id].setPosition({
            lat: data.lat,
            lng: data.lng
        })
    }
}
