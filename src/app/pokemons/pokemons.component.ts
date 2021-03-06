import { Component, OnInit } from '@angular/core';
import {
  PokemonService
} from '../../pokemon.service'
import {getImageUrl, getPokemonId, reloadWith} from 'src/helpers/helpers';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit {
  pokemons:any[] = []
  getImageUrl = getImageUrl
  getPokemonId = getPokemonId
  reloadWith = reloadWith
  pokemonParam = window.location.pathname.split('/')[1]
  constructor(
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons(151).subscribe((pokemons:any) => {
      this.pokemons = pokemons.results?  pokemons.results.map((p:any)=> p.name) : []
    })

  }

}
