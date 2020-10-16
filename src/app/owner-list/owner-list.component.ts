import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarListComponent} from '../car-list/car-list.component'

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  owners: Array<any>;
  seleccionados: Array<String> = [];

  constructor(private OwnerService: OwnerService, private giphyService: GiphyService, 
    private router: Router,private carlist: CarListComponent) {
  }

  ngOnInit() {
    this.OwnerService.getAll().subscribe(owners => {
      owners = owners._embedded.owners;
      this.owners = owners;
      for (const owner of this.owners) {
        this.giphyService.get(owner.name).subscribe(url => owner.giphyUrl = url);
      }
    });
  }
  //Los owners a eliminar juntos son puestos en un array con su id.
  seleccionar(id: String) {
      if (this.seleccionados.indexOf(id) > -1 && this.seleccionados.length > 0) {
        this.seleccionados = this.seleccionados.filter(dato => { return dato != id });}
      else {
        this.seleccionados.push(id);
      }
  }
  //Se elimina todos los owner que tengan su id en el array.
  remove() {
     for (let id of this.seleccionados) {
      this.OwnerService.remove2(String(id)).subscribe(result => {
        this.ngOnInit();this.carlist.ngOnInit();}, error => console.error(error));
    }
  }
}
