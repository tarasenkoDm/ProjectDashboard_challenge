import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {ChangedData} from "../../shared/interfaces/changed-data.inteface";

@Component({
    selector: 'app-active-input',
    templateUrl: './active-input.component.html',
    styleUrls: ['./active-input.component.scss']
})
export class ActiveInputComponent implements OnInit {

    @Input() fieldName: string = '';
    @Input() fieldValue: string | number = '';
    @Input() index: number = -1;
    @Output() onChangedRecordField: EventEmitter<ChangedData> = new EventEmitter<ChangedData>();
    isActiveChangeMode: boolean = false;
    tempNewValue: string = '';

    constructor() {
    }

    ngOnInit(): void {
    }

    public toggleChangeMode(status: boolean): void {
        this.isActiveChangeMode = status;
    }

    public changeRecordField(): void {
        if (this.tempNewValue) {
            this.onChangedRecordField.emit({
                newFieldValue: this.tempNewValue,
                fieldName: this.fieldName,
                index: this.index
            });
            this.cancelToggleChangeMode();
        }
    }

    public handleTempRecord(event: any): void {
        this.tempNewValue = event.target.value;
    }

    public cancelToggleChangeMode(): void {
        this.tempNewValue = '';
        this.toggleChangeMode(false);
    }

}
