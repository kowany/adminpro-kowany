import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SubirArchivoService } from './../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;
  // @ViewChild('archivo') archivo: ElementRef;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
          .then( resp => {
            this._modalUploadService.notificacion.emit( resp );
            this._modalUploadService.ocultarModal();
            this.cerrarModal();
          })
          .catch( err => {
            console.log( 'Error en la carga ', err );
          });
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this._modalUploadService.ocultarModal();
    // this.archivo.nativeElement.innerHTML = '';
  }
  seleccionImagen( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf( 'image' ) < 0 ) {
      swal( 'Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error' );
      this.imagenSubir = null;
      return;

    }
    this.imagenSubir = archivo;

    const reader = new FileReader();

    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;
    
    
  }

}
