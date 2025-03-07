import { createServer, IncomingMessage, ServerResponse } from "http";
import next from "next";
import { PrismaClient } from "@prisma/client";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
const prisma = new PrismaClient();

app.prepare().then(() => {
  prisma.$connect().then(() => {
    console.log("connect");
  });

  const httpServer = createServer((req, res) => {
    if (req.url?.startsWith("/api")) {
      const apiPath = req.url.substring(4);
      res.setHeader("Content-Type", "application/json");
      if (apiPath === "/hello") {
        res.end(JSON.stringify({ message: "Hello from custom API!" }));
        res.writeHead(200);
      } else if (apiPath.includes("/auth")) {
        if (apiPath.includes("/auth/register")) {
          registerUser(req, res);
          return;
        } else if (apiPath.includes("/auth/login")) {
          loginUser(req, res);
          return;
        }
        return handler(req, res);
      } else {
        res.end(JSON.stringify({ error: "API endpoint not found" }));
        res.writeHead(404);
      }
      return;
    } else {
      return handler(req, res);
    }
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

const registerUser = async (req: IncomingMessage, res: ServerResponse) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      console.log("JSON.parse(body)", JSON.parse(body));
      const { email, firstName, lastName, password, inviteCode } =
        JSON.parse(body);
      const user = await prisma.user.create({
        data: {
          email,
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`,
          user_name: `${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
          inviteCode,
          auth: {
            create: {
              password,
            },
          },
        },
      });

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    } catch (error) {
      console.error("Error creating post:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal server error" }));
    }
  });
};
const loginUser = async (req: IncomingMessage, res: ServerResponse) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const { email, password } = JSON.parse(body);
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          auth: true,
        },
      });
      console.log("user", user);
      if (user && user.auth && user.auth.password === password) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(user));
      } else {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Unauthorized" }));
      }
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal server error" }));
    }
  });
};
