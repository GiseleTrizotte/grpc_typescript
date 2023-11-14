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

const client = new proto.chat_package.ChatService(
  "localhost:5005",
  grpc.credentials.createInsecure()
);

client.chat({ chatId: 1, message: "teste222222" }, (err, response) => {
  if (err) {
    console.log(err);
  }
  console.log(response);
});
