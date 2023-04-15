import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/app.services.data";

@Component({
  selector: "app-visites",
  templateUrl: "./visites.component.html",
  styleUrls: ["./visites.component.scss"],
})
export class VisitesComponent implements OnInit {

  // Propriétés de la classe
  lblMessage: string = "";
  nomMedecin!: string;
  lesMedecins: Array<any> = new Array();
  medecin: any;
  gestionMajRapport: boolean = false;
  gestionAjoutRapport: boolean = false;
  dateVisite!: Date;
  dateNouveauRapport!: Date;
  nomMedicament: string = "";
  lesMedicaments!: Array<any>;
  medicamentsSelect: Array<any> = new Array();
  medicamentSelect: any;
  lesRapports: Array<any> | undefined;
  qtes: Array<number> = [1, 2, 3, 4, 5];
  qteSelect: number | undefined;
  titre: string | undefined;
  rapport: any;
  motif: string = "";
  bilan: string = "";
  afficherRapport: boolean = false;
  messageMAJ: string = "";
  messageEnregistrement: string = "";
  typeMessage: string = "";
  estCache: boolean = true;

  // Constructeur de la classe qui reçoit le service DataService
  constructor(private dataService: DataService) {}

  // Méthode qui permet de charger les médecins
  chargerMedecins() {
    this.dataService.chargerMedecins(this.nomMedecin).subscribe({
      next: (data) => {
        this.lesMedecins = data;
      },
      error: (error) => {},
    });
  }

  // Méthode qui permet de sélectionner un médecin
  selectionnerMedecin(med: any): void {
    this.medecin = med;
    this.nomMedecin = med.nom + " " + med.prenom + "; dep : " + med.departement;
    this.lesMedecins = [];
  }

  // Méthode qui permet de modifier un rapport existant
  modifierRapport(): void {
    this.gestionMajRapport = true;
    this.gestionAjoutRapport = false;
    this.afficherRapport = false;
    this.typeMessage = "";
    this.messageMAJ = "";
  }

  // Méthode qui permet de charger les rapports pour une date spécifique
  chargerVisites(): void {
    this.titre = "Médecins visité(s) ce jour :";
    console.log("voici le visiteur " + this.dataService.visiteur);
    console.log("voici le visiteur " + this.dataService.visiteur.id);
    this.dataService
      .chargerRapportsAuneDate(this.dataService.visiteur.id, this.dateVisite)
      .subscribe(
        (data) => {
          console.log(data);
          console.table(data);
          console.log(JSON.stringify(data));

          if (data.length == 0) {
            console.log("vide");
            this.lblMessage = "Aucun médecin pour cette date";
            this.estCache = false;
            this.lesRapports = [];
          } else {
            console.log("remplie");
            this.lesRapports = data;
            this.estCache = true;
          }
        },
        (error) => {}
      );
  }

  //sélectionne un rapport et affiche ses détails
  selectionner(rapport: any) {
    this.rapport = rapport;
    this.afficherRapport = true;
  }


  //Valide la mise à jour du rapport sélectionné
  valider(): void {
    console.log(this.rapport);
    this.dataService
      .majRapport(
        this.rapport.idRapport,
        this.rapport.motif,
        this.rapport.bilan
      )
    .subscribe(
      (data) => {
        console.log(data);
        this.typeMessage = "alert alert-success";
        this.messageMAJ = "Mise à jour effectuée";
      },
      (error) => {
        this.messageMAJ = "Merci de réessayer plus tard";
        this.typeMessage = "alert alert-danger";
      }
    );
}


  //Initialise les champs pour un nouveau rapport
  initNouveauRapport() {
    this.nomMedecin = "";
    this.bilan = "";
    this.motif = "";
    this.dateNouveauRapport = new Date();
    this.nomMedicament = "";
    this.qteSelect = 1;
    this.typeMessage = "";
    this.messageEnregistrement = "";
  }

  
  //Ajoute un nouveau rapport
  ajouterRapport(): void {
    this.initNouveauRapport();
    this.gestionAjoutRapport = true;
    this.gestionMajRapport = false;
  }


  //Charge les médicaments correspondant à la recherche
  chargerMedicaments() {
    this.dataService.chargerMedicaments(this.nomMedicament).subscribe(
      (data) => {
        console.log(data);
        this.lesMedicaments = data;
      },
      (error) => {}
    );
  }

  
  //Sélectionne un médicament pour l'ajouter au rapport
  choisirMedicament(medicament: any) {
    this.medicamentSelect = medicament;
    this.nomMedicament = medicament.nomCommercial;
    this.lesMedicaments = [];
  }

  /**
   * Ajoute le médicament sélectionné au rapport
   */
  ajouter(): void {
    this.medicamentsSelect.push({
      id: this.medicamentSelect.id,
      nom: this.medicamentSelect.nomCommercial,
      qte: this.qteSelect,
    });
    this.nomMedicament = "";
  }

  
  //Retire le dernier médicament ajouté au rapport
  retirer(): void {
    this.medicamentsSelect.pop();
  }

  //pour enregistrer les rapports
  enregistrer(): void {
    console.log(this.dateNouveauRapport);
    console.log(this.medicamentsSelect);

    this.dataService
      .ajouterRapport(
        this.dataService.visiteur.id,
        this.medecin.id,
        this.motif,
        this.dateNouveauRapport,
        this.bilan,
        this.medicamentsSelect
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.typeMessage = "alert alert-success";
          this.messageEnregistrement = "Enregistrement effectué";
        },
        (error) => {
          console.log("Voici l'erreur " + error);
          console.log("Voici l'erreur " + JSON.stringify(error));
          console.table("Voici l'erreur " + error);
          this.typeMessage = "alert alert-danger";
          this.messageEnregistrement = "Merci de réessayer plus tard";
        }
      );
  }

  ngOnInit(): void {}
}
