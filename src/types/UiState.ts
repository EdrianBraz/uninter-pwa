export type UiState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};
