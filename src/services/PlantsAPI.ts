import { Plant } from "../flux/Store";

const API_URL = 'http://192.168.131.101:8080/dca/api/plants';

type RawPlant = {
    nombreComun: string;
    nombreCientifico: string;
    imagen: string;
};

export async function getPlants(): Promise<{ Plant: { userGarden: Plant[] } }> {
    const response = await fetch(API_URL);
    const rawData: RawPlant[] = await response.json();

    const formatted: Plant[] = rawData.map((item) => ({
        commonName: item.nombreComun,
        scientificName: item.nombreCientifico,
        image: item.imagen || 'https://via.placeholder.com/150',
    }));

    return { Plant: { userGarden: formatted } };
}