import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from 'src/app/models/estado';
import { EstadosService } from 'src/app/services/estados.service';
import { MessageBoxService } from 'src/app/services/message-box.service';

@Component({
  selector: 'app-estados-delete',
  templateUrl: './estados-delete.component.html',
  styleUrls: ['./estados-delete.component.css']
})
export class EstadosDeleteComponent implements OnInit {

  estado = new Estado();

  constructor(
    private service: EstadosService,
    private router: Router,
    private route: ActivatedRoute,
    private message: MessageBoxService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if ( id != null ) 
      this.get(id);
  }

  get(id: string): void {
    this.service.getOne(id).subscribe(
      result => { this.estado = result; }
    )
  }

  save(): void {
    this.service.delete(this.estado.id).subscribe(
      result => {        
        this.message.show("Estado Excluído com Sucesso.");
        this.router.navigate(["/estados"]);
      }
    )
  }

  cancel(): void {
    this.router.navigate(['/estados']);
  }

}
