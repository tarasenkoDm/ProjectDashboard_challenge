import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {FilterService} from "../../../shared/services/filter.service";

@Component({
    selector: 'app-range-filter',
    templateUrl: './range-filter.component.html',
    styleUrls: ['./range-filter.component.scss']
})
export class RangeFilterComponent implements OnInit, OnDestroy {

    @Input() filterName: string = '';
    @Output() onChangeRangeFilter: EventEmitter<{ from: number, to: number, filterName: string }> = new EventEmitter<{ from: number; to: number; filterName: string }>();
    private subscriptions: Subscription[] = [];
    filterForm: FormGroup = new FormGroup({});
    from: number | undefined;
    to: number | undefined;
    resetFilterFormObj: object | undefined;

    constructor(private filterService: FilterService) {
    }

    ngOnInit(): void {
        this.initFilterForm();
        this.subscriptions.push(
            this.filterService.resetFilter.subscribe(() => {
                this.resetFilter();
            }));
        this.createFilterResetObj();
    }

    public createFilterResetObj(): void {
        const keysArr = [[this.filterName + 'from', null], [this.filterName + 'to', null]];
        // @ts-ignore
        this.resetFilterFormObj = keysArr.reduce((obj, [key, value]) => ({...obj, [key]: value}), {})
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
        let from = this.from ? this.from : 0;
        let to = this.to ? this.to : Number.MAX_VALUE;
        // @ts-ignore
        if (from && (to !== Number.MAX_VALUE) && (from > to)) {
            const tempFrom = from;
            from = to;
            to = tempFrom;
        }
        // @ts-ignore
        this.onChangeRangeFilter.emit({from, to, filterName: this.filterName});
    }

    public resetFilter(fieldName?: string): void {
        // @ts-ignore
        this.filterForm.setValue(this.resetFilterFormObj);
    }

    ngOnDestroy() {
        this.subscriptions.forEach((el: Subscription) => el.unsubscribe());
    }
}
