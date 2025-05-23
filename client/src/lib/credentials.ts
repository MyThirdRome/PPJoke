import { Credential } from "@shared/types";

// Mock credentials for the prank
export const mockCredentials: Credential[] = [
  {
    email: "user1@example.com",
    password: "hackerman123"
  },
  {
    email: "hacker420@mail.com",
    password: "securePass!"
  },
  {
    email: "anonymous@proton.me",
    password: "AnonyMouse2024"
  },
  {
    email: "paypal.victim@gmail.com",
    password: "PayMeNow2024!"
  }
];

// Function to get a random credential
export const getRandomCredential = (): Credential => {
  const randomIndex = Math.floor(Math.random() * mockCredentials.length);
  return mockCredentials[randomIndex];
};
