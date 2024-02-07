import { Component, OnInit, ChangeDetectorRef, NgZone, ViewChild } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormdialogoComponent } from '../formdialogo/formdialogo.component';
import { DilogoForm } from '../dilogo-form';
import { TablaTripulanteComponent } from '../tabla-tripulante/tabla-tripulante.component';
@Component({
  selector: 'app-formulario-transito',
  templateUrl: './formulario-transito.component.html',
  styleUrls: ['./formulario-transito.component.css'],
})
export class FormularioTransitoComponent implements OnInit {
  @ViewChild(TablaTripulanteComponent) tripulante!:TablaTripulanteComponent;
  mostrarVacio: boolean = false;
  modoVista: boolean = true;
  modoEdicion: boolean = false;
  transitoSeleccionada: any = { datos_tecnicos: '' };
  mostrar :string ='no';
  noMostrar :string='si';
  click:boolean=true;
  noClick:boolean=false;
  constructor(
    private sharedDataService: SharedDataService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    public dialog: MatDialog 
  ) {}
  //conecta en formulario para llmaar a la edicion del formulario y llamar a la edicion del componente de tripulante
  activarModoEdicionTripulante() {
    if (this.tripulante) {
      this.tripulante.anyadirTripulante();
      this.activarModoEdicion();
    } else {
      console.error('Error: TablaTripulanteComponent no está disponible.');
    }
  }
  // onMostrarFormulario(tipo: string) {
  //   console.log("onMostrarFormulario");
  //   this.mostrarVacio = tipo === 'vacio';
  //   this.esNuevo = this.mostrarVacio;
  //   this.modoEdicion = !this.mostrarVacio;
  //   this.modoVista = !this.modoEdicion;
  //   // Si es un formulario vacío, inicializa transitoSeleccionada con el objeto vacío
  //   if (this.mostrarVacio) {
  //     this.transitoSeleccionada = { datos_tecnicos: '' };
  //   }

  //   // Configura el modoVista en función del estado actual
  //   this.modoVista = !this.mostrarVacio && !this.modoEdicion;

  //   // Si es un formulario vacío, forzar modoVista a ser falso para que sea editable
  //   if (this.mostrarVacio || this.modoEdicion) {
  //     this.modoVista = false;
  //   }
  //   this.ngZone.run(() => {
  //     this.cdr.detectChanges();
  //   });
  // }



  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const tipo = params['tipo'];
      this.mostrarVacio = tipo === 'vacio';
      // this.esNuevo = this.mostrarVacio;

      this.modoEdicion = !this.mostrarVacio;
    });

    console.log('Intentando obtener datos del servicio...');

    this.sharedDataService.getData('transitoSeleccionada').subscribe((data) => {
      console.log('Datos obtenidos del servicio:', data);
      if (data) {
        // Solo asigna a transitoSeleccionada si no es un formulario vacío
        if (!this.mostrarVacio) {
          this.transitoSeleccionada = data;
          console.log(
            'Información de la embarcación seleccionada:',
            this.transitoSeleccionada.matricula
          );
        }
      } else {
        console.warn('No se obtuvieron datos del servicio');
      }
    });

    // this.transitoVacia = { datos_tecnicos: '' };
  }

  

  activarModoEdicion() {
    // this.modoEdicion = true;
    this.modoVista = false;
  }
  eliminar(): void {
    const dialogRef = this.dialog.open(FormdialogoComponent, {
      data: {
        embarcacion: this.transitoSeleccionada.embarcacion,
        patron: this.transitoSeleccionada.patron,
        instalacion: this.transitoSeleccionada.instalacion,
        pantalan: this.transitoSeleccionada.pantalan
       
      } as DilogoForm
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       
        console.log('Eliminación confirmada. Causa de baja:', result.causa);
      } else {
        
        console.log('Eliminación cancelada.');
      }
    });
}



}
