import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Product } from './product.model';
import { ResponseWrapper, createRequestOption } from '../../shared';
import {CompanyProduct} from './company_product.model';

@Injectable()
export class ProductService {

    private resourceUrl = SERVER_API_URL + 'api/products';

    constructor(private http: Http) { }

    create(product: Product): Observable<Product> {
        const copy = this.convert(product);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(product: Product): Observable<Product> {
        const copy = this.convert(product);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Product> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    findAll(company_id: number): Observable<CompanyProduct> {
        return this.http.get(`/api/companies/${company_id}/products`).map((res: Response) => {
            return res.json();
        });
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(product: Product): Product {
        const copy: Product = Object.assign({}, product);
        return copy;
    }
}