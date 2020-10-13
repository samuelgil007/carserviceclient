import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { OwnerService } from '../shared/owner/owner.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit {

  sub: Subscription;
  owner: any = {};
  constructor(private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private OwnerService: OwnerService,
    private giphyService: GiphyService) {

    }


  ngOnInit() {
     this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.OwnerService.get(id).subscribe((owner: any) => {
          if (owner) {
            this.owner = owner;
            this.owner.href = owner._links.self.href;
            this.giphyService.get(owner.name).subscribe(url => owner.giphyUrl = url);
          } else {
            console.log(`Owner with id '${id}' not found, returning to list`);
            this.gotoList(); 
          }
        });
      }
    }); 
  }
  gotoList() {
    this.router.navigate(['/car-list']);
  }
  remove(href) {
    this.OwnerService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
  save(form: NgForm) {
    this.OwnerService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error)); 
  }

}
