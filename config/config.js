const port = 3000;
host = '127.0.0.1',
    dbuser = "anonymous",
    dbpwd = "abcd1234",
    dbUrl = "mongodb://ds235732.mlab.com:35732/pandadudes",
    secretKey = "Banda",
    authsourse = "pandadudes",
    saltRounds = 10;

module.exports = {
    port,
    host,
    dbuser,
    dbpwd,
    dbUrl,
    secretKey,
    authsourse,
    saltRounds
};