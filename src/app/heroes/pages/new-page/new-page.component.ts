import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent {

  public heroForm = new FormGroup({

    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', {nonNullable: true}),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:          new FormControl(''),

  });

  public publishers = [
    {id: 'Dc Comics', desc: 'Dc - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'},
  ];

  constructor( private heroesService: HeroesService){}

  get currentHero(): Hero{
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit(): void{
    if(this.heroForm.invalid) return;
    if(this.currentHero.id){
      this.heroesService.updateHeroe(this.currentHero)
      .subscribe(hero => {
        //TODO: Mostrar Snackbar
      });
      return;
    }
    this.heroesService.addHeroe(this.currentHero)
      .subscribe(hero => {
        //TODO: mostar snackbar y navegar a /heroes/edit/hero.id
      })    
  }
}
