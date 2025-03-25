import ChatView from "@/modules/chat/ui/views/chat-view";
import { trpc } from "@/trpc/server";

export default function ChatPage() {
  void trpc.chat.chatRooms.prefetch();
  return <ChatView />;
} 