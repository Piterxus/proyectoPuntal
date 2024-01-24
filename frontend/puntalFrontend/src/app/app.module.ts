import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovilModule } from './movil/movil.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PlantillaModule } from './plantilla/plantilla.module';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MovilModule, DashboardModule, AppRoutingModule, PlantillaModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}