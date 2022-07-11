import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fornecedor } from 'src/app/models/fornecedor';
import { FornecedoresService } from 'src/app/services/fornecedores.service';
import { Endereco } from 'src/app/models/endereco';
import { EnderecosService } from 'src/app/services/enderecos.service';

@Component({
  selector: 'app-fornecedores-view',
  templateUrl: './fornecedores-view.component.html',
  styleUrls: ['./fornecedores-view.component.css']
})
export class FornecedoresViewComponent implements OnInit {

  fornecedores = new Array<Fornecedor>();
  enderecos = new Array<Endereco>();

  constructor(
    private service: FornecedoresService,
    private enderecosService: EnderecosService,
    private router: Router
    
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.enderecosService.get().subscribe(
      result => { 
        this.enderecos = result; 
        this.service.get().subscribe(
          result => {
            this.fornecedores = result; 
            
          }
        )
      }
    )    
  }


  get(): void {
    this.service.get().subscribe(
      result => {
        this.fornecedores = result;
      }
    );
  }

  create(): void{
    this.router.navigate(['/fornecedores/create']);
  }

}
