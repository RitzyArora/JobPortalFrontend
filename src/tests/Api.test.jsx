import MockAdapter from "axios-mock-adapter"
import API from "../services/authService"
import { expect } from "vitest"
const mock=new MockAdapter(API)

test("login api",async()=>{
    mock.onPost("/auth/login").reply(200,{
        token:"abc123"
    })

    const response=await API.post("/auth/login")
    expect(response.status).toBe(200)
})