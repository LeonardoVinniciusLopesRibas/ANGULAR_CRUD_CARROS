import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MdbCollapseModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  router = inject(Router);
  loginService = inject(LoginService);

  deslogar(): void {
    this.loginService.removerToken();
    this.router.navigate(['/login']);
  }

}
