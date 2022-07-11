import { MunicipiosService } from 'src/app/services/municipios.service';
import { Municipio } from 'src/app/models/municipio';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageBoxService } from 'src/app/services/message-box.service';

@Component({
  selector: 'app-municipios-delete',
  templateUrl: './municipios-delete.component.html',
  styleUrls: ['./municipios-delete.component.css']
})
export class MunicipiosDeleteComponent implements OnInit {

  municipio = new Municipio();

  constructor(
    private service: MunicipiosService,
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
      result => { this.municipio = result; }
    )
  }

  save(): void {
    this.service.delete(this.municipio.id).subscribe(
      result => {        
        this.message.show("Município Excluído com Sucesso.");
        this.router.navigate(["/municipios"]);
      }
    )
  }

  cancel(): void {
    this.router.navigate(['/municipios']);
  }

}
