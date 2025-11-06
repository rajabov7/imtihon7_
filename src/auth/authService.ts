export type User = {
  email: string;
  role?: string;
};

const VALID_EMAIL = "usern88@mail.ru";
const VALID_PASSWORD = "12345678";

export async function loginApi(email: string, password: string): Promise<{ user: User; token: string }> {
  await new Promise((r) => setTimeout(r, 300));
  
  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    return {
      user: { email, role: "admin" },
      token: "fake-jwt-token"
    };
  }

  throw new Error("Invalid credentials");
}

export function logoutApi() {
  return;
}

export function fetchProfileFromApi(token: string) {
  return new Promise<{ roles: string[]; email: string }>((resolve) =>
    setTimeout(() => resolve({ roles: ["admin", "ustozlar", "menejer"], email: VALID_EMAIL }), 300)
  );
}
