import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../services/app.services.data";


@Component({
  selector: "app-connexion",
  templateUrl: "./connexion.component.html",
  styleUrls: ["./connexion.component.scss"],
})
export class ConnexionComponent implements OnInit {

  // Définition des variables membres de la classe
  login: any; 
  mdp: any;
  estCache: boolean = true;
  lblMessage: string = "";
  visiteur: any;

  constructor(private router: Router, private dataService: DataService) {} // Initialise le service DataService et Router

  // Méthode appelée lors de la soumission du formulaire de connexion
  valider() {
    // Appel du service de connexion avec les identifiants saisis par l'utilisateur
    this.dataService.connexion(this.login, this.mdp).subscribe({
      next: (data) => {
        // Si la connexion est réussie, on stocke les informations du visiteur dans le service de données
        this.visiteur = data;
        this.dataService.visiteur = data;

        // Affichage des informations de connexion dans la console
        console.log("vi" + JSON.stringify(this.visiteur));
        console.log("vi2" + JSON.stringify(this.dataService.visiteur));
        console.log(data);
        console.log("ok");

        // Redirection vers la page d'accueil
        this.router.navigate(["accueil"]);

        // Réinitialisation des messages d'erreur
        this.lblMessage = "";
        this.estCache = true;
      },
      error: (error) => {
        // Si la connexion échoue, on affiche un message d'erreur
        console.log("error :", JSON.stringify(error));
        console.log("erreur");
        this.lblMessage = "Erreur identifiant/Mot de passe incorrect";
        this.estCache = false;
      },
    });
  }

  ngOnInit(): void {
    // TODO: à implémenter si besoin
    throw new Error("Method not implemented.");
  }
}

// Fonction de validation du formulaire de connexion (non utilisée dans le code)
function valider() {
  throw new Error("Function not implemented.");
}
