import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

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

    private emptyTitle = () => "";
    private emptyContent = () => "";
    private noDate = () => new Date();

    ngOnInit(): void {
        this.monthYearInitializer();
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

    private get monthYearInitializer(): () => void {
        // A factory method for month/year initialization
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

interface IHeaderBuilder {

    build(): Header[];
}

interface IHeaderBuilderStep1 {
    withStartDay(startDay: number) : IHeaderBuilder;
}

interface Header {
    getContent(): string;
}

interface Row {
    getCells(): Cell[];
}

interface Cell {
    getTitle(): string;
    getContent(): string;
    getDate(): Date;
}

class HeaderBuilder implements IHeaderBuilder, IHeaderBuilderStep1 {

    private startDay: () => number;

    withStartDay(startDay: number): IHeaderBuilder {
        this.startDay = () => startDay;
        return this;
    }

    build(): Header[] {
        let headers: Header[] = [];
        headers.push({ getContent: () => "Week"});

        let daysOfWeek = DaysOfWeek.getShortNames(this.startDay());
        let x = daysOfWeek.map((name) => <Header>{ getContent: () => name});
        headers = headers.concat(x);

        headers.push({ getContent: () => "Weekly Summary"});
        return headers;
    }

    static create(): IHeaderBuilderStep1 {
        return new HeaderBuilder();
    }
}

class DaysOfWeek {

    private static data: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    static get longNames(): string[]{
        return DaysOfWeek.data;
    }

    static get shortNames(): string[] {
        return DaysOfWeek.longNames.map(name => name.substring(0, 3));
    }

    static getLongNames(index: number): string[] {
        return DaysOfWeek.reorder(index, DaysOfWeek.longNames);
    }

    static getShortNames(index: number): string[] {
        return DaysOfWeek.reorder(index, DaysOfWeek.shortNames);
    }

    static reorder(index: number, names: string[]) {
        if (index > 0) {
            let left = names.slice(index);
            let right = names.slice(0, index - 1);
            return left.concat(right);
        } else {
            return names;
        }
    }
}