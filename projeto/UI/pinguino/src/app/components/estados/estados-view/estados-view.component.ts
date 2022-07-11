import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estado } from 'src/app/models/estado';
import { EstadosService } from 'src/app/services/estados.service';

@Component({
  selector: 'app-estados-view',
  templateUrl: './estados-view.component.html',
  styleUrls: ['./estados-view.component.css']
})
export class EstadosViewComponent implements OnInit {

  estados = new Array<Estado>();

  constructor(
    private service: EstadosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.get().subscribe(
      estados => {
        this.estados = estados;
    })
  }

  create(): void {
    this.router.navigate(["/estados/create"]);
  }

}
