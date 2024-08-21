import { Component, EventEmitter, Inject, inject, Input, Optional, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CarroService } from '../../../services/carro.service';

@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss'
})
export class CarrosdetailsComponent {

  @Input ("carro") carro: Carro = new Carro(0, "");
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  routerRedirect = inject(Router);
  carroService = inject(CarroService);

  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id)
    }
  }

  findById(id: number){

    this.carroService.listarId(id).subscribe({
      next: retorno => {
        this.carro = retorno;
      },
      error: erro => {
        Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });

  }

  salvar() {
    if (this.carro.id > 0) {

      this.carroService.atualizar(this.carro, this.carro.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.routerRedirect.navigate(['admin/carros'], { state: { carroEditado: this.carro } });
          this.retorno.emit(this.carro);
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      });

    } else {

      this.carroService.salvar(this.carro).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.routerRedirect.navigate(['admin/carros'], { state: { carroNovo: this.carro } });
          this.retorno.emit(this.carro);
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      });

    }


  }


}
