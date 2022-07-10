import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Endereco } from 'src/app/models/endereco';
import { EnderecosService } from 'src/app/services/enderecos.service';

@Component({
  selector: 'app-enderecos-view',
  templateUrl: './enderecos-view.component.html',
  styleUrls: ['./enderecos-view.component.css']
})

export class EnderecosViewComponent implements OnInit {

  enderecos = new Array<Endereco>();

  constructor(
    private service: EnderecosService,
    private router: Router    
  ) { 
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.get().subscribe(
      enderecos => {
        this.enderecos = enderecos;
    });
  }

  create(): void{
    this.router.navigate(['/enderecos/create']);
  }
}
