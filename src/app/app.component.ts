import { Component, OnInit, Renderer2 } from '@angular/core';
import { ConfigService } from 'src/app/service/config.service';
import { startWith, delay } from 'rxjs/operators';
import { DataService } from './service/data.service';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { JwtService } from './service/jwt.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { pageTitles } from './messages';
import { CommonService } from './service/common.service';
import { SwUpdate } from '@angular/service-worker';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  customConfig: any;
  isAuthenticated: boolean;
  isCompanySelected: boolean;
  previousUrl: string;
  currentUser: any;
  myThumbnail = "https://wittlock.github.io/ngx-image-zoom/assets/thumb.jpg";
  myFullresImage = "https://wittlock.github.io/ngx-image-zoom/assets/fullres.jpg";
  isShowSingleCarolus: boolean;
  isShowMultiCarolus: boolean;
  constructor(
    private renderer: Renderer2,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private jwtService: JwtService,
    private configService: ConfigService,
    private dataService: DataService,
    private commonService: CommonService,
    private swUpdate: SwUpdate,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.previousUrl) {
          this.renderer.removeClass(document.body, this.previousUrl);
        }
        const currentUrlSlug = event.url.slice(1);
        if (currentUrlSlug) {
          this.renderer.addClass(document.body, currentUrlSlug);
        }
        this.previousUrl = currentUrlSlug;
      }
    });

    if (this.jwtService.getToken()) {
      this.getProfile();
      this.router.events.filter(event => event instanceof NavigationEnd).map(() => this.activatedRoute).
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }).map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }).
        filter((route) => route.outlet === 'primary').mergeMap((route) => route.data).subscribe((event: any) => {
          // You only receive NavigationEnd events
          // setting page title
          this.titleService.setTitle(pageTitles[event.title]);
          this.isShowSingleCarolus = event.isShowSingleCarolus;
          this.isShowMultiCarolus = event.isShowMultiCarolus;
          if (this.isAuthenticated && this.isCompanySelected) {
            // this.dataService.permission.subscribe((role: any) => {
            //   if (role && event['module'] && event['action']) {
            //     const checkPerms = role[event['module']] ? role[event['module']][event['action']] : false;
            //     if (!checkPerms) {
            //       this.router.navigateByUrl('/dashboard');
            //       return;
            //     }
            //   }
            // });
          } else {
            this.dataService.isAuthenticated.subscribe((isLoggedIn) => {
              this.isAuthenticated = isLoggedIn;
              // this.dataService.permission.subscribe((role: any) => {
              //   if (role && event['module'] && event['action']) {
              //     const checkPerms = role[event['module']] ? role[event['module']][event['action']] : false;
              //     if (!checkPerms) {
              //       this.router.navigateByUrl('/dashboard');
              //       return;
              //     }
              //   }
              // });
              // this.dataService.isCompanySelected.subscribe((response) => {
              //   this.isCompanySelected = response;
              // });
            });
          }
        });
    } else {
      // this.dataService.checkDomain();
      this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
        // setting page title
        this.titleService.setTitle(pageTitles[this.activatedRoute.snapshot.children[0].firstChild.data['title']]);
        this.isShowSingleCarolus = this.activatedRoute.snapshot.children[0].firstChild.data.isShowSingleCarolus;
        this.isShowMultiCarolus = this.activatedRoute.snapshot.children[0].firstChild.data.isShowMultiCarolus;
      });
    }
  }

  getProfile() {
    this.commonService.getProfile().subscribe((response) => {
      if (response.success) {
        this.dataService.updateAuth(response.data.User);
        this.dataService.updateCart(response.data.cart);
        this.dataService.updateAddress(response.data.address);
      }
    }, (error) => {
      this.dataService.purgeAuth();
    });
  }

  ngOnInit() {
    this.reloadCache();
    // Lorder
    $(function () {
      setTimeout(function () {
        $(".lorder-full").fadeOut();
      }, 1000);
    });
    // this.configService.config = { showLoader: false };
    // Subscribe to config changes
    this.configService.config.pipe(
      startWith(null),
      delay(0)
    ).subscribe((config) => {
      this.customConfig = config;
    });
  }

  reloadCache() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available! would you like to update?')) {
          window.location.reload();
        }
      });
    }
  }

}
