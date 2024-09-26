import { Component, ComponentFactoryResolver } from '@angular/core';
import jsonData from 'src/assets/call.json';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  public employeeData: any = {};
  public employeeName: string = '';
  public jobName: string = '';
  public loading: boolean = true;

  constructor(
    private loadingController: LoadingController,
    private router: Router
  ) {
    this.presentLoading();
  }

  goToProfile() {
    const employeeDataString = JSON.stringify(this.employeeData);
    this.router.navigate(['/profile'], {
      queryParams: { employeeData: employeeDataString },
    });
  }

  async presentLoading() {
    const loadingElement = await this.loadingController.create({
      message: 'Carregando os dados...',
    });

    await loadingElement.present();

    setTimeout(() => {
      this.loadData();
      this.loading = false;
      loadingElement.dismiss();
    }, 3000);
  }

  loadData() {
    const sections = jsonData.payload[0].sections;
    const identificationSection = sections.find(
      (section) => section.name === 'Dados de identificação'
    );
    
    if (identificationSection && identificationSection.cardItems.length > 0) {
      const employeeData = identificationSection.cardItems[0].data;

      if (
        typeof employeeData === 'object' &&
        employeeData !== null &&
        'employeeName' in employeeData
      ) {
        this.employeeData = employeeData;
        this.employeeName = employeeData.employeeName;
        this.jobName = employeeData.jobName;
      }
    }
  }
}
