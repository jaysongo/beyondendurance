import { match } from "./option";

describe("The match method", () => {

    it("returns a none option when the parameter is null", () => {

        let a: any = null;
        let option = match(a).with()
            .some((data) => 123)
            .none(() => 456);

        expect(option.value()).toBe(456);
    });

    it("returns a none option when the parameter is undefined", () => {

        let a: any = {};
        let option = match(a.b).with()
            .some((data) => 123)
            .none(() => 456);

        expect(option.value()).toBe(456);
    });

    it("returns a some option when the parameter is an instance", () => {

        let a: any = {};
        let option = match(a).with()
            .some((data) => 123)
            .none(() => 456);

        expect(option.value()).toBe(123);
    });
});