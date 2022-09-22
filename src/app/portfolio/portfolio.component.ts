import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../service/general.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html'
})
export class PortfolioComponent implements OnInit {
  catergoryList: any;
  category_id: any;
  brandList: any;

  constructor(private generalService: GeneralService) { }

  ngOnInit() {
    this.getMasterData();
  }
  getFilterData(cat_id) {
    this.category_id = cat_id;
    this.getBrandList();
  }
  removeFilterData() {
    this.category_id = null;
    this.getBrandList();
  }
  getMasterData() {
    this.generalService.getCategoryList().subscribe((res: any) => {
      if (res.success) {
        this.catergoryList = res.data ? res.data : [];
      }
    });
    this.getBrandList();
  }

  getBrandList() {
    const params: any = {};
    if (this.category_id) {
      params.category_id = this.category_id;
    }
    this.generalService.getBranddataList(params).subscribe((res: any) => {

      if (res.success) {
        if (this.category_id && this.category_id.value) {
          this.brandList = res.data ? res.data : [];
        } else {
          this.brandList = res.data ? res.data : [];
        }
      }
    });
  }
}
