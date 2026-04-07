"use server";

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};

export async function UserRegister(data: RegisterPayload) {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const result = await res.json();

    if (res.ok) {
      return {
        success: true,
        message: result.message || "Registered successfully",
      };
    }

    return {
      success: false,
      message: result.message || "Registration failed",
    };
  } catch (error) {
    console.log("register catch error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}