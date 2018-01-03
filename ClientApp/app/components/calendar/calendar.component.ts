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

    ngOnInit(): void {
        this.monthYearInitializer();
        this.updateCells();
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
        let rows = 6;
        let cols = 7;
        let count = rows * cols;

        let calendarCells: CalendarCell[] = [];
        for (let i = 0; i < rows; i++) {
            calendarCells.push({ content: i.toString()});
            for (let j = 0; j < cols; j++) {
                let tempDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
                calendarCells.push({content: tempDate.getDate().toString()});
                date = tempDate;
            }
            calendarCells.push({content: "blah"});
        }
        return calendarCells;
    }
}

interface CalendarCell {
    content: string;
}

interface DateCalendarCell extends CalendarCell {
    rawDate: Date;
    isCurrentMonth: boolean;
    day: number;
}