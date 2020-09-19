export default {
    db: {
        options: {
            dialect: 'postgres',
            dialectOptions: {
                ssl: { rejectUnauthorized: false }
            }
        }
    }
};