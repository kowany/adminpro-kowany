import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  constructor() {


    this.subscription = this.regresaObservable()
    .subscribe(
      numero => console.log( 'Subs', numero ),
      error => console.log( 'Ha ocurrido un error', error ),
      () => console.log( 'El observador terminó' )
    );
  }
  regresaObservable(): Observable<any> {
    return new Observable( observer => {

    let contador = 0;
    const intervalo = setInterval( () => {

        contador += 1;
        const salida = {
          valor: contador
        };
        observer.next( salida );

        // if ( contador === 3 ) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }
        // if ( contador === 2 ) {
        //   observer.error( 'Apenas estamos en el 2' );
        // }
      }, 1000 );
    })
    .retry( 2 )
    .map( (res: any) => {
      return res.valor;
    })
    .filter( numero => {
      if ( numero % 2 === 1 ) {
        return numero;
      }
    });
  }
  ngOnInit() {
  }
  ngOnDestroy( ) {
    this.subscription.unsubscribe();
  }

}
