import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../home/home.page';

interface CardItem {
  data: Course[];
}

interface Section {
  name: string;
  expanded: boolean;
  cardItems: CardItem[];
}

interface Payload {
  sections: Section[];
}

interface EmployeeData {
  payload: Payload[];
  employeeName: string; // Adicione outros campos conforme necessário
  jobName: string;
  companyAdmissionDate: string;
  cellphoneNumber: string;
  email: string;
  birthDate: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  public employeeData: EmployeeData | null = null; 
  public coursesToShow: number = 3; 
  public employeeName: string = '';
  public jobName: string = '';
  public companyAdmissionDate: string = '';
  public birthDate: string = '';
  public cellphoneNumber: string = '';
  public email: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['employeeData']) {
        
          this.employeeData = JSON.parse(params['employeeData']); 
          
          if (this.employeeData) { // Verificação para garantir que employeeData não é null
            this.employeeName = this.employeeData.employeeName;
            this.jobName = this.employeeData.jobName;
            this.companyAdmissionDate = this.employeeData.companyAdmissionDate;
            this.cellphoneNumber = this.employeeData.cellphoneNumber;
            this.email = this.employeeData.email;
            this.birthDate = this.employeeData.birthDate;
          }
        } 
      
    });

  }
}
