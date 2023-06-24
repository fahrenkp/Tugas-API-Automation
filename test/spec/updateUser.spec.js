const request = require("supertest")("https://kasir-api.belajarqa.com");
const expect = require("chai").expect;

const AUTH =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJiNGJiYTMwLTlmNjItNDZkNy1hNGI1LWRjODRmOTgyOWFhNCIsImNvbXBhbnlJZCI6IjIxNjg4OTI2LWUwMjktNDNhZi04MjhmLWU3MmUwMWRkOGJjNSIsImlhdCI6MTY4NzU4OTcwNn0.hxpt4SUWn56wHvOMIVoen1_THJ98QnsMfYfdebew57U";

async function updateUser() {
  const userId = "e14e7c60-23cd-45b1-9b37-5f5cd79cb879"; // Ganti dengan user ID yang ingin diperbarui

  const response = await request
    .put(`/users/${userId}`)
    .send({
      name: "musang",
      email: "fahrenkp@yopmail.com",
    })
    .set({
      Authorization: AUTH,
    });

  expect(response.statusCode).to.eql(200);
  expect(response.body.data.name).to.eql("musang");

  console.log(response.body);
}

describe("PUT Update User kasir", function () {
  it("Update Existing User - Positive Case 1", async function () {
    await updateUser();
  });

  it("Update Existing User - Positive Case 2", async function () {
    const userId = "337c9ccb-d04a-474f-ad44-f62b8ccf31db";
    const response = await request
      .put(`/users/${userId}`)
      .send({
        name: "johni",
        email: "john@yopmail.com",
      })
      .set({
        Authorization: AUTH,
      });

    expect(response.statusCode).to.eql(200);
    expect(response.body.data.name).to.eql("johni");

    console.log(response.body);
  });

  it("Update Non-Existing User - Negative Case", async function () {
    const nonExistingUserId = "non-existing-user-id";
    const response = await request
      .put(`/users/${nonExistingUserId}`)
      .send({
        name: "musang",
        email: "fahrenkp@yopmail.com",
      })
      .set({
        Authorization: AUTH,
      });

    expect(response.statusCode).to.eql(404);
    console.log(response.body);
  });

  it("Update User with Invalid Authorization Token - Negative Case", async function () {
    const invalidAuth = "InvalidToken";
    const userId = "337c9ccb-d04a-474f-ad44-f62b8ccf31db";
    const response = await request
      .put(`/users/${userId}`)
      .send({
        name: "budi",
        email: "budi@yopmail.com",
      })
      .set({
        Authorization: invalidAuth,
      });

    expect(response.statusCode).to.eql(401);
    console.log(response.body);
  });
});

exports.updateUser = { updateUser };
