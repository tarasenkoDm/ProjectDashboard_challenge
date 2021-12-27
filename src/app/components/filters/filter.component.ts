import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";

import {Record, ShowRecord} from "../../shared/interfaces/record.interface";
import {FilterService} from "../../shared/services/filter.service"

@Component({
    selector: 'app-filters',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

    @Output() onRunFilter: EventEmitter<ShowRecord> = new EventEmitter<ShowRecord>();

    records: Record[] = [];
    private subscriptions: Subscription[] = [];
    statusSet: Set<string> = new Set<string>();
    titleSet: Set<string> = new Set<string>();
    divisionSet: Set<string> = new Set<string>();
    projectOwnerSet: Set<string> = new Set<string>();
    showDivisionSet: Set<string> = new Set<string>();
    showStatusSet: Set<string> = new Set<string>();
    showTitleSet: Set<string> = new Set<string>();
    showProjectOwnerSet: Set<string> = new Set<string>();
    // @ts-ignore
    showBudget: { from: number, to: number } = {from: 0, to: 0};
    // @ts-ignore
    showCreated: { from: Date, to: Date } = {from: null, to: null};
    // @ts-ignore
    showModified: { from: Date, to: Date } = {from: null, to: null};

    constructor(private filterService: FilterService) {
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.filterService.filtersContextChanged.subscribe((records: Record[]) => {
                this.records = [];
                this.records = [...records];
                this.createFiltersData();
            }));
        this.subscriptions.push(
            this.filterService.reRunFilter.subscribe(() => {
                this.runFilter();
            }));
    }

    public createFiltersData(): void {
        this.records.forEach((record: Record) => {
            this.statusSet.add(record.status);
            this.divisionSet.add(record.division);
            this.titleSet.add(record.title);
            this.projectOwnerSet.add(record.project_owner);
        });
        this.showDivisionSet = new Set(this.divisionSet);
        this.showStatusSet = new Set(this.statusSet);
        this.showTitleSet = new Set(this.titleSet);
        this.showProjectOwnerSet = new Set(this.projectOwnerSet);
    }

    public handleChangeCheckboxFilterOptions(filterData: { showItem: string, value: boolean, filterName: string }) {
        switch (filterData.filterName.toLowerCase()) {
            case 'division':
                if (filterData.showItem === 'all') {
                    this.showDivisionSet = filterData.value ? new Set(this.divisionSet) : new Set<string>();
                } else if (filterData.value) {
                    this.showDivisionSet.add(filterData.showItem);
                } else {
                    this.showDivisionSet.delete(filterData.showItem);
                }
                break;
            case 'title':
                if (filterData.showItem === 'all') {
                    this.showTitleSet = filterData.value ? new Set(this.titleSet) : new Set<string>();
                } else if (filterData.value) {
                    this.showTitleSet.add(filterData.showItem);
                } else {
                    this.showTitleSet.delete(filterData.showItem);
                }
                break;
            case 'status':
                if (filterData.showItem === 'all') {
                    this.showStatusSet = filterData.value ? new Set(this.statusSet) : new Set<string>();
                } else if (filterData.value) {
                    this.showStatusSet.add(filterData.showItem);
                } else {
                    this.showStatusSet.delete(filterData.showItem);
                }
                break;
            case 'project owner':
                if (filterData.showItem === 'all') {
                    this.showProjectOwnerSet = filterData.value ? new Set(this.projectOwnerSet) : new Set<string>();
                } else if (filterData.value) {
                    this.showProjectOwnerSet.add(filterData.showItem);
                } else {
                    this.showProjectOwnerSet.delete(filterData.showItem);
                }
                break;
        }
    }

    public handleChangeRangeFilter(filterData: { from: number | 0, to: number | 0, filterName: string }): void {
        switch (filterData.filterName.toLowerCase()) {
            case 'budget':
                this.showBudget = {from: filterData.from, to: filterData.to}
                break;
        }
    }

    public handleChangeDateRangeFilter(filterData: { from: Date, to: Date, filterName: string }): void {
        switch (filterData.filterName.toLowerCase()) {
            case 'created':
                this.showCreated = {from: filterData.from, to: filterData.to};
                break;
            case 'modified':
                this.showModified = {from: filterData.from, to: filterData.to};
                break;
        }
    }

    public runFilter(): void {
        const recordsToShowObj: ShowRecord = {
            title: this.showTitleSet,
            status: this.showStatusSet,
            division: this.showDivisionSet,
            project_owner: this.showProjectOwnerSet,
            budget: this.showBudget,
            created: this.showCreated,
            modified: this.showModified
        }
        this.onRunFilter.emit(recordsToShowObj);
    }

    public resetFilters(): void {
        this.filterService.resetFilter.next(true);
    }
}
