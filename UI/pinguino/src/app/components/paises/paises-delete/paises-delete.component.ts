import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pais } from 'src/app/models/pais';
import { MessageBoxService } from 'src/app/services/message-box.service';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-paises-delete',
  templateUrl: './paises-delete.component.html',
  styleUrls: ['./paises-delete.component.css']
})
export class PaisesDeleteComponent implements OnInit {

  pais = new Pais();

  constructor(
    private service: PaisesService,
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
    this.service.getOne(id).subscribe(
      result => { this.pais = result; }
    )
  }

  save(): void {
    this.service.delete(this.pais.id).subscribe(
      result => {        
        this.message.show("País Excluído com Sucesso.");
        this.router.navigate(["/paises"]);
      }
    )
  }

  cancel(): void {
    this.router.navigate(['/paises']);
  }

}
