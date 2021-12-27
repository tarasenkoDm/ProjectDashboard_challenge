import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {ChangedData} from "../../shared/interfaces/changed-data.inteface";

@Component({
    selector: 'app-active-select',
    templateUrl: './active-select.component.html',
    styleUrls: ['./active-select.component.scss']
})
export class ActiveSelectComponent implements OnInit {

    @Input() statusSet: Set<string> | undefined;
    @Input() index: number = -1;
    @Input() fieldName: string = '';
    @Input() fieldValue: string = '';
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

    public handleNewFieldValue(event: any) {
        this.tempNewValue = event.value;
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

    public cancelToggleChangeMode(): void {
        this.tempNewValue = '';
        this.toggleChangeMode(false);
    }
}
