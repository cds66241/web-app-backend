import app, { server } from './app'
import F1Service  from './f1Service'
import request from 'supertest';

jest.mock('./f1Service', () => {
    return jest.fn().mockImplementation(() => {
        return {
            getStandings: async (year) => {
                return year
            },
            getResults: async (year, round) => {
                return year+round
            }
        };
    })
});

afterAll(()=> {
    server.close();
});

describe("test express server", () => {
    it("should get back a healthcheck", async () => {
        const result = await request(app).get("/");
        expect(result.text).toEqual("healthcheck");
        expect(result.statusCode).toEqual(200);
    });

    it("should call getStandings once with the correct query", async () => {
        const f1Mock = jest.mocked(F1Service);
        const result = await request(app).get("/api/f1/2021/standings");
        expect(f1Mock.mock.calls).toHaveLength(1);
        expect(result.text).toEqual('2021');
    });

    it("should call getResults once with the correct query", async () => {
        const f1Mock = jest.mocked(F1Service);
        const result = await request(app).get("/api/f1/2020/2/results");
        expect(f1Mock.mock.calls).toHaveLength(1);
        expect(result.text).toEqual('20202');
    });

    it("should call getResults once with the correct query", async () => {
        const f1Mock = jest.mocked(F1Service);
        const result = await request(app).get("/api/f1/2020/2/results");
        expect(f1Mock.mock.calls).toHaveLength(1);
        expect(result.text).toEqual('20202');
    });
})