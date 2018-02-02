import { Component, OnInit } from '@angular/core';
import { Medico } from './../../models/medico.model';
import { MedicoService } from './../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos()
          .subscribe( ( medicos: Medico[] ) => {
            this.medicos = medicos;
          });
  }
  buscarMedico( termino: string ) {

    if ( !termino || termino.length === 0 ) {
      this.cargarMedicos();
      return;
    }

    this._medicoService.buscarMedicos( termino )
          .subscribe( ( medicos: Medico[] ) => this.medicos = medicos );
  }

  borrarMedico( medico: Medico ) {
    swal({
      title: '¿ Estás seguro ?',
      text: `Estás a punto de borrar ${ medico.nombre }`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {

      if ( borrar ) {
        this._medicoService.borrarMedico( medico._id )
              .subscribe( () => this.cargarMedicos() );
      }
    });

  }

}
