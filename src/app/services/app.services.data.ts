/* Import des modules */
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DataService {


  /* 
  *Définition de l'URL de l'API et d'une variable visiteur 
  */
  private urlAPI = "http://localhost/restGSB";
  visiteur: any;

  constructor(private http: HttpClient) {}

  /* 
  *Fonction permettant la connexion de l'utilisateur avec son login et son mot de passe.
  *Elle prend en paramètre le login du visiteur et son mot de passe correspondant.
  */
  public connexion(login: string, mdp: string) {
    let url = this.urlAPI + "/connexion?login=" + login + "&mdp=" + mdp;
    let req = this.http.get<string>(url);
    return req;
  }

  /* 
  *Fonction permettant le chargement des médecins en fonction d'un nom.
  *Elle prend en paramètre le nom d'un medecin.
  */
  public chargerMedecins(nomMedecin: string) {
    let url = this.urlAPI + "/medecins?nom=" + nomMedecin;
    let req = this.http.get<Array<any>>(url);
    return req;
  }

  /* 
  *Fonction permettant le chargement des rapports en fonction de l'ID d'un médecin.
  *Elle prend en paramètre l'id d'un medecin'.
  */
  public chargerRapports(idMedecin: number) {
    let url = this.urlAPI + "/rapport/" + idMedecin;
    let req = this.http.get<Array<any>>(url);
    return req;
  }

  /* 
  *Fonction permettant la mise à jour des informations d'un médecin.
  *Elle prend en paramètre l'id, l'adresse, le téléphone, et la spécialité d'un medecin.
  */
  public majMedecin(idmed: string,adressemed: string,telmed: string,spemed: string) {
    /* Corps de la requête */
    const body = {
      id: idmed,
      adresse: adressemed,
      tel: telmed,
      specialite: spemed,
    };
    console.table(body); // Affichage du corps de la requête dans la console
    let url: string = this.urlAPI + "/majMedecin";
    let req = this.http.put<Array<any>>(url, body);
    return req;
  }


  /* 
  *Fonction permettant de charger tous les rapports d'un visiteur pour une date donnée.
  *Elle prend en paramètre l'ID du visiteur et la date recherchée.
  *Elle renvoie un Observable contenant un tableau de chaînes de caractères.
  */
  public chargerRapportsAuneDate(idVisiteur: string, date: Date): Observable<string[]> {
    let url: string = this.urlAPI + "/rapports_a_date?idVisiteur=" + idVisiteur + "&date=" + date;
    let req = this.http.get<Array<any>>(url);
    console.log(url);
    return req;
  }

  /* 
  *Fonction permettant de mettre à jour un rapport.
  *Elle prend en paramètre l'ID du rapport, le motif et le bilan.
  */
  public majRapport(idRapport: string, motif: string, bilan: string) {
    let url: string = this.urlAPI + "/majrapport?idRapport=" + idRapport + "&motif=";
    url += motif + "&bilan=" + bilan;
    let req = this.http.get(url);
    return req;
  }

  /* 
  *Fonction permettant de charger tous les médicaments correspondant à un nom donné.
  *Elle prend en paramètre le nom recherché.
  */
  public chargerMedicaments(nom: string) {
    console.log("Voici le nom " + nom);
    let url: string = this.urlAPI + "/medicaments?nomCommercial=" + nom;
    let req = this.http.get<Array<any>>(url);
    return req;
  }

  /* 
  *Fonction permettant d'ajouter un rapport.
  *Elle prend en paramètre l'ID du visiteur, l'ID du médecin, le motif, la date, le bilan et un tableau d'objets correspondant aux médicaments sélectionnés.
  */
  public ajouterRapport(idVisiteur: string, idMedecin: string, motif: string, date: Date, bilan: string, lesMedicaments: Array<any>) {

    // On crée un objet vide nommé "medi" qui va stocker les médicaments sélectionnés et leurs quantités.
    let medi: { [key: string]: number } = {};

    // On itère sur le tableau des médicaments sélectionnés et on ajoute chaque médicament et sa quantité à l'objet "medi".
    lesMedicaments.forEach((med) => {
      medi[med.id] = med.qte;
    });
    const body = {
      idMedecin: idMedecin,
      idVisiteur: idVisiteur,
      bilan: bilan,
      motif: motif,
      date: date,
      medicaments: medi,
    };

    console.table(body);
    let url: string = this.urlAPI + "/ajouterRapport";
    let req = this.http.put(url, body);
    return req;
  }
}