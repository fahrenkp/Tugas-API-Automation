const request = require("supertest")("https://kasir-api.belajarqa.com");
const expect = require("chai").expect;

async function deleteUser(userId) {
  const AUTH =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJiNGJiYTMwLTlmNjItNDZkNy1hNGI1LWRjODRmOTgyOWFhNCIsImNvbXBhbnlJZCI6IjIxNjg4OTI2LWUwMjktNDNhZi04MjhmLWU3MmUwMWRkOGJjNSIsImlhdCI6MTY4NzU4OTcwNn0.hxpt4SUWn56wHvOMIVoen1_THJ98QnsMfYfdebew57U";

  const response = await request
    .delete(`/users/${userId}`)
    .set({
      Authorization: AUTH,
    });

  return response;
}

describe("DELETE User di Web Kasir", function () {
  it("Delete User - Positive Case 1", async function () {
    const userId = "db0cbc25-4ad9-480e-9b2b-151825a9c5c1"; // Ganti sesuai dengan ID pengguna yang ingin dihapus
    const response = await deleteUser(userId);
    expect(response.status).to.eql(200);
    console.log(response.body);
  });

  it("Delete User - Positive Case 2", async function () {
    const userId = "233bd00b-2823-47f3-809c-19c23ddd6185"; // Ganti sesuai dengan ID pengguna yang ingin dihapus
    const response = await deleteUser(userId);
    expect(response.status).to.eql(200);
    console.log(response.body);
  });

  it("Delete Non-Existing User - Negative Case", async function () {
    const nonExistingUserId = "non-existing-user-id";
    const response = await deleteUser(nonExistingUserId);
    expect(response.status).to.eql(404);
    console.log(response.body);
  });

  it("Delete User with Invalid Authorization Token - Negative Case", async function () {
    const invalidAuth = "InvalidToken";
    const userId = "54368d3d-b1d5-4ea2-84df-7ccc8b8a6d1e"; // Ganti sesuai dengan ID pengguna yang ingin dihapus
    const response = await request
      .delete(`/users/${userId}`)
      .set({
        Authorization: invalidAuth,
      });
    expect(response.status).to.eql(401);
    console.log(response.body);
  });
});

module.exports = { deleteUser };
