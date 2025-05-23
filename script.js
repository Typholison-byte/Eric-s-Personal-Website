mapboxgl.accessToken = 'pk.eyJ1IjoibGFrZWVyaWUiLCJhIjoiY201cG5nbmptMDM0eDJxb215YXB0OGV0ZSJ9.yGNd3OQ2HqXdTSTuJcD9ug'; // Add default public map token from your Mapbox account 

const map = new mapboxgl.Map({
    container: 'my-map', // map container ID 
    style: 'mapbox://styles/mapbox/streets-v12', // style URL 
    center: [-79.5, 43.73], // starting position [lng, lat] 
    zoom: 9, // starting zoom level
});

// Add search control to map overlay
// Requires plugin as source in HTML
// map.addControl(
//     new MapboxGeocoder({
//         accessToken: mapboxgl.accessToken,
//         mapboxgl: mapboxgl,
//         countries: "ca" // Limit to Canada only
//     })
// );

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Add geolocate control to the map.
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true }, // uses the most accuarate location available form user's device
    trackUserLocation: true //Shows users location on map (with permission from user)
}));

// Add fullscreen option to the map
map.addControl(new mapboxgl.FullscreenControl());

// Create geocoder as a variable (and remove previous geocoder)
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    countries: "ca"
    // province: "ON"
});

// // Append geocoder variable to goeocoder HTML div to position on page
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

map.on('load', () => {
    // Add a data source from a GeoJSON file 
    map.addSource('GO-Stations', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/Typholison-byte/Eric-s-Personal-Website/refs/heads/main/Data/GO%20Stations.geojson' 
    });

    // Add the layer to display the stations
    map.addLayer({
        'id': 'GO-Stations-layer',
        'type': 'circle',
        'source': 'GO-Stations',
        'paint': {
            'circle-radius': 6,
            'circle-color': 'green',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        }
    });

    // Pop-ups for GO Stations
    map.on('click', 'GO-Stations-layer', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<b>GO-Station:</b> ${e.features[0].properties.name}`)
            .addTo(map);
    });

    // Add a data source from a GeoJSON file
    map.addSource('GGR472_Subway_Lines', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/Typholison-byte/Eric-s-Personal-Website/refs/heads/main/Data/GGR472_Subway_Lines.geojson'
    });

    // Adding layer for subway lines
    map.addLayer({
        id: 'Subway-Lines-layer',
        type: 'line',
        source: 'GGR472_Subway_Lines',
        layout: {
            'line-join': 'round',
            'line-cap': 'round'
        },
        paint: {
            'line-color': 'turquoise',
            'line-width': 3,
            'line-opacity': 0.8
        }
    });

    // Pop-ups for Subway Lines
    map.on('click', 'Subway-Lines-layer', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<b>Subway Line:</b> ${e.features[0].properties.name}`)
            .addTo(map);
    });

    // Toggle layers button
    // document.getElementById('toggle-subway').addEventListener('click', () => {
    //     const visibility = map.getLayoutProperty('Subway-Lines-layer', 'visibility');
    //     map.setLayoutProperty('Subway-Lines-layer', 'visibility', visibility === 'visible' ? 'none' : 'visible');
    // });


    // Airports lines
    // map.addSource('Airports', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/Typholison-byte/Eric-s-Personal-Website/refs/heads/main/Data/airports.geojson'
    // });

    // map.addLayer({
    //     id: 'Airports-layer',
    //     type: 'line',
    //     source: 'Airports',
    //     layout: {
    //         'line-join': 'round',
    //         'line-cap': 'round'
    //     },
    //     paint: {
    //         'line-color': 'purple',
    //         'line-width': 3,
    //         'line-opacity': 0.8
    //     }
    // });

    // Attempting Polygon fill
    // map.addSource('Airports', {
    //     type: 'geojson',
    //     data: 'https://raw.githubusercontent.com/Typholison-byte/Eric-s-Personal-Website/refs/heads/main/Data/airports.geojson'
    // });

    // map.addLayer({
    //     id: 'Airports-layer', // Unique layer ID
    //     type: 'fill',  // Must be 'fill' for polygons
    //     source: 'Airports', // Corrected source ID
    //     paint: {
    //         'fill-color': 'purple',
    //         'fill-opacity': 0.5, // Adjusted opacity for visibility
    //         'fill-outline-color': '#000000' // Black outline for contrast
    //     }
    // });

    // Airports of Ontario
    map.addSource('Airports1', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/Typholison-byte/Eric-s-Personal-Website/refs/heads/main/Data/airports1.geojson'
    });

    map.addLayer({
        id: 'Airports1-layer', // Unique layer ID
        type: 'fill',  // Must be 'fill' for polygons
        source: 'Airports1', // Corrected source ID
        paint: {
            'fill-color': 'purple',
            'fill-opacity': 0.6, // Adjusted opacity for visibility
            'fill-outline-color': '#000000' // Black outline for contrast
        }
    });

    // Pop-ups for Airports
    map.on('click', 'Airports1-layer', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<b>Airport:</b> ${e.features[0].properties.NAME}`)
            .addTo(map);
    });


    // VIA Rail Ontario Stations
    map.addSource('VIA', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/Typholison-byte/Eric-s-Personal-Website/refs/heads/main/Data/VIA_Rail_Ontario.geojson'
    });
    
    map.addLayer({
        id: 'VIA-layer',
        type: 'circle',
        source: 'VIA',
        paint: {
            'circle-radius': 6,
            'circle-color': 'orange',
            'circle-stroke-width': 1,
            'circle-stroke-color': '#000000'
        }
    });

    // Pop-ups for VIA Rail
    map.on('click', 'VIA-layer', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<b>VIA Rail Station:</b> ${e.features[0].properties.name}`)
            .addTo(map)
    });

});



/*--------------------------------------------------------------------
CREATE LEGEND IN JAVASCRIPT
--------------------------------------------------------------------*/
//Declare array variables for labels and colours
const legendlabels = [
    'GO Stations',
    'Subway Lines',
    'Airports',
    'VIA',
];

const legendcolours = [
    'green',
    'blue',
    'purple',
    'orange'
];

//Declare legend variable 
const legend = document.getElementById('popn-legend');

const layers = [
    { id: 'GO-Stations-layer', name: 'GO Stations', color: 'green' },
    { id: 'Subway-Lines-layer', name: 'Subway Lines', color: 'blue' },
    { id: 'Airports1-layer', name: 'Airports1', color: 'purple' },
    { id: 'VIA-layer', name: 'VIA', color: 'orange' }

];

layers.forEach(layer => {
    const button = document.createElement('button');
    button.innerHTML = layer.name;
    button.style.backgroundColor = layer.color;
    button.style.color = 'white';
    button.style.margin = '5px';
    button.style.border = 'none';
    button.style.padding = '5px 10px';
    button.style.cursor = 'pointer';

    let visible = true;
    button.addEventListener('click', () => {
        visible = !visible;
        map.setLayoutProperty(layer.id, 'visibility', visible ? 'visible' : 'none');
        button.style.opacity = visible ? '1' : '0.5';
    });

    legend.appendChild(button);
});

// Toggle legend visibility
document.getElementById('legendcheck').addEventListener('change', (e) => {
    legend.style.display = e.target.checked ? 'block' : 'none';
});

// Dropdown filter to show specific transportation type
document.getElementById("boundary").addEventListener('change', (e) => {
    const selectedValue = e.target.value;

    map.setLayoutProperty('GO-Stations-layer', 'visibility', selectedValue === 'Ontario' ? 'visible' : 'none');
    map.setLayoutProperty('Subway-Lines-layer', 'visibility', selectedValue === 'Ontario' ? 'visible' : 'none');
    map.setLayoutProperty('Airports1-layer', 'visibility', selectedValue === 'Ontario' ? 'visible' : 'none');
    map.setLayoutProperty('VIA-layer', 'visibility', selectedValue === 'Ontario' ? 'visible' : 'none');
});

//For each layer create a block to put the colour and label in
legendlabels.forEach((label, i) => {
    const colour = legendcolours[i];

    const item = document.createElement('div'); //each layer gets a 'row' - this isn't in the legend yet, we do this later
    const key = document.createElement('span'); //add a 'key' to the row. A key will be the colour circle

    key.className = 'legend-key'; //the key will take on the shape and style properties defined in css
    key.style.backgroundColor = colour; // the background color is retreived from teh layers array

    const value = document.createElement('span'); //add a value variable to the 'row' in the legend
    value.innerHTML = `${label}`; //give the value variable text based on the label

    item.appendChild(key); //add the key (colour cirlce) to the legend row
    item.appendChild(value); //add the value to the legend row

    legend.appendChild(item); //add row to the legend
});