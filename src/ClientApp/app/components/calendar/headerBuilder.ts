import { WeekDays } from "./weekDays";
import { toBoolean } from "../../../shared/converters/boolean";
import { match } from "../../../shared/functional/match";

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
  
    private getUseShortNames = (): boolean => false;

    withShortNames(useShortNames: boolean): IHeaderBuilder {
        this.getUseShortNames = () => toBoolean(useShortNames); // Necessary to ensure that useShortNames is converted to a boolean
        return this;
    }

    withStartDay(startDay: number): IHeaderBuilder {
        this.getStartDay = () => startDay;
        return this;
    }

    build = () => new Array<Header>()
        .concat(<Header>{ getContent: this.getFirstHeaderName})
        .concat(this.namesFactory()
            .map((name) => <Header>{ getContent: () => name}))
        .concat(<Header>{ getContent: this.getLastHeaderName});

    namesFactory = () => match(this.getUseShortNames())
        .when((value) => value === true, WeekDays.getShortNames)
        .when((value) => value === false, WeekDays.getLongNames)
        .result();
    
    static create = (): IHeaderBuilderStep1 => new HeaderBuilder();
}