import { create } from "zustand";

/**
 * UI 상태 관리 (Zustand)
 * - 모달, 로딩, 알림 등
 * - 전역 UI 상태만 관리 (페이지별 UI는 로컬 상태 사용)
 */

const useUIStore = create((set) => ({
  // 로딩 상태
  isLoading: false,
  loadingMessage: "",

  // 모달 상태
  modal: {
    isOpen: false,
    type: null, // 'alert', 'confirm', 'info'
    title: "",
    message: "",
    onConfirm: null,
    onCancel: null,
  },

  // 토스트/알림
  toast: {
    isVisible: false,
    type: "info", // 'success', 'error', 'warning', 'info'
    message: "",
  },

  // 로딩 액션
  setLoading: (isLoading, message = "") =>
    set({
      isLoading,
      loadingMessage: message,
    }),

  // 모달 액션
  openModal: (modalConfig) =>
    set({
      modal: {
        isOpen: true,
        ...modalConfig,
      },
    }),

  closeModal: () =>
    set({
      modal: {
        isOpen: false,
        type: null,
        title: "",
        message: "",
        onConfirm: null,
        onCancel: null,
      },
    }),

  // 토스트 액션
  showToast: (type, message, duration = 3000) => {
    set({
      toast: {
        isVisible: true,
        type,
        message,
      },
    });

    // 자동으로 숨김
    setTimeout(() => {
      set((state) => ({
        toast: {
          ...state.toast,
          isVisible: false,
        },
      }));
    }, duration);
  },

  hideToast: () =>
    set((state) => ({
      toast: {
        ...state.toast,
        isVisible: false,
      },
    })),
}));

export default useUIStore;

