import request from "supertest";
import mongoose from "mongoose";

import { generateToken } from "../utils/jwt";
import User from "../user/user.model";
import { DB_url } from "../config/main.config";
import app from "../index";

// Connect to a new in-memory database before running any tests
beforeAll(async () => {
  const mongoURI = DB_url;
  await mongoose.connect(mongoURI, {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  });
});

// Clear the database after each test
afterEach(async () => {
  await User.deleteMany({});
});

// Close the database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe("User API", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/users").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      age: 30,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("name", "John Doe");
    expect(res.body.user).toHaveProperty("email", "john@example.com");
  });

  it("should get a user by ID", async () => {
    // Create a new user and save it to the database
    const user = new User({
        name: "Jane Doe",
        email: "jane@example.com",
        password: "password123",
        age: 25,
        id: "123456789",
    });
    await user.save();

    // Make a GET request to the endpoint to fetch the user by ID
    const res = await request(app)
        .get(`/users/${user._id}`)
        .set("Authorization", `Bearer ${generateToken(user._id.toString())}`);

    // Assertions
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "user record fetch successfully");
    expect(res.body).toHaveProperty("status", true);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("_id", user._id.toString());
    expect(res.body.user).toHaveProperty("name", "Jane Doe");
    expect(res.body.user).toHaveProperty("email", "jane@example.com");
    expect(res.body.user).not.toHaveProperty("password");
  
});

  it("should update a user by ID", async () => {
    const user = new User({
      name: "Jake Doe",
      email: "jake@example.com",
      password: "password123",
      age: 28,
      id: "12345678",
    });
    await user.save();
  
    const res = await request(app)
      .patch(`/users/${user._id}`)
      .set("Authorization", `Bearer ${generateToken(user._id.toString())}`)
      .send({ age: 29 });
  
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "User record updated successfully");
    expect(res.body).toHaveProperty("status", true);
    expect(res.body).toHaveProperty("newUser");
    expect(res.body.newUser).toMatchObject({
      _id: user._id.toString(),
      name: "Jake Doe",
      email: "jake@example.com",
      age: 29,
      id: "12345678",
    });
  });

  it("should delete a user by ID", async () => {
    const user = new User({
      name: "Jack Doe",
      email: "jack@example.com",
      password: "password123",
      age: 27,
      id: "1234567",
    });
    await user.save();

    const res = await request(app)
      .delete(`/users/${user._id}`)
      .set("Authorization", `Bearer ${generateToken(user._id.toString())}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Delete operation successful");
  });
});
