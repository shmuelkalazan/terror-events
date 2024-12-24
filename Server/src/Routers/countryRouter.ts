import { Router } from "express";
import { getAverageCasualtiesByCountry, getAverageCasualtiesByCountryId, getCountriesWhereOrganizationIsTop, getOrganizationByCasualtiesNumber, getOrganizationByCountry } from "../controllers/countryController";

const router = Router()
router.get("/", getAverageCasualtiesByCountry)
router.get("/id/:id", getAverageCasualtiesByCountryId)

router.get("/limit/:country/:limit", getOrganizationByCountry)
router.get("/country/:country", getOrganizationByCasualtiesNumber)

router.get("/country/org/:org", getCountriesWhereOrganizationIsTop)

export default router
