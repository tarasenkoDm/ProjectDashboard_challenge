import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

import {FilterService} from "../../../shared/services/filter.service";

@Component({
    selector: 'app-checkbox-filter',
    templateUrl: './checkbox-filter.component.html',
    styleUrls: ['./checkbox-filter.component.scss']
})
export class CheckboxFilterComponent implements OnInit, OnDestroy {

    @Input() checkboxSet: Set<string> = new Set<string>();
    @Input() filterName: string = '';
    @Output() onChangeFilterOptions: EventEmitter<{ showItem: string, value: boolean, filterName: string }>
        = new EventEmitter<{ showItem: string, value: boolean, filterName: string }>();

    private subscriptions: Subscription[] = [];
    filterForm: FormGroup = new FormGroup({all: new FormControl(true)});
    isAllChanged: boolean = true;
    isSpecificCheckboxChanged: boolean = true;
    fullActiveFormControls: any = {all: true};

    constructor(private filterService: FilterService) {
    }

    ngOnInit(): void {
        this.initFilterForm();
        this.subscriptions.push(
            this.filterService.resetFilter.subscribe(() => {
                this.onFormChange('all', true);
            }));
    }

    public initFilterForm(): void {
        this.subscriptions.push(
            this.filterForm.controls['all'].valueChanges.subscribe(value => {
                if (this.isAllChanged) {
                    this.onFormChange('all', value);
                }
                this.isAllChanged = true;
            })
        );

        this.checkboxSet.forEach(el => {
            this.filterForm.addControl(el, new FormControl(true));
            this.fullActiveFormControls[el] = true;
            this.subscriptions.push(
                this.filterForm.controls[el].valueChanges.subscribe(value => {
                    if (this.isSpecificCheckboxChanged) {
                        this.onFormChange(el, value);
                    }
                })
            );
        });
    }

    public onFormChange(controlName: string, value: boolean): void {
        if (controlName === 'all') {
            this.isSpecificCheckboxChanged = false;
            this.isAllChanged = false;
            if (value) {
                this.filterForm.setValue(this.fullActiveFormControls);
            } else {
                this.filterForm.reset();
            }
        } else {
            this.isAllChanged = false;
            if (value) {
                let isAllControlsTrue = true;
                const formValue = this.filterForm.value;
                this.checkboxSet.forEach(el => {
                    if ((el !== controlName) && !formValue[el]) {
                        isAllControlsTrue = false;
                    }
                })
                if (isAllControlsTrue) {
                    this.filterForm.controls['all'].setValue(true);
                }
            } else {
                this.filterForm.controls['all'].setValue(false);
            }
        }

        this.isAllChanged = true;
        this.isSpecificCheckboxChanged = true;
        this.emitFilter(controlName, value);
    }

    private emitFilter(controlName: string, value: boolean): void {
        this.onChangeFilterOptions.emit({value, showItem: controlName, filterName: this.filterName});
    }

    ngOnDestroy() {
        this.subscriptions.forEach(el => {
            el.unsubscribe();
        })
    }
}
