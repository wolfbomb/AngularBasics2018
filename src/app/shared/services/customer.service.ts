import { Injectable } from '@angular/core';
import {Customer} from '../models/customers';
import {HttpClient, HttpParams} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {FilteredCustomerList} from '../models/filteredCustomerList';
import {environment} from '../../../environments/environment';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = environment.apiEndpoint + '/customers';

  constructor(private http: HttpClient) {  }

  getCustomers(currentPage: number, itemsPrPage: number): Observable<FilteredCustomerList> {
    const params = new HttpParams()
      .set('currentPage', currentPage.toString())
      .set('itemsPrPage', itemsPrPage.toString());
    return this.http.get<FilteredCustomerList>(this.apiUrl, {params: params});
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  updateCustomer(customer: Customer): Observable<Customer>  {
    return this.http.put<Customer>(this.apiUrl + '/' + customer.id, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer> (this.apiUrl + '/' + id);
  }

  /*
  getCustomerTypes(): Observable<CustomerType[]> {
    return this.http.get<CustomerType[]>(
      'https://custapp2018.azurewebsites.net/api/customertypes');
  }

  getCustomerByIdAndTypes(id: number): Observable<CustomerAndTypes> {
    const customer = this.http.get<Customer>(
      this.apiUrl + '/' + id);
    const customerTypes = this.http.get<CustomerType[]>(
      'https://custapp2018.azurewebsites.net/api/customertypes');

    return forkJoin([customer, customerTypes])
      .pipe(
        map(results => {
          return {
            customer: results[0],
            customerTypes: results[1]
          };
        })
      );
  }*/
}
