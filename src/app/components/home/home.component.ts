import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { DynaServiceService } from './../../services/dyna-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /* Definicion de Variables */
  public dataArray: any[];
  public avg = 0;
  public numSensor: number;
  public desde: string;
  public hasta: string; 
  public canvas: any;
  public ctx: any; 
  public chartArray: any[] = [];
  public labelArray: any[] = [];
  private myChart: Chart;


  // Inyectamos el servicio a ser ocupado.
  constructor(public dynaService: DynaServiceService ) { }

  ngOnInit(): void { }

  /* METODO PARA MANEJAR CAMBIOS DE SENSOR Y FECHAS FROM & TO */
  searchSensor(): void {    
    if (this.numSensor !== undefined) { // Valimos si existe un sensor seleccionado.
      if (this.desde !== '' && this.hasta !== '') {
        this.dynaService.getData(this.numSensor, this.desde, this.hasta).subscribe((resp: any) => {
          this.dataArray = resp.indexDetail;
          this.avg = resp.sum;
          if (this.dataArray.length > 0){ // Validamos si se recupera información del sensor seleccionado.
            if (this.chartArray.length > 0 && this.labelArray.length > 0) { // Validamos que no queden datos de alguna consulta anterior.
              this.chartArray = [];
              this.labelArray = [];
              this.dataArray.forEach(e => {
                this.chartArray.push(e.magnitude);
                this.labelArray.push(e.from);
              });
            }else{
              this.dataArray.forEach(e => {
                this.chartArray.push(e.magnitude);
                this.labelArray.push(e.from);
              });
            }
            this.chartGenerate(); // Llamamos el metodo para generar el grafico.
          }else{
            this.cleanMethod(); // Limpiamos variables para evitar errores.
          }
        });
      }
    }else{
      console.log('Seleccione Parametros'); // Indicamos que faltan parametro o que no existen datos.
      this.cleanMethod();
    }
  }

  /* METODO PARA GENERAR GRAFICA */
  chartGenerate(): void {
    this.canvas = document.getElementById('myChart');
    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext('2d');
    }
    this.myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.labelArray,
        datasets: [{
          label: 'Reporte',
          data: this.chartArray,
          borderWidth: 1,
          borderColor: 'orange',
          backgroundColor: 'transparent',
          lineTension: 0,
          fill: false
        }]
      },
      options: {
        responsive: true
      },
    });
  }

  /* METODO PARA LIMPIAR VARIABLES */
  cleanMethod(): void {
    this.dataArray = [];
    this.avg = 0;
    this.chartArray = [];
    this.labelArray = [];
    this.myChart.clear();
    this.myChart.destroy();
  }
}
