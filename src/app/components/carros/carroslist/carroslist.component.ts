import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CarrosdetailsComponent } from '../carrosdetails/carrosdetails.component';

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


  constructor() {
    this.lista.push(new Carro(1, 'Fiesta'));
    this.lista.push(new Carro(2, 'Monza'));
    this.lista.push(new Carro(3, 'KA'));
    
    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;
    
    if(carroNovo){
      carroNovo.id = 4;
      this.lista.push(carroNovo);
    }

    if(carroEditado){
      let indice = this.lista.findIndex(x => {
        return x.id == carroEditado.id
      });
      this.lista[indice] = carroEditado;
    }

  }

  deletar(id: number) {

    if (confirm("Tem certeza que deseja deletar?")) {

      let indice = this.lista.findIndex(x => {
        return x.id == id;
      });

      this.lista.splice(indice, 1);
    }
  }

  new(){
    this.carroEdit = new Carro(0, "");
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  edit(carro:Carro){
    this.carroEdit = Object.assign({}, carro); //clonando para evitar edição errada de objeto
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  retornoDetalhe(carro: Carro){

    if(carro.id >0){
      let indice = this.lista.findIndex(x => {return x.id == carro.id});
      this.lista[indice] = carro;
    }else{
      carro.id = 4;
      this.lista.push(carro);
    }
    this.modalRef.close();
  }

}
