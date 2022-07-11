import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Municipio } from 'src/app/models/municipio';
import { MessageBoxService } from 'src/app/services/message-box.service';
import { MunicipiosService } from 'src/app/services/municipios.service';
import { EnderecosService } from 'src/app/services/enderecos.service';
import { Endereco } from 'src/app/models/endereco';
import { EstadosService } from 'src/app/services/estados.service';
import { Estado } from 'src/app/models/estado';
import { Pais } from 'src/app/models/pais';
import { PaisesService } from 'src/app/services/paises.service';
import { MatOptionSelectionChange } from '@angular/material/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enderecos-create',
  templateUrl: './enderecos-create.component.html',
  styleUrls: ['./enderecos-create.component.css']
})
export class EnderecosCreateComponent implements OnInit {

  title = "Novo Endereco";
  isUpdate = false;

  endereco = new Endereco();

  municipios_all = new Array<Municipio>();
  estados_all = new Array<Estado>();
  paises_all = new Array<Pais>();

  municipios = new Array<Municipio>();
  estados = new Array<Estado>();
  paises = new Array<Pais>();

  formGroup = new FormGroup({});

  constructor(
    private service: EnderecosService,
    private municipiosService: MunicipiosService,
    private estadosService: EstadosService,
    private paisesService: PaisesService,
    private router: Router,
    private route: ActivatedRoute,
    private message: MessageBoxService
  ) {
    this.buildGroup();
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id'); 

    this.load().then(
      value => {
        console.log("Value: ", value);
        if (id != null) {         
          this.get(id);
          this.isUpdate = true;
          this.title = "Editar Endereço";
        }
    })
    .catch(
      value => { console.log("Ocorreu um erro") }
    )    
  }

  buildGroup(): void {
    this.formGroup.addControl("id", new FormControl());    
    this.formGroup.addControl("cep", new FormControl('', Validators.required));
    this.formGroup.addControl("logradouro", new FormControl('', Validators.required));
    this.formGroup.addControl("numero", new FormControl('', Validators.required));
    this.formGroup.addControl("complemento", new FormControl());
    this.formGroup.addControl("municipio", new FormControl('', Validators.required));
    this.formGroup.addControl("estado", new FormControl());
    this.formGroup.addControl("pais", new FormControl());

    this.formGroup.controls["pais"].setValue("1");
  }

  formGroupGetValue(): void {
    this.endereco.cep = this.formGroup.controls["cep"].value;
    this.endereco.logradouro = this.formGroup.controls["logradouro"].value;
    this.endereco.numero = this.formGroup.controls["numero"].value;
    this.endereco.complemento = this.formGroup.controls["complemento"].value;
    this.endereco.municipio = this.formGroup.controls["municipio"].value;
  }

  formGroupSetValue(): void {    
    this.formGroup.controls["id"].setValue(this.endereco.id);
    this.formGroup.controls["cep"].setValue(this.endereco.cep);
    this.formGroup.controls["logradouro"].setValue(this.endereco.logradouro);
    this.formGroup.controls["numero"].setValue(this.endereco.numero);
    this.formGroup.controls["complemento"].setValue(this.endereco.complemento);
    this.formGroup.controls["pais"].setValue(this.endereco.municipio.estado.pais.id);   
    this.formGroup.controls["estado"].setValue(this.endereco.municipio.estado.id);
    this.formGroup.controls["municipio"].setValue(this.endereco.municipio);
  }

  load(): Promise<boolean> {
    var promisse = new Promise<boolean>(() => {
      this.paisesService.get().subscribe(
        result => { 
          this.paises_all = result; 
          this.paises = result;
          console.log("Paises Carregado")
          this.estadosService.get().subscribe(
            result => {
              this.estados_all = result; 
              this.estados = this.estados_all.filter(e => e.pais.id == 1);
              console.log("Estados Carregado")
              this.municipiosService.get().subscribe(
                result => { 
                  this.municipios_all = result;  
                  console.log("Municipios Carregado")  
              });
          });
      }); 
    });    

    return promisse;
  }

  get(id: string): void {
    console.log("Inicio Get")
    this.service.getOne(id).subscribe(
      endereco => {
        this.endereco = endereco;

        this.estados = this.estados_all.filter(e => e.pais.id == this.endereco.municipio.estado.pais.id);    
        this.municipios = this.municipios_all.filter(m => m.estado.id == this.endereco.municipio.estado.id);

        this.formGroupSetValue();
    });
  }

  save(): void {
    this.formGroupGetValue();
    if (this.isUpdate)
      this.updateOne();
    else
      this.create();
  }

  create(): void {
    this.service.createOne(this.endereco).subscribe(
      result => {
        this.message.show("Endereco incluído com sucesso.");
        this.router.navigate(['/enderecos']);
      }
    )
  }

  updateOne(): void {
    this.service.updateOne(this.endereco).subscribe(
      result => {
        this.message.show("Endereco atualizado com sucesso.");
        this.router.navigate(['/enderecos']);
      }
    )
  }

  cancel(): void {
    this.router.navigate(['/enderecos']);
  }

  paisSelectionChange(event: MatOptionSelectionChange): void {
    if (event.isUserInput)
    {
      this.estados = new Array<Estado>();
      this.estados = this.estados_all.filter(e => e.pais.id == parseInt(event.source.value));

      this.municipios = new Array<Municipio>();

      this.formGroup.controls["estado"].setValue('');
      this.formGroup.controls["municipio"].setValue('');
    }
  }

  estadoSelectionChange(event: MatOptionSelectionChange): void {
    if (event.isUserInput)
    {
      this.municipios = new Array<Municipio>();
      this.municipios = this.municipios_all.filter(m => m.estado.id == parseInt(event.source.value));

      this.formGroup.controls["municipio"].setValue('');
    }
  }

}
