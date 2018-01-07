interface IMatch<TData> {
    with: () => ISomeStep<TData>;
}

interface ISomeStep<TData> {
    some: <TResult extends {}>(value: (data:TData) => TResult) => INoneStep<TData, TResult>;
}

interface INoneStep<TData, TResult> {
    none: (value: () => TResult) => IOption<TData, TResult>;
}

interface IOption<TData, TResult> {
    value: () => TResult;
}

class Match<TData> implements IMatch<TData> {
    constructor(private data: TData) {   
        this.with = (data == undefined || data == null) ?
            () => new SomeStepWithoutValue() :
            () => new SomeStepWithValue(data);
    }

    with: () => ISomeStep<TData>;
}

class SomeStepWithValue<TData> implements ISomeStep<TData> {
    constructor(private data: TData) {
        this.some = <TResult extends {}>(value: (data: TData) => TResult): INoneStep<TData, TResult> => 
            new NoneStepWithValue<TData, TResult>(data, value);
    }

    some: <TResult extends {}>(value: (data: TData) => TResult) => INoneStep<TData, TResult>;
}

class SomeStepWithoutValue<TData> implements ISomeStep<TData> {
    some = <TResult extends {}>(value: (data: TData) => TResult): INoneStep<TData, TResult> => 
        new NoneStepWithoutValue<TData, TResult>();
}

class NoneStepWithValue<TData, TResult> implements INoneStep<TData, TResult> {
    
    constructor(data: TData, someValue: (data: TData) => TResult) {
        this.none = (noneValue: () => TResult): IOption<TData, TResult> => 
            new SomeOption<TData, TResult>(data, someValue);
    }

    none: (value: () => TResult) => IOption<TData, TResult>;
}

class NoneStepWithoutValue<TData, TResult> implements INoneStep<TData, TResult> {
    
    none = (value: () => TResult): IOption<TData, TResult> => 
        new NoneOption<TData, TResult>(value);
}

class SomeOption<TData, TResult> implements IOption<TData, TResult> {

    constructor(data: TData, value: (data: TData) => TResult) {
        this.value = () => value(data);
    }

    value: () => TResult;
}

class NoneOption<TData, TResult> implements IOption<TData, TResult> {

    constructor(value: () => TResult) {
        this.value = value;
    }

    value: () => TResult;
}

export function match<TData>(data: TData): IMatch<TData> {
    return new Match(data);
}