import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CarrosdetailsComponent } from '../carrosdetails/carrosdetails.component';
import { CarroService } from '../../../services/carro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, CarrosdetailsComponent],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss'
})
export class CarroslistComponent {

  lista: Carro[] = [];
  carroEdit: Carro = new Carro(0, "");

  //ELEMENTOS DA MODAL
  modalService = inject(MdbModalService); // Para conseguir abrir a modal
  @ViewChild('modalCarroDetalhe') modalCarroDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>
  //FIM ELEMENTO DA MODAL

  carroService = inject(CarroService);

  constructor() {
    this.listar();


    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;

    if (carroNovo) {
      carroNovo.id = 4;
      this.lista.push(carroNovo);
    }

    if (carroEditado) {
      let indice = this.lista.findIndex(x => {
        return x.id == carroEditado.id
      });
      this.lista[indice] = carroEditado;
    }

  }
  listar() {
    this.carroService.listar().subscribe({
      next: lista => {//quando back retorna bom
        this.lista = lista;
      },
      error: erro => {//quando retornar erro
        Swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro! O erro é: ' + (erro.response?.data?.message || erro.message || 'Erro desconhecido'),
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      },
    });
  }

  deletar(id: number) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: false,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.carroService.deletar(id).subscribe({
          next: mensagem => { // Quando o back-end retorna sucesso
            Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.listar();
          },
          error: erro => { // Quando retorna erro
            Swal.fire({
              title: 'Erro!',
              text: 'Ocorreu um erro! O erro é: ' + (erro.response?.data?.message || erro.message || 'Erro desconhecido'),
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          },
        });
      }
    });
  }


  new() {
    this.carroEdit = new Carro(0, "");
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  edit(carro: Carro) {
    this.carroEdit = Object.assign({}, carro); //clonando para evitar edição errada de objeto
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  retornoDetalhe(carro: Carro){
    this.listar();
    this.modalRef.close();
  }

}
