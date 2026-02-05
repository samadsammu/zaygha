import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-selection',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-selection.html',
  styleUrl: './category-selection.css'
})
export class CategorySelection {
  categories = [
    { title: 'Jewellery', subtitle: 'Shine with grace', buttonText: 'Enter Jewellery', link: '/jewellery' },
    { title: 'Dresses', subtitle: 'Wear your elegance', buttonText: 'Enter Dresses', link: '/dresses' },
    { title: 'Crafts', subtitle: 'Art in every detail', buttonText: 'Enter Crafts', link: '/crafts' }
  ];
}
