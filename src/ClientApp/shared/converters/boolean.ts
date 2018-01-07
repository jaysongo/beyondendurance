export function toBoolean(value: any) : boolean {
    let r: boolean = 
        value === true ||
        value === 1;

    if (!r) {
        let s: string = <string>value;
        s = s.trim();
        r = /true/i.test(s) ||
            /1/i.test(s);
    }

    return r;
}