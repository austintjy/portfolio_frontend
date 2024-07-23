import { NextRequest, NextResponse } from "next/server";
import { Models } from "appwrite";

type UserData = {
  session: Models.Session;
  cookies: string[];
};
type LoginResult = {
  status: number;
  message: string;
  url: string;
  userData?: UserData;
};


async function handler(
  req: NextRequest,
  res: NextResponse<LoginResult>
) {
  const body = await req.json();
  let data = {
    "email": body.email,
    "password": body.password
  }
  console.log("Data:", req.method);
  console.log(
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT + "/account/sessions/email"
  );

  let loginResult: LoginResult = {
    status: 500,
    url: req.url,
    message: "Something went wrong" //Users are not supposed to see this
  };

  var response = await fetch(
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT + "/account/sessions/email",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Appwrite-Project": String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT),
      },
      body: JSON.stringify(data),
    }
  );
  if (parseInt(response.headers.get("x-ratelimit-remaining") || '0') === 0) { //Has hit login rate limit
    const reset = response.headers.get("x-ratelimit-reset");
    if (reset) {
      loginResult.status = 403;
      loginResult.message = "Rate limit reached, resetting at " + reset.toString();
      loginResult.url = req.url + "?error=sadsa";
      let resetDate = new Date(reset as unknown as number * 1000);
      console.log("Rate limit reached for user " + data.email + " resetting at " + resetDate.toLocaleString());
    }
  }
  if (response.status == 200 || response.status == 201) {
    console.log("Appwrite 200 or 201 response")
    let session = await response.json();
    let data: UserData = {
      session: session,
      cookies: response.headers.getSetCookie()
    }

    loginResult.status = 200;
    loginResult.message = 'Logged in successfully';
    loginResult.userData = data;
  }
  return Response.json(loginResult);
}

export { handler as GET, handler as POST }