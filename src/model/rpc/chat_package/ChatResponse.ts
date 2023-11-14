// Original file: src/model/chat.proto


export interface _chat_package_ChatResponse_Message {
  'id'?: (number);
  'message'?: (string);
  'createdAt'?: (string);
}

export interface _chat_package_ChatResponse_Message__Output {
  'id': (number);
  'message': (string);
  'createdAt': (string);
}

export interface ChatResponse {
  'id'?: (number);
  'message'?: (_chat_package_ChatResponse_Message | null);
  'createdAt'?: (string);
}

export interface ChatResponse__Output {
  'id': (number);
  'message': (_chat_package_ChatResponse_Message__Output | null);
  'createdAt': (string);
}
