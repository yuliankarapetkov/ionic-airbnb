export class Booking {
    constructor(
        public id: string,
        public placeId: string,
        public userId: string,
        public placeTitle: string,
        public placeImageUrl: string,
        public firstName: string,
        public lastName: string,
        public guestNumber: number,
        public fromDate: Date,
        public toDate: Date
    ) {}
}