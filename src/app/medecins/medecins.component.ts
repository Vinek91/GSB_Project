import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/app.services.data";

@Component({
  selector: "app-medecins",
  templateUrl: "./medecins.component.html",
  styleUrls: ["./medecins.component.scss"],
})
export class MedecinsComponent implements OnInit {

  // Définition des variables membres de la classe
  nomMedecin!: string;
  lesMedecins: Array<any> = new Array();
  estCacheMenu: any;
  medecin: any;
  idMedecin!: number;
  afficherRapports!: any;
  lesRapports: Array<any> = new Array();
  afficherMedecin: any;
  afficherMessage: any;
  lblMessage: string = "";
  afficherListe: any;
  lblMessage2: string = "(Aucune spécialité)";

  constructor(private dataService: DataService) {} // Initialise le service DataService

  ngOnInit(): void {}

  // Cette fonction permet de charger les médecins à partir du service de données
  charger() {
    this.dataService.chargerMedecins(this.nomMedecin).subscribe({
      // En cas de succès, affiche les données, met la variable afficherListe à vrai et affecte les données à la variable lesMedecins
      next: (data) => {
        console.log(data);
        this.afficherListe = true;
        this.lesMedecins = data;
      },
      // En cas d'erreur, affiche l'erreur dans la console
      error: (error) => {
        console.log(error);
      },
    });
  }
  
  // Cette fonction permet de charger les derniers rapports à partir du service de données pour un médecin donné
  derniersRapports() {
    this.dataService.chargerRapports(this.medecin.id).subscribe({
      // En cas de succès, affiche les données, met la variable afficherRapports à vrai et affecte les données à la variable lesRapports
      next: (data) => {
        this.lesRapports = Array.of(data);
        this.afficherRapports = true;
        console.table(this.lesRapports);
      },
      // En cas d'erreur, affiche l'erreur dans la console
      error: (error) => {
        console.log(error);
      },
    });
  }
  
  // Cette fonction permet de mettre à jour les informations d'un médecin
  majMedecin(): void {
    // Réinitialise la variable afficherRapports à faux, affiche la variable afficherMedecin à vrai et réinitialise la variable afficherMessage à faux
    this.afficherRapports = false;
    this.afficherMedecin = true;
    this.afficherMessage = false;
  }
  
  // Cette fonction permet de valider la mise à jour des informations d'un médecin
  valider(): void {
    // Affiche la variable afficherMessage à vrai, met à jour les informations du médecin avec les nouvelles valeurs et affiche un message de confirmation ou d'erreur en fonction du résultat
    this.afficherMessage = true;
    this.dataService
      .majMedecin(
        this.medecin.id,
        this.medecin.adresse,
        this.medecin.tel,
        this.medecin.specialitecomplementaire
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.lblMessage = "Enregistrement effectué";
        },
        (error) => {
          console.log(error);
          this.lblMessage = "Merci de réessayer plus tard";
        }
      );
  }
  
  // Cette fonction permet d'annuler la mise à jour des informations d'un médecin
  annuler() {
    // Réinitialise la variable afficherMedecin à faux
    this.afficherMedecin = false;
  }

  selectionner(med: any): void {
    // Cette fonction est appelée lorsqu'un médecin est sélectionné dans la liste
    this.medecin = med;
    this.nomMedecin = med.nom + " " + med.prenom + " ;dep :" + med.departement;
    this.idMedecin = med.id;
    //this.afficherListe=false;
    if (this.medecin.specialitecomplementaire == null) {
        this.lblMessage2 = "(Aucune spécialité)";
    } else {
        this.lblMessage2 = "";
    }
  }
}
