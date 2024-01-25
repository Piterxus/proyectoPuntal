import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boton',
  templateUrl: './boton.component.html',
  styleUrls: ['./boton.component.css'],
})
export class BotonComponent {
  @Input() label: string = ' ';
  @Input() route: string = '/';
  @Input() claseDesbloqueado: string = 'botonA';
  @Input() claseBloqueado: string = 'botonB';
  @Input() imageUrlDesbloqueado: string | undefined;
  @Input() imageUrlBloqueado: string | undefined;

  bloqueado = false;
  constructor(private router: Router) {}

  navigate(): void {
    if (!this.bloqueado) {
      this.bloqueado = true; 
      console.log( this.bloqueado);
      console.log(this.route);
      this.router.navigate([this.route]).then(() => {
        this.bloqueado = false;    
        console.log( this.bloqueado);
        console.log(this.route);
        });
    }
    
  }
}
