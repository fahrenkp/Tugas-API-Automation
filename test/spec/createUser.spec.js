const request = require("supertest")("https://kasir-api.belajarqa.com");
const expect = require("chai").expect;

const AUTH =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJiNGJiYTMwLTlmNjItNDZkNy1hNGI1LWRjODRmOTgyOWFhNCIsImNvbXBhbnlJZCI6IjIxNjg4OTI2LWUwMjktNDNhZi04MjhmLWU3MmUwMWRkOGJjNSIsImlhdCI6MTY4NzU4OTcwNn0.hxpt4SUWn56wHvOMIVoen1_THJ98QnsMfYfdebew57U";

async function createUser() {
  const response = await request
    .post("/users")
    .send({
      name: "fahrenkp",
      email: "fahrenkp@yopmail.com",
      password: "password",
    })
    .set({
      Authorization: AUTH,
    });

  return response;
}

describe("Post Create User di Web Kasir", function () {
  it("Create New User - Positive Case 1", async function () {
    const response = await createUser();
    expect(response.statusCode).to.eql(201);
    expect(response.body.data.name).to.eql("fahrenkp");
    console.log(await response.body);
  });

  it("Create New User - Positive Case 2", async function () {
    const response = await request
      .post("/users")
      .send({
        name: "michael",
        email: "michael@yopmail.com",
        password: "password",
      })
      .set({
        Authorization: AUTH,
      });

    expect(response.statusCode).to.eql(201);
    expect(response.body.data.name).to.eql("michael");
    console.log(await response.body);
  });

  it("Create New User - Negative Case (Invalid Authorization Token)", async function () {
    const AUTH = "InvalidToken";
    const response = await request
      .post("/users")
      .send({
        name: "fahrenkp",
        email: "fahrenkp@yopmail.com",
        password: "password",
      })
      .set({
        Authorization: AUTH,
      });

    expect(response.statusCode).to.eql(401);
    console.log(await response.body);
  });

  it("Create New User - Negative Case (Missing Name Field)", async function () {
    const response = await request
      .post("/users")
      .send({
        email: "john@yopmail.com",
        password: "password",
      })
      .set({
        Authorization: AUTH,
      });

    expect(response.statusCode).to.eql(400);
    console.log(await response.body);
  });
});

exports.createUser = { createUser };
