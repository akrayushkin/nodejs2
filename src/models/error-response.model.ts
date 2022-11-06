export interface ErrorResponse {
  readonly status: string;
  readonly errors: {
    readonly path: (string | number)[];
    readonly message: string;
  }[];
}
