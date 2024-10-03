export type RequestType =
  | {
      state: "initial";
    }
  | {
      state: "loading";
    }
  | {
      state: "ok";
      data: { clientSecret: string };
    }
  | {
      state: "error";
      error: string;
    };
