import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { OwnerService } from '../shared/owner/owner.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit, OnDestroy {
  car: any = {};
  owner: any = {};
  owners: Array<any>;
  dniSeleccionado:String = "";

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private carService: CarService,
              private OwnerService: OwnerService,
              private giphyService: GiphyService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      let dni: string;
      if (id) {
        this.carService.get(id).subscribe((car: any) => {
          if (car) {
            dni = car.ownerDni;
            this.car = car;
            this.car.href = car._links.self.href;
            this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
          } else {
            console.log(`Car with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
      //Quitar el [0], solo para pruebas
      this.OwnerService.getAll().subscribe(owners => {
        owners = owners._embedded.owners;
        this.owners = owners;
        let resultado = owners.filter(owner => owner.dni == dni);
        if (resultado.length >= 1) {
          this.owner = resultado[0];
          this.dniSeleccionado = resultado[0].dni;
          this.owner.href = resultado[0]._links.self.href;
          this.giphyService.get(resultado[0].name).subscribe(url => resultado[0].giphyUrl = url);
          
        } else {
          console.log(`Owner with id '${id}' not found, returning to list`);
          
        }
      });

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/car-list']);
  }

  save(form: NgForm) {
    this.carService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
    
    /* this.OwnerService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error)); */
  }

  remove(href) {
    this.carService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}

