import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { HeaderBuilder } from './headerBuilder';

@Component({
    selector: 'be-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: [
        './calendar.component.css'
    ]
})
export class CalendarComponent implements OnInit {

    @Input() startDay: number;
    @Input() initialMonth: number;
    @Input() initialYear: number;
    @Input() useShortNames: boolean;

    private emptyTitle = () => "";
    private emptyContent = () => "";
    private noDate = () => new Date();

    ngOnInit(): void {
        this.initMonthYearFactory();
        this.initStartDayFactory();
    }

    getHeaders = () => HeaderBuilder.create()
        .withStartDay(this.startDay)
        .build();

    getRows(): Row[] {
        let rowCount = 5;

        let date = new Date(2018, 0, 1);
        date.setDate(-1);

        let rows: Row[] = [];
        for(let rowIndex = 0; rowIndex < rowCount; rowIndex++) {

            let dayCells: Cell[] = [];

            dayCells.push({
                getTitle: this.emptyTitle,
                getContent: this.emptyContent,
                getDate: this.noDate
            });
            for(let columnIndex = 0; columnIndex < 7; columnIndex++) {

                let cellDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
                dayCells.push({
                    getTitle: () => this.title(cellDate),
                    getContent: () => "some dummy string",
                    getDate: () => cellDate
                });

                date = cellDate;
            }
            dayCells.push({
                getTitle: this.emptyTitle,
                getContent: this.emptyContent,
                getDate: this.noDate
            });

            rows.push({
                getCells: (): Cell[] => dayCells
            });
            
        }
        return rows;
    }

    private get initStartDayFactory(): () => void {
        if (isNaN(this.startDay))
            return () => this.startDay = 1;
        else
            return () => {};
    }

    private get initMonthYearFactory(): () => void {
        if (this.canInitializeMonthYear)
            return this.initializeMonthYear;
        else
            return () => {};
    }

    private get canInitializeMonthYear(): boolean {
        return isNaN(this.initialMonth) || isNaN(this.initialYear);
    }

    private initializeMonthYear() {
        let initial = this.getInitialMonthYear();
        this.initialMonth = initial[0];
        this.initialYear = initial[1];
    }

    private getInitialMonthYear(): [number, number] {
        let now = new Date();
        return [ now.getMonth(), now.getFullYear()];
    }

    private title(date: Date): string {
        if (date.getDate() == 1) {
            return this.getMonthName(date) + " " + date.getDate();
        }
        return date.getDate().toString();
    }

    private getMonthName(date: Date): string {
        switch(date.getMonth()) {
            case 0: return "Jan";
            case 1: return "Feb";
            default: return "TBD";
        }
    }
}



interface Row {
    getCells(): Cell[];
}

interface Cell {
    getTitle(): string;
    getContent(): string;
    getDate(): Date;
}

class RowBuilder {

}