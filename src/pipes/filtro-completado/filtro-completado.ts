import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../../models';


/**
 * Generated class for the FiltroCompletadoPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'filtroCompletado',
  pure: false // para que siempre este escuchando cualquier cambio de la app
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform(listas: Lista[], completada: boolean) {
    return listas.filter(lista => {
      return lista.terminada === completada
    });
  }
}
