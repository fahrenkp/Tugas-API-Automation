const request = require("supertest")("https://kasir-api.belajarqa.com");
const expect = require("chai").expect;

async function getUserPages(page) {
  const AUTH =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJiNGJiYTMwLTlmNjItNDZkNy1hNGI1LWRjODRmOTgyOWFhNCIsImNvbXBhbnlJZCI6IjIxNjg4OTI2LWUwMjktNDNhZi04MjhmLWU3MmUwMWRkOGJjNSIsImlhdCI6MTY4NzU4OTcwNn0.hxpt4SUWn56wHvOMIVoen1_THJ98QnsMfYfdebew57U";

  const response = await request
    .get(`/users?page=${page}`)
    .set({
      Authorization: AUTH,
    });

  return response;
}

describe("GET list data user ", function() {
  it("return user page 1 - Positive Case", async function() {
    const query1 = "1";
    const response = await getUserPages(query1);
    expect(response.status).to.eql(200);
    console.log(JSON.stringify(response.body, null, 2));
  });

  it("returns user page 1 with users array - Positive Case", async function() {
    const query1 = "1";
    const response = await getUserPages(query1);
    expect(response.body.data.users).to.be.an("array").that.is.not.empty;
    console.log(JSON.stringify(response.body, null, 2));
  });

  it("returns user page 2 with status code 200 - Negative Case", async function() {
    const query2 = "2";
    const response = await getUserPages(query2);
    expect(response.status).to.eql(200);
    console.log(JSON.stringify(response.body, null, 2));
  });

  it("returns user page 1 with status code 401 when authentication token is invalid - Negative Case", async function() {
    const query1 = "1";
    const AUTH = "Bearer InvalidToken";
    const response = await request
      .get(`/users?page=${query1}`)
      .set({ Authorization: AUTH });
    expect(response.status).to.eql(401);
    console.log(JSON.stringify(response.body, null, 2));
  });
});

module.exports = { getUserPages };
