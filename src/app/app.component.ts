import { Inject, Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    trigger('currentNotCurrent', [
      state('current', style({
        display: 'block',
        width: '100%',
        height: '50vw',
        opacity: 1,
        maxHeight: '500px',
        position: 'relative',
        overflowY: 'hidden',
      })),
      state('notCurrent', style({
        display: 'none',
        width: '100%',
        height: '50vw',
        opacity: 0,
        maxHeight: '500px',
        position: 'relative',
        overflowY: 'hidden',
      })),
      transition('current => notCurrent', [
        animate('1s', keyframes([
          style({ display: 'none', offset: 0})
        ]))
      ]),
      transition('notCurrent => current', [
        animate('2s', keyframes([
          style({ display: 'block', offset: 0}),
          style({ opacity: 0.5, offset: 0.5})
        ]))
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  slideIndex: number = 1;
  slides;
  dots;
  id: any;
  isCurrent: boolean[] = new Array(3);
  
  constructor(@Inject(DOCUMENT) private document: any) {}
  
  ngOnInit () {
    this.slides = document.getElementsByClassName('slide');
    this.dots = document.getElementsByClassName('dot');
    this.showSlide(this.slideIndex);
    this.id = setInterval(()=> {
      this.slideIndex++;
      this.showSlide(this.slideIndex);
    }, 10000);
    console.log(this.slides);
    console.log(this.dots);
  }

  plusSlides(n: number): void {
    this.slideIndex += n;
    this.showSlide(this.slideIndex);
    clearInterval(this.id);
    this.id = setInterval(()=> {
      this.slideIndex++;
      this.showSlide(this.slideIndex);
    }, 10000);
  }

  currentSlide(n: number): void {
    this.slideIndex = n;
    this.showSlide(this.slideIndex);
    clearInterval(this.id);
    this.id = setInterval(()=> {
      this.slideIndex++;
      this.showSlide(this.slideIndex);
    }, 10000);
  }

  nextSlide(): void {
    this.slideIndex++;
    this.showSlide(this.slideIndex);
    clearInterval(this.id);
    this.id = setInterval(()=> {
      this.slideIndex++;
      this.showSlide(this.slideIndex);
    }, 10000);
  }

  showSlide(n: number): void {
    if (n > this.slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = this.slides.length}
    for (let i = 0; i < this.dots.length; i++) {
      this.isCurrent[i] = false;
    }
    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i].className = this.dots[i].className.replace("active", "");
    }
    this.isCurrent[this.slideIndex - 1] = true;
    this.dots[this.slideIndex-1].className += " active";
  }
}