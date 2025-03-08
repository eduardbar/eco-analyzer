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
    origin: [
        'http://localhost:3000',
        'https://frontend-fo5aadje5-eduardbars-projects.vercel.app',
        'https://frontend-mop2f50nb-eduardbars-projects.vercel.app',
        'https://eco-analyzer.bmtechlab.online'
    ],
    credentials: true
}));
// Middleware de debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - Content-Type: ${req.get('Content-Type')}`);
    next();
});
app.use(express_1.default.json({ limit: '10mb' }));
// Error handler para JSON malformado
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && 'body' in error) {
        console.error('JSON Syntax Error:', error.message);
        return res.status(400).json({ error: 'Invalid JSON format' });
    }
    next(error);
});
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/analysis', auth_middleware_1.authMiddleware, analysis_routes_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map