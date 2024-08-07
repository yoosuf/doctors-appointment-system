const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const runCron = require("./config/cron");
const ejs = require("ejs");
let cookieParser = require("cookie-parser");
let morgan = require("morgan");
const initSeed = require("./seeder");
const passport = require("passport");
global._ = require("lodash");


const appointmentIo = require("./socket/appointment.io");

const { adminPassportStrategy } = require("./config/adminPassportStrategy");
const { clientPassportStrategy } = require("./config/clientPassportStrategy");
const cors = require("cors");
const { store } = require("./lib/index");
const api = require("express-list-endpoints-descriptor")(express);
const fileUpload = require("express-fileupload");
const { userActivity } = require("./services/userActivity");
const { localize } = require("./services/localizeService");
const { convertToTz } = require("./utils/common");

const app = express();
const http = require("http");

let siofu = require("socketio-file-upload");
const server = http.createServer(app);

const i18next = require("i18next");
const i18nextMiddleware = require("i18next-express-middleware");
const FilesystemBackend = require("i18next-node-fs-backend");

global.logger = require("./utils/logger");
global.convertToTz = convertToTz;

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
  })
);
app.use(bodyParser.json({ limit: "50mb", keepExtensions: true }));

appointmentIo.init(server);

const expressip = require("express-ip");
const { ACTIVITY_TRACK_ROUTE } = require("./constants/common");
const constants = require("constants");
const { ENV } = require("./constants/common");
global.TIMEZONE = process.env.TZ || `UTC`;
global._ = require("lodash");
global._localize = localize;

// if (process.env.SERVER_SEED) {
// initSeed();
// }

i18next
  .use(FilesystemBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    lng: process.env.LNG ?? "en",
    ns: ["appointment", "auth", "recurly"],
    defaultNS: ["appointment", "auth", "recurly"],
    backend: {
      loadPath: path.join(__dirname, `/services/lang/{{lng}}/{{ns}}.json`),
      addPath: path.join(__dirname, `/services/lang/{{lng}}/{{ns}}.json`),
    },
    detection: {
      order: ["header", "querystring", "cookie"],
      lookupHeader: "lng",
      caches: false,
    },
    fallbackLng: process.env.LNG ?? "en",
    preload: ["en"],
  });

app.use(i18nextMiddleware.handle(i18next));

//template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//jobs configuration
require('./jobs/index');
app.use(expressip().getIpInfoMiddleware);
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(siofu.router);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(cors({ origin: "*" }));

app.options("*", cors());

//adminPassportStrategy(passport);
//clientPassportStrategy(passport);

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);
runCron();

app.use(require("./routes/index"));
app.use(require("./routes/fileUploadRoutes"));
app.use(require("./routes/checkInRequestRoutes.js"));
app.use(require("./routes/changePasswordRoutes"));
store(api.listEndpoints(app));

server.on("request", async (request, response) => {
  const requestStart = Date.now();
  let body = [];
  if (!request.url.includes("socket.io")) {
    request.on("data", (chunk) => {
      body.push(chunk);
    });
    request.on("end", () => {
      if (!_.isEmpty(body)) {
        body = Buffer.concat(body).toString();
        body = JSON.stringify(body);
        body = JSON.parse(body);
      } else {
        body = null;
      }
    });
    response.on("finish", async () => {
      const {
        frontend_route,
        rawHeaders,
        httpVersion,
        method,
        socket,
        originalUrl,
        userId,
        deviceId,
      } = request;
      const { statusCode, statusMessage, MESSAGE, message } = response;
      const ipInfo = request.ipInfo;
      const roleId = request.user && request.user.roleId;
      const isImpersonated = request.user && request.user.isImpersonated;
      const adminId = request.user && request.user.adminId;
      if (request.user && request.route.o) {
        var activityName = request.route.o.replace(/[.]/g, "->").trim();
      } else {
        if (originalUrl) {
          activityName = originalUrl.replace(/\//g, " ").trim();
          if (activityName.includes("admin")) {
            activityName = activityName.split(" ").slice(0, 2).join("->");
          }
          if (activityName.includes("client")) {
            activityName = activityName
              .replace(" api v1", "")
              .split(" ")
              .slice(0, 2)
              .join("->");
          }
        }
      }

      let data = {
        activityName: activityName,
        userId: userId !== undefined ? userId : null,
        deviceId: deviceId !== undefined ? deviceId : null,
        roleId: roleId !== undefined ? roleId : null,
        route: originalUrl,
        frontend_route: frontend_route !== undefined ? frontend_route : null,
        //requestData: JSON.parse(body),
        response: {
          httpStatus: statusCode,
          message: MESSAGE ? MESSAGE : message,
          method: method,
        },
        location: ipInfo ? ipInfo.city + "," + ipInfo.country : "",
        ip: ipInfo ? ipInfo.ip : "",
      };
      if (request.user) {
        data.name = request.user.firstName + " " + request.user.lastName;
      }
      if (typeof body !== "object") {
        data.requestData = JSON.parse(body);
      } else {
        data.requestData = body;
      }
      data.adminId = isImpersonated ? adminId : null;
      if (data.activityName && !data.activityName.includes("auth")) {
        if (
          request.route !== undefined &&
          request.route?.o &&
          ACTIVITY_TRACK_ROUTE.includes(request.route?.o)
        ) {
          await userActivity(data);
        }
      }
    });
  }
});

global.FRONT_URL = process.env.APP_URL;

server.listen(process.env.SERVER_PORT, () => {
  logger.info(`The application is running on ${process.env.SERVER_PORT}`);
});
