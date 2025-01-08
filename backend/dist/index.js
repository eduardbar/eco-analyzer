"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const analysis_routes_1 = __importDefault(require("./routes/analysis.routes"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const auth_middleware_1 = require("./auth/auth.middleware");
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// CORS configuration
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Allow frontend origin
    credentials: true
}));
app.use(express_1.default.json());
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/analysis', auth_middleware_1.authMiddleware, analysis_routes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map