import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(
              public _usuarioService: UsuarioService,
              public router: Router
            ) {}

  canActivate( ) {

    if ( this._usuarioService.estaLogueado() ) {

      console.log( 'Everything ok in Login Guard' );
      return true;

    } else {

      console.log( 'Bloqueado por el Guard' );
      this.router.navigate( ['/login'] );
      return false;

    }

  }
}
