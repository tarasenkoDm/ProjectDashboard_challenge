import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";

import {FilterService} from "../../../shared/services/filter.service";

@Component({
    selector: 'app-date-range-filter',
    templateUrl: './date-range-filter.component.html',
    styleUrls: ['./date-range-filter.component.scss']
})
export class DateRangeFilterComponent implements OnInit {

    @Input() filterName: string = '';
    @Output() onChangeDateRangeFilter: EventEmitter<{ from: Date, to: Date, filterName: string }> = new EventEmitter<{ from: Date; to: Date; filterName: string }>();
    private subscriptions: Subscription[] = [];
    filterForm: FormGroup = new FormGroup({});
    from: Date | undefined;
    to: Date | undefined;

    constructor(private filterService: FilterService) {
    }

    ngOnInit(): void {
        this.initFilterForm();
        this.subscriptions.push(
            this.filterService.resetFilter.subscribe(() => {
                const keysArr = [[this.filterName + 'from', 0], [this.filterName + 'to', 0]];
                const resetFilterFormObj = keysArr.reduce((obj, [key, value]) => ({...obj, [key]: value}), {})
                this.filterForm.setValue(resetFilterFormObj);
            }));
    }

    public initFilterForm(): void {
        this.filterForm.addControl(this.filterName + 'from', new FormControl(null));
        this.filterForm.addControl(this.filterName + 'to', new FormControl(null));
        this.subscriptions.push(
            this.filterForm.controls[this.filterName + 'from'].valueChanges.subscribe((value) => {
                this.from = value;
                this.onFilterChanged();
            })
        );
        this.subscriptions.push(
            this.filterForm.controls[this.filterName + 'to'].valueChanges.subscribe((value) => {
                this.to = value;
                this.onFilterChanged();
            })
        );
    }

    public onFilterChanged() {
        // @ts-ignore
        this.onChangeDateRangeFilter.emit({from: this.from, to: this.to, filterName: this.filterName});
    }

    ngOnDestroy() {
        this.subscriptions.forEach((el: Subscription) => el.unsubscribe());
    }

}
