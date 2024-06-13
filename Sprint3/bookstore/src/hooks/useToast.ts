import useToastStore from "@/store/toastStroe";

export const useToast = () => {
  const showToast = useToastStore((state) => state.addToast);
  return { showToast };
};
