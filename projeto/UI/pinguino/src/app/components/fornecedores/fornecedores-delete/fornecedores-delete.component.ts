import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fornecedor } from 'src/app/models/fornecedor';
import { MessageBoxService } from 'src/app/services/message-box.service';
import { FornecedoresService } from 'src/app/services/fornecedores.service';

@Component({
  selector: 'app-fornecedores-delete',
  templateUrl: './fornecedores-delete.component.html',
  styleUrls: ['./fornecedores-delete.component.css']
})
export class FornecedoresDeleteComponent implements OnInit {

  fornecedor = new Fornecedor();

  constructor(
    private service: FornecedoresService,
    private router: Router,
    private route: ActivatedRoute,
    private message: MessageBoxService
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if ( id != null ) 
      this.get(parseInt(id));
  }

  get(id: number): void {
    let idAux: string = id.toString();
    this.service.getOne(idAux).subscribe(
      result => { this.fornecedor = result; }
    )
  }

  save(): void {
    this.service.delete(this.fornecedor.id).subscribe(
      result => {        
        this.message.show("Fornecedor Excluído com Sucesso.");
        this.router.navigate(["/fornecedores"]);
      }
    )
  }

  cancel(): void {
    this.router.navigate(['/fornecedores']);
  }

}

