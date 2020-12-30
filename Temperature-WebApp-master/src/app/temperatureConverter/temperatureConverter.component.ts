import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'temperature-converter',
  templateUrl: './temperatureConverter.component.html',
  styleUrls: ['./temperatureConverter.component.scss']
})

export class TemperatureConverter implements OnInit {
  
  public resfar: number;
  public rescel: number;

  ngOnInit() {
    // C = (F − 32) × 5/9
    // F = C*9/5 + 32
    this.resfar=0;
    this.rescel=0;

  }

  onChangeCel(event: any){
    this.resfar = event.target.value*9/5 + 32;
  }

  onChangeFar(event: any){
    this.rescel = (event.target.value - 32)*5/9;
  }


}