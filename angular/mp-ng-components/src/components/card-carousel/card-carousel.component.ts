import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';

export interface MpCardData {
  imgUrl      : string;
  title      ?: string;
  description?: string;
}

@Component({
  selector   : 'mp-card-carousel',
  standalone : true,
  imports    : [CommonModule],
  templateUrl: './card-carousel.component.html',
  styleUrl   : './card-carousel.component.scss'
})
export class CardCarouselComponent implements AfterViewInit {
  
  @Input() items: MpCardData[] = [];

  @ViewChildren('imgComponent') 
  itemComponents?: QueryList<ElementRef<HTMLDivElement>>;

  @ViewChild('carousel')
  carousel?: ElementRef<HTMLDivElement>;

  private _index: number = 0; 

  get index() {
    return this._index;
  }

  public next() {
    this._index = (this.index + 1) % this.items.length;
  }

  public previous() {
    this._index = (this.index - 1 + this.items.length) % this.items.length;
  }

  public goTo(index: number) {
    this._index = index;
  }

  _scrollWidth?: number = undefined;
  public getScrollWidth() {
    return this._scrollWidth ?? 220;
  }

  get currentBgUrl() {
    return `url(${this.items[this.index].imgUrl})`;
  }

  get carouselPosition() {
    return `translateX(-${this.getScrollWidth() * this.index}px)`
  }

  ngAfterViewInit(): void {
    console.log(this.itemComponents);
    if (this.itemComponents?.first.nativeElement && this.carousel?.nativeElement) {
      const singleImgWidth = this.itemComponents.first.nativeElement.clientWidth;
      const containerGap = +getComputedStyle(this.carousel.nativeElement).gap.split('px')[0];

      this._scrollWidth = singleImgWidth + containerGap;
    }
  }
}
