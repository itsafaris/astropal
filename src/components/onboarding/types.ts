export type RequestType =
  | {
      state: "initial";
    }
  | {
      state: "loading";
    }
  | {
      state: "ok";
    }
  | {
      state: "error";
      error: string;
    };
