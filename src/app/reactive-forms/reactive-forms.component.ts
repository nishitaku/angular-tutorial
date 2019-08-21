import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {
  animals = ['Dog', 'Cat', 'Bird', 'Monkey'];
  selectedAnimal: string;
  heroes: Hero[];
  selectedHero: Hero;
  selectedHeroControl = new FormControl();

  compareHero(hero1: Hero, hero2: Hero): boolean {
    return hero1.id === hero2.id;
  }

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    this.heroes = await this.getHeroes();
    this.selectedHeroControl = new FormControl(this.heroes[0]);
    this.selectedHeroControl.valueChanges.subscribe(hero => {
      console.log(`Reactive Selected Hero: ${hero.name}`);
    });
  }

  onChangeAnimal(value) {
    console.log(`Selected Animal: ${this.selectedAnimal}`);
  }

  onClickAddAnimal(name: string) {
    name = name.trim();
    if (!name) {
      return;
    }
    this.animals.push(name);
    this.selectedAnimal = name;
  }

  onClickUpdateAnimal(name: string) {
    name = name.trim();
    if (!name) {
      return;
    }
    const newAnimals = this.animals.map(animal => {
      if (animal === this.selectedAnimal) {
        return name;
      } else {
        return animal;
      }
    });
    this.animals = newAnimals;
    this.selectedAnimal = name;
  }

  onChangeHero(value) {
    console.log(`Selected Hero: ${this.selectedHero.name}`);
  }

  async onClickAddHero(name: string) {
    name = name.trim();
    if (!name) {
      return;
    }
    const addHero = await this.heroService
      .addHero({ name } as Hero)
      .toPromise();
    this.heroes = await this.getHeroes();
    // これだとうまくいかない
    // heroServiceから取得したインスタンスとaddHeroのインスタンスが異なるため
    // this.selectedHero = addHero;
    // こうするしかないが、更新のときに難しい
    this.selectedHero = this.heroes[this.heroes.length - 1];

    // ただPushするだけの場合はこれでもいける
    // this.heroes.push(addHero);
    // this.selectedHero = addHero;
  }

  async onClickUpdateHero(name: string) {
    name = name.trim();
    if (!name) {
      return;
    }
    const updateHero = new Hero(this.selectedHero.id, name);
    const updatedHero = await this.heroService
      .updateHero(updateHero)
      .toPromise();
    this.heroes = await this.getHeroes();
    this.selectedHero = updatedHero;
  }

  async onClickAddReactiveHero(name: string) {
    name = name.trim();
    if (!name) {
      return;
    }
    const addHero = await this.heroService
      .addHero({ name } as Hero)
      .toPromise();
    this.heroes = await this.getHeroes();
    this.selectedHeroControl.setValue(addHero);
  }

  async onClickUpdateReactiveHero(name: string) {
    name = name.trim();
    if (!name) {
      return;
    }
    const updateHero = new Hero(this.selectedHeroControl.value.id, name);
    const updatedHero = await this.heroService
      .updateHero(updateHero)
      .toPromise();
    this.heroes = await this.getHeroes();
    // 更新はselectedHeroControlも自動的に更新される
  }

  private async getHeroes(): Promise<Hero[]> {
    const heroes = await this.heroService.getHeroes().toPromise();
    return heroes;
  }
}
