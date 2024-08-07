import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#22c55e", backgroundColor: "#4ade80" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
      text2Style={{ fontSize: 13, color: "white" }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "#dc2626", backgroundColor: "#ef4444" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
      text2Style={{ fontSize: 13, color: "white" }}
    />
  ),
  warning: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#f59e0b", backgroundColor: "#f97316" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
      text2Style={{ fontSize: 13, color: "white" }}
    />
  ),
};
