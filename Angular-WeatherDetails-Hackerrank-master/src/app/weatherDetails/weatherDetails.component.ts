import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "weather-details",
  templateUrl: "./weatherDetails.component.html",
  styleUrls: ["./weatherDetails.component.scss"],
})
export class WeatherDetails implements OnInit {
  @Input() weatherData: data[];

  city: string;
  errorMessage: string;
  output: any;

  ngOnInit() {}

  citychange(event: any) {
    this.city = event.target.value;
    if (this.city.trim() !== "") {
      this.output = this.weatherData.find((weather) => {
        return weather.name.toLowerCase() === this.city.toLowerCase();
      });
      if (this.output == undefined) {
        this.errorMessage = "No Results Found";
      }
    } else {
      this.errorMessage = undefined;
    }
  }
}

interface data {
  name: string;
  temperature: string;
  wind: string;
  humidity: string;
}
