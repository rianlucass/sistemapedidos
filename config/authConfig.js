export default (passport) => {
    passport.serializeUser((user, done) => {
        done(null, { id: user.id, categoria: user.categoria });
    });

    passport.deserializeUser((obj, done) => {
        if (obj.categoria === 1) {
            import('../models/Restaurante.js').then(({ default: Restaurante }) => {
                Restaurante.findByPk(obj.id).then((restaurante) => {
                    done(null, restaurante || false);
                });
            });
        } else {
            import('../models/Usuario.js').then(({ default: Usuario }) => {
                Usuario.findByPk(obj.id).then((usuario) => {
                    done(null, usuario || false);
                });
            });
        }
    });
};
