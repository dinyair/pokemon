import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router'
import {
  PokemonService
} from '../../pokemon.service'
import getColors from '../../helpers/getColors.js'
import getHappiness from 'src/helpers/getHappiness';
import {getImageUrl,getPokemonId, reloadWith, getUrlItem, getUrlType} from 'src/helpers/helpers';

const all_types = require('../../data/all_types.json');
const pokemons = require('../../data/pokemons.json');

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})


export class PokemonComponent implements OnInit {
  PokemonsObj: any[] = pokemons;
  getUrlItem = getUrlItem;
  getUrlType = getUrlType;
  getImageUrl = getImageUrl;
  getPokemonId = getPokemonId
  reloadWith = reloadWith
  private allTypesObj: any[] = all_types;
  abilityDescription: any = '';
  Object = Object;

  getHeldItem: any = (url: string) => {}
  loaded: boolean = false
  members: any = [];
  multiplier: boolean = false
  multipliers: any = []
  name: any = String(window.location.pathname).replace('/', '') ? String(window.location.pathname).replace('/', '') : ''//reloadWith(this.PokemonsObj,1)
  pokeindex = this.PokemonsObj.findIndex((pokemon: string) => pokemon === this.name) + 1
  pokemons: any[] = []
  imageUrl = getImageUrl(this.pokeindex)
  favouritesString: any = localStorage.favourites
  favourites = JSON.parse(this.favouritesString)
  recentsString: any = localStorage.recents
  recents: any = JSON.parse(this.recentsString)

  pokemon: any = [];
  typeUrls: any = []
  species: any = [];
  evolutionChain: any = []
  genere: string = ''
  description: string = ''
  happiness: any = ''
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,

  ) {}


  getAbility(url:string) {
    this.pokemonService.getAbility(url).subscribe((res:any) => {
      this.abilityDescription = res.effect_entries.filter((entry: any) => {
        if (entry.language.name === 'en') {
          return true;
        } else {
          return false;
        }
      })[0].short_effect;
    })

  }


  reloadHome() {
    window.location.href = '';
    window.location.reload(true);
}



  generateRandPokemon() {
    window.location.href = this.PokemonsObj[Math.floor(0 + Math.random() * 648)];
}

  up(string: any) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1).replace('-', ' ');
    }
  }

  getRarity = function (item: any) {
    var mean = 0;
    item.version_details.forEach((version: any) => {
      if (!mean) {
        mean = version.rarity
      }
      mean = (mean + version.rarity) / 2
    })
    return mean;
  }

  getMemebers(json: any) {
    var blob = JSON.stringify(json);
    var myRe = /pokemon-species\/(\d+)\//g;
    var currMatch;
    var members = [];
    while ((currMatch = myRe.exec(blob)) !== null) {
      members.push(currMatch[1]);
    }
    return members.reverse();
  }


  saveAndReload(pokemon: string) {
    var recents: any = localStorage.getItem('recents');
    if (recents) {
      recents = JSON.parse(recents);
      recents.unshift(pokemon);
      localStorage.setItem('recents', JSON.stringify(recents.slice(0, 6)));
    } else {
      localStorage.setItem('recents', JSON.stringify([pokemon]));
    }
    window.location.href = pokemon
  };

  toggleFav(pokemon: string) {
    console.log(pokemon);
    var favourites: any = localStorage.getItem('favourites');
    if (favourites) {
      let parsedObj: any[] = JSON.parse(favourites)
      favourites = new Set(parsedObj);
      if (favourites.has(pokemon)) {
        favourites.delete(pokemon);
      } else {
        if (parsedObj.length < 6) {
          favourites.add(pokemon);
        }
      }
      localStorage.setItem('favourites', JSON.stringify(Array.from(favourites)));
    } else {
      localStorage.setItem('favourites', JSON.stringify([]));
    }
  };

  isFav(pokemon: string) {
    var favourites: any = localStorage.getItem('favourites');
    if (favourites) {
      favourites = JSON.parse(favourites);
      if (favourites.indexOf(pokemon) > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      localStorage.setItem('favourites', JSON.stringify([]));
      return false;
    }
  };

  deleteFavourites() {
    localStorage.setItem('favourites', JSON.stringify([]));
  };

  getFavourites() {
    this.favourites = []
  };

  getPokemonName(id: number) {
    return this.PokemonsObj[id - 1];
  };


  getMultipliers(types: any) {
    var multipliers: any = {
      defense: {},
      attack: {}
    }
    types.forEach((type: any) => {
      var damage_relations = this.allTypesObj[type]
      var no_damage_to = damage_relations.attack.zero
      var no_damage_from = damage_relations.defense.zero
      var half_damage_to = damage_relations.attack.half
      var half_damage_from = damage_relations.defense.half
      var double_damage_to = damage_relations.attack.double
      var double_damage_from = damage_relations.defense.double
      no_damage_to.forEach((type: any) => {
        if (multipliers.attack.hasOwnProperty(type)) {
          multipliers.attack[type] = multipliers.attack[type] * 0
        } else {
          multipliers.attack[type] = 0
        }
      })
      no_damage_from.forEach((type: any) => {
        if (multipliers.defense.hasOwnProperty(type)) {
          multipliers.defense[type] = multipliers.defense[type] * 0
        } else {
          multipliers.defense[type] = 0
        }
      })
      half_damage_to.forEach((type: any) => {
        if (multipliers.attack.hasOwnProperty(type)) {
          multipliers.attack[type] = multipliers.attack[type] * 0.5
        } else {
          multipliers.attack[type] = 0.5
        }
      })
      half_damage_from.forEach((type: any) => {
        if (multipliers.defense.hasOwnProperty(type)) {
          multipliers.defense[type] = multipliers.defense[type] * 0.5
        } else {
          multipliers.defense[type] = 0.5
        }
      })
      double_damage_to.forEach((type: any) => {
        if (multipliers.attack.hasOwnProperty(type)) {
          multipliers.attack[type] = multipliers.attack[type] * 2
        } else {
          multipliers.attack[type] = 2
        }
      })
      double_damage_from.forEach((type: any) => {
        if (multipliers.defense.hasOwnProperty(type)) {
          multipliers.defense[type] = multipliers.defense[type] * 2
        } else {
          multipliers.defense[type] = 2
        }
      })
    })
    return multipliers
  }

  ngOnInit() {
    if (this.pokeindex) {
      getColors(this.pokeindex)
      this.pokemonService.getPokeomDetails(this.pokeindex).subscribe((pokemon: any) => {
        this.pokemon = pokemon
        this.typeUrls = pokemon && pokemon.types ? pokemon.types.map((type: any) => {
          return 'assets/images/types/' + type.type.name + '.svg';
        }) : []
        this.happiness = getHappiness(pokemon.base_happiness)
        let types = pokemon.types.map((type: any) => {
          return type.type.name
        })
        this.multipliers = this.getMultipliers(types);
        console.log('multipliers', this.multipliers)
        this.pokemonService.getSpecies(this.pokeindex).subscribe((species: any) => {
          this.genere = species.genera.filter(function (text: any) {
            if (text.language.name === 'en') {
              return true;
            } else {
              return false;
            }
          })[0].genus;

          this.description = species.flavor_text_entries.filter(function (text: any) {
            if (text.language.name === 'en') {
              return true;
            } else {
              return false;
            }
          })[0].flavor_text.replace('\f', '\n').replace(/\u00ad\n/g, '').replace(/\u00ad/g, '').replace(' -\n', ' - ').replace('-\n', '-').replace('\n', ' ');

          this.species = species
          var evolutionChainId: any = species.evolution_chain.url.split('evolution-chain/')[1].split('/')[0];
          if (evolutionChainId) {
            this.pokemonService.getPokemonEvolutionChain(evolutionChainId).subscribe(evolutionChain => {
              this.evolutionChain =
                this.members = this.getMemebers(evolutionChain);

            });
          }

        });
        this.loaded = true
      });


    }



  }
}
