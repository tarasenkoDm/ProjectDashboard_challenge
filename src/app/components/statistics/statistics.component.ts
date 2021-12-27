import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

    @Input() statusStatisticsObj: object = {};

    statusStatisticArr: string[] = [];

    constructor() {
    }

    ngOnInit(): void {
        this.getKeys();
    }

    public getKeys(): void {
        const keys = Object.keys(this.statusStatisticsObj);
        keys.forEach(key => {
            // @ts-ignore
            this.statusStatisticArr.push(`${key} projects - ${this.statusStatisticsObj[key]}`)
        });
    }
}
