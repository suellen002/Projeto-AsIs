import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pais } from 'src/app/models/pais';
import { MessageBoxService } from 'src/app/services/message-box.service';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-paises-create',
  templateUrl: './paises-create.component.html',
  styleUrls: ['./paises-create.component.css']
})
export class PaisesCreateComponent implements OnInit {

  title = "Novo País";
  isUpdate: boolean = false;

  pais = new Pais();
  formGroup = new FormGroup({});

  constructor(
    private service: PaisesService,
    private router: Router,
    private route: ActivatedRoute,
    private message: MessageBoxService
  ) { }
 
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.buildFormGroup();
    if ( id != null ) 
    { 
      this.isUpdate = true;
      this.get(parseInt(id)); 
      this.title = "Editar País";
    }
  }

  buildFormGroup(): void {
    this.formGroup.addControl("id", new FormControl());
    this.formGroup.addControl("descricao", new FormControl('', Validators.required));
    this.formGroup.addControl("codigoArea", new FormControl('', Validators.required));
  }

  buildObject(): void {
    this.pais.descricao = this.formGroup.controls["descricao"].value;
    this.pais.codigoArea = this.formGroup.controls["codigoArea"].value;
  }

  loadValues(): void {
    this.formGroup.controls["id"].setValue(this.pais.id);
    this.formGroup.controls["descricao"].setValue(this.pais.descricao);
    this.formGroup.controls["codigoArea"].setValue(this.pais.codigoArea);
  }

  get(id: number): void {
    this.service.getOne(id).subscribe(
      result => { 
        this.pais = result; 
        this.loadValues();
    })
  }

  save(): void {
    this.buildObject();
    if(this.isUpdate)
      this.updateOne();
    else
      this.create();
  }

  create(): void {
    this.service.createOne(this.pais).subscribe(
      result => { 
        this.message.show("País incluído com sucesso.");
        this.router.navigate(['/paises']);
      }
    )
  }

  updateOne(): void {
    this.service.updateOne(this.pais).subscribe(
      result => { 
        this.message.show("País atualizado com sucesso.");
        this.router.navigate(['/paises']);
      }
    )
  }

  cancel(): void {
    this.router.navigate(['/paises']);
  }
}
