import { WeekDays } from "./weekDays";

interface Header {
    getContent(): string;
}

interface IHeaderBuilder {

    withShortNames(useShortNames: boolean): IHeaderBuilder;
    build(): Header[];
}

interface IHeaderBuilderStep1 {
    withStartDay(startDay: number) : IHeaderBuilder;
}

export class HeaderBuilder implements IHeaderBuilder, IHeaderBuilderStep1 {

    private getFirstHeaderName = () => "Week";
    
    private getLastHeaderName = () => "Summary";

    private getStartDay: () => number =
        () => { throw "Member is not initialized: startDay"; };
  
    private getUseShortNames = () => false;

    withShortNames(useShortNames: boolean): IHeaderBuilder {
        this.getUseShortNames = () => useShortNames;
        return this;
    }

    withStartDay(startDay: number): IHeaderBuilder {
        this.getStartDay = () => startDay;
        return this;
    }

    build = () => new Array<Header>()
        .concat(<Header>{ getContent: this.getFirstHeaderName})
        .concat(WeekDays.getShortNames(this.getStartDay())
            .map((name) => <Header>{ getContent: () => name}))
        .concat(<Header>{ getContent: this.getLastHeaderName});

    static create = (): IHeaderBuilderStep1 => new HeaderBuilder();
}