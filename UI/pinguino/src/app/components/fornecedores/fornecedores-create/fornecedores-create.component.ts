import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FornecedoresService } from 'src/app/services/fornecedores.service';
import { EnderecosService } from 'src/app/services/enderecos.service';
import { Endereco } from 'src/app/models/endereco';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageBoxService } from 'src/app/services/message-box.service';
import { Fornecedor } from 'src/app/models/fornecedor';

@Component({
  selector: 'app-fornecedores-create',
  templateUrl: './fornecedores-create.component.html',
  styleUrls: ['./fornecedores-create.component.css']
})

export class FornecedoresCreateComponent implements OnInit {

  title = "Novo Fornecedor";
  isUpdate: boolean = false;

  fornecedor = new Fornecedor();
  enderecos = new Array<Endereco>();

  formGroup = new FormGroup({});

  constructor(
    private service: FornecedoresService,
    private enderecosService: EnderecosService,
    private router: Router,
    private route: ActivatedRoute,
    private message: MessageBoxService
  ) {

  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.buildFormGroup();
    this.load(id);
  }

  buildFormGroup(): void {
    this.formGroup.addControl("id", new FormControl());
    this.formGroup.addControl("nome", new FormControl('', Validators.required));
    this.formGroup.addControl("cnpjCpf", new FormControl('', Validators.required));
    this.formGroup.addControl("email", new FormControl('', Validators.required));
    this.formGroup.addControl("endereco", new FormControl('', Validators.required));
  }

  buildObject(): void {
    this.fornecedor.nome = this.formGroup.controls["nome"].value;
    this.fornecedor.cnpjCpf = this.formGroup.controls["cnpjCpf"].value;
    this.fornecedor.email = this.formGroup.controls["email"].value;
    this.fornecedor.enderecoLogradouro = this.enderecos.find(e => e.id == this.formGroup.controls["endereco"].value)?.logradouro ?? '';

  }

  loadValues(): void {
    this.formGroup.controls["id"].setValue(this.fornecedor.id);
    this.formGroup.controls["nome"].setValue(this.fornecedor.nome);
    this.formGroup.controls["cnpjCpf"].setValue(this.fornecedor.cnpjCpf);
    this.formGroup.controls["email"].setValue(this.fornecedor.email);
    this.formGroup.controls["endereco"].setValue(this.fornecedor.endereco);

  }

  get(id: string): void {
    this.service.getOne(id).subscribe(
      result => {
        this.fornecedor = result;
        this.loadValues();
      }
    )
  }

  load(id: string | null): void {
    this.enderecosService.get().subscribe(
      enderecos => {
        this.enderecos = enderecos;
        if (id != null) {
          this.isUpdate = true;
          this.get(id);
        }
      });
  }

  save(): void {
    this.buildObject();
    if (this.isUpdate)
      this.updateOne();
    else
      this.create();
  }

  create(): void {
    this.service.createOne(this.fornecedor).subscribe(
      result => {
        this.message.show("Fornecedor incluído com sucesso.");
        this.router.navigate(['/fornecedores']);
      }
    )
  }

  updateOne(): void {
    this.service.updateOne(this.fornecedor).subscribe(
      result => {
        this.message.show("Fornecedor atualizado com sucesso.");
        this.router.navigate(['/fornecedores']);
      }
    )
  }

  cancel(): void {
    this.router.navigate(['/fornecedores']);
  }

}
