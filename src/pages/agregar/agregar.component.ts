import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista, ListaItem } from '../../models';
import { NavParams } from 'ionic-angular';


@Component({
    selector: 'page-agregar',
    templateUrl: 'agregar.component.html'
})
export class AgregarPage {

    lista: Lista;
    nombreItem: string = '';

    constructor(public deseosService: DeseosService, private navParams: NavParams) {
        // console.log(this.navParams.get('titulo'));
        const titulo: string = this.navParams.get('titulo');
        // para evitar listas duplicadas
        if(this.navParams.get('lista')) {
            this.lista = this.navParams.get('lista');
        } else {
        this.lista = new Lista(titulo);
        this.deseosService.agregarLista(this.lista);
        }
        
     }
     agregarItem() {
        if(this.nombreItem.length === 0) {
            return;
        }
        const nuevoItem = new ListaItem(this.nombreItem);
        this.lista.items.push(nuevoItem);
        this.deseosService.guardarStorage(); // en cuanto actualizo la lista atualizo localStorage
        this.nombreItem = ''; // reseteo para poder seguir haciendo iserciones si quiere el usuario

     }
     actualizarTarea(item: ListaItem) {
        item.completado = !item.completado;
        // creo un arreglo filtrado por el campo items.completado = false y devuelvo la cantidad de elementos false
        const pendientes = this.lista.items.filter(itemData => {
            return !itemData.completado
        }).length;
        if(pendientes === 0) {
            this.lista.terminada = true;
            this.lista.terminadaEn = new Date();
        } else {
            this.lista.terminada = false;
            this.lista.terminadaEn = null;
        }
        this.deseosService.guardarStorage();
     }
     borrar(i: number) {
         this.lista.items.splice(i, 1);
         this.deseosService.guardarStorage();
     }
}