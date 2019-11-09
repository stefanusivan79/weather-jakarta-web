import axios from "axios";
import Constants from "../util/Constants";

class WeatherService {

    getCurrentForecast = () => {

        return new Promise((resolve, reject) => {

            axios.get("http://dataservice.accuweather.com/forecasts/v1/daily/1day/" + Constants.LOCATION_KEY_JAKARTA + "?apikey=" + Constants.API_KEY + "&details=true&metric=true")
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    return Promise.reject("Failed to get data from API").then(resolve, reject);
                })

        });
    };

    getHourlyForecasts = () => {

        return new Promise((resolve, reject) => {
            axios.get("http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/" + Constants.LOCATION_KEY_JAKARTA + "?apikey=" + Constants.API_KEY + "&details=true&metric=true")
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    return Promise.reject("Failed to get data from API").then(resolve, reject);
                })
        });
    };

    getFiveDaysDailyForecasts = () => {

        return new Promise((resolve, reject) => {

            axios.get("http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + Constants.LOCATION_KEY_JAKARTA + "?apikey=" + Constants.API_KEY + "&details=true&metric=true")
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    return Promise.reject("Failed to get data from API").then(resolve, reject);
                })

        });
    };
}

export default WeatherService;
