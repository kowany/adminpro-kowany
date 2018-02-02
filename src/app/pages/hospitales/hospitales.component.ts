import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from './../../services/hospital/hospital.service';
import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';

declare var swal: any;
// import * as swal from 'sweetalert';
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
          .subscribe( () => this.cargarHospitales() );
  }

  cargarHospitales( ) {
    this.cargando = true;
    this._hospitalService.cargarHospitales( )
      .subscribe( ( data: any ) => {
        this.totalRegistros = data.total;
        this.hospitales = data.hospitales;
        this.cargando = false;
      });
  }
  buscarHospital( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this._hospitalService.buscarHospital( termino )
          .subscribe( resp => {
            this.totalRegistros = resp.length;
            this.hospitales = resp;
            this.cargando = false;
          } );
  }
  actualizarImagen( hospital: Hospital ) {
    this._modalUploadService.mostrarModal( 'hospitales', hospital._id );
  }

  crearHospital() {
    swal( {
      title: 'Crear hospital',
      text: 'Introduzca el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( ( valor: string ) => {
        if ( !valor || valor.length === 0 ) {
          return;
        }
        this._hospitalService.crearHospital( valor )
        .subscribe( resp => {
          console.log( resp );
          this.cargarHospitales();
        });

    } );
  }
  borrarHospital( hospital: Hospital ) {
    console.log( hospital );

    // this._hospitalService.borrarHospital( hospital._id )
    // .subscribe( ( borrado: Boolean ) => {
    //   this.cargarHospitales();
    // });
    swal({
      title: '¿ Estás seguro ?',
      text: `Estás a punto de borrar ${ hospital.nombre }`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {
      console.log( borrar );

      if ( borrar ) {
        this._hospitalService.borrarHospital( hospital._id )
              .subscribe( ( borrado: Boolean ) => {
                console.log( borrado );
                this.cargarHospitales();
              });

      }
    });

  }
  actualizarHospital( hospital: Hospital ) {
    this._hospitalService.actualizarHospital( hospital )
          .subscribe( (hospital: any) => console.log( hospital ));
  }
}
