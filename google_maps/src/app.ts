import axios from "axios";
import { Loader } from "@googlemaps/js-api-loader";

const GOOGLE_API_KEY = 'AIzaSyBMX-lPckqHEP1VCE2CWyhDRk48QugHLDc';

const loader = new Loader({
    apiKey: GOOGLE_API_KEY,
    version: "weekly",
});

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

type GoogleGeocodingResponse = {
    results: {geometry: {location: {lat: number, lng: number}}}[];
    status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler (event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
        .then(
            response => {
                if(response.data.status !== "OK"){
                    throw new Error('Could not fetch location ❌');
                }
                const coords = response.data.results[0].geometry.location;

                loader.load().then(() => {
                    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                        center: coords,
                        zoom: 8,
                    });

                    new google.maps.Marker({
                        position: coords,
                        map: map,
                    });
                });
            }
        )
        .catch(
            error => console.log(error)
        );
}
form.addEventListener('submit', searchAddressHandler);