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

    @Input() startDay: string;
    @Input() initialMonth: number;
    @Input() initialYear: number;

    cells: CalendarCell[];

    private emptyTitle = () => "";
    private emptyContent = () => "";
    private noDate = () => new Date();

    ngOnInit(): void {
        this.monthYearInitializer();
        this.updateCells();
    }

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

    private updateCells() {
        this.cells = this.getDateCells(this.initialMonth, this.initialYear);
    }

    private getDateCells(month: number, year: number): CalendarCell[] {
        let date = new Date(year, month, 1);
        date.setDate(-1);
        let rows = 5;
        let cols = 7;
        let count = rows * cols;

        let calendarCells: CalendarCell[] = [];
        for (let i = 0; i < rows; i++) {
            calendarCells.push({ getTitle: () => "Week", getContent: this.emptyContent });
            for (let j = 0; j < cols; j++) {
                let tempDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
                calendarCells.push({ getTitle: ()=> this.title(tempDate), getContent: this.emptyContent});
                date = tempDate;
            }
            calendarCells.push({ getTitle: () => "Summary", getContent: this.emptyContent });
        }
        return calendarCells;
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

interface CalendarCell {
    getTitle(): string;
    getContent(): string;
}

interface DateCalendarCell extends CalendarCell {
    rawDate: Date;
    isCurrentMonth: boolean;
    day: number;
}