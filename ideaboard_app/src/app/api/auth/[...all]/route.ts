import {toNextJsHandler} from "better-auth/next-js";
import {auth} from "@/src/utils/auth";

export const { GET, POST } = toNextJsHandler(auth);