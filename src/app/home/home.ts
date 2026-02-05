import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { CategorySelection } from '../category-selection/category-selection';
import { About } from '../about/about';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [Hero, CategorySelection, About],
    templateUrl: './home.html',
})
export class Home { }
