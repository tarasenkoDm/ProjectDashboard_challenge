import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

import {Record, ShowRecord} from "../../shared/interfaces/record.interface";
import {ChangedData} from "../../shared/interfaces/changed-data.inteface";
import {FilterService} from "../../shared/services/filter.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription[] = [];
    records: Record[] = [];
    originalRecords: Record[] = [];
    statusStatisticsObj: object | undefined;
    statusSet: Set<string> = new Set<string>();

    constructor(private http: HttpClient,
                private filterService: FilterService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.getRecords();
        this.subscriptions.push(
            this.filterService.resetFilter.subscribe(() => {
                this.records = [];
                this.records = [...this.originalRecords];
            }));
    }

    public getRecords(): void {
        // @ts-ignore
        this.subscriptions.push(this.http.get('assets/data/data.json').subscribe((data: Record[]) => {
            this.records = [...data];
            this.originalRecords = [...data];
            this.createStatusSetAdnStatusStatisticObj();
            this.filterService.filtersContextChanged.next(this.records);
        }));
    }

    createStatusSetAdnStatusStatisticObj(): void {
        this.statusStatisticsObj = {};
        this.records.forEach((record: Record) => {
            this.statusSet.add(record.status);
            let statusFieldName = record.status.toLowerCase();
            // @ts-ignore
            if (this.statusStatisticsObj[statusFieldName]) {
                // @ts-ignore
                this.statusStatisticsObj[statusFieldName] = this.statusStatisticsObj[statusFieldName] + 1;
            } else {
                // @ts-ignore
                this.statusStatisticsObj[statusFieldName] = 1;
            }
        });
    }

    handleChangedRecordField(newData: ChangedData): void {
        // @ts-ignore
        this.records[newData.index][newData.fieldName] = newData.newFieldValue;
        this.showSnackbarDuration('Changed successfully', '', 2000);
        this.filterService.reRunFilter.next(true);
    }

    public showSnackbarDuration(content: string, action: string, duration: number) {
        this.snackBar.open(content, action, {
            duration,
            verticalPosition: 'bottom', // Allowed values are  'top' | 'bottom'
            horizontalPosition: 'end', // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
            panelClass: ["snackbar-style"]
        });

    }

    public handleRunFilter(filterData: ShowRecord) {
        let keys: string[] = Object.keys(this.originalRecords[0]);
        // @ts-ignore
        this.records = this.originalRecords.filter((record: Record) => {
            for (let i = 0; i < keys.length; i++) {
                // @ts-ignore
                if ((keys[i] !== 'budget') && (keys[i] !== 'created') && (keys[i] !== 'modified') && !filterData[keys[i]].has(record[keys[i]])) {
                    break;
                } else if (keys[i] === 'budget') {
                    // @ts-ignore
                    const from = filterData[keys[i]].from;
                    // @ts-ignore
                    const to = filterData[keys[i]].to;

                    if (from || to) {
                        // @ts-ignore
                        if (!((record[keys[i]] > from) && (record[keys[i]] < to))) {
                            break;
                        }
                    }
                } else if (keys[i] === 'created' || keys[i] === 'modified') {
                    // @ts-ignore
                    let from = filterData[keys[i]].from || new Date(null);
                    // @ts-ignore
                    let to = filterData[keys[i]].to || new Date(3000, 12, 12);
                    // @ts-ignore
                    let recordDate = record[keys[i]] ? new Date(record[keys[i]]) : new Date(2999, 10, 12);
                    if (!((recordDate?.getTime() > from?.getTime()) && (recordDate?.getTime() < to?.getTime()))) {
                        break;
                    }
                }
                // if all match -> push record to arr to show it
                if (i === keys.length - 1) {
                    return record;
                }
            }
        })
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((el: Subscription) => el.unsubscribe());
    }

}
