import { Component } from '@angular/core';
import jsonData from '../home/call.json';
import { core } from '@angular/compiler';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

export interface Course {
  courseName: string;
  entity: string;
  period: string;
}

interface AcademicBackground {
  period: string;
  course: string;
  local: string;
  educationLevel: string;
}

interface Language {
  language: string;
  status: string;
  period: string;
}

interface JobBackground {
  job: string;
  period: string;
  company: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public employeeName: string = ''; 
  public employeeData: any = {};
  public jobName: string = '';
  public birthDate: string = '';
  public companyAdmissionDate: string = '';
  public cellphoneNumber: string = '';
  public email: string = '';
  public courses: Course[] = [];
  public academicItems: AcademicBackground[] = [];
  public languageItems: Language[] = [];
  public jobItems: JobBackground[] = [];

  public loading: boolean = true;

  constructor(private loadingController: LoadingController, private navCtrl: NavController, private router: Router) {
    this.presentLoading();
  } 

  goToProfile() {
    const employeeDataString = JSON.stringify(this.employeeData);
  this.router.navigate(['/profile'], { queryParams: { employeeData: employeeDataString } });
  this.navCtrl.navigateForward(['/profile'], {
    queryParams: { employeeData: JSON.stringify(this.employeeData) }
  });
  
  }

  async presentLoading() {
    const loadingElement = await this.loadingController.create({
      message: "Carregando os dados...",
      duration: 2000,
    })

    await loadingElement.present();

    setTimeout(() => {
      this.loadData();
      this.loading = false;
      loadingElement.dismiss();
    }, 2000)
  }

  loadData(){
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
        this.birthDate = employeeData.birthDate;
        this.companyAdmissionDate = employeeData.companyAdmissionDate;
        this.cellphoneNumber = employeeData.cellphoneNumber;
        this.email = employeeData.email;

        
    }
    const courseSection = sections.find((section) => section.name === 'Cursos');

      if (courseSection && courseSection.cardItems.length > 0) {
        const courseData = courseSection.cardItems[0].data;
        if (Array.isArray(courseData)) {
        this.courses = courseData as Course[];
        console.log('Cursos encontrados:', this.courses); 
        
  }else {
    console.log('Nenhum curso encontrado vei'); 
  }
      }
    }
    
  }
  
  
}

