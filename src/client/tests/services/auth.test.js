import authService from "../../services/auth";
import {OK} from "http-status-codes";

describe("client sign up", () => {
    it("doesn't sign up when error list are", async () => {
        const formErrorList = {
            errors: [
                { message: 'test'}
            ]
        };

        fetch.mockReject(() => Promise.reject(formErrorList));

        await expect(authService.signUp()).rejects.toEqual(formErrorList);
    });

    it("sign up when API responds with status OK", async () => {
        fetch.mockResponse([
            null,
            { status: OK }
        ]);

        await expect(authService.signUp()).resolves.toEqual(undefined);
    });
});

describe("client sign in", () => {
    it("doesn't sign in when error list are", async () => {
        const formErrorList = {
            errors: [
                { message: 'test'}
            ]
        };

        fetch.mockReject(() => Promise.reject(formErrorList));

        await expect(authService.signIn()).rejects.toEqual(formErrorList);
    });

    // it("sign in when API responds with status OK", async () => {
    //     const respond = { test: 'test' };
    //
    //     fetch.mockResponse([
    //         JSON.stringify(respond),
    //         { status: OK }
    //     ]);
    //
    //     await expect(authService.signIn()).resolves.toEqual(respond);
    // });
});