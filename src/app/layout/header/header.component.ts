import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/service/general.service';
// import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: true,
  //   dots: false,
  //   navSpeed: 700,
  //   navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     2024: {
  //       items: 2
  //     },
  //     3024: {
  //       items: 3
  //     },
  //     4024: {
  //       items: 4
  //     }
  //   },
  //   nav: true
  // }

  currentUser: any = false;
  currentCart: any;
  bannerArray: any = [];

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @Input() isShowSingleCarolus: boolean;
  @Input() isShowMultiCarolus: boolean;
  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  constructor(private dataService: DataService,
    private generalService: GeneralService,
    private router: Router) {
    this.dataService.currentUser.subscribe((res) => {
      this.currentUser = res;
    });
    this.dataService.currentCart.subscribe((res) => {
      this.currentCart = res;
    });

  }

  ngOnInit() {
    this.getBanerList();
  }

  getBanerList() {
    this.generalService.getBanerList().subscribe((res: any) => {
      if (res.success) {
        this.bannerArray = res.data ? res.data : [];
      }
    })
  }
  logout() {
    let temp = confirm("Are you soure...?");
    if (temp) {
      this.dataService.purgeAuth();
      this.router.navigateByUrl('/');
    } else {

    }
  }
  search(value) {
    this.router.navigateByUrl(`/shop-grid;s_=${value}`)
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

}
