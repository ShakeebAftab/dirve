import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";

// Routes
import { router as folderRoutes } from "./api/folders";
import { router as userRoutes } from "./api/users";

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/folders", folderRoutes);
app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
exports.app = functions.https.onRequest(app);
