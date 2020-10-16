import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Array<any>;
  owners: Array<any>;

  constructor(private carService: CarService, private giphyService: GiphyService, private OwnerService: OwnerService) { }

  /*Carga la lista de carros y su respectivo owner. Ademas como la appi es compartida
  limpia el atributo propietario en caso de que tenga un ownerDni que no exista.
  */
  ngOnInit() {
    this.carService.getAll().subscribe(data => {
      this.cars = data;
      for (const car of this.cars) {
        this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
        this.OwnerService.getAll().subscribe(datos => {
          datos = datos._embedded.owners;
          let owne = datos.filter(own => own.dni == car.ownerDni);
          car.nameOwner = owne[0]? owne[0].name : "Nobody";
          //Aqui se actualiza el campo ownerDni de los carros si ya no existe su propietario
          if(owne[0] == undefined){
            car.ownerDni = owne[0]?  owne[0].dni : "";
            this.carService.save(car).subscribe(result => {
            }, error => console.error(error));
          }
        });

        
      }
    });
  }
}
