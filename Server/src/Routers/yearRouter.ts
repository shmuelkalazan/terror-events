import { Router } from "express";
import { getAllEventsByOrganization, getAverageOfCasualtiesByRangesYears, getAverageOfCasualtiesByYear, getOrganizationEventByYear } from "../controllers/yearController";

const router = Router()
router.get("/get/:year/:number", getAverageOfCasualtiesByYear )

router.get("/range/:from/:to" ,getAverageOfCasualtiesByRangesYears )

router.get("/allorg/:year", getOrganizationEventByYear )

router.get("/allyears/:org",  getAllEventsByOrganization )

export default router;
