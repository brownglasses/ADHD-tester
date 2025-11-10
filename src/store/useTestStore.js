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
        answers: {}, // {questionId: value}
        score: null,
        interpretation: null, // "low", "moderate", "high"
        completedAt: null,
      },

      // 기능 저하 평가 (2단계)
      impairment: {
        answers: {}, // {questionId: value}
        completedAt: null,
      },

      // WURS 상태 (2단계: 과거 증상)
      wurs: {
        answers: {}, // {questionId: value}
        score: null,
        interpretation: null, // "low", "moderate", "high"
        completedAt: null,
      },

      // ASRS 액션
      saveAsrsAnswers: (answers) =>
        set((state) => ({
          asrs: {
            ...state.asrs,
            answers,
          },
        })),

      completeAsrs: (score, interpretation) =>
        set((state) => ({
          asrs: {
            ...state.asrs,
            score,
            interpretation,
            completedAt: new Date().toISOString(),
          },
        })),

      // 기능 저하 평가 액션
      saveImpairmentAnswers: (answers) =>
        set((state) => ({
          impairment: {
            ...state.impairment,
            answers,
            completedAt: new Date().toISOString(),
          },
        })),

      // WURS 액션
      saveWursAnswers: (answers) =>
        set((state) => ({
          wurs: {
            ...state.wurs,
            answers,
          },
        })),

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
            answers: {},
            score: null,
            interpretation: null,
            completedAt: null,
          },
          impairment: {
            answers: {},
            completedAt: null,
          },
          wurs: {
            answers: {},
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

