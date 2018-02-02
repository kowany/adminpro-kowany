import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from './../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from './../../models/medico.model';

declare var swal: any;

@Injectable()
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos() {
    const url = `${ URL_SERVICIOS }/medico`;

    return this.http.get( url )
            .map( ( resp: any ) => {
              this.totalMedicos = resp.total;
              return resp.medicos;
            });
  }
  buscarMedicos ( termino: string ) {
    const url = `${ URL_SERVICIOS }/busqueda/coleccion/medicos/${ termino }`;
     return this.http.get( url )
        .map( ( resp: any ) => resp.medicos );

  }
  cargarMedico( id: string ) {
    const url = `${URL_SERVICIOS}/medico/${id}`;
    
    return this.http.get( url )
              .map( ( resp: any ) => resp.medico );
  }
  borrarMedico( id: string ) {

    const url = `${URL_SERVICIOS}/medico/${id}?token=${this._usuarioService.token}`;

    return this.http.delete( url )
        .map( resp => {
          console.log( 'Hospital borrado' );
          swal( 'Hospital borrado', 'El hospital ha sido borrado correctamente', 'success' );
          return true;
        });
  }

  guardarMedico( medico: Medico ) {
    console.log( medico );
    let url = `${URL_SERVICIOS}/medico?token=${this._usuarioService.token}`;

    if ( medico._id ) {
      // actualizando
      url = `${URL_SERVICIOS}/medico/${medico._id}?token=${this._usuarioService.token}`;
      console.log( url );
      return this.http.put( url, medico )
              .map( ( resp: any ) => {
                swal( 'Médico actualizado', medico.nombre, 'success');
                return resp.medico;
              });
            } else {
              // creando médico
      console.log( url );
      return this.http.post( url, medico )
              .map( ( resp: any ) => {
                swal( 'Médico Creado', medico.nombre, 'success');
                return resp.medico;
              });
    }

  }
}
