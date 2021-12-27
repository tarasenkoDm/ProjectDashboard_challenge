import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

import {Record} from "../interfaces/record.interface";

@Injectable({
    providedIn: 'root'
})
export class FilterService {

    filtersContextChanged: BehaviorSubject<Record[]> = new BehaviorSubject<Record[]>([]);
    reRunFilter: Subject<any> = new Subject<any>();
    resetFilter: Subject<any> = new Subject<any>();

    constructor() {
    }


}
