import { Component } from '@angular/core';
import jsonData from 'src/assets/call.json';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { RandomUserApiService } from './random-user-api.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public employeeData: any = {};
  public employeeName: string = '';
  public jobName: string = '';
  public loadingUserData: boolean = true;
  public loadingApp: boolean = false;

  constructor(
    private loadingController: LoadingController,
    private router: Router,
    private modalController: ModalController,
    private randomUserApiService: RandomUserApiService,
    private storage: Storage
  ) {
    this.presentLoading();
  }

  async ngOnInit(){
    await this.storage.create();
  }

  async loadApp() {
    this.loadingApp = true;

    this.randomUserApiService.getRandomUser().subscribe(async (randomUser) => {
      console.log(randomUser);
      await this.storage.set(`${Date.now()}`, randomUser)

      setTimeout(async () => {
        this.loadingApp = false;
        const modal = await this.modalController.create({
          component: ModalContentComponent,
          componentProps: {
            message: 'Carregado!',
          },
        });
        await modal.present();
      }, 5000);
    });
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
      this.loadingUserData = false;
      loadingElement.dismiss();
    }, 5000);
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
