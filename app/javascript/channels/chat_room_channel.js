import consumer from "./consumer"

const appChatRoom = consumer.subscriptions.create("ChatRoomChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.insertAdjacentHTML('beforeend', data['chat_message']);
  },

  speak: function(chat_message, chat_room_id) {
    // app/channels/chat_room_channel.rbで定義しているspeakアクションを発火させる
    return this.perform('speak', { chat_message: chat_message, chat_room_id: chat_room_id });
  }
});

// chat_room_channel.jsのアクションの発火URLの定義
if(/chat_rooms/.test(location.pathname)) {
  $(document).on("keydown", ".chat-room__message-form_textarea", function(e) {
　// フォーム(クラス".chat-room__message-form_textarea")でEnterボタンを押した時に発火
    if (e.key === "Enter") {
      const chat_room_id = $('textarea').data('chat_room_id')
      appChatRoom.speak(e.target.value, chat_room_id);
      e.target.value = '';
      e.preventDefault();
    }
  })
}
