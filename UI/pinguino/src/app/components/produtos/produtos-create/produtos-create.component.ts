import { FornecedoresService } from 'src/app/services/fornecedores.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Fornecedor } from 'src/app/models/fornecedor';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/models/produto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageBoxService } from 'src/app/services/message-box.service';


@Component({
  selector: 'app-produtos-create',
  templateUrl: './produtos-create.component.html',
  styleUrls: ['./produtos-create.component.css']
})
export class ProdutosCreateComponent implements OnInit {

  title = "Novo Produto";
  isUpdate: boolean = false;

  produto = new Produto();
  fornecedores = new Array<Fornecedor>();

  formGroup = new FormGroup({});

  constructor(
    private service: ProdutoService,
    private fornecedoresService: FornecedoresService,
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
    this.formGroup.addControl("sku", new FormControl('', Validators.required));
    this.formGroup.addControl("codigobarras", new FormControl('', Validators.required));
    this.formGroup.addControl("descricao", new FormControl('', Validators.required));
    this.formGroup.addControl("precovenda", new FormControl('', Validators.required));
    this.formGroup.addControl("fornecedor", new FormControl('', Validators.required));

  }

  buildObject(): void {
    this.produto.nome = this.formGroup.controls["nome"].value;
    this.produto.sku = this.formGroup.controls["sku"].value;
    this.produto.codigobarras = this.formGroup.controls["codigobarras"].value;
    this.produto.descricao = this.formGroup.controls["descricao"].value;
    this.produto.precovenda = this.formGroup.controls["precovenda"].value;
    this.produto.fornecedor =   this.fornecedores.find(p => p.id == this.formGroup.controls["fornecedor"].value) ?? new Fornecedor();
  }


  loadValues(): void {
    this.formGroup.controls["id"].setValue(this.produto.id);
    this.formGroup.controls["nome"].setValue(this.produto.nome);
    this.formGroup.controls["sku"].setValue(this.produto.sku);
    this.formGroup.controls["codigobarras"].setValue(this.produto.codigobarras);
    this.formGroup.controls["descricao"].setValue(this.produto.descricao);
    this.formGroup.controls["precovenda"].setValue(this.produto.precovenda);
    this.formGroup.controls["fornecedor"].setValue(this.produto.fornecedor.id);
  }

  get(id: number): void {
    this.service.getOne(id).subscribe(
      result => {
        this.produto = result;
        this.loadValues();
      }
    )
  }

  load(id: string | null): void {
    this.fornecedoresService.get().subscribe(
      fornecedores => {
        this.fornecedores = fornecedores;
        if (id != null) {
          this.isUpdate = true;
          this.get(Number(id));
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
    this.service.createOne(this.produto).subscribe(
      result => {
        this.message.show("Produto incluído com sucesso.");
        this.router.navigate(['/produtos']);
      }
    )
  }

  updateOne(): void {
    this.service.updateOne(this.produto).subscribe(
      result => {
        this.message.show("Produto atualizado com sucesso.");
        this.router.navigate(['/produtos']);
      }
    )
  }

  cancel(): void {
    this.router.navigate(['/produtos']);
  }

}
