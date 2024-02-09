import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormdialogoemComponent } from '../formdialogoem/formdialogoem.component';
import { DialogoFormem } from '../dialogo-formem'; 

@Component({
  selector: 'app-formulario-embarcacion',
  templateUrl: './formulario-embarcacion.component.html',
  styleUrls: ['./formulario-embarcacion.component.css']
})
export class FormularioEmbarcacionComponent implements OnInit {
  mostrarVacio: boolean = false;
  modoVista: boolean = true;
  modoEdicion: boolean = false;
  embarcacionSeleccionada: any = { datos_tecnicos: '' };
  imagenSeleccionada: string | ArrayBuffer | null = null;
 

  constructor(public dialog: MatDialog ,private sharedDataService: SharedDataService, private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef, private ngZone: NgZone) { }



  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const tipo = params['tipo'];
      this.mostrarVacio = tipo === 'vacio';
      // this.esNuevo = this.mostrarVacio;

      this.modoEdicion = !this.mostrarVacio;
    });

    console.log("Intentando obtener datos del servicio...");

    this.sharedDataService.getData("embarcacionSeleccionada").subscribe(data => {
      console.log("Datos obtenidos del servicio:", data);
      if (data) {
        // Solo asigna a embarcacionSeleccionada si no es un formulario vacío
        if (!this.mostrarVacio) {
          this.embarcacionSeleccionada = data;
          console.log("Información de la embarcación seleccionada:", this.embarcacionSeleccionada.matricula);
        }
      } else {
        console.warn("No se obtuvieron datos del servicio");
      }
    });

    // this.embarcacionVacia = { datos_tecnicos: '' };
  }

  onFileSelected(event: any) :void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload =  () =>{
        this.imagenSeleccionada = reader.result;
        console.log("Imagen seleccionada:", this.imagenSeleccionada);
      };
      reader.readAsDataURL(file);
    }
  }

  activarModoEdicion() {
    // this.modoEdicion = true;
    this.modoVista = false;
  }
  eliminar(): void {
    const dialogRef = this.dialog.open(FormdialogoemComponent, {
      data: {
        matricula: this.embarcacionSeleccionada.matricula,
        origen: this.embarcacionSeleccionada.origen,
        titular: this.embarcacionSeleccionada.titular,
        nombre: this.embarcacionSeleccionada.nombre
       
      } as DialogoFormem
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



