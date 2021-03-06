import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from '../pokemon.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonComponent } from './pokemon/pokemon.component';


const appRoutes: Routes = [
  {
      path      : '**',
      component: PokemonsComponent 
  },
  

];


@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent,
    PokemonComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
