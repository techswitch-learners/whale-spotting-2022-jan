export interface User {
  id: number;
  name: string;
  username: string;
}
export interface NewUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export const login = async (
  username: string,
  password: string
): Promise<void> => {
  const response = await fetch("https://localhost:5001/login", {
    headers: {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    },
  });
  if (!response.ok) {
    throw new Error(JSON.stringify(await response.json()));
  }
};

export async function createUser(newUser: NewUser) {
  const response = await fetch(`https://localhost:5001/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error(await response.json());
  }
}
