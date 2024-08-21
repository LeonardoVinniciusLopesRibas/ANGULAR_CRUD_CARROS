import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../../auth/login.service';
import { Login } from '../../../auth/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  login: Login = new Login();

  router = inject(Router);
  loginService = inject(LoginService);


  logar(){

    this.loginService.logar(this.login).subscribe({
      next: token => {
        if(token){//o usuario estão corretos
          this.loginService.addToken(token);
          this.router.navigate(['/admin/carros']);
        }else{
          Swal.fire({
            title: 'Erro!',
            text: 'Usuário ou senha incorretos',
            icon: 'error',
            confirmButtonText: 'Ok'
          });          
        }
      },
      error: erro => {
        Swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro! O erro é: ' + (erro.response?.data?.message || erro.message || 'Erro desconhecido'),
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
      
    });

  }

}
