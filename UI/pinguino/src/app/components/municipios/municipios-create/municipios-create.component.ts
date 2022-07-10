import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Municipio } from 'src/app/models/municipio';
import { MessageBoxService } from 'src/app/services/message-box.service';
import { MunicipiosService } from 'src/app/services/municipios.service';

import { Estado } from 'src/app/models/estado';
import { EstadosService } from 'src/app/services/estados.service';

@Component({
  selector: 'app-municipios-create',
  templateUrl: './municipios-create.component.html',
  styleUrls: ['./municipios-create.component.css']
})
export class MunicipiosCreateComponent implements OnInit {

  title = "Novo Município";
  isUpdate: boolean = false;

  municipio = new Municipio();
  estados = new Array<Estado>();

  constructor(
    private service: MunicipiosService,
    private estadosService: EstadosService,
    private router: Router,
    private route: ActivatedRoute,
    private message: MessageBoxService
  ) {

    this.carregarEstados();
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.isUpdate = true;
      this.get(parseInt(id)); 
      this.title = "Editar Município";
    }
  }

  carregarEstados(): void {

    this.estadosService.get().subscribe(
      result => {
        this.estados = result;
      }
    )
  }

  get(id: number): void {

    this.estadosService.get().subscribe(
      result => {
        this.estados = result;
        this.service.getOne(id).subscribe(
          result => {
            this.municipio = result;
        });
    });
  }

  save(): void {
    if (this.isUpdate)
      this.updateOne();
    else
      this.create();
  }

  create(): void {
    this.service.createOne(this.municipio).subscribe(
      result => {
        this.message.show("Municipio incluído com sucesso.");
        this.router.navigate(['/municipios']);
      }
    )
  }

  updateOne(): void {
    this.service.updateOne(this.municipio).subscribe(
      result => {
        this.message.show("Municipio atualizado com sucesso.");
        this.router.navigate(['/municipios']);
      }
    )
  }

  cancel(): void {
    this.router.navigate(['/municipios']);
  }

}
