"use server";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/auth";

export async function forgotPassword(email: string) {
  try {
    const response = await fetch(`${BASE_URL}/forgotPasswords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to send reset code",
      };
    }

    return {
      success: true,
      message: result.message || "Reset code sent successfully",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function verifyResetCode(resetCode: string) {
  try {
    const response = await fetch(`${BASE_URL}/verifyResetCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resetCode }),
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Invalid reset code",
      };
    }

    return {
      success: true,
      message: result.status || "Code verified successfully",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function resetPassword(email: string, newPassword: string) {
  try {
    const response = await fetch(`${BASE_URL}/resetPassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }),
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to reset password",
      };
    }

    return {
      success: true,
      message: result.message || "Password reset successfully",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}