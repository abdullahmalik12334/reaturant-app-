const API_BASE_URL = "http://192.168.0.104:5001";

export type ApiFood = {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
  available?: boolean;
};

export type ApiUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  favoriteFoods?: string[];
};

type AuthResponse = {
  message: string;
  token: string;
  user: ApiUser;
};

async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed. Please try again.");
  }

  return data as T;
}

export async function getFoods(): Promise<ApiFood[]> {
  const data = await apiRequest<{ foods: ApiFood[] }>("/api/foods");
  return data. foods;
}

export async function signupUser(input: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  return apiRequest<AuthResponse>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function loginUser(input: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  return apiRequest<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
