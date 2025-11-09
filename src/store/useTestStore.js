import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * 테스트 답변 & 결과 관리 (Zustand)
 * - ASRS, WURS 답변 및 점수
 * - 결과 페이지에서 사용
 */

const useTestStore = create(
  persist(
    (set) => ({
      // ASRS 상태 (1단계: 현재 증상)
      asrs: {
        answers: [], // [0, 1, 2, 3, 4, 0, ...]
        score: null,
        interpretation: null, // "낮음", "중간", "높음"
        completedAt: null,
      },

      // WURS 상태 (2단계: 과거 증상)
      wurs: {
        answers: [],
        score: null,
        interpretation: null,
        completedAt: null,
      },

      // ASRS 액션
      saveAsrsAnswer: (index, value) =>
        set((state) => {
          const newAnswers = [...state.asrs.answers];
          newAnswers[index] = value;
          return {
            asrs: {
              ...state.asrs,
              answers: newAnswers,
            },
          };
        }),

      completeAsrs: (score, interpretation) =>
        set((state) => ({
          asrs: {
            ...state.asrs,
            score,
            interpretation,
            completedAt: new Date().toISOString(),
          },
        })),

      // WURS 액션
      saveWursAnswer: (index, value) =>
        set((state) => {
          const newAnswers = [...state.wurs.answers];
          newAnswers[index] = value;
          return {
            wurs: {
              ...state.wurs,
              answers: newAnswers,
            },
          };
        }),

      completeWurs: (score, interpretation) =>
        set((state) => ({
          wurs: {
            ...state.wurs,
            score,
            interpretation,
            completedAt: new Date().toISOString(),
          },
        })),

      // 전체 초기화
      resetAllTests: () =>
        set({
          asrs: {
            answers: [],
            score: null,
            interpretation: null,
            completedAt: null,
          },
          wurs: {
            answers: [],
            score: null,
            interpretation: null,
            completedAt: null,
          },
        }),
    }),
    {
      name: "test-storage", // localStorage key
    }
  )
);

export default useTestStore;

