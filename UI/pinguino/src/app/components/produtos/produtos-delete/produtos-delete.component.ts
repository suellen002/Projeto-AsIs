import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/models/produto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageBoxService } from 'src/app/services/message-box.service';

@Component({
  selector: 'app-produtos-delete',
  templateUrl: './produtos-delete.component.html',
  styleUrls: ['./produtos-delete.component.css']
})
export class ProdutosDeleteComponent implements OnInit {

  produto = new Produto();

  constructor(
    private service: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    private message: MessageBoxService
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id != null)
      this.get(parseInt(id));
  }

  get(id: number): void {
    this.service.getOne(id).subscribe(
      result => { this.produto = result; }
    )
  }

  save(): void {
    this.service.delete(this.produto.id).subscribe(
      result => {
        this.message.show("Produto excluído com Sucesso.");
        this.router.navigate(["/produtos"]);
      }
    )
  }

  cancel(): void {
    this.router.navigate(['/produtos']);
  }

}
