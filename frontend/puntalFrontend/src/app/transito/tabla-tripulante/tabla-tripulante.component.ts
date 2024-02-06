import { Component ,Input,OnInit} from '@angular/core';
import { datos } from 'src/resources/datos';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-tabla-tripulante',
  templateUrl: './tabla-tripulante.component.html',
  styleUrls: ['./tabla-tripulante.component.css'],
  
})
export class TablaTripulanteComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  datos = datos.tripulantes;
constructor() { 
  console.log(this.datos);

}
mostrarDatos:boolean =true;
@Input() mostrar:string='';
crearTripulante :boolean=false;
anyadirTripulante()
{
  this.crearTripulante=true;
}
ngOnInit(): void {
  if(this.mostrar=='si')
  {
    this.mostrarDatos=true;
  }
 else
 {
  this.mostrarDatos=false;
 }
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    processing: true,
    language: {
      url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
    },
  };
}
}
