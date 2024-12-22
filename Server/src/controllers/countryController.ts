import { Request, Response } from "express";
import countryService from "../Services/countryService";

export const getAverageCasualtiesByCountry = async (req:Request<any, any, any>,res:Response) => {
    try {
        const averageCasualtiesByCountry = await countryService.getAverageCasualtiesByCountry()
        res.status(200).json(averageCasualtiesByCountry)
    } catch (err) {
        res.status(400).json((err as Error).message) 
    }
};

export const getAverageCasualtiesByCountryId = async (req: Request, res: Response) => {
    try {
        const countryId = req.params.id;
        const averageCasualtiesOfCountry = await countryService.getAverageCasualtiesByCountryId(countryId);
        res.status(200).json(averageCasualtiesOfCountry);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const getOrganizationByCountry = async (req: Request<{ country: string; limit?: string }>, res: Response) => {
    try {
        const { country, limit } = req.params;
        const limitNumber = limit ? parseInt(limit) : 0
        const organizationByCountry = await countryService.getOrganizationByCountry(country, limitNumber);
        res.status(200).json(organizationByCountry);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const getOrganizationByCasualtiesNumber = async (req: Request<{ country: string }>, res: Response) => {
    try {
        const { country } = req.params;
        console.log("ccc" , country)
        const organizationByCountry = await countryService.getOrganizationByCountry(country);
        res.status(200).json(organizationByCountry);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const getCountriesWhereOrganizationIsTop = async (req: Request, res: Response) => {
    try {
        const { org } = req.params;
        const orgByCountry = await countryService.getCountriesWhereOrganizationIsTop(org);
        res.status(200).json(orgByCountry);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};
