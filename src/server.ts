import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "model/rpc/chat";
import { ChatServiceHandlers } from "model/rpc/chat_package/ChatService";
import { join } from "path";

const packageDefinition = protoLoader.loadSync(
  join(__dirname, "./model/chat.proto")
);

const proto = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const handlers: ChatServiceHandlers = {
  // Chamada Unáry
  Chat: (call, callback) => {
    const { chatId, message } = call.request;
    console.log(chatId, message);
    callback(null, {
      id: chatId,
      message: {
        id: 1,
        message: message,
        createdAt: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
    });
  },

  // Chamada server streaming
  ChatStream: (call) => {
    const randomNumbers = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 100)
    );

    const { chatId, message } = call.request;
    randomNumbers.forEach((number, key) => {
      setTimeout(() => {
        call.write({
          id: chatId,
          message: {
            id: number,
            message: message,
            createdAt: new Date().toISOString(),
          },
          createdAt: new Date().toISOString(),
        });
      }, key * 1000);
    });
  },
};

const server = new grpc.Server();
server.addService(proto.chat_package.ChatService.service, handlers);

server.bindAsync(
  "0.0.0.0:5005",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server runing at http://localhost:5005`);
    server.start();
  }
);
