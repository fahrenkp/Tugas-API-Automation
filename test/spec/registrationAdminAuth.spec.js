const request = require("supertest")("https://kasir-api.belajarqa.com");
const expect = require("chai").expect;

async function resgistration() {
    const response = await request
      .post("/registration")
      .send({
        name: "Toko Fahren",
        email: "fahrentoko@yopmail.com",
        password: "password",
      });

    expect(response.statusCode).to.eql(201);
    expect(response.body.data.name).to.eql("Toko Fahren");
    expect(response.body.data.email).to.eql("fahrentoko@yopmail.com");

    console.log(await response.body) 
}

describe("Post Create Admin di Kasir", function () {
  it("Create New User", async function () {
    await resgistration();
  });
});

module.exports = { resgistration };
