import { Inject, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  slideIndex: number = 1;
  slides;
  dots;
  
  constructor(@Inject(DOCUMENT) private document: any) {}
  
  ngOnInit () {
    this.slides = document.getElementsByClassName('slide');
    this.dots = document.getElementsByClassName('dot');
    this.showSlide(this.slideIndex);
    setInterval(()=> {
      this.slideIndex++;
      this.showSlide(this.slideIndex);
    }, 10000);
    console.log(this.slides);
    console.log(this.dots);
  }

  plusSlides(n: number): void {
    this.slideIndex += n;
    this.showSlide(this.slideIndex);
  }

  currentSlide(n: number): void {
    this.slideIndex = n;
    this.showSlide(this.slideIndex);
  }

  nextSlide(): void {
    this.slideIndex++;
    this.showSlide(this.slideIndex);
  }

  showSlide(n: number): void {
    if (n > this.slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = this.slides.length}
    for (let i = 0; i < this.dots.length; i++) {
      this.slides[i].style.display = "none";
    }
    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i].className = this.dots[i].className.replace("active", "");
    }
    this.slides[this.slideIndex-1].style.display = "block";
    this.dots[this.slideIndex-1].className += " active";

    
  }

}
