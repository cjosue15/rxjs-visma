import {
  combineLatestAll,
  Observable,
  switchMap,
  of,
  combineLatest,
  interval,
  forkJoin,
  Subject,
  throwError,
  catchError,
  EMPTY,
} from 'rxjs';
import { HttpClient } from './services/http.service';

const service = new HttpClient();

class EmployeeService extends HttpClient {
  getCurrentEmployee(): Observable<any> {
    const employee = {
      id: 2,
      name: 'RXJS',
    };
    return this.get(employee, 1500);
  }

  getTaskByIdEmployee(id: number): Observable<any> {
    const tasks = [
      { id: 1, tasks: ['Todo 1', 'Todo 2', 'Todo 3'] },
      { id: 2, tasks: ['Todo 1', 'Todo 2', 'Todo 3'] },
    ];

    const taskByEmployee = tasks.filter((task) => task.id === id);

    return this.get(taskByEmployee, 2000);
  }
}

/**
 * switchMap - operador
 *
 * Ejemplo:
 * Necesitamos obtener un arreglo de tareas segun el ID de un empleado/colaborador
 *
 * 1.- ID del empleado se obtiene desde un observable - getCurrentEmployee
 * 2.- Las tareas se obtienen desde el observable - getTaskByIdEmployee
 */

const employeeService = new EmployeeService();

// employeeService.getCurrentEmployee().subscribe((employee) => {
//   employeeService.getTaskByIdEmployee(employee.id).subscribe(console.log);
// });

// const source$ = employeeService.getCurrentEmployee().pipe(
//   switchMap((employee) => {
//     return employeeService.getTaskByIdEmployee(employee.id);
//   })
// );

/**
 * Operadores para mezclar observables
 *
 * 1.- combineLatest
 *     - Emite el ultimo valor de cada observable
 *     - Es mas usado cuando tenemos observables que emitiran constantemente valores
 *     - Solo emitira valores si es que cualquiera de los obseravbles que se le esta pasando a emitido un valor
 */

// const subject1$ = new Subject<string>();
// const subject2$ = new Subject<number>();

// setTimeout(() => {
//   subject1$.next('Hola');
//   subject2$.next(1);
// }, 2000);

// setTimeout(() => {
//   subject2$.next(2);
// }, 5200);

// combineLatest([subject1$, subject2$]).subscribe(console.log);

/**
 * Operadores para mezclar observables
 *
 * 1.- forkJoin
 *     - Emite el ultimo valor de cada observable cuando todos los observables se han completado
 *     - Uno de los casos mas comunes es para agrupar multiples peticiones HTTP - Promise.ALL
 *     - Tener en cuenta el manejo de errores
 */

// forkJoin({
//   test: of(1),
//   test2: of(2),
//   test3: throwError(() => new Error('Error')).pipe(catchError((error) => of(error))),
// }).subscribe(console.log);
