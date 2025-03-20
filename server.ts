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
                } else if (apiPath.includes("/auth/forgot-password")) {
                    forgotPassword(req, res);
                    return;
                }
                return handler(req, res);
            } else if (apiPath.includes("/2fa")) {
                return handler(req, res);
            } else if (apiPath.includes("/checkout")) {
                return handler(req, res);
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
                    firstName: firstName,
                    lastName: lastName,
                    fullName: `${firstName} ${lastName}`,
                    userName: `${firstName.toLowerCase().trim()}-${lastName.toLowerCase().trim()}-${(Math.random() * 1000).toFixed(0)}`,
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
            console.log("Error logging in:", error);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal server error" }));
        }
    });
};

const forgotPassword = async (req: IncomingMessage, res: ServerResponse) => {
    let body = "";

    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on("end", async () => {
        try {
            const { email } = JSON.parse(body);
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
                include: {
                    auth: true,
                },
            });
            console.log("user", user);
            if (user) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(user));
            } else {
                res.writeHead(401, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Account is not exist" }));
            }
        } catch (error) {
            console.log("Error logging in:", error);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal server error" }));
        }
    });
};
