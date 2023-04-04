import { createRouter, createWebHistory } from 'vue-router';
import routes from "./routes";

const router = Router();
export default router;

function Router() {
    const router = createRouter({
        history: createWebHistory(),
        routes: routes,
    });
    return router;
}
