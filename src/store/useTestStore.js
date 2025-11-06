import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * 테스트 답변 & 결과 관리 (Zustand)
 * - ASRS, WURS, CPT 답변 및 점수
 * - 결과 페이지에서 사용
 */

const useTestStore = create(
  persist(
    (set) => ({
      // ASRS 상태
      asrs: {
        answers: [], // [0, 1, 2, 3, 4, 0, ...]
        score: null,
        interpretation: null, // "낮음", "중간", "높음"
        completedAt: null,
      },

      // WURS 상태
      wurs: {
        answers: [],
        score: null,
        interpretation: null,
        completedAt: null,
      },

      // CPT 상태
      cpt: {
        results: [], // [{ type: 'X', responded: true, reactionTime: 450 }, ...]
        correctCount: null,
        missCount: null,
        falseAlarmCount: null,
        averageReactionTime: null,
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

      // CPT 액션
      saveCptResult: (trial) =>
        set((state) => ({
          cpt: {
            ...state.cpt,
            results: [...state.cpt.results, trial],
          },
        })),

      completeCpt: (stats) =>
        set((state) => ({
          cpt: {
            ...state.cpt,
            ...stats,
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
          cpt: {
            results: [],
            correctCount: null,
            missCount: null,
            falseAlarmCount: null,
            averageReactionTime: null,
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

