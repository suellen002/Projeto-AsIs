import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnderecosCreateComponent } from './components/enderecos/enderecos-create/enderecos-create.component';
import { EnderecosDeleteComponent } from './components/enderecos/enderecos-delete/enderecos-delete.component';
import { EnderecosViewComponent } from './components/enderecos/enderecos-view/enderecos-view.component';
import { EstadosCreateComponent } from './components/estados/estados-create/estados-create.component';
import { EstadosDeleteComponent } from './components/estados/estados-delete/estados-delete.component';
import { EstadosViewComponent } from './components/estados/estados-view/estados-view.component';
import { FornecedoresCreateComponent } from './components/fornecedores/fornecedores-create/fornecedores-create.component';
import { FornecedoresDeleteComponent } from './components/fornecedores/fornecedores-delete/fornecedores-delete.component';
import { FornecedoresViewComponent } from './components/fornecedores/fornecedores-view/fornecedores-view.component';
import { MunicipiosCreateComponent } from './components/municipios/municipios-create/municipios-create.component';
import { MunicipiosDeleteComponent } from './components/municipios/municipios-delete/municipios-delete.component';
import { MunicipiosViewComponent } from './components/municipios/municipios-view/municipios-view.component';
import { PaisesCreateComponent } from './components/paises/paises-create/paises-create.component';
import { PaisesDeleteComponent } from './components/paises/paises-delete/paises-delete.component';
import { PaisesViewComponent } from './components/paises/paises-view/paises-view.component';
import { HomeComponent } from './components/views/home/home.component';
import { LoginComponent } from './components/views/login/login.component';
import { ProdutosCreateComponent } from './components/produtos/produtos-create/produtos-create.component';
import { ProdutosDeleteComponent } from './components/produtos/produtos-delete/produtos-delete.component';
import { ProdutosViewComponent } from './components/produtos/produtos-view/produtos-view.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "paises", component: PaisesViewComponent },
  { path: "paises/create", component: PaisesCreateComponent },
  { path: "paises/update/:id", component: PaisesCreateComponent },
  { path: "paises/delete/:id", component: PaisesDeleteComponent },
  { path: "estados", component: EstadosViewComponent },
  { path: "estados/create", component: EstadosCreateComponent },
  { path: "estados/update/:id", component: EstadosCreateComponent },
  { path: "estados/delete/:id", component: EstadosDeleteComponent },
  { path: "municipios", component: MunicipiosViewComponent },
  { path: "municipios/create", component: MunicipiosCreateComponent },
  { path: "municipios/update/:id", component: MunicipiosCreateComponent },
  { path: "municipios/delete/:id", component: MunicipiosDeleteComponent },
  { path: "enderecos", component: EnderecosViewComponent },
  { path: "enderecos/create", component: EnderecosCreateComponent },
  { path: "enderecos/update/:id", component: EnderecosCreateComponent },
  { path: "enderecos/delete/:id", component: EnderecosDeleteComponent },
  { path: "fornecedores", component: FornecedoresViewComponent },
  { path: "fornecedores/create", component: FornecedoresCreateComponent },
  { path: "fornecedores/update/:id", component: FornecedoresCreateComponent },
  { path: "fornecedores/delete/:id", component: FornecedoresDeleteComponent },
  { path: "produtos", component: ProdutosViewComponent },
  { path: "produtos/create", component: ProdutosCreateComponent },
  { path: "produtos/update/:id", component: ProdutosCreateComponent },
  { path: "produtos/delete/:id", component: ProdutosDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
