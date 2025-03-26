import ChatView from "@/modules/chat/ui/views/chat-view";
import { trpc } from "@/trpc/server";

export default async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const id = await params;
  void trpc.chat.chatRooms.prefetch();
  void trpc.chat.getRoomMessages.prefetch({ roomId: id.id });
  return <ChatView />;
} 