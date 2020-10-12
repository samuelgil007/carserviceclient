import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  owners: Array<any>;

  constructor(private OwnerService: OwnerService, private giphyService: GiphyService) { 
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

}
