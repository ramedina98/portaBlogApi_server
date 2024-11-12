interface IJwtPayload {
    userId: string;
    name: string;
    phone: string;
}

enum JwtFields {
    ID = 'userId',
    NAME = 'name',
    PHONE = 'phone'
}

export { IJwtPayload, JwtFields };