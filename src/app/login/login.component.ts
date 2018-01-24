import { element } from 'protractor';
import { Usuario } from './../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from './../services/service.index';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;

  auth2: any;
  googleUser = {};

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem( 'email' ) || '';
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '354889783227-2u4rm3nll89ch5633j8bqbgqli8adh7c.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin( document.getElementById( 'btnGoogle' ) );
    });
  }

  attachSignin( elemento ) {
    this.auth2.attachClickHandler( elemento, {}, ( googleUser ) => {
            // const profile = googleUser.getBasicProfile();
            const token = googleUser.getAuthResponse().id_token;
            console.log( token );
            this._usuarioService.loginGoogle( token )
                    .subscribe( () => {
                      window.location.href = '#/dashboard';
                     // this.router.navigate( [ '/dashboard' ] );
                    });

        }, (error) => {
          console.log( JSON.stringify( error, undefined, 2 ) );
        });
  }

  ingresar( forma: NgForm ) {
    if ( !forma.valid ) {
      return;
    }

    const usuario = new Usuario( '', forma.value.email, forma.value.password );
    console.log( usuario );

    this._usuarioService.login( usuario, forma.value.recuerdame )
            .subscribe( correcto => {
              console.log( correcto );
              this.router.navigate( [ '/dashboard' ] );
            } );
  }
}
