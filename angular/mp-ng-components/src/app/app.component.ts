import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCarouselComponent, MpCardData } from '../components/card-carousel/card-carousel.component';

@Component({
  selector: 'mp-root',
  standalone: true,
  imports: [CommonModule, CardCarouselComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mp-ng-components';

  items: MpCardData[] = [
    { imgUrl: "assets/matrix.webp",         title: 'Matrix',          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.' },
    { imgUrl: "assets/existence_pain.png",  title: 'Existence Pain',  description: 'Dignissimos dolor repellat consequuntur delectus rem quod, magnam eos earum vel temporibus odit.' },
    { imgUrl: "assets/night.jpg",           title: 'Night',           description: 'Quasi esse doloribus iusto repellendus maxime dignissimos neque ut.' },
    { imgUrl: "assets/prova.png",           title: 'Prova',           description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit' },
    { imgUrl: "assets/img1.jpg",            title: 'Img1',            description: 'Quasi esse doloribus iusto repellendus maxime dignissimos neque ut' },
    { imgUrl: "assets/img2.png",            title: 'Img2',            description: 'Dignissimos dolor repellat consequuntur delectus rem quod, magnam eos earum vel temporibus odit.' },
    { imgUrl: "assets/img3.png",            title: 'Img3',            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit' },
    { imgUrl: "assets/r_m_dinner.jpg",      title: 'Rick e Morty',    description: 'Quasi esse doloribus iusto repellendus maxime dignissimos neque ut' }
  ];
}
