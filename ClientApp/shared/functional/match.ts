export function match<TValue>(data: TValue): IMatchStep1<TValue> {
    return new MatchStep1<TValue>(data);
}

interface IPredicateAction<TValue,TResult> {
    predicate: (data: TValue) => boolean;
    action: () => TResult;
}

interface IMatchStep1<T> {
    when<TResult>(predicate: (data: T) => boolean, action: () => TResult) : IMatchStep2<T, TResult>;
}

interface IMatchStep2<T, TResult> {
    when(predicate: (data: T) => boolean, action: () => TResult) : IMatchStep2<T, TResult>;
    otherwise(action: () => TResult) : IMatchStep2<T, TResult>;
    result() : TResult;
}

class MatchStep1<T> implements IMatchStep1<T> {
    constructor(private data: T) {
    }

    when<TResult>(predicate: (data: T) => boolean, action: () => TResult) : IMatchStep2<T, TResult> {
        return new MatchStep2<T, TResult>(this.data, new Array<IPredicateAction<T, TResult>>({ predicate: predicate, action: action}), () => { throw "error"; });
    }
}

class MatchStep2<T,TResult> implements IMatchStep2<T, TResult> {
    
    constructor(private data: T, private predicateActions: Array<IPredicateAction<T, TResult>>, private otherwiseAction: () => TResult) {
    }

    when(predicate: (data: T) => boolean, action: () => TResult) : IMatchStep2<T, TResult> {
        return new MatchStep2(this.data, this.predicateActions.concat([{ predicate: predicate, action: action}]), this.otherwiseAction);
    }

    otherwise(action: () => TResult): IMatchStep2<T, TResult> {
        return new MatchStep2(this.data, this.predicateActions, action);
    }

    result = () => this.predicateActions
        .filter((predicateAction) => predicateAction.predicate(this.data))
        [0]
        .action();

    
    private getActions = (data: T) => this.predicateActions
        .filter((predicateAction) => predicateAction.predicate(data))
        .map((predicateAction) => predicateAction.action);
}
