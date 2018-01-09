
export function guard(methodName: string) : Guard {
    return new Guard(methodName);
}

interface IGuard {
    hasValue<TObject>(object: TObject, paramName: string): IGuard;
    continue(action: Function): void;
    continueWith<TResult>(action: () => TResult): TResult;
}

class Guard implements IGuard {
    
    constructor(methodName: string) {
        this.getMethodName = () => methodName;
    }

    hasValue<TObject>(object: TObject, paramName: string): IGuard {
        if (object === undefined || object === null)
            throw { message: `Method ${this.getMethodName()} was guarded. ${paramName} does not contain an instance.`};
        return this;
    }

    continue = (action: Function) => action();

    continueWith = <TResult extends {}>(action: () => TResult) => action();

    private getMethodName = (): string => { throw { message: "getMethodName is not initialized." } };
}