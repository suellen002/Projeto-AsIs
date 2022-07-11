import { LogadoSucesso } from './../../../models/logado-sucesso';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';
import { MessageBoxService } from 'src/app/services/message-box.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = { userName: '', password: '' };

  constructor(
    private message: MessageBoxService,
    private service: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logar(): void {

    console.log("logando")
    console.log(this.login)
    
    this.service.logar(this.login).subscribe(
      retorno => {

        console.log(retorno);
        this.router.navigateByUrl('/');

      }, (error) => {
        console.log(error);
        this.message.show(error.error);
      }

    )
  }

  cancelar(): void {
    this.router.navigateByUrl("/");
  }
}
