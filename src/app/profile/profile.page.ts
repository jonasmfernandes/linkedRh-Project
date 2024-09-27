import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

interface AccordionSection {
  title: string;
  name: string;
  expanded?: boolean;
  cardItems: Array<{ data: any }>;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  public jsonData: any | null = null;
  public accordions: AccordionSection[] = [];
  public sections: any = [];
  public originalSections: any = [];
  public employeeName: string = '';
  public jobName: string = '';

  constructor(
    private route: ActivatedRoute,
    public navCtrl: NavController,
    private http: HttpClient,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params['jsonData']) {
        try {
          this.jsonData = JSON.parse(params['jsonData']);
          this.sections = this.sections.concat(
            this.jsonData.payload[0].sections
          );
          this.originalSections = this.jsonData.payload[0].sections;
          const identification = this.jsonData.payload[0].sections[0];

          this.employeeName = identification.cardItems[0].data.employeeName;
          this.jobName = identification.cardItems[0].data.jobName;
        } catch (error) {
          console.error('Erro ao fazer parse do JSON:', error);
        }
      }
    });
  }

  seeMore() {
    this.sections = this.sections.concat(this.originalSections);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
