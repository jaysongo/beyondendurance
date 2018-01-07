export class WeekDays {

    private static longNames: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    static getLongNames = (index?: number) =>
        WeekDays.getLongNamesFactory(index)();

    static getShortNames = (index?: number) =>
        WeekDays.getShortNamesFactory(index)();

    private static getLongNamesByIndex = (index: number): string[] =>
        WeekDays.reorder(index, () => WeekDays.longNames);

    private static getShortNamesByIndex = (index: number): string[] =>
        WeekDays.reorder(index, WeekDays.getShortNamesFactory());

    static reorder = (index: number, names: () => string[]) =>
         new Array<string>()
            .concat(names().slice(index))
            .concat(names().slice(0, index));

    private static getLongNamesFactory(index?: number): () => string[] {
        if (index == undefined)
            return () => WeekDays.longNames;
        else
            return () => WeekDays.getLongNamesByIndex(index);
    }

    private static getShortNamesFactory(index?: number): () => string[] {
        if (index == undefined)
            return () => WeekDays.longNames.map(name => name.substring(0, 3));
        else
            return () => WeekDays.getShortNamesByIndex(index);
    }
}