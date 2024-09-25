import { Component } from '@angular/core';
import jsonData from '../home/call.json';
import { core } from '@angular/compiler';
import { LoadingController } from '@ionic/angular';

interface Course {
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
  public employeeName: string = ''; // Inicialização com um valor padrão
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

  constructor(private loadingController: LoadingController) {
    this.presentLoading();
  } 
  async presentLoading() {
    const loadingElement = await this.loadingController.create({
      message: "Carregando os dados...",
      duration: 1000,
    })

    await loadingElement.present();

    setTimeout(() => {
      this.loadData();
      this.loading = false;
      loadingElement.dismiss();
    }, 1000)
  }

  loadData(){
    const sections = jsonData.payload[0].sections;
    const identificationSection = sections.find(
      (section) => section.name === 'Dados de identificação'
    );

    if (identificationSection && identificationSection.cardItems.length > 0) {
      const employeeData = identificationSection.cardItems[0].data;

      // Verifique se employeeData é um objeto e tem a propriedade employeeName
      if (
        typeof employeeData === 'object' &&
        employeeData !== null &&
        'employeeName' in employeeData
      ) {
        this.employeeName = employeeData.employeeName;
        this.jobName = employeeData.jobName; // Acessando o employeeName
        this.birthDate = employeeData.birthDate; // Acessando o employeeName
        this.companyAdmissionDate = employeeData.companyAdmissionDate; // Acessando o employeeName
        this.cellphoneNumber = employeeData.cellphoneNumber; // Acessando o employeeName
        this.email = employeeData.email; // Acessando o employeeName
      }
    }

    const courseSection = sections.find((section) => section.name === 'Cursos');

    if (courseSection && courseSection.cardItems.length > 0) {
      const courseData = courseSection.cardItems[0].data;
      if (Array.isArray(courseData)) {
        this.courses = courseData as Course[];
      }
    }

    const academicSection = sections.find((section) => section.name === 'Formação acadêmica');

    if (academicSection && academicSection.cardItems.length > 0) {
      const academic = academicSection.cardItems[0].data;
      if (Array.isArray(academic)) {
        this.academicItems = academic as AcademicBackground[];
      }
    }

    const languageSection = sections.find((section) => section.name === 'Idiomas');

    if (languageSection && languageSection.cardItems.length > 0) {
      const language = languageSection.cardItems[0].data;
      if (Array.isArray(language)) {
        this.languageItems = language as Language[];
      }
    }

    const jobSection = sections.find((section) => section.name === 'Histórico profissional');

    if (jobSection && jobSection.cardItems.length > 0) {
      const job = jobSection.cardItems[0].data;
      if (Array.isArray(job)) {
        this.jobItems = job as JobBackground[];
      }
    }
  }
}
