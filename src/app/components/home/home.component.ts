import { Component, OnInit } from '@angular/core';
import { DynaServiceService } from './../../services/dyna-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  public dataArray: any[];
  public avg = 0;
  public numSensor: number;
  public desde: string;
  public hasta: string;

  constructor(public dynaService: DynaServiceService ) { }

  ngOnInit(): void {

  }

  searchSensor(): void {    
    if (this.numSensor !== undefined) { // Undefined Validated
      if (this.desde !== '' && this.hasta !== '') {        
        this.dynaService.getData(this.numSensor, this.desde, this.hasta).subscribe((resp: any) => {       
          this.dataArray = resp.indexDetail;
          this.avg = resp.sum;
        });
      }
    }else{
      console.log('Seleccione Parametros');
      this.dataArray = [];
      this.avg = 0;
    }
  }
}
