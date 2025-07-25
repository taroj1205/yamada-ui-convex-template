import { httpRouter } from "convex/server";
import { createAuth } from "~/lib/auth/server";
import { betterAuthComponent } from "./functions/auth";

const http = httpRouter();

betterAuthComponent.registerRoutes(http, createAuth);

export default http;
