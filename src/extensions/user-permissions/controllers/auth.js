// path: src/extensions/users-permissions/controllers/auth.js

const { sanitize } = require('@strapi/utils');
const { createCoreController } = require('@strapi/strapi').factories;

// @ts-ignore
module.exports = createCoreController('plugin::users-permissions.auth', ({ strapi }) => ({
  async callback(ctx) {
    // Appeler le contrôleur par défaut pour l'authentification
    const { data, error } = await super.callback(ctx);

    if (error) {
      // @ts-ignore
      return ctx.badRequest(null, error);
    }

    // Ajouter des données personnalisées à la réponse
    const additionalData = {
      // Par exemple, inclure le rôle de l'utilisateur ou un token supplémentaire
      userRole: data.user.role.name,
      customToken: "tokenSécuriséPourFrontend",
    };

    // Retourner la réponse avec les données supplémentaires
    ctx.send({
      ...data,
      ...additionalData,
    });
  },
}));
