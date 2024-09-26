import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

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
  public employeeData: any | null = null;
  public accordions: AccordionSection[] = [];

  constructor(
    private route: ActivatedRoute,
    public navCtrl: NavController,
    private http: HttpClient
  ) {
    this.loadJsonData();

    this.route.queryParams.subscribe((params) => {
      if (params['employeeData']) {
        try {
          this.employeeData = JSON.parse(params['employeeData']);
        } catch (error) {
          console.error('Erro ao fazer parse do JSON:', error);
        }
      }
    });
  }

  loadJsonData() {
    this.http.get<any>('assets/call.json').subscribe(
      response => {
        if (response.payload && response.payload.length > 0) {
          // Log para verificar se os dados estão corretos
          console.log('JSON completo:', response.payload[0].sections);
  
          this.accordions = response.payload[0].sections.map((section: any) => ({
            name: section.name,
            expanded: section.expanded || false,
            cardItems: section.cardItems.map((card: any) => ({
              data: card.data // Mapeando o array de "data"
            }))
          }));
  
          // Verificando o conteúdo dos cardItems na seção Cursos
          const cursosSection = this.accordions.find(accordion => accordion.name === 'Cursos');
          const educationSection = this.accordions.find(accordion => accordion.name === "Formação acadêmica");
          const languageSection = this.accordions.find(accordion => accordion.name === "Idiomas");
          const jobSection = this.accordions.find(accordion => accordion.name === "Histórico Profissional");
          if (cursosSection) {
            console.log('Cursos Section:', cursosSection);
            console.log('Cursos Section:', educationSection);
            console.log('Cursos Section:', languageSection);
            console.log('Cursos Section:', jobSection);
          }
  
        } else {
          console.error('Payload vazio');
        }
      },
      error => {
        console.error('Erro ao carregar o JSON:', error);
      }
    );
  }
  
  populateAccordionItems(data: any) {
    // Inicializando os grupos de acordeão
    if (data.Cursos && data.Cursos.length > 0) {
      this.accordions.push({
        title: 'Cursos', // Título da seção
        name: 'Cursos',  // Nome da seção para uso no acordeão
        expanded: false, // Inicializa como não expandida
        cardItems: data.Cursos.map((curso: any) => ({
          data: {  // Mantenha os dados que você precisa
            courseName: curso.courseName,
            entity: curso.entity,
            period: curso.period
          }
        }))
      });
    }
  
    if (data.FormacaoAcademica && data.FormacaoAcademica.length > 0) {
      this.accordions.push({
        title: 'Formação acadêmica', // Título da seção
        name: 'Formação acadêmica',   // Nome da seção para uso no acordeão
        expanded: false, // Inicializa como não expandida
        cardItems: data.FormacaoAcademica.map((formacao: any) => ({
          data: {  // Mantenha os dados que você precisa
            courseName: formacao.course,
            entity: formacao.local,
            period: formacao.period
          }
        }))
      });
    }
  
    if (data.Idiomas && data.Idiomas.length > 0) {
      this.accordions.push({
        title: 'Idiomas', // Título da seção
        name: 'Idiomas',  // Nome da seção para uso no acordeão
        expanded: false, // Inicializa como não expandida
        cardItems: data.Idiomas.map((idioma: any) => ({
          data: {  // Mantenha os dados que você precisa
            language: idioma.language,
            status: idioma.status,
            period: idioma.period
          }
        }))
      });
    }
  
    if (data.HistoricoProfissional && data.HistoricoProfissional.length > 0) {
      this.accordions.push({
        title: 'Histórico Profissional', // Título da seção
        name: 'Histórico Profissional',   // Nome da seção para uso no acordeão
        expanded: false, // Inicializa como não expandida
        cardItems: data.HistoricoProfissional.map((experiencia: any) => ({
          data: {  // Mantenha os dados que você precisa
            job: experiencia.job,
            company: experiencia.company,
            period: experiencia.period
          }
        }))
      });
    }
  }  
}


