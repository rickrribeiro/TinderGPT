"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enums_1 = require("./services/enums");
const dependency_container_1 = require("./dependency-container");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const port = 3001;
const host = '0.0.0.0';
// Without provider selection for now because there is only one, but remember to add later
const dependencyContainer = dependency_container_1.DependencyContainer.getInstance({
    aiProvider: enums_1.AIProvidersEnum.CHATGPT,
    socialMediService: enums_1.SocialMediaEnum.TINDER
});
const routes = routes_1.Routes.setUp(dependencyContainer);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/', routes);
app.listen(port, host, () => {
    console.log(`🔥[TinderGPT]🤖: Server is running at http://${host}:${port}`);
});
