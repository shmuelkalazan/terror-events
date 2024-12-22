import { Request, Response } from "express";
import yearService from "../Services/yearService";

export const getAverageOfCasualtiesByYear = async (req:Request ,res:Response) => {
    try {
        const { year, number } = req.params;
        const selectedYear = year ? parseInt(year) : 2017
        const selectedNumber = number ? parseInt(number) : 1
        const averageOfCasualtiesByYear = await yearService.getAverageOfCasualtiesByYear(selectedYear, selectedNumber);
        res.status(200).json(averageOfCasualtiesByYear)
    } catch (err) {
        res.status(400).json((err as Error).message) 
    }
};

export const getAverageOfCasualtiesByRangesYears = async (req:Request ,res:Response) => {
    try {
        const { from, to } = req.params;
        const selectedFrom = parseInt(from) 
        const selectedTo = parseInt(to)
        if (selectedFrom < 1970 || selectedFrom > 2017 || selectedFrom > selectedTo
            || selectedTo >2017 || selectedTo < 1970
        ){
            res.status(401).json("unvalid range")
            return
        }
        const averageOfCasualtiesByRangesYears = await yearService.getAverageOfCasualtiesByRangesYears(selectedFrom,selectedTo)
        res.status(200).json(averageOfCasualtiesByRangesYears)
    } catch (err) {
        res.status(400).json((err as Error).message) 
    }
};

export const getOrganizationEventByYear = async (req:Request ,res:Response) => {
    try {
        const { year } = req.params;
        const selectedYear = year ? parseInt(year) : 2017
        const yearEventsByOrganization = await yearService.getOrganizationEventByYear(selectedYear);
        res.status(200).json(yearEventsByOrganization)
    } catch (err) {
        res.status(400).json((err as Error).message)
    }
};

export const getAllEventsByOrganization = async (req:Request ,res:Response) => {
    try {
        const { org } = req.params;
        const selectedOrg = org ? org : "Unknown"
        const yearEventsByOrganization = await yearService.getAllYearsEventByOrganization(selectedOrg);
        res.status(200).json(yearEventsByOrganization)
    } catch (err) {
        res.status(400).json((err as Error).message)
    }
};
