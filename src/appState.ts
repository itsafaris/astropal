import { useGlobalState } from "@components/root/RootWrapper";

type UserProfileState = {
  isLoading?: boolean;
  result?: { user: { id: string }; natalChartReading: any } | null;
  error?: any;
};

export function useUserProfileState() {
  const [userProfileState, setUserProfileState] = useGlobalState<UserProfileState>(
    "user-profile-state",
    {}
  );

  return [userProfileState, setUserProfileState] as const;
}
