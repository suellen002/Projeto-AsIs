import { FornecedoresService } from 'src/app/services/fornecedores.service';
import { Fornecedor } from 'src/app/models/fornecedor';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/models/produto';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-produtos-view',
  templateUrl: './produtos-view.component.html',
  styleUrls: ['./produtos-view.component.css']
})
export class ProdutosViewComponent implements OnInit {

  produtos = new Array<Produto>();
  fornecedores = new Array<Fornecedor>();

  constructor(
    private service: ProdutoService,
    private fornecedoresService: FornecedoresService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.get().subscribe(
      result => {
        this.produtos = result;
      }
    )

  }

  get(): void {
    this.service.get().subscribe(
      result => {
        this.produtos = result;
      }
    );
  }

  create(): void {
    this.router.navigate(['/produtos/create']);
  }

}
