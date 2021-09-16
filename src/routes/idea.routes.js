const { Router } = require('express');

module.exports = function ({ IdeaController }) {
    const router = Router()

    router.get('/:ideaId', IdeaController.get)
    router.get('', IdeaController.getAll)
    router.patch('/:ideaId', IdeaController.update)
    router.post('/:ideaId/upvote', IdeaController.upvoteIdea)
    router.post('/:ideaId/downvote', IdeaController.downvoteIdea)
    router.delete('/:ideaId', IdeaController.delete)

    return router

}