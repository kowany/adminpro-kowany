import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Usuario } from './../../models/usuario.model';
import { URL_SERVICIOS } from './../../config/config';
import { SubirArchivoService } from './../subir-archivo/subir-archivo.service';
import 'rxjs/add/operator/map';
import * as swal from 'sweetalert';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( 
    public http: HttpClient, 
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  estaLogueado( ) {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {

      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );

    } else {

      this.token = '';
      this.usuario = null;

    }
  }
  guardarStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( usuario ) );

    this.usuario = usuario;
    this.token = token;

  }

  logout() {

    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate( ['/login'] );

  }

  loginGoogle ( token: string ) {

    const url = `${URL_SERVICIOS}/login/google`;
    return this.http.post( url, { token } )
              .map( ( resp: any ) => {
                this.guardarStorage( resp.id, resp.token, resp.usuario );
                return true;
              });
  }
  
  login( usuario: Usuario, recordar: boolean = false ) {
    if ( recordar ) {
      localStorage.setItem( 'email', usuario.email );
    } else {
      localStorage.removeItem( 'email' );
    }

    const url = `${URL_SERVICIOS}/login`;
    console.log ( usuario, recordar, url );

    return this.http.post( url, usuario )
                .map( ( resp: any ) => {
                  console.log( resp );
                  this.guardarStorage( resp.id, resp.token, resp.usuario );

                  return true;

                });
  }

  crearUsuario ( usuario: Usuario ) {


    const url = `${URL_SERVICIOS}/usuario`;

    return this.http.post( url, usuario )
    .map( ( resp: any ) => {
      // swal( 'Usuario creado', usuario.email, 'success' );
       return resp.usuario;
      });
    }
    
    actualizarUsuario( usuario: Usuario ) {
      usuario.role = this.usuario.role;
      const url = `${URL_SERVICIOS}/usuario/${this.usuario._id}?token=${this.token}`;
      console.log( url );
      
      return this.http.put( url, usuario )
        .map( ( resp: any ) => {
          const usuarioDB = resp.usuario;
          console.log( usuarioDB, this.token );
         this.guardarStorage( usuarioDB._id, this.token , usuarioDB );
  
          swal( 'Usuario actualizado', usuario.nombre, 'success' );
          
          return true;
        });
        
      }
      
      cambiarImagen( archivo: File, id: string ) {
        this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
        .then( (resp: any ) => {
          this.usuario.img = resp.usuario.img;
          swal( 'Imagen actualizada', this.usuario.nombre, 'success' );
          this.guardarStorage( id, this.token, this.usuario );
          })
          .catch( err => {
            console.error( err );
          })

  }
}
