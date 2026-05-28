export type AuthSession =
  | {
      isAuthenticated: true;
      userId: number;
      userName: string;
      userRole: string;
    }
  | {
      isAuthenticated: false;
      userId: null;
      userName: null;
      userRole: null;
    };

export function parseAuthSession(values: {
  accessToken?: string | null;
  userId?: string | null;
  userName?: string | null;
  userRole?: string | null;
}): AuthSession {
  const { accessToken, userId, userName, userRole } = values;

  if (accessToken && userId && userName && userRole) {
    const parsedUserId = Number(userId);
    if (!Number.isFinite(parsedUserId)) {
      return {
        isAuthenticated: false,
        userId: null,
        userName: null,
        userRole: null,
      };
    }

    return {
      isAuthenticated: true,
      userId: parsedUserId,
      userName,
      userRole: userRole.toLowerCase(),
    };
  }

  return {
    isAuthenticated: false,
    userId: null,
    userName: null,
    userRole: null,
  };
}

export function readClientAuthSession(): AuthSession {
  if (typeof document === "undefined") {
    return {
      isAuthenticated: false,
      userId: null,
      userName: null,
      userRole: null,
    };
  }

  const get = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
    return null;
  };

  return parseAuthSession({
    accessToken: get("accessToken"),
    userId: get("userId"),
    userName: get("userName"),
    userRole: get("userRole"),
  });
}
