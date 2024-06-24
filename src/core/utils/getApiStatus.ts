import { LoadingStage } from '@/core/enum';

export const getApiStatus = (
  statuses: LoadingStage[],
  defaultStatus: LoadingStage | null = LoadingStage.LOADING,
): LoadingStage | null => (
  // @ts-ignore
  statuses.reduce((prevStatus, item) => {
    switch (true) {
      case prevStatus === LoadingStage.LOADING || item === LoadingStage.LOADING:
        return LoadingStage.LOADING;
      case item === LoadingStage.LOAD:
        return LoadingStage.LOAD;
      default:
        return defaultStatus;
    }
  }, null)
);