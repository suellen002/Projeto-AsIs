import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from 'src/app/models/estado';
import { Pais } from 'src/app/models/pais';
import { EstadosService } from 'src/app/services/estados.service';
import { MessageBoxService } from 'src/app/services/message-box.service';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-estados-create',
  templateUrl: './estados-create.component.html',
  styleUrls: ['./estados-create.component.css']
}) 
export class EstadosCreateComponent implements OnInit {

  estado = new Estado();
  paises = new Array<Pais>();
  formGroup = new FormGroup({});

  isUpdate = false;

  constructor(
    private service: EstadosService,
    private paisesService: PaisesService,
    private message: MessageBoxService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
 
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.buildFormGroup();
    this.load(id);       
  }  

  buildFormGroup(): void {
    this.formGroup.addControl("id", new FormControl());
    this.formGroup.addControl("pais", new FormControl('', Validators.required));
    this.formGroup.addControl("descricao", new FormControl('', Validators.required));
    this.formGroup.addControl("sigla", new FormControl('', Validators.required));
  }

  buildObject(): void {
    this.estado.descricao = this.formGroup.controls["descricao"].value;
    this.estado.sigla = this.formGroup.controls["sigla"].value;
    this.estado.pais = this.paises.find(p => p.id == this.formGroup.controls["pais"].value) ?? new Pais();
  }

  loadValues(): void {
    this.formGroup.controls["id"].setValue(this.estado.id);
    this.formGroup.controls["descricao"].setValue(this.estado.descricao);
    this.formGroup.controls["sigla"].setValue(this.estado.sigla);
    this.formGroup.controls["pais"].setValue(this.estado.pais.id.toString());
  }

  get(id: string): void {
    this.service.getOne(id).subscribe(
      estado => {
        this.estado = estado;        
        this.loadValues();
    });
  }

  load(id: string | null): void {
    this.paisesService.get().subscribe(
      paises => { 
        this.paises = paises;
        if ( id != null ) 
        { 
          this.isUpdate = true;
          this.get(id); 
        }
    });
  }

  save(): void {
    this.buildObject();
    if(this.isUpdate)
    {
      this.service.updateOne(this.estado).subscribe(
        result => { this.message.show("Estado Atualizado com Sucesso.");
        this.router.navigate(['/estados']);
      });
    }
    else
    {
      this.service.createOne(this.estado).subscribe(
        result => { this.message.show("Estado Criado com Sucesso");
        this.router.navigate(['/estados']);
      });
    }
  }

  cancel(): void {    
    this.router.navigate(['/estados']);
  }

}
