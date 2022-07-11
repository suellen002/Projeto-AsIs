import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pais } from 'src/app/models/pais';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-paises-view',
  templateUrl: './paises-view.component.html',
  styleUrls: ['./paises-view.component.css']
})
export class PaisesViewComponent implements OnInit {

  paises = Array<Pais>();

  constructor(
    private service: PaisesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.get();
  }

  get(): void {
    this.service.get().subscribe(
      result => {
        this.paises = result;
      }
    );
  }

  create(): void {
    this.router.navigate(['/paises/create']);
  }

}
