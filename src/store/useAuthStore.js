import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * 인증 상태 관리 (Zustand)
 * - 사용자 로그인 정보
 * - Firebase Auth 연동
 */

const useAuthStore = create(
  persist(
    (set) => ({
      // 상태
      user: null, // { uid, displayName, email, photoURL, provider }
      isAuthenticated: false,
      isLoading: false,

      // 액션
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setLoading: (isLoading) => set({ isLoading }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),

      // 로그인 상태 복원 (Firebase에서)
      restoreAuth: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;

