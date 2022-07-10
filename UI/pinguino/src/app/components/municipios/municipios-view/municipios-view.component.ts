import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Municipio } from 'src/app/models/municipio';
import { MunicipiosService } from 'src/app/services/municipios.service';
import { Estado } from 'src/app/models/estado';
import { EstadosService } from 'src/app/services/estados.service';
 
@Component({
  selector: 'app-municipios-view',
  templateUrl: './municipios-view.component.html',
  styleUrls: ['./municipios-view.component.css']
})

export class MunicipiosViewComponent implements OnInit {

  municipios = new Array<Municipio>();
  estados = new Array<Estado>();

  constructor(
    private service: MunicipiosService,
    private estadosService: EstadosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.estadosService.get().subscribe(
      result => { 
        this.estados = result; 
        this.service.get().subscribe(
          result => {
            this.municipios = result;             
        });
    });    
  }

  get(): void {
    this.service.get().subscribe(
      result => {
        this.municipios = result;
      }
    );
  }

  create(): void {
    this.router.navigate(['/municipios/create']);
  }

}
