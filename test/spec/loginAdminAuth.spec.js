const request = require("supertest")("https://kasir-api.belajarqa.com");
const expect = require("chai").expect;

async function login() {
    const response = await request
      .post("/authentications")
      .send({
        "email": "fahrentoko@yopmail.com",
        "password": "password",
     });

    expect(response.statusCode).to.eql(201);
    
    console.log(await response.body) 
}

describe("POST Login Admin", function () {
  it("login", async function () {
    await login();
  });
});

module.exports = { login };
