export function getImageUrl(id: number) {
    return `../assets/images/pokemons/${id}.svg`;
  };

  export function getUrlItem(name: string) {
    return `assets/images/items/${name}.svg`;
  };

  export function  getUrlType(name: string) {
    return `../assets/images/types/${name}.svg`;
  }

  export function getPokemonId(pokemons:any[], name: string) {
    return pokemons.indexOf(name) + 1;
  };

  export function reloadWith(pokemons:any[], id: number) {
    window.location.href = pokemons[id - 1]
  };


