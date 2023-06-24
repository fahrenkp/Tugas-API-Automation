const request = require("supertest")("https://kasir-api.belajarqa.com");
const expect = require("chai").expect;

const createUser = require("../spec/createUser.spec")
const getUser = require("../spec/readListUser.spec")
const updateUser = require("../spec/updateUser.spec")
const deleteUser = require("../spec/deleteUser.spec")
