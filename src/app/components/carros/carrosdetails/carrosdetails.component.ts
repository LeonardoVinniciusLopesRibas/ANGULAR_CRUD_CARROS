import { Component, EventEmitter, Inject, inject, Input, Optional, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

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


  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id)
    }
  }

  findById(id: number){
    let carroRetornado: Carro = new Carro(id, "Passat");
    this.carro = carroRetornado;
  }

  salvar(){
    if(!this.carro.nome || this.carro.nome.trim() === ""){
      Swal.fire({
        title: 'Erro de Validação!',
        text: 'Nome é obrigatório!',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
    else if(this.carro.id > 0){
      
      Swal.fire({
        title: 'Sucesso!',
        text: 'Editado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      
      this.routerRedirect.navigate(["/admin/carros"], {state: {carroEditado: this.carro}});
    }else{
      
      Swal.fire({
        title: 'Sucesso!',
        text: 'Salvo com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });

      this.routerRedirect.navigate(["/admin/carros"], {state: {carroNovo: this.carro}});
    }
    this.retorno.emit(this.carro);
  }


}
