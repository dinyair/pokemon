import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'



@Injectable()
export class PokemonService {

  apiUrl = 'https://pokeapi.co/api/v2/'

  constructor(private http: HttpClient, private router: Router) {}

  public getPokemons(limit: number) {
    return this.http.get(this.apiUrl + `pokemon?limit=${limit}`);
 }
 
  public getPokeomDetails(id:number) {
    return this.http.get(this.apiUrl + `pokemon/` + id);
 }

  public getSpecies(id:number) {
    return this.http.get(this.apiUrl + `pokemon-species/` + id);
  }
  public getPokemonEvolutionChain(id:number) {
    return this.http.get(this.apiUrl + `evolution-chain/` + id);
  }

  public getAbility(url:string) {
    var id:any = url.split('ability/')[1].split('/')[0];
    return this.http.get(this.apiUrl + `ability/` + id)
  }

}
