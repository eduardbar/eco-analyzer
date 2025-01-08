"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analysis_controller_1 = require("../controllers/analysis.controller");
const router = (0, express_1.Router)();
router.post('/analyze', analysis_controller_1.handleAnalyzeProduct);
router.get('/', analysis_controller_1.getAnalysisHistory);
exports.default = router;
//# sourceMappingURL=analysis.routes.js.map