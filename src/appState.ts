import { useGlobalState } from "@components/wrappers/RootWrapper";

type UserProfileState = {
  isLoading?: boolean;
  result?: { id: string } | null;
  error?: any;
};

export function useUserProfileState() {
  const [userProfileState, setUserProfileState] = useGlobalState<UserProfileState>(
    "user-profile-state",
    {}
  );

  return [userProfileState, setUserProfileState] as const;
}
