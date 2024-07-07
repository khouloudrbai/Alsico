import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
  submitted=false;
  acceuilform:FormGroup;
  temps_matelassage:any;
  coupe:any;
  Lancer:any;
  totale:any;
  cout_total:any;
  constructor(private router:Router,private formBuilder:FormBuilder){
    this.acceuilform = this.formBuilder.group({
      quantite: ['', [Validators.required]],
      nb_type: ['', [Validators.required]],
      perimetre: ['', [Validators.required]],
      min_article: ['', [Validators.required]],
      temps_plan: ['', [Validators.required]],
      cout_paln: ['', [Validators.required]],
      cout_matel: ['', [Validators.required]],
      cout_coupe: ['', [Validators.required]],
      cout_lancement: ['', [Validators.required]],
      nbr_roul: ['', [Validators.required]],
      nbr_matelas: ['', [Validators.required]],
      Lmnbrplis: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
  }
  async onSubmit() {
    this.submitted = true;

  // Vérification de la validation de chaque champ individuel
  Object.keys(this.acceuilform.controls).forEach(field => {
    const control = this.acceuilform.get(field);
    if (control && !control.valid) {
      console.log(`Validation failed for field: ${field}`, control.errors);
    }
  });

    if (this.acceuilform.invalid) {
      console.log("Form validation failed:", this.acceuilform.errors);

      return;
    }
    else {

      const quantite = parseFloat(this.acceuilform.value.quantite);
        const nb_type = parseFloat(this.acceuilform.value.nb_type);
        const minimumart = parseFloat(this.acceuilform.value.min_article);
        const perim=parseFloat(this.acceuilform.value.perimetre);
       const  temps_planing=parseFloat(this.acceuilform.value.temps_plan);

       const  cout_decoupe=parseFloat(this.acceuilform.value.cout_coupe);
       const  cout_delancement=parseFloat(this.acceuilform.value.cout_lancement);
       const  cout_dematel=parseFloat(this.acceuilform.value.cout_matel);
       const  cout_palning=parseFloat(this.acceuilform.value.cout_paln);
       const  nbr_rouleauu=parseFloat(this.acceuilform.value.nbr_roul);
       const  nbr_matelass=parseFloat(this.acceuilform.value.nbr_matelas);
       const  Lmnbr_pliss=parseFloat(this.acceuilform.value.Lmnbrplis);


        if (isNaN(quantite) || isNaN(nb_type)) {
            console.error("Invalid input");
            return;
        }



        this.temps_matelassage = -21- 2.44*quantite + 169.9 *nbr_rouleauu + 0.01*Lmnbr_pliss + 40*nbr_matelass;
         
        this.coupe = (-280 + 0.1174 * perim + 14.53 * quantite + 4.40 * minimumart+ 74*nbr_matelass) / 60;
        this.Lancer = (2.7 * quantite * minimumart)/60 ;
        this.totale=this.coupe+this.Lancer+this.temps_matelassage+temps_planing;
        this.cout_total=(-135-11.675*nb_type+8.61*quantite+44.075*nbr_rouleauu+0.008725*Lmnbr_pliss+55.14*nbr_matelass+0.0716*perim+2.684*minimumart+0.756*quantite*minimumart)/60;
        const message = `
        <span style=" font-size: 25px;"> Le temps de Matelassage est de : ${this.temps_matelassage.toFixed(2)} minutes.<br>
        <span style="font-size: 25px;"> Le temps de coupe est de : ${this.coupe.toFixed(2)} minutes.<br>
        <span style=" font-size: 25px;"> Le temps de lancement est de : ${this.Lancer.toFixed(2)} minutes.<br>
        <span style=" font-size: 25px;"> Le temps de palning est de : ${temps_planing.toFixed(2)} minutes.<br>

        <span style=" font-size: 25px;"> Le Temps totale est de : ${this.totale.toFixed(2)} minutes.<br>
        <span style="color: red; font-size: 30px;"> Le cout totale est de : ${this.cout_total.toFixed(2)} Euro.</span><br>
        `;

        Swal.fire("Résultats", message);
    }
    }
  }


  




