import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from './../../config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';

// declare var swal: any;
import * as swal from 'sweetalert';

@Injectable()
export class HospitalService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }
  cargarHospitales( desde: number = 0 ) {
    const url = `${ URL_SERVICIOS }/hospital`;

    return this.http.get( url );
  }
  crearHospital( nombre: string ) {
    const url = `${URL_SERVICIOS}/hospital?token=${this._usuarioService.token}`;
    return this.http.post( url, { nombre } )
    .map( ( resp: any ) => {
        console.log( resp.hospital );
       swal( 'Hospital creado', resp.hospital.nombre , 'success' );
       return resp.hospital;
      });
  }
  obtenerHospital( id: string ) {
    const url = `${ URL_SERVICIOS }/hospital/${id}`;

    return this.http.get( url )
      .map( ( resp: any ) => {
        return resp.hospital;
      });


  }
  borrarHospital ( id: string ) {
    const url = `${URL_SERVICIOS}/hospital/${id}?token=${this._usuarioService.token}`;

    return this.http.delete( url )
        .map( resp => {
          console.log( 'Hospital borrado' );
          swal( 'Hospital borrado', 'El hospital ha sido borrado correctamente', 'success' );
          return true;
        });
  }
  buscarHospital( termino: string ) {
    const url = `${ URL_SERVICIOS }/busqueda/coleccion/hospitales/${ termino }`;
     return this.http.get( url )
        .map( ( resp: any ) => resp.hospitales );

  }
  actualizarHospital( hospital: Hospital ) {
    const url = `${ URL_SERVICIOS }/hospital/${hospital._id }?token=${ this._usuarioService.token }`;

    return this.http.put( url, hospital )
                .map( (resp: any ) => {
                  swal( 'Hospital actualizado', hospital.nombre, 'success' );
                  return resp.hospital;
                });
  }

}
