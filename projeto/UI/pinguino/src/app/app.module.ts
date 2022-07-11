import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from "@angular/common/http";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/template/header/header.component';
import { NavComponent } from './components/template/nav/nav.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/template/menu/menu.component';
import { LoginComponent } from './components/views/login/login.component';
import { HomeComponent } from './components/views/home/home.component';
import { PaisesViewComponent } from './components/paises/paises-view/paises-view.component';
import { PaisesCreateComponent } from './components/paises/paises-create/paises-create.component';
import { PaisesDeleteComponent } from './components/paises/paises-delete/paises-delete.component';
import { EstadosViewComponent } from './components/estados/estados-view/estados-view.component';
import { EstadosCreateComponent } from './components/estados/estados-create/estados-create.component';
import { EstadosDeleteComponent } from './components/estados/estados-delete/estados-delete.component';
import { MunicipiosViewComponent } from './components/municipios/municipios-view/municipios-view.component';
import { MunicipiosCreateComponent } from './components/municipios/municipios-create/municipios-create.component';
import { MunicipiosDeleteComponent } from './components/municipios/municipios-delete/municipios-delete.component';
import { EnderecosViewComponent } from './components/enderecos/enderecos-view/enderecos-view.component';
import { EnderecosCreateComponent } from './components/enderecos/enderecos-create/enderecos-create.component';
import { EnderecosDeleteComponent } from './components/enderecos/enderecos-delete/enderecos-delete.component';
import { FornecedoresViewComponent } from './components/fornecedores/fornecedores-view/fornecedores-view.component';
import { FornecedoresCreateComponent } from './components/fornecedores/fornecedores-create/fornecedores-create.component';
import { FornecedoresDeleteComponent } from './components/fornecedores/fornecedores-delete/fornecedores-delete.component';
import { ProdutosCreateComponent } from './components/produtos/produtos-create/produtos-create.component';
import { ProdutosDeleteComponent } from './components/produtos/produtos-delete/produtos-delete.component';
import { ProdutosViewComponent } from './components/produtos/produtos-view/produtos-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    MenuComponent,
    LoginComponent,
    HomeComponent,
    PaisesViewComponent,
    PaisesCreateComponent,
    PaisesDeleteComponent,
    EstadosViewComponent,
    EstadosCreateComponent,
    EstadosDeleteComponent,
    MunicipiosViewComponent,
    MunicipiosCreateComponent,
    MunicipiosDeleteComponent,
    EnderecosViewComponent,
    EnderecosCreateComponent,
    EnderecosDeleteComponent,
    FornecedoresViewComponent,
    FornecedoresCreateComponent,
    FornecedoresDeleteComponent,
    ProdutosCreateComponent,
    ProdutosDeleteComponent,
    ProdutosViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTreeModule,
    MatTableModule,
    HttpClientModule,
    MatTooltipModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
