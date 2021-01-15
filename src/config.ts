export default {
    bdHost: process.env.HOST_NAME_DB_AE || 'localhost',
    bdName: process.env.NAME1_DB_AE || 'postgres',
    bdPass: process.env.USER1_PASS_DB_AE || 'Pass2020!',
    bdUserName: process.env.USER1_NAME_DB_AE || 'postgres',
    bdPort: process.env.PORT_DB_AE || 5432,
    port: process.env.PORT || '8091',
}