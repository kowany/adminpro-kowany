import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicoService } from './../../services/service.index';
import { HospitalService } from './../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { Medico } from './../../models/medico.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico =  new Medico('', '', '', '', '') ;
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe( params => {
      const id = params['id'];

      if ( id !== 'nuevo' ) {
        this._medicoService.cargarMedico( id )
              .subscribe( medico => {
                console.log( medico );
                this.medico = medico;
                this.medico.hospital = medico.hospital._id;
                this.cambioHospital( this.medico.hospital );
              });
      }
    });
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales()
          .subscribe( ( data: any ) => this.hospitales = data.hospitales );

    this._modalUploadService.notificacion
          .subscribe( resp => {
            this.medico.img = resp.medico.img;
          });
  }

  cambioHospital( id ) {
    this._hospitalService.obtenerHospital( id )
          .subscribe( ( hospital: Hospital ) => this.hospital = hospital );
  }

  cargarMedico( id: string ) {
    this._medicoService.cargarMedico( id )
         .subscribe( ( medico: Medico ) => this.medico = medico );
  }
  guardarMedico( f: NgForm ) {

    if ( !f.valid ) {
      return;
    }
    // let parametro: any;
    // if ( this.medico._id ) {
    //   parametro = this.medico;
    // } else {
    //   parametro = f.value;
    // }
    this._medicoService.guardarMedico( this.medico )
      .subscribe( medico => {
        this.medico._id = medico._id;
        this.router.navigate( ['medico', medico._id] );
    });
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal( 'medicos', this.medico._id );
  }

}
