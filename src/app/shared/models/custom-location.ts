import { CustomCoordinates } from './custom-coordinates';

export interface CustomLocation extends CustomCoordinates {
    address: string;
    imageUrl: string;
}
